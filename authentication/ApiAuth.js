const { MongoClient } = require("mongodb");



const jwt = require("jsonwebtoken")


require("dotenv").config()

const jwtsecret = process.env.JWT_SECRET


const validateApi = async (request,response,next) => {

  const apiKey = request.headers["api-key"]



  try{

 if (!apiKey) {
    
    response.status(401).json({status:"error",message:"Unauthorized"})
    return
  }

  const usersUrl = "mongodb://127.0.0.1:27017/codellins-client"

  const firstDbClient = new MongoClient(usersUrl)
  await firstDbClient.connect()
  const database = firstDbClient.db()

  const user = await database.collection("users").findOne({apiKey})
  
    if (user) {
      request.apiKey = apiKey
      next();
    } else {
      response.status(401).json({status:"error", message:"Invalid Api Key"})
    }


  }catch(error){

    console.log(error)
  }

 


};

const tokenvalidation = async (request, response, next) => {

  let token;

  if (
    
    request.headers.authorization && request.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = request.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, jwtsecret)
      request.user = decoded.user
   

      next()
    } catch (error) {
      
      response.status(401).json({ message: "Not Authorized" })
      console.log(error)
    }
  }
  
}

module.exports = {validateApi, tokenvalidation};
