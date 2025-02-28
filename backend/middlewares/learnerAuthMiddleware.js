const jwt = require('jsonwebtoken');
const learnerModel = require('../models/learnerModels'); // Import learner model

module.exports = async (req, res, next) => {
    const token = req.headers['authorization']?.split(" ")[1]; // Extract token from headers
    if (!token) {
        return res.status(401).send({ message: 'Auth Failed', success: false });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
            if (err) {
                return res.status(401).send({ message: 'Auth Failed', success: false });
            } else {
                // Check if the user exists in the learners collection
                const learner = await learnerModel.findById(decode.id);
                if (!learner) {
                    return res.status(401).send({ message: 'Learner not found', success: false });
                }

                req.body.userId = decode.id; // Attach learner ID to the request
                next();
            }
        });
    } catch (error) {
        console.log(error);
        res.status(401).send({ message: 'Auth Failed', success: false });
    }
};