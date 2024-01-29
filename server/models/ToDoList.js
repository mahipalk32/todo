const mongoose = require("mongoose")

const ToDoList = mongoose.Schema({
    task: String,
})

const ToDoListModel = mongoose.model('todo-lists', ToDoList);
module.exports = ToDoListModel;