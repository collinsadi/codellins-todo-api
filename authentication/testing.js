const { MongoClient } = require("mongodb");

const validateApi = async () => {


    try{

 const firstUrl = "`mongodb://127.0.0.1:27017/gimba`";
  const secondUrl = "mongodb://127.0.0.1:27017/ecommerce";

  const firstDbClient = new MongoClient(firstUrl);
        await firstDbClient.connect()
            .then(() => {
            
                console.log("connected")
            })
            .catch(() => {
            console.log("error")
        })
  const firstDb = firstDbClient.db();

        

  const email = "admin@test.com";

        try{


  const user = await firstDb.collection("writers").findOne({email});

  if (user !== null) {
      console.log("User found");
      console.log(user)
  } else {
    console.log("User not found");
  }

        } catch (error) {
            
            console.log(error)
        }


  firstDbClient.close();



    }catch(error){

        console.log(error)
    }


 
};

module.exports = validateApi;





// ================================




const validateAp = async (req, res, next) => {
  const firstUrl = "mongodb://127.0.0.1:27017/gimba";
  const secondUrl = "mongodb://127.0.0.1:27017/ecommerce";

  const firstDbClient = new MongoClient(firstUrl);
  await firstDbClient.connect();
  const firstDb = firstDbClient.db();

  const secondDbClient = new MongoClient(secondUrl);
  await secondDbClient.connect();
  const secondDb = secondDbClient.db();

  const { apiKey } = req.params; // Assuming the API key is passed as a route parameter

  try {
    const user = await firstDb.collection("user").findOne({ apiKey });

    if (user !== null) {
      // User found
      req.user = user; // Set the user object on the request for further use
      next(); // Call the next middleware
    } else {
      // User not found
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    // Error occurred
    console.error("Error validating user:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    firstDbClient.close();
    secondDbClient.close();
  }
};




/**
 * const express = require('express');
const app = express();
const mongoose = require('mongoose');

// MongoDB connection setup
mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });
const Resource = require('./models/Resource'); // Assuming you have a Resource model/schema defined

// API endpoint to retrieve user resources
app.get('/resources', (req, res) => {
  const apiKey = req.headers['x-api-key']; // Assuming the API key is sent in the request headers

  // Authenticate and authorize the user based on the API key
  // ...

  // Retrieve user resources from the database based on the API key
  Resource.find({ apiKey: apiKey })
    .then((resources) => {
      res.status(200).json(resources); // Return the resources as the API response
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred while retrieving user resources' });
    });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

 */





/**
 * 
 * const { MongoClient } = require("mongodb");

const validateApi = async (req, res, next) => {
  const apiKey = req.headers["api-key"]; // Assuming the API key is sent in the "api-key" header

  const mongoUrl = "mongodb://127.0.0.1:27017/gimba";

  const connectDatabase = new MongoClient(mongoUrl);

  try {
    await connectDatabase.connect();
    const database = connectDatabase.db();

    const user = await database.collection("writers").findOne({ email: apiKey });

    if (user) {
      req.apiKey = apiKey; // Store the API key on the request object
      next(); // Call the next middleware
    } else {
      res.status(401).json({ error: "Invalid API key" }); // Return error response if API key is invalid
    }
  } catch (error) {
    console.error("Error validating user:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    connectDatabase.close();
  }
};

module.exports = validateApi;

 */




/**
 * 
 * const { MongoClient } = require("mongodb");

const validateApi = async (apiKey) => {
  const mongoUrl = "mongodb://127.0.0.1:27017/gimba";

  const connectDatabase = new MongoClient(mongoUrl);

  try {
    await connectDatabase.connect();
    const database = connectDatabase.db();

    const user = await database.collection("writers").findOne({ email: apiKey });

    if (user) {
      return "User Found";
    } else {
      return "User Not Found";
    }
  } catch (error) {
    console.error("Error validating user:", error);
    throw new Error("Internal server error");
  } finally {
    connectDatabase.close();
  }
};

module.exports = validateApi;

 * 
 */
