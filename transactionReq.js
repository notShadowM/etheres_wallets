const ethers = require('ethers');
const express = require('express');


const app = express();


const CONTRACT_ADDRESS = "";

const ABI = [
  'function transferFrom(address owner, address buyer, uint256 numTokens) public override returns (bool)'
];


app.get('/sendNIS/:val', async (req, res) => {
 
  const provider = ethers.getDefaultProvider('ropsten');
  const privateKey = "5bb61aa0765801c1c6c4b24847f927e2b6a870597b8e85fa101d45ac359ccfd7";
  const wallet = new ethers.Wallet(privateKey, provider);

  const sender = req.get("sender");
  const receiver = req.get("receiver");


  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

  const val = parseFloat(req.params.val);

  try{

    const result = await contract.transferFrom(sender,receiver,val);

    res.json({ 
      message : val,
      status: result
     });
  }catch(e){
    res.json(
      e
    );
  }
});

app.get('/sendUSD/:val', async (req, res) => {
 
  const provider = ethers.getDefaultProvider('ropsten');
  const privateKey = "5bb61aa0765801c1c6c4b24847f927e2b6a870597b8e85fa101d45ac359ccfd7";
  const wallet = new ethers.Wallet(privateKey, provider);

  const sender = req.get("sender");
  const receiver = req.get("receiver");


  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

  const val = parseFloat(req.params.val);

  try{

    const result = await contract.transferFrom(sender,receiver,val);

    res.json({ 
      message : val,
      status: result
     });
  }catch(e){
    res.json(
      e
    );
  }
});

app.get('/sendJD/:val', async (req, res) => {
 
  const provider = ethers.getDefaultProvider('ropsten');
  const privateKey = "5bb61aa0765801c1c6c4b24847f927e2b6a870597b8e85fa101d45ac359ccfd7";
  const wallet = new ethers.Wallet(privateKey, provider);

  const sender = req.get("sender");
  const receiver = req.get("receiver");


  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

  const val = parseFloat(req.params.val);

  try{

    const result = await contract.transferFrom(sender,receiver,val);

    res.json({ 
      message : val,
      status: result
     });
  }catch(e){
    res.json(
      e
    );
  }
});

app.listen(3000);
