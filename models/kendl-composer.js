/*
============================================
; Title: Composer API
; File Name: kendl-composer.js
; Author: Professor Krasso
; Date: 9 April 2022
; Modified By: Laura Kendl
; Description: Demonstrates how to build an API.
; Resources:
===========================================
*/

// Require JavaScript libraries.
const mongoose = require("mongoose");

// Add Schema variable to mongoose.Schema object.
const Schema = mongoose.Schema;

// Create composerSchema.
let composerSchema = new Schema ({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
});

// Export "Composer" model.
module.exports = mongoose.model("Composer", composerSchema);