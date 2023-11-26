import { useState } from "react";
import "./App.css";
import ToDo from "./components/ToDo";
import { useEffect } from "react";
import { addToDo, getAllToDo, updateToDo, deleteToDo } from "./utils/HandleApi";

function App() {
  const [toDo, setToDo] = useState([]); // Read
  const [text, setText] = useState(""); // Create
  const [isUpdating, setIsUpdating] = useState(false); // update
  const [toDoId, setToDoId] = useState("");

  useEffect(() => {
    getAllToDo(setToDo);
  }, []);

  const updateMode = (_id, text) => {
    setIsUpdating(true);
    setText(text);
    setToDoId(_id);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Hey! What do you wanna do?</h1>

        <div className="top">
          <input
            type="text"
            placeholder="Ki korben?"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div
            className="add"
            onClick={
              isUpdating
                ? () =>
                    updateToDo(toDoId, text, setToDo, setText, setIsUpdating)
                : () => addToDo(text, setText, setToDo)
            }
          >
            {isUpdating ? "Update" : "Add Task"}
          </div>
        </div>

        <div className="list">
          {toDo.map((item) => (
            <ToDo
              key={item._id}
              text={item.text}
              updateMode={() => updateMode(item._id, item.text)}
              deleteToDo={() => deleteToDo(item._id, setToDo)}
            />
          ))}

          {/* <ToDo text="Hi" />
          <ToDo text="Hi" /> */}
        </div>
      </div>
    </div>
  );
}

export default App;
