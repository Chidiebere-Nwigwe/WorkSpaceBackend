// 
const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
       // required: [true, 'Please enter your name'],
       required: true
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,  // to make no one uses same email twice
        lowercase: true, // make sure its lowercase before being saved 
        validate: [isEmail, 'Please Enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters']
    },
    role: {
        type: String,
       // required: [true, 'Please enter your role'],
       required: true
    }
});

// fire a function after doc is saved to db... post
userSchema.post('save', function(doc, next){
    console.log('new user was created && saved', doc)
    next();
})

// fire a function before doc is saved to db... pre  ( to hash passwprd using this function)
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(); // to generate salt to add before password
    this.password = await bcrypt.hash(this.password, salt);
    next();
})


// static method to login user
userSchema.statics.login =async function(email, password){
    const user = await this.findOne({ email });
    if(user){
       const auth = await bcrypt.compare(password, user.password)
       if(auth){
        return user;
       }
       throw Error('incorrect password');
    }
    throw Error('incorrect email');
}

const User = mongoose.model('user', userSchema);

module.exports = User;