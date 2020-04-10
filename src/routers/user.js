const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const { sendWelcomeMail } = require('../emails/account')
router.post('/users', async (req, res) =>{
    const user = new User(req.body)
    try {  
       const token = await user.genrateAuthToken()
       sendWelcomeMail(user.email,user.name) 
       res.status(201).send({user,token})
    }catch(e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async(req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.genrateAuthToken()
        res.send({user,token})
    }catch(e) {
        res.status(400).send(e)
    }
})

router.post('/users/logout',auth, async(req, res) => {
    try{
       req.user.tokens = req.user.tokens.filter((tokenObject)=>{
           return tokenObject.token != req.token
       })
       await req.user.save()
       res.send()
    }catch(e) {
        res.status(500).send(e)
    }
})
router.post('/users/logoutall',auth, async(req, res) => {
    try{
       req.user.tokens = []
       await req.user.save()
       res.send()
    }catch(e) {
        res.status(500).send(e)
    }
})
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

// router.get('/users/:id', async (req, res)=>{
//     try{
//         const _id = req.params.id
//         const user = await User.findById({_id})
//         if(!user){
//             return res.status(404).send()
//         }
//         res.send(user)
//     }catch(e){
//         res.status(500).send(e)   
//     }
// })    

router.patch('/users/me',auth, async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','age','password']
    const isValidUpdate = updates.every((update)=>  allowedUpdates.includes(update))
    if(!isValidUpdate){
        return res.status(400).send('error : Invalid update!')
    }
    try{
        //const user = await User.findById(req.params.id)
        const user = req.user
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()
        //const user  = await User.findByIdAndUpdate(req.params.id, req.body,{new:true,runValidators:true})
        if(!user) {
            return res.status(404).send()
        }
        res.send(user)
    }catch(e){
        res.status(500).send(e)
    }
})

router.delete('/users/me',auth, async(req, res)=>{
    try{
        // const user = await User.findByIdAndDelete(req.user._id)
        // if(!user){
        //     return res.status(400).send('User not found')
        // }
        await req.user.remove()
        res.send({message:'user removed succcessfully'})
    }catch(e){
        res.status(500).send(e)
    }
})

const upload = multer({
    //dest:'avatar',
    limits: {
        fileSize:1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Only jpg, jpeg or png file can be uploaded.'))
        }
        cb(undefined,true)
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'),async (req,res)=>{
    const buffer = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send({code:200,message:'uploaded successfully'})
},(error, req, res, next)=>{
    res.status(400).send({error: error.message})
})

router.delete('/users/me/avatar',auth, async (req, res) => {
    req.user.avatar = undefined
    req.user.save()
    res.send({code:200,message:'deleted successfully'})
})
router.get('/users/:id/avatar',async (req, res) => {
    try{
        const user = await User.findById(req.params.id)

        if(!user | !user.avatar){
            return new Error('Image not found')
        }
        res.set('Content-Type','image/png')
        res.send(user.avatar)
    }catch(e){
        res.status(400).send(e)
    }
    


})
module.exports = router
