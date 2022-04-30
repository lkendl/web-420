/*
============================================
; Title: NodeShopper
; File Name: kendl-customer.js
; Author: Professor Krasso
; Date: 27 April 2022
; Modified By: Laura Kendl
; Description: Demonstrates how to build an API.
===========================================
*/

// Require JavaScript libraries.
const mongoose = require("mongoose");

// Add Schema variable to mongoose.Schema object.
const Schema = mongoose.Schema;

// Create lineItemSchema.
let lineItemSchema = new Schema ({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
});

// Create invoice schema.
let invoiceSchema = new Schema ({
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    dateCreated: { type: String, required: true },
    dateShipped: { type: String, required: true },
    lineItems:  [lineItemSchema]
});

// Create customerSchema.
let customerSchema = new Schema ({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true },
    invoices: [invoiceSchema]
});

// Export "Customer" model.
module.exports = mongoose.model("Customer", customerSchema);