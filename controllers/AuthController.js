const Web3 = require('web3');
const jwt = require('jsonwebtoken');

let web3 = new Web3(new Web3.providers.HttpProvider(`https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`));


const login = async (req, res, next) => {
  
  const { privateKey } = req.body;

  try{
    const data = await web3.eth.accounts.privateKeyToAccount(privateKey);
    const token = jwt.sign({address: data.address},process.env.JWT_SECRET);

    res.json({
      token
    })
  }catch(err){
    next(err);
  }
}


module.exports = {
  login
};