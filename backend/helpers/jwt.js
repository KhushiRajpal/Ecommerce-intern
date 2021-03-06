const expressJwt = require('express-jwt');

function authJwt(){
	
		const secret = process.env.secret;
        return expressJwt({
			secret,
			algorithms: ['HS256']
	}).unless({
        path: [
            '/api/v1/user/login'
        ]
    })
}
async function isRevoked(req, payload, done) {
    if(!payload.isAdmin) {
        done(null, true)
    }

    done();
}

module.exports= authJwt;