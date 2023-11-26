// ToDoController controls the CRUD API. get(R) save(C) update(u) delete(D)

const ToDoModel = require('../models/ToDoModel')

module.exports.getToDo = async (req, res) => {
    const toDo = await ToDoModel.find(); // this will give us all the todo fromt he DB
    res.send(toDo) // and we are sending these as a response
} // this is it for getting our todos



module.exports.saveToDo = async (req, res) => {
    // For saving our todo we're expecting a text from our body, so we must destructure it
    const { text } = req.body
    ToDoModel
    .create({text})
    .then((data) => {
        console.log("Added Successfully!");
        console.log(data);
        res.send(data);
    })
}


module.exports.updateToDo = async (req, res) => {
    // in update we will have two things: id, text
    const {_id, text} = req.body
    ToDoModel
    .findByIdAndUpdate(_id, {text})
    .then(() => res.send("Updated Successfully!"))
    .catch((err) => console.log(err))
}



module.exports.deleteToDo = async (req, res) => {
    // in delete we will erase the id
    const {_id} = req.body
    ToDoModel
    .findByIdAndDelete(_id)
    .then(() => res.send("Deleted Successfully!"))
    .catch((err) => console.log(err))
}