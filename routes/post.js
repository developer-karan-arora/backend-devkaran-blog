const router = require("express").Router();
const POST = require("../model/Post");

// create post
router.post("/newpost", async (req, res) => {
  let data = req.body;
  try {
    let newPost = await POST.create(data);
    await newPost.save();
    return res.status(200).json(newPost);
  } catch (err) {
    console.log("ERR | route-POST | newPost");
    console.log(err);
    return res
      .status(200)
      .json({ error: "Incomplete POST or Title Not Unique" });
  }
});
// delete post
router.delete("/del/:postId", async (req, res) => {
  try {
    let requiredPost = await POST.findById(req.params.postId);
    let email = req.body.email;
    let title = requiredPost.title;
    console.log(email);
    console.log(requiredPost.email);
    if (email === requiredPost.email) {
      await requiredPost.deleteOne();
      return res.status(200).json({ msg: "post Deleted", email, title });
    } else {
      return res.status(400).json({ error: "you can delete only your posts" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errormsg: "unable to delete post" });
  }
});
// update post
router.put("/upd/:postId", async (req, res) => {
  console.log("Log | Route-UpdatePost | updatePost");

  try {
    let requiredPost = await POST.findById(req.params.postId);
    let desc = req.body.desc;
    let title = req.body.title;
    let shortdesc = req.body.shortdesc;
    let email = req.body.email;
    let photo = req.body.photo;
    let categories = req.body.categories;
    let date = req.body.updateadAt;
    if (!requiredPost) {
      return res.status(403).json({ error: "error no such post found" });
    }
    if (email === requiredPost.email) {
      console.log("POST will be deleted soon");
      await requiredPost.updateOne({
        desc,
        title,
        photo,
        categories,
        shortdesc,
        updatedAt: date,
      });
      return res.status(200).json({ msg: "post updated", email, title });
    } else {
      return res.status(400).json({ error: "you can update only your posts" });
    }
  } catch (error) {
    //   console.log(error);
    return res
      .status(500)
      .json({ errormsg: "unable to update post You might disturbed id " });
  }
});
// like post update
router.put("/likepost/:postId/:email", async (req, res) => {
  try {
    let requiredPost = await POST.findById(req.params.postId);
    console.log(req.params.postId);
    let email = req.params.email;
    let oldlikes = requiredPost.likes;
    let newLikes = oldlikes + 1;
    if (!email) return res.json({ error: "email is required" });
    if (requiredPost.likeArray.includes(email)) {
      return res
        .status(400)
        .json({ error: "You have already liked this blog" });
    }
    requiredPost.likes = newLikes;
    requiredPost.likeArray.push(email);
    // await requiredPost.updateOne({likes:newLikes});
    await requiredPost.save();
    return res.json({ oldlikes, newLikes, email });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ errormsg: "unable to like post", errors: error });
  }
});
/*
-----------------------------------------
*/
// get all post
router.get("/allpost", async (req, res) => {
  try {
    let allPosts = await POST.find();
    return res.status(200).json(allPosts);
  } catch (error) {
    res.status(500).json({ error: "Problem in fetching all posts" });
  }
});
// get single post
router.get("/getpost/:postId", async (req, res) => {
  try {
    let post = await POST.findById(req.params.postId);
    console.log("LOG | api-single-post Successfully");
    return res.status(200).json(post);
  } catch (error) {
    console.log("LOG | api-single-post Falied");
    res.status(500).json({ error: "Problem in fetching one post" });
  }
});
// get my posts {where}
router.get("/myposts/:emailId", async (req, res) => {
  try {
    let allPosts = await POST.find({}).where({ email: req.params.emailId });
    return res.status(200).json(allPosts);
  } catch (error) {
    res.status(500).json({ error: "Problem in fetching all posts" });
  }
});
// get all titles
router.get("/alltitles", async (req, res) => {
  try {
    let allTitles = await POST.find(
      {},
      { desc: 0, photo: 0, username: 0, categories: 0 }
    );
    return res.status(200).json(allTitles);
  } catch (error) {
    res.status(500).json({ error: "Problem in fetching all posts" });
  }
});
// get my titles {where}
router.get("/mytitles/:emailId", async (req, res) => {
  try {
    let allTitles = await POST.find(
      {},
      { desc: 0, shortdesc: 0, photo: 0, categories: 0 }
    ).where({ email: req.params.emailId });
    return res.status(200).json(allTitles);
  } catch (error) {
    res.status(500).json({ error: "Problem in fetching all posts" });
  }
});
// test post
router.get("/test", (req, res) => {
  res.send("API is working!");
});

module.exports = router;
