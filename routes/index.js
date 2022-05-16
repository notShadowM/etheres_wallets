const router = require("express").Router();
const ABI = require("../controllers/ABIController");
const Auth = require("../controllers/AuthController");
const User = require("../models/User");
const passport = require("../utils/passport");
const transactions = require("../tempEthers");


router.post('/signup', Auth.signUp);
router.post('/login',Auth.login);
router.get('/txns',transactions.txns);

router.use(passport.authenticate('bearer', { session: false }));

// router.post("/transaction",ABI.transaction);

router.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json(err);
});

module.exports = router;