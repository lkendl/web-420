/*
============================================
; Title: Composer API
; File Name: kendl-composer-routes.js
; Author: Professor Krasso
; Date: 9 April 2022
; Modified By: Laura Kendl
; Description: Demonstrates how to build an API.
; Resources:
; [Ref A] Bellevue University: Code provided by Professor Krasso - Assignment 4 document.
; [Ref B] Mozilla: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch (try...catch)
; [Ref C] W3schools: https://www.w3schools.com/nodejs/nodejs_mongodb_find.asp (Node.js MongoDB Find)
===========================================
*/

// Require JavaScript libraries.
const express = require("express");
const router = express.Router(); // [Ref A]
const Composer = require("../models/kendl-composer.js");

// Operation findAllComposers OpenAPI specification:
/**
 * findAllComposers
 * @openapi
 * /api/composers:
 *   get:
 *     tags:
 *       - Composers
 *     description: API for returning an array of composer objects.
 *     summary: returns an array of composers in JSON format.
 *     responses:
 *       '200':
 *         description: Array of composers.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */

// findAllComposers try...catch block [Ref B].
router.get("/composers", (req, res) => {
    try {
        Composer.find({}, function (err, composers) { // Queries composers collection from Composer model.
            if (err) {
                res.status(501).send({
                    "message": `MongoDB Exception ${err}`
                  })
            } else {
                res.json(composers); // Returns composer documents.
            }
        })
    } catch (e) {
        res.status(500).send({
            "message": `Server Exception: ${e}`
          })
    }
})

// Operation createComposer OpenAPI specification:
/**
 * createComposer
 * @openapi
 * /api/composers:
 *   post:
 *     tags:
 *       - Composers
 *     name: createComposer
 *     description: API for adding a new composer document to MongoDB Atlas
 *     summary: Creates a new composer document
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              description: Composer's information
 *              required:
 *                - firstName
 *                - lastName
 *              properties:
 *                firstName:
 *                  description: Composer's first name
 *                  type: string
 *                lastName:
 *                  description: Composer's first name
 *                  type: string
 *     responses:
 *       '200':
 *         description: Composer added
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

// createComposer try...catch block [Ref B].
router.post("/composers", async(req, res) => {
    try {
        // Create object literal Composer and map fields from RequestBody to its properties.
        let composer = new Composer ({
            firstName: req.body.firstName,
            lastName: req.body.lastName
        });
        // Call create() function on Composer model.
        Composer.create(composer, function (err, addComposer) {
            if (err) {
                res.status(501).send({
                    "message": `MongoDB Exception ${err}`
                  })
            } else {
                res.json(addComposer);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            "message": `Server Exception: ${e}`
          })
    }
})

// Operation findComposerById OpenAPI specification:
/**
 * findComposerById
 * @openapi
 * /api/composers/{id}:
 *   get:
 *     tags:
 *       - Composers
 *     description:  API for returning a composer document
 *     summary: returns a composer document
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The composerId requested by the user.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Composer document
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB Exception
 */

// findComposerById try...catch block [Ref B].
router.get("/composers/:id", async(req, res) => {
    try {
        // Query composers collection with findOne() function and RequestParams id on Composer model.
        Composer.findOne({ _id: req.params.id }, function(err, composer) { // [Ref C]
            if (err) {
                res.status(501).send({
                    "message": `MongoDB Exception ${err}`
                  })
            } else {
                res.json(composer);
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
 * updateComposerById
 * @openapi
 * /api/composers/{id}:
 *   put:
 *     tags:
 *       - Composers
 *     name: updateComposerById
 *     description: API to update an existing composer by ID.
 *     summary: Updates a composer by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The composer's ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              description: Composer's information
 *              required:
 *                - firstName
 *                - lastName
 *              properties:
 *                firstName:
 *                  description: Composer's first name
 *                  type: string
 *                lastName:
 *                  description: Composer's first name
 *                  type: string
 *     responses:
 *       '200':
 *         description: Array of composer documents
 *       '401':
 *         description: Invalid composerId
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

// updateComposerById try...catch block.
router.put("/composers/:id", async(req, res) => {
    try {
        Composer.findOne({ "_id": req.params.id }, function(err, composer) {
            if (composer) {
                // Update returned composer object using set() function and mapping RequestBody fields to returned objects parameter.
                composer.set({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName
                })
                // Call the save() function on returned composer object and return the savedComposer object.
                composer.save(function(err, savedComposer) {
                    if (err) {
                        console.log(err);
                        res.json(savedComposer);
                    } else {
                        console.log(savedComposer);
                        res.json(savedComposer);
                    }
                })
            } else if (!composer) {
                res.status(401).send({
                    "message": `Invalid composerId ${err}`
                    });
            } else {
                console.log(err);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            "message": `Server Exception: ${e}`
        })
    }
})

/**
 * deleteComposerById
 * @openapi
 * /api/composers/{id}:
 *   delete:
 *     tags:
 *       - Composers
 *     name: deleteComposerById
 *     description: API to delete an existing composer by ID.
 *     summary: Delete a composer by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The composer's ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Composer document
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

// deleteComposerById try...catch block.
router.delete("/composers/:id", async(req, res) => {
    try {
        Composer.findByIdAndDelete({ "_id": req.params.id }, function(err, composer) {
            if (composer) {
                // Returned deleted composer document.
                res.json(composer);

            } else {
                console.log(err);
                res.status(501).send({
                    "message": `MongoDB Exception ${err}`
                })
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            "message": `Server Exception: ${e}`
        })
    }
});

module.exports = router;