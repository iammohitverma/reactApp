import { useEffect } from "react";
import { useState } from "react"

export const TodoApp = () => {
    const [dateTime, setDateTime] = useState("");
    useEffect(() => {
        const timer = setInterval(() => {
            const d = new Date();
            const date = d.toLocaleDateString();
            const time = d.toLocaleTimeString();
            // setDateTime(date + time);
            setDateTime({ date: date, time: time });
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    const [inputValue, setInputValue] = useState("");
    const [task, setTask] = useState([]);
    const inputChange = (value) => {
        setInputValue(value);
    }
    const formSubmit = (e) => {
        e.preventDefault();
        if (!inputValue) return;
        if (task.includes(inputValue)) return;
        setTask((prevTask) => [...prevTask, inputValue]);
        setInputValue("");
    }
    const dlt = (elem) => {
        const filterTask = task.filter((element) => elem !== element)
        setTask(filterTask);

    }
    return (
        <div className="todoApp">
            <div className="time"> {dateTime.date + dateTime.time}</div>
            <form onSubmit={formSubmit}>
                <input type="text" value={inputValue} onChange={(e) => inputChange(e.target.value)} />
                <button>Add</button>
            </form>

            <ul>
                {
                    task.map((elem, index) => {
                        return (
                            <li key={index}>
                                {elem}
                                <button onClick={() => dlt(elem)}>Delete</button>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}