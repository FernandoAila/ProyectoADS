const jwt = require("jsonwebtoken");

const usePasswordHashToMakeToken = (user) => {
    // highlight-start
    const secret = user.password + "-" + user.createdAt
    const id=user.id
    const token = jwt.sign({ id }, secret, {
      expiresIn: 3600 // 1 hour
    })
    // highlight-end
    return token
  }
const getPasswordResetURL=(user,token)=> `http://localhost:3000/recover_pass/${user.id}/${token}`;
module.exports={usePasswordHashToMakeToken,getPasswordResetURL};