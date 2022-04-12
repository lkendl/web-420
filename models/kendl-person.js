/*
============================================
; Title: Person's API
; File Name: kendl-person.js
; Author: Professor Krasso
; Date: 11 April 2022
; Modified By: Laura Kendl
; Description: Demonstrates how to build an API.
; Resources:
===========================================
*/

// Require JavaScript libraries.
const mongoose = require("mongoose");

// Add Schema variable to mongoose.Schema object.
const Schema = mongoose.Schema;

// Create roleSchema.
let roleSchema = new Schema ({
    text: { type: String, required: true }
});

// Create dependentSchema.
let dependentSchema = new Schema ({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
});

// Create personSchema.
let personSchema = new Schema ({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    roles: [roleSchema],
    dependents: [dependentSchema],
    birthDate: { type: String, required: true }
});

// Export "Person" model.
module.exports = mongoose.model("Person", personSchema);