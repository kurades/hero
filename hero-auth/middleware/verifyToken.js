const jwt = require('jsonwebtoken')

module.exports = (request, response, next) =>{
    console.log(request.header('Authorization'));
    const TOKEN_SECRET = process.env.TOKEN_SECRET
    const authHeader = request.header('Authorization')
    let token = '';
    if (authHeader.startsWith("Bearer ")){
        token = authHeader.substring(8, authHeader.length-1);
        console.log(token);
   }
    console.log(request.header('Authorization'));
    if(!token) return response.status(401).send('Token required')

    try{
        const decoded = jwt.verify(token,TOKEN_SECRET)
        request.user = decoded;
    }catch(error){
        console.log(error);
        return response.status(401).send('Unauthorized')
    }
    next()
}