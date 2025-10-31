import './stylesheets/App.css';
import { UserProvider } from './context/user-context';
import ContextWrapper from './context-wrapper';

function App() {

  return (

    <UserProvider>
        <ContextWrapper />
    </UserProvider>
  
  )
}

export default App;
