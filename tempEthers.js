const ethers = require('ethers');
const Web3 = require('web3');

let provider = new ethers.providers.EtherscanProvider("ropsten");
let web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/ab30a72ff47a440cb1c59ae9fea4ecf5'));

const txns = async (req,res) =>{
  const {type} = req.body;
  let history;
  const accountAddress = "0x3e97e2b3499ac801cea29557af9a08082ccf2080";
  const nis = "0xa8dba64afc4a8704c98b0d1c9bfb7d307b30963a";
  const jd = "0xa8dba64afc4a8704c98b0d1c9bfb7d307b30963a";
  const usd = "0xa8dba64afc4a8704c98b0d1c9bfb7d307b30963a";
  try {
    // history = await provider.getHistory(address);
    history = await provider.getHistory(accountAddress, e => console.log("err"));
    let results = await Promise.all(history.map(e => web3.eth.getTransactionReceipt(e.hash)));

    if(type == "nis"){
      results = results.filter((e,index)  => {
        if(e.contractAddress?.toLowerCase() == nis || e.to == nis){
          return true;
        }else{
          history.splice(index,1);
          return false;
        }
      })
    }else if(type == "jd"){
      results = results.filter((e,index)  => {
        if(e.contractAddress?.toLowerCase() == jd || e.to == jd){
          return true;
        }else{
          history.splice(index,1);
          return false;
        }
      })
    }else if(type == "usd"){
      results = results.filter((e,index)  => {
        if(e.contractAddress?.toLowerCase() == usd || e.to == usd){
          return true;
        }else{
          history.splice(index,1);
          return false;
        }
      })
    }else if (type == "all"){
      results = results.filter((e,index)  => {
        if([usd , jd , nis ].includes(e.contractAddress?.toLowerCase()) || [usd , jd , nis ].includes(e.to)){
          return true;
        }else{
          history.splice(index,1);
          return false;
        }
      })
    }

    const logs = results.map(e => e.logs);
    const log = logs.map((e,index) => e.find(i => i.transactionHash === history[index].hash)).filter(e => e);

    const abiJson = [
      {"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}
    ];
  
    const contract = log.map(e => new web3.eth.Contract(abiJson, e.address));
    const symbol = await Promise.all(contract.map(e => e.methods.symbol().call()));
    res.json({ 
      status: parseInt(results[4].logs[0].data.substring(2), 16)
     });
  } catch (error) {
    console.log(error)
    res.json({ 
      error
     });
  }
}

module.exports = {txns};