const ethers = require('ethers');
const axios = require('axios');


const ABI = [
  'function transferFrom(address owner, address buyer, uint256 numTokens) public override returns (bool)',
  'function balanceOf(address user) public override view returns (uint256)'
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
  const {receiver,type} = req.body;
  const value = parseInt(req.body.value);
  const {user : address} = req;
  let result;
  console.log(receiver,type,value)
  try{

    if(type === "NIS"){
      result = await contract_NIS.transferFrom(address,receiver,value * Math.pow(10 , 4));
    }else if(type === "USD"){
      result = await contract_USD.transferFrom(address,receiver,value * Math.pow(10 , 4));
    }else if(type === "JD"){
      result = await contract_JD.transferFrom(address,receiver,value * Math.pow(10 , 4));
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

const balance = async (req, res) => {
  const {user : address} = req;
  try{
    let nis = await contract_NIS.balanceOf(address);
    let usd = await contract_USD.balanceOf(address);
    let jd = await contract_JD.balanceOf(address);
    res.json({ 
      status: {
        nis:parseInt(nis._hex,16),
        jd:parseInt(jd._hex,16),
        usd:parseInt(usd._hex,16)
      }
     });
  }catch(e){
    res.json(
      e
    );
  }
}


const exchangeCrypto = async(req,res) =>{
  const {from,to} = req.body;
  const value = parseInt(req.body.value);
  const {user : address} = req;
  const types = {
    USD:{name:"USD",contract:contract_USD},
    NIS:{name:"ILS",contract:contract_NIS},
    JD:{name:"JOD",contract:contract_JD}
  }
  const owner = process.env.OWNER_ADDRESS;
  try {
    const rate = await axios.get(`https://api.apilayer.com/exchangerates_data/latest?symbols=${types[to].name}&base=${types[from].name}&apikey=${process.env.EXCHANGE_API_KEY}`)
                  .then(e => e.data.rates[types[to].name]);
    const result1 = await types[to].contract.transferFrom(owner,address,Math.floor(value * rate * Math.pow(10 , 4)));
    const result2 = await types[from].contract.transferFrom(address,owner,value * Math.pow(10 , 4));
    
                  
    res.json({ 
      status:{result1,result2}
     });
  } catch (error) {
    res.json(
      error
    );
  }
}

module.exports = {transaction , balance , exchangeCrypto};