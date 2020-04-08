const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Task = require('../models/task')
const userSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required : true
    },
    email :{
        type: String,
        trim:true,
        unique:true,
        lowercase:true,
        required : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid email.')
            }
        }
    },
    age : {
        type: Number,
        default:1,
        validate(value){
            if(value<=0){
                 throw new Error('Age must be greater than 0.')
            }
        }
    },
    password:{
        type: String,
        required : true,
        trim: true,
        minlength : 7,
        validate(value){
           if(value.toLowerCase().includes('password')) {
                throw new Error('Password must not contain this word')
            }

        }
    },
    tokens : [{
        token: {
            type: String,
            required: true
        }
    }]
},{
    timestamps:true
})
//Create virtual function to create relationship between user and task
userSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
})
//Custom method on user variable instance
userSchema.methods.toJSON = function(){
    const user = this  
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject     
}

//Custom method on user variable instance
userSchema.methods.genrateAuthToken = async function(){
    const user = this  
    const token = jwt.sign({_id: user._id.toString()}, 'thisismynodeproject') 
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token     
}

//Custom method to validate user credentials
userSchema.statics.findByCredentials =  async (email, password) =>{
    const user = await User.findOne({email})
    if(!user){
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error('Unable to login')
    }
    return user
}

// Hash password before saving it to database
userSchema.pre('save', async function (next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
})
//Deletes user task when user get removed
userSchema.pre('remove', async function (next){
    const user = this
    await Task.deleteMany({owner : user._id})
    next()
})
const User = mongoose.model('User',userSchema)

module.exports = User