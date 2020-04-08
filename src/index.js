const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()

const port = process.env.PORT || 3000
// const multer = require('multer')

// const upload = multer({
//     dest:'images',
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb){
//         if(!file.originalname.match(/\.(doc|docx)$/)){
//             return cb(new Error('Only Word are allowed to upload.'))
//         }
//         cb (undefined,true)
//         // cb(new error('File must be PDF'))
//         // cb (undefined,true)
//         // cb(undefined,false)
//     }
// })
// app.post('/upload',upload.single('upload'),(req,res)=>{
//     res.send('uploaded successfully')
// })
//middleware eg.
// app.use((req, res, next) => {
//     console.log(req.method, req.path)
//     next()
// })

app.use(express.json())

app.use(userRouter)
app.use(taskRouter)


app.listen(port,()=>{
    console.log('Server is up on port '+ port)
})

const Task = require('../src/models/task')
const User = require('../src/models/user')
const myFunction = async () =>{
    // const task = await Task.findById('5e89f4b28d66ca4fc3963fca')
    // await task.populate('owner').execPopulate()
    // console.log(task)

    // const user = await User.findById('5e89f49f8d66ca4fc3963fc8')
    // await user.populate('tasks').execPopulate()
    // console.log(user.tasks)
}

myFunction()

