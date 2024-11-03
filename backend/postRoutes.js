const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const { MongoClient, ObjectId } = require("mongodb");
const database = require("./connect"); // Adjust if this file contains your MongoDB connection logic
const { verify } = require("jsonwebtoken");
const jwt = require("jsonwebtoken")
require("dotenv").config({path: "./config.env"})



let postRoutes = express.Router();

// GET all posts

postRoutes.route('/').get(async (request, response) => {
    console.log("Welcome Home")
    response.send("The home route is working!");
    
});

postRoutes.route('/posts').get(verifytoken, async (request, response) => {
    console.log("I am working")
    let db = database.getDb();
    let data = await db.collection('posts').find({}).toArray();

    if (data.length > 0) {
        response.json(data);
    } else {
        response.status(404).json({ error: "The collection in Database is empty" });
    }
});

// GET a post by ID
postRoutes.route('/posts/:id').get(verifytoken, async (request, response) => {
    let db = database.getDb();
    let id = new ObjectId(request.params.id);
    let data = await db.collection('posts').findOne({ _id: id });

    if (data) {
        console.log(data)
        response.json(data);
    } else {
        response.status(404).json({ error: "Post not found" });
    }
});

// POST to create a new post
// POST to create a new post
postRoutes.route('/posts').post(verifytoken, async (request, response) => {
    let db = database.getDb();
  
    // Ensure request body has required fields
    let mongoObject = {
      title: request.body.title,
      description: request.body.description,
      content: request.body.content,
      author: request.body.user._id,
      dateCreated: request.body.dateCreated || new Date(),
    };
  
    try {
      let data = await db.collection('posts').insertOne(mongoObject);
      response.status(200).json(data);
    } catch (error) {
      console.error('Error inserting data:', error);
      response.status(500).json({ message: 'Error creating post' });
    }
  });
  

// PUT to update a post
postRoutes.route('/posts/:id').put(verifytoken, async (request, response) => {
    let db = database.getDb();
    let id = new ObjectId(request.params.id);

    let mongoObject = {
        $set: {
            title: request.body.title,
            description: request.body.description,
            content: request.body.content,
            author: request.body.author,
            dateCreated: new Date(),
        },
    };

    let data = await db.collection('posts').updateOne({ _id: id }, mongoObject);
    response.json(data);
});

// DELETE a post by ID
postRoutes.route('/posts/:id').delete(verifytoken, async (request, response) => {
    let db = database.getDb();
    let id = new ObjectId(request.params.id);
    let data = await db.collection('posts').deleteOne({ _id: id });
    response.json(data);
});

function verifytoken(request, response, next)
{
    const authHeader = request.headers["authorization"]
    const token = authHeader && authHeader.split(' ')[1]
    //Bearer 12345

    if(!token)
    {
        return response.status(401).json({message: "Authentication token missing"})
    }

    jwt.verify(token, process.env.SECRET_KEY, (error, user)=>{
        if(error)
        {
            return response.status(401).json({message: "Invalid Token"})
        }

        request.body.user = user
        next()
    })


}
module.exports = postRoutes;
