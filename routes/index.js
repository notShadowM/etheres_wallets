const router = require("express").Router();
const ABI = require("../controllers/ABIController");
const User = require("../models/User");

// router.post("/transaction",ABI.transaction);

// router.get("/",(req,res) => {
//  const createUser =  User.create({address:"dasdasdkj;sad;jasd",userName:"Hi",password:"123456",token:"test token"});

//  res.json(createUser);
// })
module.exports = router;