let router = require("express").Router();
let USER = require("../model/User");

router.post("/register", async (req, res) => {
  console.log("Log | api - Register ");
  const { username, email } = req.body;
  try {
    const resultUser = await USER.findOne({ username: username });
    const resultMail = await USER.findOne({ email: email });
    if (resultMail) return res.send("Mail already Exists");
    if (resultUser) return res.send("UserName already Exists");

    const newUser = new USER(req.body);
    await newUser.save();
    console.log("LOG | new user added");
    res.status(200).json("new user added");
  } catch (error) {
    console.log("LOG | new user addition failed");
    res.status(500).json({ error: "Missing credentials" });
  }
});

router.post("/login", async (req, res) => {
  
  try {
    console.log("Log | api - Login ");
    const requiredUser = await USER.findOne({ email: req.body.email });
    // console.log(requiredUser);
    if (!(req.body.password === requiredUser.password)) {
      console.log("password incorrect");
      return res.status(200).json({error:"wrong password"});
    }
    return res.status(200).json(requiredUser);
  } catch (error) {
    console.log("Log | api - Login Failed");
    res.status(200).json({ error: "User not found" });
  }
  
});
module.exports = router;
