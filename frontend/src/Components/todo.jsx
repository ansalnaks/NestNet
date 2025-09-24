import React, { useState } from 'react';

function Todo() {
    const [regno, setReg] = useState('')
    const [name, setName] = useState('')
    const [marks, setMarks] = useState('')
    const [todo, setTodo] = useState([])

    const addNotes = () => {
        setTodo([...todo, { regno, name, marks, completed: false }])
        alert("Added successfully")
        setReg("")
        setName("")
        setMarks("")
    };

    const remove = (index) => {
        const deleteTodo = [...todo]
        deleteTodo.splice(index, 1)
        setTodo(deleteTodo)
    };

    const marktaskCompleted = (index) => {
        const updatedTodo = [...todo]
        updatedTodo[index].completed = !updatedTodo[index].completed;
        setTodo(updatedTodo)
    };

    return (
        <div style={{ width: "70%", height: "530px", backgroundColor: "lightgreen", marginLeft: "14%" }}>
            <h2 style={{ textAlign: "center" }}>Todo List</h2>
            Register No: <input type="number" placeholder='Enter register number' value={regno} onChange={(e) => setReg(e.target.value)} />
            Name: <input type="text" placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)} />
            Total Marks: <input type="number" placeholder='Enter marks' value={marks} onChange={(e) => setMarks(e.target.value)} />
            &nbsp;<button onClick={addNotes}>Add</button>

            <ul>
                {
                todo.map((task, index) => (
                    
                    <li key={index} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                       Name: {task.name} register no:{task.regno} Marks:{task.marks}
                        <button onClick={() => marktaskCompleted(index)}>
                            {task.completed ? "Undo" : "Complete"}
                        </button>
                        
                        <button onClick={() => remove(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Todo;
