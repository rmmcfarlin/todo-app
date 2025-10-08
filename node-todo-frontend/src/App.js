import logo from './logo.svg';
import './App.css';
import TodoList from './modules/todo-list';
import AddTask from './modules/add-task';

function App() {
  return (
    <div className="App">
        <TodoList />
        <AddTask />

    </div>
  );
}

export default App;
