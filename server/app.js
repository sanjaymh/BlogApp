const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");
const cors = require("cors");

const auth = require("./middleware/auth");

const userRoutes = require("./routes/user");
const postRoutes = require("./routes/posts");
const commentRoute = require("./routes/comment");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", commentRoute );
app.use("/api", userRoutes );
app.use("/api", auth, postRoutes );

app.use((req, res, next) => {
  const err = new Error('not found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ error: { message: err.message } });
});


//Connecting to DB ...
mongoose.connect(config.MONGO_URL, 
    { useNewUrlParser: true, 
      useUnifiedTopology:true,
      useCreateIndex: true
    })
.then(()=>{console.log("connected to Data Base")})
.catch(err => console.log(err));

PORT = config.PORT;

app.listen(PORT, () => console.log(`App is running in port ${PORT}`));