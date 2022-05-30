const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const response = require('../helpers/response');
const User = require('../models/user.model');

const register = (req, res) => {
    try {
        User.findOne({ username: req.body.username })
            .then((user) => {
                if (user) {
                    return response.validationResponse(
                        res,
                        `Username ${req.body.username} invalid.`,
                    );
                }

                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    const userStore = new User({
                        username: req.body.username,
                        password: hash,
                    });

                    userStore
                        .save()
                        .then((user) => {
                            return response.successResponse(
                                res,
                                {
                                    _id: user._id,
                                    username: user.username,
                                }
                            );
                        })
                        .catch((err) => {
                            return response.errorResponse(res, err);
                        });
                });
            })
            .catch((err) => {
                return response.errorResponse(res, err);
            });
    } catch (err) {
        return response.errorResponse(res, err);
    };
};

const login = (req, res) => {
    try {
        User.findOne({ email: req.body.email })
            .then((user) => {
                if (!user) {
                    return response.unauthorizedResponse(
                        res,
                        'Username or password wrong.',
                    );
                }

                bcrypt.compare(req.body.password, user.password, (err, same) => {
                    if (same) {
                        let userData = {
                            _id: user._id,
                            username: user.username,
                        };

                        userData.token = jwt.sign(userData, process.env.JWT_SECRET, {
                            expiresIn: process.env.JWT_TIMEOUT_DURATION,
                        });

                        return response.successResponse(
                            res,
                            userData,
                            'Login success.',
                        );
                    } else {
                        return response.unauthorizedResponse(
                            res,
                            'Username or password wrong.',
                        );
                    }
                });
            })
            .catch((err) => {
                return response.errorResponse(res, err);
            });
    } catch (err) {
        return response.errorResponse(res, err);
    };
};

module.exports = {
    register,
    login,
}
