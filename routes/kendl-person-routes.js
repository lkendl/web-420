/*
============================================
; Title: Person's API
; File Name: kendl-person-routes.js
; Author: Professor Krasso
; Date: 11 April 2022
; Modified By: Laura Kendl
; Description: Demonstrates how to build an API.
; Resources:
===========================================
*/

// Require JavaScript libraries.
const express = require("express");
const router = express.Router(); // [Ref A]
const Person = require("../models/kendl-person");

// Operation findAllPersons OpenAPI specification:
/**
 * findAllPersons
 * @swagger
 * /api/persons:
 *   get:
 *     tags:
 *       - Persons
 *     description: API for returning an array of person objects.
 *     summary: returns an array of persons in JSON format.
 *     responses:
 *       '200':
 *         description: Array of person documents
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

// findAllPersons try...catch block.
router.get("/persons", (req, res) => {
    try {
        Person.find({}, function (err, persons) { // Queries people collection from Person model.
            if (err) {
                res.status(501).send(`MongoDB Exception: ${err}`)
            } else {
                res.json(persons); // Returns persons documents.
            }
        })
    } catch (e) {
        res.status(500).send("Server Exception")
    }
})

// Operation createPerson OpenAPI specification:
/**
 * createPerson
 * @swagger
 * /api/persons:
 *   post:
 *     tags:
 *       - Persons
 *     name: createPerson
 *     description: API for adding a new person document to MongoDB Atlas
 *     summary: Creates a new person document
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              description: Person's information
 *              required:
 *                - firstName
 *                - lastName
 *                - roles
 *                - dependents
 *                - birthDate
 *              properties:
 *                firstName:
 *                  description: Person's first name
 *                  type: string
 *                lastName:
 *                  description: Person's last name
 *                  type: string
 *                roles:
 *                  description: Person's roles
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      text:
 *                        type: string
 *                dependents:
 *                  description: Person's dependents
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      firstName:
 *                        description: Dependent's first name
 *                        type: string
 *                      lastName:
 *                        description: Dependent's last name
 *                        type: string
 *                birthDate:
 *                  description: Person's birthdate
 *                  type: string
 *     responses:
 *       '200':
 *         description: Array of person documents
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

// createPerson try...catch block.
router.post("/persons", async(req, res) => {
    try {
        // Create object literal newPerson and map fields from RequestBody to its properties.
        let newPerson = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            roles: req.body.roles,
            dependents: req.body.dependents,
            birthDate: req.body.birthDate
        };
        // Call create() function on Person model.
        Person.create(newPerson, function (err, person) {
            if (err) {
                res.status(501).send("MongoDB Exception")
            } else {
                res.json(person);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send("Server Exception")
    }
})

module.exports = router;