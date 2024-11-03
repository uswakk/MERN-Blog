const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const { MongoClient, ObjectId } = require("mongodb");
const database = require("./connect"); // Adjust if this file contains your MongoDB connection logic
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
require("dotenv").config({path: "./config.env"})


const SALT_ROUNDS = 6


let userRoutes = express.Router();

// GET all posts

userRoutes.route('/').get(async (request, response) => {
    console.log("Welcome Home")
    response.send("The home route is working!");
    
});

userRoutes.route('/users').get(async (request, response) => {
    console.log("I am working")
    let db = database.getDb();
    let data = await db.collection('users').find({}).toArray();

    if (data.length > 0) {
        response.json(data);
    } else {
        response.status(404).json({ error: "The collection in Database is empty" });
    }
});

// GET a user by ID
userRoutes.route('/users/:id').get(async (request, response) => {
    let db = database.getDb();
    let id = new ObjectId(request.params.id);
    let data = await db.collection('users').findOne({ _id: id });

    if (data) {
        console.log(data)
        response.json(data);
    } else {
        response.status(404).json({ error: "Post not found" });
    }
});


// POST to create a new user
userRoutes.route('/users').post(async (request, response) => {
    let db = database.getDb();
  
    const takenEmail = await db.collection('users').findOne({email: request.body.email})

    if (takenEmail)
    {
        return response.status(400).json({ message: "The email is taken" });
    }
    else
    {
        const hash = await bcrypt.hash(request.body.password, SALT_ROUNDS)
        // Ensure request body has required fields
        let mongoObject = {
            name: request.body.name,
            email: request.body.email,
            password: hash,
            joinDate: new Date(),
            posts: [],
        };
      
        try {
          let data = await db.collection('users').insertOne(mongoObject);
          response.status(200).json(data);
        } catch (error) {
          console.error('Error inserting data:', error);
          response.status(500).json({ message: 'Error creating post' });
        }
    }
   
  });
  

// PUT to update a user
userRoutes.route('/users/:id').put(async (request, response) => {
    let db = database.getDb();
    let id = new ObjectId(request.params.id);

    let mongoObject = {
        $set: {
            name: request.body.name,
            email: request.body.email,
            password: request.body.password,
            joinDate: request.body.joinDate,
            posts: request.body.posts
        },
    };

    let data = await db.collection('users').updateOne({ _id: id }, mongoObject);
    response.json(data);
});

// DELETE a user by ID
userRoutes.route('/users/:id').delete(async (request, response) => {
    let db = database.getDb();
    let id = new ObjectId(request.params.id);
    let data = await db.collection('users').deleteOne({ _id: id });
    response.json(data);
});


// POST to create a new user
userRoutes.route('/users/login').post(async (request, response) => {
    let db = database.getDb();
  
    const user= await db.collection('users').findOne({email: request.body.email})

    if (user)
    {
        let confirmation = await bcrypt.compare(request.body.password, user.password)

        if (confirmation)
        {
            const token = jwt.sign(user, process.env.SECRET_KEY, {expiresIn: "1h"})
            response.json({success: true, token})
        }
        else
        {
            response.json({success: false, message: "Incorrect Password"})
        }
    }
    else
    {
        response.json({success: false, message: "User not found"})
    }
   
  });
  

module.exports = userRoutes;
