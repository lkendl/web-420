/*
============================================
; Title: Assignment 1.2
; File Name: app.js
; Author: Professor Krasso
; Date: 15 March 2022
; Modified By: Laura Kendl
; Description: Basic setup for WEB-420 projects.
===========================================
*/

// Require JavaScript libraries.
const express = require("express");
const http = require("http");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const mongoose = require("mongoose");
const composerAPI = require("./routes/kendl-composer-routes");
const personAPI = require("./routes/kendl-person-routes");
const userAPI = require("./routes/kendl-session-routes");
const customerAPI = require("./routes/kendl-node-shopper-routes");
const teamAPI = require("./routes/kendl-team-routes");


// Create Express application.
let app = express();

/* 
  ----- MIDDLEWARE -----
*/
// App 'use' express.json().
app.use(express.json());

// App 'use' express.urlencoded({'extended':true});.
app.use(express.urlencoded({'extended':true}));

/**
  ----- MONGODB ATLAS CONNECTION -----
*/
const mongoDB = 'mongodb+srv://lkendl:admin@buwebdev-cluster-1.p8egd.mongodb.net/web420DB?retryWrites=true&w=majority';

mongoose.connect(mongoDB);

// Add a Promise.
mongoose.Promise = global.Promise;

// Create database variable to hold connections.
var db = mongoose.connection;

// Add general error handling. Output results to console.
db.on("error", console.error.bind(console, "MongoDB connection error"));
db.once("open", function() {
    console.log("Application connected to MongoDB instance");
});
/* 
  ----- OBJECT LITERALS -----
*/
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'WEB 420 RESTful APIs',
            version: '1.0.0',
        },
    },
    apis: ['./routes/*.js'], // Files containing annotations for the OpenAPI Specification
};

// Call swaggerJSdoc library using options object literal.
const openapiSpecification = swaggerJsdoc(options);

/* 
  ----- STATIC ROUTES -----
*/
// Wire openapiSpecification variable to app variable.
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use('/api', composerAPI);
app.use('/api', personAPI);
app.use('/api', userAPI);
app.use('/api', customerAPI);
app.use('/api', teamAPI);

// Create and start the Node server.
// app.set("port", process.env.PORT || 3000);
// http.createServer(app).listen(app.get("port"), function() {
//     console.log("Application started and listening on port " + app.get("port"))
// });

http.createServer(app).listen(app.get("port"), function() {console.log("Application started on port " + app.get("port"))});
