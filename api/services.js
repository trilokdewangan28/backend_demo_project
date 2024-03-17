const conn = require('../database/db');
const auth = require('../middleware/auth');

function userSignup(data, callback) {
    
    // Check if the combination of u_id and s_id already exists
    conn.query(
        'SELECT * FROM user WHERE email=?',
        [data.email],
        (selectError, selectResult) => {
            if (selectError) {
                return callback(selectError);
            }

            // If the combination already exists, return a message
            if (selectResult.length > 0) {
                const message = 'user already exist with this email,please try different one.';
                return callback(null, { message });
            }

            // If the combination does not exist, insert the record
            conn.query(
                'INSERT INTO user(uname,email, password) VALUES (?, ?, ?)',
                [
                    data.uname,
                    data.email,
                    data.password,
            

                ],
                (insertError, insertResult) => {
                    if (insertError) {
                        console.log(insertError);
                        return callback(insertError);
                    }

                    return callback(null, insertResult);
                }
            );
        }
    );
}


function addProduct(data, callback) {
    
     // If the combination does not exist, insert the record
     conn.query(
        'INSERT INTO product(name,discription, count) VALUES (?, ?, ?)',
        [
            data.name,
            data.description,
            data.count,
    

        ],
        (insertError, insertResult) => {
            if (insertError) {
                return callback(insertError);
            }

            return callback(null, insertResult);
        }
    );
}

function fetchProduct(callback) {
    
    // If the combination does not exist, insert the record
    conn.query(
       'select * from product',
       [],
       (selectError, selectResult) => {
           if (selectError) {
               return callback(selectError);
           }

           return callback(null, selectResult);
       }
   );
}

function loginUser(data,callback){
    conn.query(
        'select * from user where email=? AND password=?',
        [data.email,data.password],
        (selectError, selectResult) => {
            if (selectError) {
                const message = 'user not found or incorrect credentials';
                return callback({message});
            }
            const token  = auth.generateAccessToken(data.email);
            return callback(null, token);
        }

    )
}

function userProfile(email,callback){
    conn.query(
        'SELECT * FROM user WHERE email = ?',
        [email],
        (selectError, selectResult) => {
            if (selectError) {
                const message = 'user not found or incorrect credentials';
                return callback({message});
            }
            return callback(null, selectResult);
        }

    )
}

function uploadProfilePic(uid, profilePic){
    return new Promise((resolve, reject) => {
      // Check if the combination of u_id and s_id already exists
      conn.query(
          `UPDATE user SET image = ? WHERE uid = ?`,
          [
            profilePic,
            uid
          ],
          (updateError, updateResult) => {
              if (updateError) {
                  reject(updateError);
              }
              resolve(updateResult); 
          }
      );
  });
  }

module.exports = {userSignup,addProduct, fetchProduct,loginUser, userProfile,uploadProfilePic}