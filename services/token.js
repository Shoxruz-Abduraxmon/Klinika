const jwt = require('jsonwebtoken');

const generatorJwt = UserId => {
    const jwtToken = jwt.sign({UserId}, process.env.jwt_secret, {expiresIn: '30d'});

    return jwtToken
}

module.exports = generatorJwt;