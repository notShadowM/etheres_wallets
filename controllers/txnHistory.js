const axios = require('axios');

const txns = async (req,res) =>{
  const {type} = req.body;
  const {user : address} = req;
  
  // console.log(address);
  const nis = process.env.NIS_CONTRACT_ADDRESS;
  const jd = process.env.JD_CONTRACT_ADDRESS;
  const usd = process.env.USD_CONTRACT_ADDRESS;

  try{
    let data = null;
    if(type === "NIS"){
      data = await axios.get(`https://api-ropsten.etherscan.io/api?module=account&action=tokentx&contractaddress=${nis}&address=${address}&page=1&offset=100&startblock=0&endblock=99999999&sort=desc&apikey=${process.env.HISTORY_API_KEY}`)
              .then(e => e.data);
    }else if(type === "USD"){
      data = await axios.get(`https://api-ropsten.etherscan.io/api?module=account&action=tokentx&contractaddress=${usd}&address=${address}&page=1&offset=100&startblock=0&endblock=99999999&sort=desc&apikey=${process.env.HISTORY_API_KEY}`)
              .then(e => e.data);
    }else if(type === "JD"){
      data = await axios.get(`https://api-ropsten.etherscan.io/api?module=account&action=tokentx&contractaddress=${jd}&address=${address}&page=1&offset=100&startblock=0&endblock=99999999&sort=desc&apikey=${process.env.HISTORY_API_KEY}`)
              .then(e => e.data);
    }else if(type === "ALL"){
      data = await Promise.all(
        [
          axios.get(`https://api-ropsten.etherscan.io/api?module=account&action=tokentx&contractaddress=${nis}&address=${address}&page=1&offset=100&startblock=0&endblock=99999999&sort=desc&apikey=${process.env.HISTORY_API_KEY}`)
            .then(e => e.data),
          axios.get(`https://api-ropsten.etherscan.io/api?module=account&action=tokentx&contractaddress=${usd}&address=${address}&page=1&offset=100&startblock=0&endblock=99999999&sort=desc&apikey=${process.env.HISTORY_API_KEY}`)
            .then(e => e.data),
          axios.get(`https://api-ropsten.etherscan.io/api?module=account&action=tokentx&contractaddress=${jd}&address=${address}&page=1&offset=100&startblock=0&endblock=99999999&sort=desc&apikey=${process.env.HISTORY_API_KEY}`)
            .then(e => e.data)
        ]
      )
    }

    // data = await axios.get(`https://api-ropsten.etherscan.io/api?module=account&action=tokentx&contractaddress=0x5767A3dCE2CBB689B4B8ddA2b917D57b75b14e5c&address=0x3e97e2B3499aC801cEa29557af9a08082Ccf2080&page=1&offset=100&startblock=0&endblock=99999999&sort=desc&apikey=TVCHR8SPQB8KF5N2QEVXMWHNDXDC2QQ4HC`)
    //         .then(e => e.data);

    res.json({
      status:data
    })
  }catch(e){
    console.log(e)
    res.json({
      e
    })
  }
}

module.exports = {txns};