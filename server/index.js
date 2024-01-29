const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 8080;

const DB =
  "mongodb+srv://mahipalkeluth143:uK0niUwwZG9FOCHp@majordb.cb49png.mongodb.net/todo?retryWrites=true&w=majority";
const DB1 = "mongodb://0.0.0.0:27017/todo";
mongoose.connect(DB1, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connection Success");
});
mongoose.connection.on("error", () => {
  console.log("error");
});

const ToDoList = mongoose.Schema({
  task: String,
  status: String,
});

const ToDoListModel = mongoose.model("todo-lists", ToDoList);

/*********  ADD THE TASKS *********/

app.post("/add-tasks", (req, res) => {
  ToDoListModel.create(req.body)
    .then((res) => res.json(res))
    .catch((err) => res.json(err));
});

app.get("/get-tasks", (req, res) => {
  ToDoListModel.find()
    .then((allTasks) => res.send(allTasks))
    .catch((err) => {
      console.log(err);
    });
});

app.delete("/delete-task/:id", (req, res) => {
  const { id } = req.params;
  ToDoListModel.deleteOne({ _id: id })
    .then((res) => res.json({ msg: "success" }))
    .catch((err) => res.json(err));
});

app.post("/update-status/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  ToDoListModel.findOneAndUpdate(
    { _id: id },
    { $set: { status } },
    { new: true }
  )

    .then((res) => res.json({ msg: "success" }))
    .catch((err) => res.json(err));
});

app.listen(PORT, () => {
  console.log("Server connected");
});
