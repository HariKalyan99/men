require('dotenv').config();
const http = require('http');
const mongoose = require('mongoose');
const DB_URI = "mongodb://localhost:27017/feeds"
const express = require('express');
const port1 = 8081;
const port2 = 8082;
const port3 = 8083;
const port4 = 8084;
const serverInfo = {
    server: "This is a node-http server",
    time: new Date().toTimeString(),
    date: new Date().toDateString()
}
const currencyInfo = require('./currencies.json');
const usersInfo = require('./users.json');
const currenciesRoutes = require('./routes/currenies.routes');
const userRoutes = require('./routes/users.routes');
const feedRoutes = require('./routes/feeds.routes');
const { error } = require('console');
const authRoutes = require('./routes/authuser.routes');

const server = http.createServer((request, response) => {
    if(request.method === "GET"){
        const id = request.url.split("/")[2];
        const matchId = currencyInfo.data.find(x => x.id?.toLowerCase() === id?.toLowerCase());
        if(request.url === "/"){
            response.write("<h1>This is a node-http server</h1>");
            response.end();
        }else if(request.url === "/server"){
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.write(JSON.stringify(serverInfo));
            response.end();
        }else if(request.url === "/currencies"){
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.write(JSON.stringify(currencyInfo.data));
            response.end();
        }else if(request.url === "/users"){
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.write(JSON.stringify(usersInfo.data));
            response.end();
        }else if(matchId){
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.write(JSON.stringify(matchId));
            response.end();
        }
    }else if(request.method === "POST"){
        let body = "";
        request.on("error", (error) => {
            console.log('Error', error);
        }).on("data", (chunk) => {
            body+=chunk;
        }).on("end", () => {
            body = JSON.parse(body);
            currencyInfo.data = [body, ...currencyInfo.data];
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.write(JSON.stringify(currencyInfo.data));
            response.end();
        })
    }
})



const userExpress = express();
userExpress.use(express.json())
userExpress.use("/", userRoutes);


const currencyExpress = express();
currencyExpress.use(express.json())
currencyExpress.use("/",currenciesRoutes)




const app = express();
app.use(express.json());
app.use("/", feedRoutes);
app.use("/auth", authRoutes)


mongoose.connect(DB_URI).then(() => {
    console.log("Successfully connected to the mongo Db");
    
    server.listen(port1, () => {
        console.log(`Listening to the port: ${port1}`);
    })
    
    userExpress.listen(port2, () => {
        console.log(`Listening to the port: ${port2}`)
    })

    currencyExpress.listen(port3, () => {
        console.log(`Listening to the port: ${port3}`)
    })

    app.listen(port4, () => {
        console.log(`Listening to the port: ${port4}`)
    });
}).catch(error => {
    console.log("Unsuccessfull connection to the database", error)
})

