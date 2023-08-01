const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const socketIO = require("socket.io");
const http = require("http");

const app = express();
const PORT = process.env.PORT || 4000;
const server = http.createServer(app);
const io = socketIO(server);

app.use(bodyParser.text({ type: "text/json" }));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

const mongoURI = "mongodb://localhost:27017/catch-game";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

// Define a Mongoose schema
const scoreSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    score: { type: Number, required: true },
  },
  {
    timestamps: true, // Add timestamps option to automatically manage created_at and updated_at fields
  }
);

// Create a Mongoose model
const Score = mongoose.model("Score", scoreSchema);

app.get("/", (req, res) => res.send("Backend start"));

app.post("/api/scores", (req, res) => {
  const { name, score } = req.body;

  const newScore = new Score({
    name,
    score,
  });

  // Save the new score to the database
  newScore
    .save()
    .then((score) => {
      console.log("New score added:", score);
      res.status(201).json(score);
      io.emit("score-added", score);
    })
    .catch((error) => {
      console.error("Error adding score:", error.message);
      res.status(500).json({ error: "Failed to add score" });
    });
});

// Get the top 100 scores
app.get("/api/scores", (req, res) => {
  Score.find()
    .limit(100)
    .sort({ score: -1 })
    .then((scores) => {
      res.status(200).json(scores);
    })
    .catch((error) => {
      console.error("Error fetching scores:", error.message);
      res.status(500).json({ error: "Failed to fetch scores" });
    });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
