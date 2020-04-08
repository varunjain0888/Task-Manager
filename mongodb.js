//CURD create read update delete operations

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
const {MongoClient, ObjectId} = require('mongodb')
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'
const id = new ObjectId() 
//Object id is the collection of 4 byte of timestamp 5 byte of random number 3 byte of incremneting counter
console.log(id)
console.log(id.id.length) //12
console.log(id.toHexString().length) //24
console.log(id.getTimestamp())
MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if(error){
        return console.log('Unable to connect to database!')
    }
    const db = client.db(databaseName)
    db.collection('users').deleteMany({
        age:27
    }).then((result)=>{
        console.log('records deleted ',result.deletedCount)
    }).catch((error)=>{
        console.log('error occured!')    
    })
    db.collection('tasks').deleteOne({
        description:"This task 3 desc"
    }).then((result)=>{
        console.log('records deleted ',result.deletedCount)
    }).catch((error)=>{
        console.log('error occured!')    
    })
    
    // db.collection('tasks').updateMany({
    //     completed: false
    // },
    // {
    //     $set:{
    //         completed:true
    //     }
    // }).then((result)=>{
    //     console.log('result updated ',result.modifiedCount)    
    // }).catch((error)=>{
    //     console.log('error occured ')
    // })
    // db.collection('users').updateOne({
    //     _id: new ObjectId("5e87567fc9118e40fef0013b")
    // },
    // {
    //     $inc:{
    //         age:1
    //     }
    //     // $set:{
    //     //     name:"Marteena"
    //     // }
    // }).then((result)=>{
    //     console.log('result updated ')    
    // }).catch((error)=>{
    //     console.log('error occured ')
    // })
    // db.collection('tasks').findOne({_id:new ObjectId("5e874e7228793440b942a4e1")},(error, task)=>{
    //     if(error){
    //          return console.log('Unable to find the record.')
    //     }
    //     console.log(task)
    // })
    // db.collection('tasks').find({completed:false}).toArray((error, tasks)=>{
    //     console.log(tasks)
    // })
        // db.collection('users').findOne({name:'Varun'},(error, user)=>{
        //     if(error){
        //         return console.log('Unable to find the record.')
        //     }
        //     console.log(user)
        // })
        // db.collection('users').findOne({_id:new ObjectId("5e87567fc9118e40fef0013b")},(error, user)=>{
        //     if(error){
        //         return console.log('Unable to find the record.')
        //     }
        //     console.log(user)
        // })
        // db.collection('users').find({age:27}).toArray((error, users)=>{
        //     console.log(users)
        // })
        // db.collection('users').find({age:27}).count((error, count)=>{
        //     console.log(count)
        // })

    // db.collection('users').insertOne({
    //     //_id: id, this is to insert out own object id.
    //     name: 'Ali',
    //     age: 25
    // }, (error, result) => {
    //     if(error){
    //         return console.log('Unable to insert the record.')
    //     }    
    //     console.log(result.ops)
    // })
//     db.collection('users').insertMany([{
//         name: 'Cris',
//         age:40  
//     },{
//         name: 'joy',
//         age:32 
//     }], (error, result) => {
//         if(error) {
//             return console.log('Unable to insert documents!')
//         }
//         console.log(result.ops)
//     })
        // db.collection('tasks').insertMany([{
        //     description : 'This task 1 desc',
        //     completed : true
        // },{
        //     description : 'This task 2 desc',
        //     completed : false
        // },{
        //     description : 'This task 3 desc',
        //     completed : true
        // }],(erroe, result) => {
        //     if(error){
        //         return console.log('Unable to insert documents!')
        //     }
        //     console.log(result.ops)
        // })
 })
