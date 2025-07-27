const userController = {}
const bcrypt = require("bcrypt")
const saltRound = 10
const User = require("../model/user.js")

userController.createUser = async(req, res)=>{
  try{
    const {email, name, password} = req.body
    const user = await User.findOne({email},"-createdAt -updatedAt -__v")
    if(user){
          throw new Error('이미 가입된 유저입니다.')
        }
    const salt = bcrypt.genSaltSync(saltRound);
    const hash = bcrypt.hashSync(password, salt)
    const newUser = new User({email,name,password:hash})
    await newUser.save()
    res.status(200).json({status:"success"})
    

  }catch(error){res.status(200).json({status:"fail",error})
  }
}

userController.loginWithEmail= async(req, res)=>{
try{
  const{email,password} =req.body
  const user = await User.findOne({email})
  if(user){
    const isMatch = bcrypt.compareSync(password, user.password )
    if(isMatch){
      const token = await user.generateToken()
      return res.status(200).json({status: "success", user, token})
    }
  }
  throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.")
}
catch(error){
  res.status(400).json({status:"fail", message:error.message})
}
}

module.exports = userController