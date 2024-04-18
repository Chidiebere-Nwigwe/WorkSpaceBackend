
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res, next) =>{

    const token = req.cookies.jwt; // accces cookies and jwt

    // check if json web token exists & is verfied
    if(token){
        jwt.verify(token, 'workspace secret', (err, decodedToken)=>{
            if(err){
                console.log(err.message);
                res.redirect('http://127.0.0.1:5500/signin.html');
            } else{            
                console.log(decodedToken);
                next();
            }
        })
    }
    else{
        res.redirect('http://127.0.0.1:5500/signin.html');
    }
}   
// check current user
const checkUser = (req, res, next) =>{
    const token = req.cookies.jwt; // accces token from cookies

    if(token){
        jwt.verify(token, 'net ninja secret', async (err, decodedToken)=>{
            if(err){
                console.log(err.message);
                res.locals.user = null;
                next();
            } else{
                
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    }else{
        res.locals.user = null;
        next();
    }
}



module.exports = { requireAuth, checkUser };