
const User = require('../models/userModel');
const { getToken }  = require('../util');
var bcrypt    = require('bcrypt');


exports.index =function (req, res) {
  User.get(function (err, user) {
      if (err)
          res.json({
              status: "error",
              message: err
          });
      res.json({
          status: "success",
          message: "Got Bio Successfully!",
          data: user       
      });
  });
};


// exports.signin = async  function (req, res)  {
//   const signinUser = await User.findOne({
//     email: req.body.email,
//     password: req.body.password,
//   });
//   if (signinUser) {
//     res.send({
//       _id: signinUser.id,
//       name: signinUser.name,
//       email: signinUser.email,
//       isAdmin: signinUser.isAdmin,
//       phone: signinUser.phone,
//       token: getToken(signinUser),
//     });
//   } else {
//     res.status(401).send({ message: 'Invalid Email or Password.' });
//   }
// };

exports.signin = async function(req, res) {
    

  var email    = req.body.email;
  var password = req.body.password;

  if (email == null ||  password == null) {
    return res.status(400).json({ 'error': 'missing parameters' });
  }

  const userFound = await User.findOne({
  
         email: email 
      })
    
        if (userFound) {
          bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
            if(resBycrypt) {
              return  res.send({
                      _id: userFound.id,
                      // name: userFound.name,
                      // email: userFound.email,
                      // isAdmin: userFound.isAdmin,
                      // phone: userFound.phone,
                      token: getToken(userFound),
                    });
            } else {
              return res.send({ 'error': 'invalid password' });
            }
          });
        }
    else {
      return res.send({ 'error': 'cannot log on user' });
    }
 
}
// exports.add = async function  (req, res)  {
//   const user = new User({
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password,
//     phone: req.body.phone,
//   });
//   const newUser = await user.save();
//   if (newUser) {
//     res.send({
//       _id: newUser.id,
//       name: newUser.name,
//       email: newUser.email,
//       isAdmin: newUser.isAdmin,
//       phone: newUser.phone,
//       token: getToken(newUser),
//     });
//   } else {
//     res.status(401).send({ message: 'Invalid User Data.' });
//   }
    
// } 

exports.add = async   function(req, res) {
    
  // Params
  var email    = req.body.email;
  var name = req.body.name;
  var phone = req.body.phone;
  var password      = req.body.password;

  if (email == null || name == null || password == null) {
    return res.status(400).json({ 'error': 'missing parameters' });
  }

  

  
  const userFound = await User.findOne({
    email: req.body.email,
  
  });
        if (!userFound) {
          bcrypt.hash(password, 5, function( err, bcryptedPassword ) {
          var newUser =  User.create({
            email: email,
            name: name,
            password: bcryptedPassword,
            phone: phone,
            isAdmin: 0
          }).then(function(newUser) {
            res.send({
                    _id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                    isAdmin: newUser.isAdmin,
                    phone: newUser.phone,
                    token: getToken(newUser),
                  });
          }).catch(function(err) {
            return res.status(500).send({ 'error': 'cannot add user' });
          });
        });
        }
        else 
        {
      return res.status(500).send({ 'error':  'user already exist' });

        }

}


