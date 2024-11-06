const { expressjwt: jwt } = require('express-jwt');


function authJwt(){
    return jwt({
        secret : 'secretkey',
        algorithms :  ["HS256"]
    }).unless(
        {
            path:[
            'api/v1/user/login',
        ]
        }
    )
}

module.exports = authJwt;