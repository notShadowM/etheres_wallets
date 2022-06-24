const router = require("express").Router();
const ABI = require("../controllers/ABIController");
const Auth = require("../controllers/AuthController");
const passport = require("../utils/passport");
const transactions = require("../controllers/txnHistory");

const Web3 = require('web3');
const res = require("express/lib/response");

let web3 = new Web3(new Web3.providers.HttpProvider(`https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`));


// router.post('/signup', Auth.signUp);
router.post('/login',Auth.login);

router.use( passport.authenticate('jwt', { session: false }));

router.post('/txns',transactions.txns);

router.post('/exchange',ABI.exchangeCrypto);

router.post("/transfer", ABI.transaction);

router.get("/balance",ABI.balance);

router.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json(err);
});

module.exports = router;