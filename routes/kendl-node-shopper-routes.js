/*
============================================
; Title: Assignment 7.2 - NodeShopper API
; File Name: kendl-node-shopper-routes.js
; Author: Professor Krasso
; Date: 30 April 2022
; Modified By: Laura Kendl
; Description: Demonstrates how to build an API.
; Resources:
; [Ref A] Stackoverflow: https://stackoverflow.com/questions/49839121/how-to-reference-array-item-examples-in-openapi-3 (How to reference array item examples in OpenAPI 3?)
; [Ref B] W3schools: https://www.w3schools.com/jsref/jsref_push.asp (JavaScript Array push())
; [Ref C] Jenniferbland: https://www.jenniferbland.com/saving-data-to-mongodb-database-from-node-js-application-tutorial/ () 
; [Ref D] Swagger: https://swagger.io/docs/specification/data-models/data-types/ (Data Types)
===========================================
*/

// Require statements.
const express = require("express");
const router = express.Router();
const Customer = require("../models/kendl-customer");

/**
 * createCustomer
 * @openapi
 * /api/customers:
 *   post:
 *     tags:
 *       - Customers
 *     name: createCustomer
 *     description: API for creating a customer.
 *     summary: Creates customer.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              description: Customer information
 *              required:
 *                - firstName
 *                - lastName
 *                - userName
 *              properties:
 *                firstName:
 *                  description: Customer's first name
 *                  type: string
 *                lastName:
 *                  description: Customer's last name
 *                  type: string
 *                userName:
 *                  description: Customer's username
 *                  type: string
 *     responses:
 *       '200':
 *         description: Customer added to MongoDB
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

// createCustomer try...catch block.
 router.post("/customers", async(req, res) => {
	try {
        // Create object literal newCustomer and map fields from RequestBody to its properties.
		let newCustomer = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			userName: req.body.userName
		};
		// Call Customer.create() and use the newCustomer object literal as the argument.
		Customer.create(newCustomer, function (err, customer) {
			if (err) {
				res.status(501).send({
					"message": `MongoDB Exception ${err}`
			})
			} else {
				res.json(customer);
			}
		});

	} catch (e) {
		res.status(500).send({
			"message": `Server Exception: ${e}`
		})
	}
})

/**
 * createInvoiceByUserName
 * @openapi
 * /api/customers/{userName}/invoices:
 *   post:
 *     tags:
 *       - Customers
 *     name: createInvoiceByUserName
 *     description: API to create invoice by customer username.
 *     summary: Create invoice by username
 *     parameters:
 *       - name: userName
 *         in: path
 *         required: true
 *         description: The customer's username
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - subtotal
 *               - tax
 *               - dateCreated
 *               - dateShipped
 *               - lineItems
 *             properties:
 *              subtotal:
 *                description: Invoice subtotal
 *                type: number
 *              tax:
 *                description: Invoice tax amount
 *                type: number
 *              dateCreated:
 *                description: Date invoice was created
 *                type: string
 *              dateShipped:
 *                description: Date items shipped
 *                type: string
 *              lineItems:
 *                description: Array of lineItem objects
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    name:
 *                      description: lineItem name
 *                      type: string
 *                    price:
 *                      description: lineItem PPU
 *                      type: number
 *                    quantity:
 *                      description: lineItem quantity
 *                      type: number
 *     responses:
 *       '200':
 *         description: Customer added to MongoDB
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

// createInvoiceByUserName try...catch block.
 router.post("/customers/:userName/invoices", async(req, res) => {
	try {
		Customer.findOne({ "userName": req.params.userName }, function(err, customer) {
			if (err) {
			  console.log(err);
			  res.status(501).send({
				"message": `MongoDB Exception ${err}`
			  })
			} else {
			  console.log(customer);
			  res.status(200).send({
				"message": "Invoice created by customer username"
			  })
  
			  const newInvoice = {
				userName: req.params.userName,
				subtotal: req.body.subtotal,
				tax: req.body.tax,
				dateCreated: req.body.dateCreated,
				dateShipped: req.body.dateShipped,
				lineItems: req.body.lineItems
			  }
  
			  customer.invoices.push(newInvoice);
			  customer.save();
			}
		});
	} catch (e) {
		console.log(e);
		res.status(500).send({
		  "message": `Server Exception: ${e}`
		})
	}
  });
  

/**
 * findAllInvoicesByUserName
 * @openapi
 * /api/customers/{userName}/invoices:
 *   get:
 *     tags:
 *       - Customers
 *     name: findAllInvoicesByUserName
 *     description: API to find all invoices by customer username.
 *     summary: Find all invoices by username
 *     parameters:
 *       - name: userName
 *         in: path
 *         required: true
 *         description: The customer's username
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Customer added to MongoDB
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

// findAllInvoicesByUserName try...catch block.
router.get("/customers/:userName/invoices", async(req, res) => {
	try {	
		// Query customers collection using the findOne() function and the username from RequestParams object.
		Customer.findOne({ "userName": req.params.userName }, function(err, customer){
			if (err) {
				res.status(501).send({
					"message": `MongoDB Exception ${err}`
				})
			} else {
					res.json(customer.invoices);
			}
		});
	} catch (e) {
		console.log(e);
		res.status(500).send({
			"message": `Server Exception: ${e}`
		})
	}
});		

module.exports = router;