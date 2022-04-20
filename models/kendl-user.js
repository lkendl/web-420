/*
============================================
; Title: NodeSecurity
; File Name: kendl-user.js
; Author: Professor Krasso
; Date: 18 April 2022
; Modified By: Laura Kendl
; Description: Demonstrates how to build an API.
===========================================
*/

// Require JavaScript libraries.
const mongoose = require("mongoose");

// Add Schema variable to mongoose.Schema object.
const Schema = mongoose.Schema;

// Create userSchema.
let userSchema = new Schema ({
    userName: { type: String, required: true },
    Password: { type: String, required: true },
    emailAddress: { type: Array, required: true }
});

// Export "Composer" model.
module.exports = mongoose.model("User", userSchema);