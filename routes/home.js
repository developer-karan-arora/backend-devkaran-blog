let router = require("express").Router();
router.get("/",(req,res)=>{
    res.status(200).json({route:"home route"});
})
module.exports = router;