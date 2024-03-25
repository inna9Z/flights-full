import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

import validateEmail from '../utils/validateEmail.js';
import validatePassword from '../utils/validatePassword.js';
import matchPasswords from '../utils/matchPasswords.js';
import hashPassword from '../utils/hashPassword.js';

const userControllers = {
    register: async (req, res) => {
        try {
            const { email, password, rePassword } = req.body;

            // Validate email format
            if (!validateEmail(email)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid email format'
                });
            }

            // Validate password format
            if (!validatePassword(password)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid password format'
                });
            }

            // Check if the email already exists in the database
            const userExist = await User.findOne({ email });

            if (userExist) {
                return res.status(400).json({
                    success: false,
                    message: 'Email already exists'
                });
            }

            // Validate if passwords match
            if (!matchPasswords(password, rePassword)) {
                return res.status(400).json({
                    success: false,
                    message: 'Passwords do not match'
                });
            }

            // Hash the password before saving it to the database
            const hashedPassword = hashPassword(password);

            // Create a new user instance
            const newUser = new User({
                email,
                password: hashedPassword
            });

            // Save the user to the database
            await newUser.save();

            return res.status(200).json({
                success: true,
                message: 'User registered successfully'
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error',
                error: err.message
            });
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const userExists = await User.findOne({ email: email });
            if (userExists) {
                const isValid = await bcrypt.compare(
                    password,
                    userExists.password
                );

                if (isValid) {
                    // create token
                    const token = jwt.sign(
                        { user: userExists },
                        process.env.TOKEN_ACCESS_SECRET
                    );

                    // set cookies
                    res.cookie('_id', userExists._id, {
                        secure: true,
                        sameSite: 'None'
                    });
                    res.cookie('token', token, {
                        httpOnly: true,
                        secure: true,
                        sameSite: 'None'
                    });
                    return res.status(200).json({
                        success: true,
                        token,
                        id: userExists._id
                    });
                } else {
                    return res.status(401).json({
                        success: false,
                        message: 'Invalid password'
                    });
                }
            }
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: 'Internal Server Error',
                error: err.message
            });
        }
    },
    logout: (req, res) => {
        // Clear cookies
        res.clearCookie('token');
        res.clearCookie('_id');

        return res.status(200).json({
            success: true,
            message: 'User logged out successfully'
        });
    }
};

export default userControllers;
