const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// const User = require("./../Model/basicAdminModel");
require("./../Model/basicAdminModel");
const BasicAdminSchema = mongoose.model("basicAdmins");
const bcrypt = require("bcryptjs");

// BOTH ROUTE AND CONTROLLER IN ONE PLACE
router.post("/admin-signup", (req, res, next) => {
    // 1- Checking if the User Exist
    console.log(req);
    BasicAdminSchema.find({ email: req.body.email })
        .exec()
        .then((user) => {
            if (user.length >= 1) {
                return res.status(409).json({ message: "User Already Exists" });
            } else {
                if (req.body.password.length < 8) {
                    let xx = new Error("Password is Min Of 8");
                    next(xx);
                } else {
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        if (err) {
                            return res.status(500).json({ error: err });
                        } else {
                            // Create a New User  :
                            const user = new BasicAdminSchema({
                                // _id: new mongoose.Types.ObjectId(),
                                firstName: req.body.firstName,
                                lastName: req.body.lastName,
                                password: hash,
                                email: req.body.email,
                                hiredate: req.body.hiredate,
                                birthdate: req.body.birthdate,
                                image: req.body.image,
                                salary: req.body.salary,
                                isActivated: req.body.isActivated,
                                isRoot: req.body.isRoot,
                            });
                            user.save()
                                .then((result) => {
                                    res.status(201).json({
                                        message: "Admin Created Successfully",
                                    });
                                })
                                .catch((err) => {
                                    res.status(500).json({
                                        message: " Admin Failed to Create ",
                                        error: err,
                                    });
                                });
                        }
                    });
                }
            }
        })
        .catch();
});

module.exports = router;
