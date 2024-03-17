//=================================all packages imported================
const path = require('path');
const express = require('express');
const app = express();




app.use(express.json());
app.use('/uploads',express.static('uploads'));


//===============================================router imported

const userRouter = require('./api/router');


//===============================================point endpoint router
app.use('/api/user', userRouter);




  //===========================================accessing  profile pic

  app.use('/api/user/accessUserProfilePic', (req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache');
  
    // Serve the static image file
    express.static('storage/userProfilePic')(req, res, (err) => {
      if (err) {
        console.error('Error serving the image:', err);
        // You can customize the error response as needed
        res.status(500).send('Error serving the image');
      }
    });
  });




app.listen(5000, ()=>{
    console.log('server listening on port 5000');
});



