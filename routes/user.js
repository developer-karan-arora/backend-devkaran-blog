const router = require("express").Router();
const USER = require("../model/User");

// get user details
router.get("/finduser/:emailId", async (req, res) => {
  const requiredUser = await USER.findOne({ email: req.params.emailId });
  if (requiredUser) return res.status(200).json({ requiredUser });
  return res.json({ msg: "UserNotFound" });
});

// delete user details
router.delete("/del/:emailId", async (req, res) => {
  const requiredUser = await USER.findOne({ email: req.params.emailId });
  if (requiredUser) {
    let email = requiredUser.email;
    await requiredUser.deleteOne();
    return res.status(200).json({ msg: "User Deleted", email });
  }
  return res.json({ msg: "UserNotFound" });
});

// update user details
router.put("/upd/:emailId", async (req, res) => {
  const requiredUser = await USER.findOne({ email: req.params.emailId });
  let {email , ...newDetails} = req.body;
  console.log(requiredUser);
  console.log(newDetails);
  if (requiredUser) {
    await requiredUser.updateOne(req.body);
    return res.status(200).json({ msg: "User updated"});
  }
  return res.json({ msg: "UserNotFound" });
});

// testing apis
router.get("/test", async (req, res) => {
  res.send("api working");
});

module.exports = router;
