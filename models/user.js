const mongoose = require('mongoose')
const brcypt = require('bcrypt')

const userSchema = mongoose.Schema({
    username: {type: String, unique: true},
    fullname: {type: String, default: '', unique: true},
    email: {type: String, unique: true},
    password: {type: String, default: ''},
    userImage: {type: String, default: 'default.png'},
    facebook: {type: String, default: ''},
    fbToekns: Array,
    google: {type: String, default: ''},
    googleTokens: Array
})

userSchema.methods.encryptPassword = function(password){
    return brcypt.hashSync(password, brcypt.genSaltSync(10));
}
 
userSchema.methods.comparePassword = function(password){
    return brcypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', userSchema)