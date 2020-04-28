const jwt = require('jsonwebtoken');
require('dotenv').config()


const  authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    var public= process.env.publickey.replace(/\\n/gm, '\n');
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, public, (err, data) => {
            if (err) {
                return res.sendStatus(401);
            }

            req.user = data.user;
            req.role = data.role;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

const  AdminauthenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    var public= process.env.publickey.replace(/\\n/gm, '\n');
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, public, (err, data) => {
            if (err || data.role != 1) {
                return res.sendStatus(401);
            }

            req.user = data.user;
            req.role = data.role;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};
//  send() {
//     return authenticateJWT
// }
exports.userauth = authenticateJWT;
exports.adminauth = AdminauthenticateJWT;