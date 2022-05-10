/*
============================================
; Title: Team API
; File Name: kendl-player.js
; Author: Professor Krasso
; Date: 9 May 2022
; Modified By: Laura Kendl
; Description: Capstone API project for BUWEBDEV.
; Resources:
===========================================
*/

// Require JavaScript libraries.
const mongoose = require("mongoose");

// Add Schema variable to mongoose.Schema object.
const Schema = mongoose.Schema;

// Create playerSchema.
let playerSchema = new Schema ({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    Salary: { type: Number, required: true }
});

// Create teamSchema.
let teamSchema = new Schema ({
    name: { type: String, required: true },
    mascot: { type: String, required: true },
    players: [playerSchema]
});

// Export "Team" model.
// module.exports = mongoose.model("Player", playerSchema); 
module.exports = mongoose.model("Team", teamSchema); 
