
const service = require('./services');
function userSignup(req,res){
    const data = req.body;
    service.userSignup(data,(error,result)=>{
      if(error){
         //console.log(error);
         //console.log('something went wrong while signup customer');
         return res.status(500).json({
             success:false,
             message:"something went wrong while signup user",
             error:error
         })
      }
      if (result.message) {
         //console.log(result.message);
         return res.status(400).json({
             success: false,
             message: result.message,
             error:''
         });
     }
      return res.status(200).json({
         success:true,
         message:"signup successfully"
      })
    });
}
function addProduct(req,res){
    const data = req.body;
    service.addProduct(data,(error,result)=>{
      if(error){
         console.log(error);
         //console.log('something went wrong while signup customer');
         return res.status(500).json({
             success:false,
             message:"something went wrong while adding product",
             error:error
         })
      }
      if (result.message) {
         //console.log(result.message);
         return res.status(400).json({
             success: false,
             message: result.message,
             error:''
         });
     }
      return res.status(200).json({
         success:true,
         message:"signup successfully"
      })
    });
}


function fetchProduct(req,res){
    const data = req.body;
    service.fetchProduct((error,result)=>{
      if(error){
         console.log(error);
         //console.log('something went wrong while signup customer');
         return res.status(500).json({
             success:false,
             message:"something went wrong while fetching product",
             error:error
         })
      }
      if (result.message) {
         //console.log(result.message);
         return res.status(400).json({
             success: false,
             message: result.message,
             error:''
         });
     }
      return res.status(200).json({
         success:true,
         message:"fetched successfully",
         result:result
      })
    });
}




function loginUser(req,res){
    const data = req.body;
    console.log('user login called');
    service.loginUser(data,(error,result)=>{
      if(error){
         console.log(error);
         console.log('something went wrong while login user');
         return res.status(500).json({
             success:false,
             message:"error in login",
             error:error
         })
      }
      if (result.message) {
         //console.log(result.message);
         return res.status(400).json({
             success: false,
             message: result.message,
             error:'',
             
         });
     }
      return res.status(200).json({
         success:true,
         message:"fetched successfully",
         result:result,
      })
    });
}



function userProfile(req,res){
    const email = req.user.email;
    console.log('user profile called');
    service.userProfile(email,(error,result)=>{
      if(error){
         console.log(error);
         //console.log('something went wrong while signup customer');
         return res.status(500).json({
             success:false,
             message:"error in login using token",
             error:error
         })
      }
      if (result.message) {
         //console.log(result.message);
         return res.status(400).json({
             success: false,
             message: result.message,
             error:''
         });
     }
      return res.status(200).json({
         success:true,
         message:"fetched successfully",
         result:result
      })
    });
}




function uploadProfilePic(req,res){
    const uid = req.body.uid;
    const profilePic = req.file.filename;
    //console.log(c_id, profilePic);
    service.uploadProfilePic(c_id, profilePic).then((result) => {
       //console.log('profile pic uploaded successfully:', result);
       return res.status(200).json(
          {
             success:true,
             message:"profile pic uploaded successfully"
          }
       )
     })
     .catch((error) => {
       //console.error('Error uploading profile pic:', error);
       return res.status(500).json(
          {
             success:false,
             message:"error uploading profile pci",
             error:error
          }
       )
     });
 } 




module.exports = {
    userSignup,
    addProduct,
    fetchProduct,
    loginUser,
    userProfile,
    uploadProfilePic
}