import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Route,Switch } from 'react-router-dom';
import UserDetails from './components/userdetails';
import UserList from './components/userlist';
import EditUser from './components/edituser';
import UserForm from './components/userform';
import AppNavBar from './pages/AppNavBar';
import HomePage from './pages/HomePage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <BrowserRouter>
      <AppNavBar/>
      <br/>
      <br/>
      <hr/>
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route path="/Createuser" component={UserForm}/>
        <Route path="/UserList" component={UserList}/>
        <Route path="/edit/:id" component={EditUser}/>
        <Route path="/view/:id" component={UserDetails}/>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
