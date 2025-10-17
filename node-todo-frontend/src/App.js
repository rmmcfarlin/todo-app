import logo from './logo.svg';
import './stylesheets/App.css';
import { useState, useEffect } from 'react'
import TodoList from './modules/todo-list';
import AddTask from './modules/add-task';
import AppWrapper from './modules/app-wrapper';

function App() {
  return (
    <div className="App">

    <AppWrapper />

    </div>
  );
}

export default App;
