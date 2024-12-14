import { useEffect } from "react";
import { useState } from "react";

export const TodoApp = () => {
  const [dateTime, setDateTime] = useState("");
  useEffect(() => {
    const timer = setInterval(() => {
      const d = new Date();
      const date = d.toLocaleDateString();
      const time = d.toLocaleTimeString();
      setDateTime({ date: date, time: time });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const [inputValue, setInputValue] = useState("");

  const getLocalData = () => {
    const todoData = localStorage.getItem("todoData");
    console.log(todoData);
    if (!todoData) {
      return [];
    } else {
      return JSON.parse(todoData);
    }
  };

  const [task, setTask] = useState(() => getLocalData());
  const inputChange = (value) => {
    setInputValue(value);
  };

  const setLocalData = () => {
    localStorage.setItem("todoData", JSON.stringify(task));
  };

  setLocalData();

  const formSubmit = (e) => {
    e.preventDefault();
    if (!inputValue) return;
    // if (task.includes(inputValue)) return;
    const find = task.find((element) => element.content === inputValue);
    if (find) return;

    // setTask((prevTask) => [...prevTask, inputValue]);
    setTask((prevTask) => [
      ...prevTask,
      { id: inputValue, content: inputValue, checked: false },
    ]);
    setInputValue("");
  };

  const chk = (elem) => {
    const filterTask = task.map((element) => {
      if (elem == element.content) {
        return {
          ...element,
          checked: !element.checked,
        };
      } else {
        return element;
      }
    });
    console.log(filterTask);

    setTask(filterTask);
  };
  const dlt = (elem) => {
    const filterTask = task.filter((element) => elem !== element.content);
    setTask(filterTask);
  };
  return (
    <div className="todoApp">
      <div className="time"> {dateTime.date + dateTime.time}</div>
      <form onSubmit={formSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => inputChange(e.target.value)}
        />
        <button>Add</button>
      </form>

      <ul>
        {task.map((elem, index) => {
          return (
            <li key={index}>
              {elem.content}
              <button onClick={() => chk(elem.content)}>Checked</button>
              <button onClick={() => dlt(elem.content)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
