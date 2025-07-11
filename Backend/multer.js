const multer=require("multer"); // This imports the Multer library, which handles file uploads in Express apps.
const path=require("path"); //This imports Node’s path module, which helps with handling file and folder paths.

//Storage Configuration
const storage=multer.diskStorage({  //Here, you're telling Multer where and how to store the uploaded files on disk (your local computer/server).
    destination: function(req, file, cb){
        cb(null, "./uploads/");  //Destination folder for storing uploaded files
    },
});

//File filter to accept only images
const fileFilter=(req,file,cb)=>{  //This is a custom filter function to accept only image files.
    if(file.mimetype.startsWith("image/")){
        cb(null, true);
    }else{
        cb(new Error("Only images are allowed"), false);
    }
};

//Initialise multer instance 
const upload= multer({storage, fileFilter});

module.exports=upload;