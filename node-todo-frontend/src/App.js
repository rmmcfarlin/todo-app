import logo from './logo.svg';
import './stylesheets/App.css';
import { useState, useEffect, useContext } from 'react'
import TodoList from './modules/todo-list';
import AddTask from './modules/add-task';
import AppWrapper from './modules/app-wrapper';
import LoginPage from './modules/login-page';
import CreateAccount from './modules/create-account';

function App() {

  const [loggedIn, setLoggedIn] = useState(false)
    const domain = "http://localhost:3000"

  return (
    <div className="App">
    
    {loggedIn ? (
       <AppWrapper domain={domain} />
    ) : (
      <LoginPage domain={domain} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
    )}

    </div>
  )
}

export default App;
