const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Workout = require("./models/Workout");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
});

app.get("/api/workouts", (req, res) => {
  Workout.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});

app.post("/api/workouts", (req, res) => {
  const addedWorkout = new Workout({
    day: new Date().setDate(new Date().getDate()),
  });
  addedWorkout.save((error) => {
    if (error) {
      return console.log(`Error has occurred: ${error}`);
    }
    console.log(addedWorkout);
    res.json(addedWorkout);
  });
});

app.put("/api/workouts/:id", (req, res) => {
  Workout.findById(req.params.id, function(err, result){
    if (err) throw err
    console.log(result.exercises)
    result.exercises.push(req.body)
    result.save()
    res.json(200)

  })
  
});

app.get("/api/workouts/range", (req,res) => {
  Workout.find().then(data => {res.json(data)})

})

// app.put("/api/workouts/:id", (req, res) => {
//   console.log(req.params)

//   Workout.findOne(req.params.id).then(e => {console.log(e)})

// })

app.get("/exercise", (req, res) => {
  res.redirect(`/exercise.html`);
});

// app.get("/exercise?id=", (req, res) => {
//   console.log(req.params)
//   Workout.findOne({ _id: req.params.id}).then(e => {console.log(e)})

// })

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
