const express = require("express");
const app = require("./index");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });

//importing the important data from the config.env
const port = process.env.PORT || 3000;
const databaseUsername = process.env.DATABASE_USERNAME;
const databasePassword = process.env.DATABASE_PASSWORD;
const databaseName = process.env.DATABASE_NAME
//connecting to the mongoDb database

mongoose.connect(
  `mongodb+srv://${databaseUsername}:${databasePassword}@cluster0.s4amd.mongodb.net/${databaseName}?retryWrites=true&w=majority&appName=Cluster0`
).then(()=>{
    console.log('Database has been connected Successfully.')
})

//starting the server
 const server = app.listen(port, (request, response) => {
  console.log("Server has started");
});



//handing the uncaughtException in code 
process.on('uncaughtException',(err)=>{
    console.log('The app is closing due to the uncaughtException')
    server.close(()=>{
        console.log('The app is shuttingDown.')
        process.exit(1)
    })
})


//handling the rejectedPromises 
process.on('unhandledRejection',(err)=>{
    console.log('The app is closing due to the unhandledRejection.')
    server.close(()=>{
        console.log('The app is shutting Down')
        process.exit(1)
    })
})



