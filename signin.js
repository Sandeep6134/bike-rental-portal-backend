const mongo = require("./connect");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// --- GET
module.exports.get = async (req, res, next) => {
  let data = await mongo.db.collection("Users").find().toArray();
  res.send(data);
};

// --- Sign up ---
module.exports.userSignup = async (req, res, next) => {
  const existUser = await mongo.db
    .collection("Users")
    .findOne({ username: req.body.username });
  if (existUser) {
    return res.status(400).send({ msg: "This User already exists" });
  } else {
    //encrypt
    const salt = await bcrypt.genSalt(5);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    var data = await mongo.db.collection("Users").insertOne(req.body);
    return res.send(data);
  }
};

// ----Sign In-----
module.exports.userSignin = async (req, res, next) => {
  const existUser = await mongo.db.collection("Users").findOne({ username: req.body.username });
  if (!existUser)
    return res.status(400).send({ msg: "Username is not Correct" });

  const isValid = await bcrypt.compare(req.body.password, existUser.password);

  if (!isValid) return res.status(400).send({ msg: "Incorrect Password" });

  //token generation
  const token = jwt.sign(existUser, "attendance", { expiresIn: "5hr" });
  res.send(token);
};


module.exports.userUpdateBooking = async(req,res,next)=>{
  const existingUser = await mongo.db.collection("Users").findOne({username:req.body.username});
  console.log("user",existingUser);
  const isValid = await bcrypt.compare(req.body.password, existingUser.password);
  
  if(isValid)
  {
    var data = await mongo.db.collection("Users").updateOne({username:req.body.username},{$set:{booking: req.body.booking,bill: req.body.bill}});
    res.send(data)
  }
  else{
  res.send({msg:"Password is Incorrect"})
  }
}

