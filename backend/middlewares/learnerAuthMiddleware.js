const jwt = require('jsonwebtoken');
const learnerModel = require('../models/learnerModels'); 

module.exports = async (req, res, next) => {
    const token = req.headers['authorization']?.split(" ")[1]; 
    if (!token) {
        return res.status(401).send({ message: 'Auth Failed', success: false });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
            if (err) {
                return res.status(401).send({ message: 'Auth Failed', success: false });
            } else {
               
                const learner = await learnerModel.findById(decode.id);
                if (!learner) {
                    return res.status(401).send({ message: 'Learner not found', success: false });
                }

                req.body.userId = decode.id; 
                next();
            }
        });
    } catch (error) {
        console.log(error);
        res.status(401).send({ message: 'Auth Failed', success: false });
    }
};