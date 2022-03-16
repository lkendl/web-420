/*
============================================
; Title: Assignment 1.2
; File Name: app.js
; Author: Professor Krasso
; Date: 15 March 2022
; Modified By: Laura Kendl
; Description: Basic setup for WEB-420 projects.
; Resources:
===========================================
*/

// Require JavaScript libraries.
const express = require("express");
const http = require("http");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const mongoose = require("mongoose");

// Create Express application.
let app = express();

/* 
  ----- MIDDLEWARE -----
*/
// App 'use' express.json().
app.use(express.json());

// App 'use' express.urlencoded({'extended':true});.
app.use(express.urlencoded({'extended':true}));

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


// Create and start the Node server.
app.set("port", process.env.PORT || 3000);
http.createServer(app).listen(app.get("port"), function() {
    console.log("Application started and listening on port " + app.get("port"))
});