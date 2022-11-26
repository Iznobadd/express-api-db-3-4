const {body, validationResult} = require('express-validator');
const validateUser = [
    body("email").isEmail().notEmpty(),
    body("firstname").isLength({max: 255}).notEmpty(),
    body("lastname").isLength({max: 255}).notEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.status(422).json({validationResult: errors.array()});
        } else {
            next();
        }
    } 
];

const validateMovie = [
    body("title").isLength({max: 255}).notEmpty(),
    body("director").isLength({max: 255}).notEmpty(),
    body("year").isLength({max: 255}).notEmpty(),
    body("color").isLength({max: 255}).notEmpty(),
    body("duration").isLength({max: 11}).notEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.status(422).json({validationResult: errors.array()});
        } else {
            next();
        }
    } 
]

module.exports = {
    validateUser,
    validateMovie
};

