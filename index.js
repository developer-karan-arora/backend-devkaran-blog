const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const port = process.env.port || 3000;
const app = express();
const corsOption = {
    origin: ['http://localhost:5173',"https://frontend-devkaran-blog.vercel.app"]
}
// middleware 
app.use(express.json());
app.use(cors(corsOption));
// connecting database
const mongoObj = { useNewUrlParser: true, useUnifiedTopology: true }
const URI = `mongodb+srv://developerkaran025:developerkaran025@cluster0.y2q1hu4.mongodb.net/tempBlog?retryWrites=true&w=majority`;
mongoose.connect(URI,mongoObj).then((res) => {
    console.log("connected Successfully");
}).catch((err) => {
    console.log("error at root connecting db")
});

// handeling routes
app.use("/",require("./routes/home"))
app.use("/auth",require("./routes/auth"))
app.use("/user",require("./routes/user"))
app.use("/post",require("./routes/post"))
app.use("/page",require("./routes/page"))
app.listen(port,console.log("server started"));
// app.use("/test",require("./routes/test/testJWT"))
