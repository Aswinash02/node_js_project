
const User = require('../models/user_model');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.createUser = async (req, res) => {
    try {
        const existingUser = await User.findOne({
            $or: [{ email: req.body.email }, { phone: req.body.phone }]
        });

        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: 'User already exists with this email or phone number'
            });
        }
        let newUser = User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: bcryptjs.hashSync(req.body.password, 10)
        })


        newUser = await newUser.save();
        if (!newUser)
            return res.status(400).send({
                success: false,
                message: "Failed to create user"
            })

        return res.status(200).send({
            success: true,
            message: "user Created Successfully"
        })
    } catch (err) {
        return res.status(500).send(
            {
                success: false,
                message: err.message
            }
        )
    }


}

exports.loginUser = async (req, res) => {
    try {
        const existingUser = await User.findOne(
            { email: req.body.email }
        );

        if (!existingUser) {
            return res.status(400).send({
                success: false,
                message: 'user not found'
            });
        }
        const validatePassword = bcryptjs.compareSync(req.body.password, existingUser.password)
        if (!validatePassword)
            return res.status(400).send({
                success: false,
                message: 'Invalid password'
            });

        const token = jwt.sign(
            { userId: existingUser._id },
            'secretkey'

        )

        return res.status(200).send({
            success: true,
            message: "Login Successfull"
            ,
            token: token
        })
    } catch (err) {
        return res.status(500).send(
            {
                success: false,
                message: err.message
            }
        )
    }


}