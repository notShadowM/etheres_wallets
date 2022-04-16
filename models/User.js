const { Schema, model } = require('mongoose');

// Schema determines how the model looks like
const userSchema = new Schema({
	address: {type:'string',required:true,unique:true},
	userName: {type:'string',required:true,unique:true},
  password:{type:'string',required:true},
	token: 'string',
});

// creating a model so we can query it.
const User = model('User', userSchema);

module.exports = User;