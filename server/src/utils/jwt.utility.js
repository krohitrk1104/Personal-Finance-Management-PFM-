const jwt = require('jsonwebtoken');

//create a token for user during login to avoid login every time user perform any activity--> it's stay user logined with expires times(Authenticate every time with this unique token of every user).
//pass User_Id in arreow function
const generateToken = (userId)=>{
    return jwt.sign( {id: userId}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
};


module.exports = generateToken;