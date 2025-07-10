require("dotenv").config();

const config=require("./config.json");
const mongoose=require("mongoose");
const bcrypt=require("bcrypt"); //bcrypt is a library used to hash passwords securely. You'll typically use it when users register (to store a hashed password), and during login (to compare plain text with hash).
const express=require("express");//express is a Node.js web framework that simplifies building APIs. This line imports it so we can use it to create our server and routes.
const cors=require("cors");// cors (Cross-Origin Resource Sharing) is a middleware that allows your frontend (e.g., React on localhost:5173) to talk to your backend (e.g., Express on localhost:8000).

const jwt=require("jsonwebtoken");//jsonwebtoken is used for generating and verifying JWT tokens, which are a way to securely authenticate users once they're logged in.
const User = require("./models/user.model");
const { authenticateToken } = require("./utilities");


mongoose.connect(config.connectionString);


const app=express();  //This creates an instance of an Express application. app will be used to define routes, middleware, etc.
app.use(express.json());
app.use(cors({origin:"*"}));//Enables CORS for all origins. This means any frontend app (on any domain) can send requests to your backend.

//Create Account 
app.post("/create-account",async(req,res)=>{
    if (!req.body) {
        return res.status(400).json({
            error: true,
            message: "Request body is missing",
        });
    }
    
    const {fullName, email, password} = req.body;

    if(!fullName || !email || !password){
        return res
            .status(400)
            .json({error:true, message:"All fields are required"});
    }

    const isUser=await User.findOne({email});
    if(isUser){
        return res
            .status(400)
            .json({error:true, message:"User Already Exists"});
    }

    const hashedPassword=await bcrypt.hash(password,10);

    const user=new User({
        fullName,
        email,
        password: hashedPassword
    })

    await user.save();

    const accessToken=jwt.sign(
        {userId:user._id},
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:"72h",
        }
    );
    
    return res.status(201).json({
        error:false,
        user:{fullName:user.fullName, email:user.email},
        accessToken,
        message:"Registration Succesfull",
    });

});

//Login
app.post("/login",async(req,res)=>{
    const{email, password}=req.body;

    if(!email || !password){
        return res.status(400).json({message:"Email and Password are required"});
    }

    const user=await User.findOne({email});

    if(!user){
        return res.status(400).json({message:"User not found"});
    }

    const isPasswordValid=await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.status(400).json({message:"Invalid Credentials"});
    }

    const accessToken=jwt.sign(  //➡️ You're calling the sign function from the jsonwebtoken (jwt) library to create a token.
        {userId: user._id},  //➡️ This is the data (payload) you're putting inside the token.Here, you're putting the user's _id (from the MongoDB user object) in the token.So the token will remember which user it belongs to.
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "72h",  // This is the secret key used to sign (encrypt) the token.You're loading it from the .env file (ACCESS_TOKEN_SECRET=yoursecretkey), which keeps it safe and hidden.Only your server should know this secret — it’s used to verify if the token is valid later.
        }
    );

    return res.json({
        error:false,
        message: "Login Succesful",
        user: { fullName: user.fullName, email: user.email },
        accessToken,
    });
});

//Get User
app.get("/get-user", authenticateToken, async(req,res)=>{
    const {userId}=req.user;

    const isUser=await User.findOne({_id: userId});

    if(!isUser){
        return res.sendStatus(401);
    }

    return res.json({
        user: isUser,
        message: "",
    });
});


app.listen(8000, () => {
  console.log("🚀 Server running on http://localhost:8000");
}); // Starts the Express server on port 8000. Your backend will be available at http://localhost:8000.

module.exports=app;// This exports the app instance, which is helpful for testing or for splitting your server setup into multiple files. 