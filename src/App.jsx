import React, { useState, Fragment, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { TodoList } from "./components/TodoList";

import {GrAddCircle} from 'react-icons/gr'
import {FaTrashAlt, FaStar} from 'react-icons/fa'
import {RiTodoLine} from 'react-icons/ri'

import './Estilos.css'

const KEY = "todoApp.todos";

export function App() {
  const [todos, setTodos] = useState([
    { id: 1, task: "Tarea 1", completed: false },
  ]);

  const todoTaskRef = useRef(); 

  useEffect (() => {
      const storedTodos = JSON.parse(localStorage.getItem(KEY));
      if (storedTodos){
          setTodos(storedTodos);
      }
  }, []);

  useEffect (() => {
    localStorage.setItem (KEY, JSON.stringify(todos));
  }, [todos]);

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  };

  const handleTodoAdd = () => {
    const task = todoTaskRef.current.value;
    if (task === "") return;

    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), task, completed: false }];
    });

    todoTaskRef.current.value = null;
  };

//eLimina las tareas completadas
  const handeleClearAll = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos (newTodos);
  }

  return (
    <div className='App'>
    <Fragment>
      <div className = 'contenedor'>
      <h2 className='titulo'> <RiTodoLine/> Tareas por hacer </h2>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input className='caja' ref={todoTaskRef} type="text" placeholder="ej. Matematicas" />{" "}
      <button className='boton' onClick={handleTodoAdd}><GrAddCircle/></button>
      <button className='boton' onClick={handeleClearAll}><FaTrashAlt/></button>
      <div><strong>Te quedan {todos.filter((todo) => !todo.completed).length} tarea(s) por completar</strong></div><br></br>
      </div>
      <footer>Hecho por Sarahi Esquivel Pardo<FaStar/></footer>
  </Fragment>
    </div>
  );
}
