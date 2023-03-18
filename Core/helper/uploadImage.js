const multer = require('multer');
const path = require('path');

module.exports= function (folderName) {
	const fileFilter = (req, file, cb) => {
		if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype == 'image/jpeg') {
			cb(null, true);
		} else {
            cb(new Error("file should be Image only."));
		}
	};

	const storage = multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, path.join(__dirname, '..', '..', 'images'));
		},
		filename: (req, file, cb) => {
            let ext = path.extname(file.originalname);
            let fileName = path.basename(file.originalname, ext);
            let finalName = file.fieldname + "-" + fileName + "-" + Date.now() + ext;
            cb(null, path.join(folderName, finalName));
		},
	});

	const upload = multer({ limits: { fileSize: 1024 * 1024 * 2 }, storage: storage, fileFilter: fileFilter });

	return upload.single('image');
};
