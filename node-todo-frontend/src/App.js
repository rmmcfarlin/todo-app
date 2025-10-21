import logo from './logo.svg';
import './stylesheets/App.css';
import { useState, useEffect } from 'react'
import TodoList from './modules/todo-list';
import AddTask from './modules/add-task';
import AppWrapper from './modules/app-wrapper';
import LoginPage from './modules/login-page';

function App() {

  const [loggedIn, setLoggedIn] = useState(false)
  
  return (
    <div className="App">
    
    {loggedIn ? (
       <AppWrapper />
    ) : (
      <LoginPage />
    )}

   

    </div>
  );
}

export default App;
