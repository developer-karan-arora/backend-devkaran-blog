const router = require("express").Router();
const POST = require("../model/Post");
const USER = require("../model/User");
router.get("/test", (req, res) => {
  return res.json({ msg: "test" });
});

router.get("/:pagenumber", async (req, res) => {
  let limit = 10;
  let pagenumber = req.params.pagenumber;
  let skip = (pagenumber - 1) * limit;

  try {
    console.log("Log | route-getPage")
    let result = await POST.find({},{desc:0}).skip(skip).limit(limit);
    let resultDate = await USER.find().sort({ updatedAt: 1 });
    return res.json(result);
  } catch (error) {
    console.log("ERROR | route-getPage")
    res.status(500).json({error:"error i fetching pages"})
  }
});
module.exports = router;
