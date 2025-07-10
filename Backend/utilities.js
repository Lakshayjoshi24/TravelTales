const jwt=require('jsonwebtoken') //You’re importing the JWT library to verify tokens sent by users.

function authenticateToken(req, res, next){  //This is a middleware function — it runs before protected routes to check if the user has a valid token.
    const authHeader=req.headers["authorization"]; //You’re getting the Authorization header from the request.
    const token=authHeader && authHeader.split(" ")[1];

    //No Token, unauthorised
    if(!token)return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
        //Token invalid, forbidden
        if(err) return res.sendStatus(401);
        req.user=user;
        next();
    });
}

module.exports={
    authenticateToken,
}