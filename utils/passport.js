const passport = require('passport')
const { Strategy: JwtStrategy ,ExtractJwt} = require('passport-jwt')
const Web3 = require('web3');

let web3 = new Web3(new Web3.providers.HttpProvider(`https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`));


const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(opts, (jwtToken, done) => {
    const { address } = jwtToken;
    if(web3.utils.isAddress(address)){
      done(null,address);
    }else{
      done(new Error("invalid address"),false);
    }
  }),
);



module.exports = passport;