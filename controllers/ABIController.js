const ethers = require('ethers');

const ABI = [
  'function transferFrom(address owner, address buyer, uint256 numTokens) public override returns (bool)'
];

const NIS_CONTRACT_ADDRESS = process.env.NIS_CONTRACT_ADDRESS;
const JD_CONTRACT_ADDRESS = process.env.JD_CONTRACT_ADDRESS;
const USD_CONTRACT_ADDRESS = process.env.USD_CONTRACT_ADDRESS;
const privateKey = process.env.PRIVATEKEY;
const provider = ethers.getDefaultProvider('ropsten');
const wallet = new ethers.Wallet(privateKey, provider);
const contract_JD = new ethers.Contract(JD_CONTRACT_ADDRESS, ABI, wallet);
const contract_NIS = new ethers.Contract(NIS_CONTRACT_ADDRESS, ABI, wallet);
const contract_USD = new ethers.Contract(USD_CONTRACT_ADDRESS, ABI, wallet);

const transaction = async (req, res) => {
  const {sender,receiver,type,value} = req.body;

  let result;
  try{

    if(type === "NIS"){
      result = await contract_NIS.transferFrom(sender,receiver,value);
    }else if(type === "USD"){
      result = await contract_USD.transferFrom(sender,receiver,value);
    }else if(type === "JD"){
      result = await contract_JD.transferFrom(sender,receiver,value);
    }else{
      throw new  Error("invalid currency type");
    }

    res.json({ 
      status: result
     });
  }catch(e){
    res.json(
      e
    );
  }
}

module.exports = {transaction};