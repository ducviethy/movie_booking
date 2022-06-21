import './App.css';
import { createBrowserHistory } from 'history';
import { Router, Switch } from 'react-router';
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate'
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import News from './pages/News/News';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Detail from './pages/Detail/Detail';
import  CheckoutTemplate  from './templates/CheckoutTemplate/CheckoutTemplate';
import Checkout from './pages/Checkout/Checkout';
import { UserTemplate } from './templates/UserTemplate/UserTemplate';
import Loading from './components/Loading/Loading';
import Profile from './pages/Profile/Profile';
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import AdminTemplate from './templates/AdminTemplate/AdminTemplate';
import Films from './pages/Admin/Films/Films';
import ShowTime from './pages/Admin/Showtime/ShowTime';
import AddNew from './pages/Admin/Films/AddNew/AddNew';
import Edit from './pages/Admin/Films/Edit/Edit';
import SignUpWithFormik from "./pages/Register/Register"
import EditUser from './pages/Admin/Dashboard/EditUser';
export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Loading />
      <Switch>
        <HomeTemplate path="/" exact Component={Home} />
        <HomeTemplate path="/contact" exact Component={Home} />
        <HomeTemplate path="/news" exact Component={Home} />
        <HomeTemplate path="/detail/:id" exact Component={Detail} />
        <CheckoutTemplate path="/checkout/:id" exact component={Checkout} />
        <UserTemplate path="/login" exact Component={Login} />
        <UserTemplate path="/register" exact Component={SignUpWithFormik} />
        <AdminTemplate path="/admin" exact Component={Dashboard} />
        <AdminTemplate path="/admin/users" exact Component={Dashboard} />
        <AdminTemplate path="/admin/users/edit/:id" exact Component={EditUser} />
        <AdminTemplate path="/admin/films" exact Component={Films} />
        <AdminTemplate path="/admin/films/addnew" exact Component={AddNew} />
        <AdminTemplate path="/admin/films/edit/:id" exact Component={Edit} />
        <AdminTemplate path="/admin/films/showtime/:id/:tenphim" exact Component={ShowTime} />
        <HomeTemplate path="*" Component={Home} />
      </Switch>
    </Router>
  )
}
export default App;