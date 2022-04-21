const { hashSync, compareSync } = require('bcryptjs');
const User = require('../models/User');
const generateToken = require('../utils/tokenGen');

const signUp = async (req, res, next) => {
  
  const { userName, password, address } = req.body;

  // validation

  try{

    const token = generateToken();

    const hashedPassword = hashSync(password);

    const user = await User.create({address, userName, password: hashedPassword, token});

    res.json({
      user:{
        id: user._id,
        userName: user.userName,
        token: user.token
      },
      status: 200
    });
  }catch(err){
    next(err);
  }
}

const login = async (req, res, next) => {
  
  const { userName, password } = req.body;

  // validation

  try{


    const user = await User.findOne({userName});
    if(!user){
      throw new Error("user not found");
    }

    const passwordMatch = compareSync(password,user.password);

    if(passwordMatch){
      const token = generateToken();
      user.token = token;
      user.save();

      res.json({
        user:{
          id: user._id,
          userName: user.userName,
          token: user.token
        },
        status: 200
      });
    }else{
      throw new Error("invalid password");
    }
  }catch(err){
    next(err);
  }
}


module.exports = {
  signUp,
  login
};