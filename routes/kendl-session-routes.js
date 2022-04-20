/*
============================================
; Title: NodeSecurity
; File Name: kendl-session-routes.js
; Author: Professor Krasso
; Date: 18 April 2022
; Modified By: Laura Kendl
; Description: Demonstrates how to build an API.
; Resources:
===========================================
*/

// Require statements.
const express = require("express");
const router = express.Router();
const User = require("../models/kendl-user");
const bcrypt = require("bcryptjs");

// Create variable with integer value of 10.
const saltRounds = 10;

// Operation Signup OpenAPI specification:
/**
 * signup
 * @openapi
 * /api/signup:
 *   post:
 *     tags:
 *       - Users
 *     name: signup
 *     description: API for registering a user.
 *     summary: Registers user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              description: User registration fields
 *              required:
 *                - userName
 *                - Password
 *                - emailAddress
 *              properties:
 *                userName:
 *                  description: User's username
 *                  type: string
 *                Password:
 *                  description: User's password
 *                  type: string
 *                emailAddress:
 *                  description: User's email address(es)
 *                  type: string
 *     responses:
 *       '200':
 *         description: Registered user
 *       '401':
 *         description: Username is already in use
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

// Signup try...catch block.
 router.post("/signup", async(req, res) => {
	try {
		const hashedPassword = bcrypt.hashSync(req.body.Password, saltRounds);
        // Create object literal newRegisteredUser and map fields from RequestBody to its properties.
		const newRegisteredUser = {
			userName: req.body.userName,
			Password: hashedPassword,
			emailAddress: req.body.emailAddress
		};
		// Query users collection using findOne() and the username from RequestBody.
		User.findOne({"userName": req.body.userName}, function(err, user){
			if (err) {
				res.status(501).send("MongoDB Exception")
			} else {
				if (!user) {
					User.create(newRegisteredUser, function (err, user) { // Saves record to MongoDB.
						if (err) {
							res.status(501).send("MongoDB Exception")
						} else {
							res.status(200).send("Registered User")
							res.json(user);
						}
					})	
				} else {
					if (user) {
						res.status(401).send("Username is already in use")
					}
				}
			}
		});
	} catch (e) {
		console.log(e);
		res.status(500).send("Server Exception")
	}
})

// Operation Login OpenAPI specification:
/**
 * login
 * @openapi
 * /api/login:
 *   post:
 *     tags:
 *       - Users
 *     name: login
 *     description: API for user login.
 *     summary: User login.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              description: User login fields
 *              required:
 *                - userName
 *                - Password
 *              properties:
 *                userName:
 *                  description: User's username
 *                  type: string
 *                Password:
 *                  description: User's password
 *                  type: string
 *     responses:
 *       '200':
 *         description: User logged in
 *       '401':
 *         description: Invalid username and/or password
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

// login try...catch block.
router.post("/login", async(req, res) => {
    try {
        // Query users collection with findOne() function and username from RequestBody.
        User.findOne({ "userName": req.body.userName }, function(user, err) {
            if (user) {
                let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
                    
                    if (passwordIsValid) {
                        if (valid) {
                            res.status(200).send("User logged in")
                        } else { 
                            res.status(401).send("Invalid username and/or password")
                        }
                    }
            } else {
                if (err) {
                    res.status(501).send("MongoDB Exception")
                } else {
                    if (!user) {
                        res.status(401).send("Invalid username and/or password")
                    }
                }
            }
        });
    } catch (e) {
        res.status(500).send("Server Exception")
    }
})

module.exports = router;