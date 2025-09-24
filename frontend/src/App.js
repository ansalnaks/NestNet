

import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Register from './Components/register';
import './App.css'
import Login from './Components/login';
import Mainpagee from './Components/mainpagee';
import About from './Components/about';
import Footer from './Components/Footer';
import Adminlogin from './Components/adminlogin';
import UserDash from './Components/userDash';
import AgentDashboard from './Components/agentdash';
import Admindash from './Components/admindash';
import Profile from './Components/profile';
import PropertyDetails from './Components/propertydetails';
import Userdashheader from './Components/userdashheader';
import MyCart from './Components/mylist';
import MyList from './Components/mylist';
import AgentRegistration from './Components/agentRegistration';
import AgentLogin from './Components/agentLogin';
import Wishlist from './Components/wishlist';
import Payment from './Components/payment';
import Ordersuccess from './Components/ordersuccess';
import PaymentHis from './Components/paymentHis';
import Services from './Components/services';
import Pricing from './Components/pricing';
import Todo from './Components/todo';


function App() {
  const userdetails={}
  const data={}
  return (
    <div className="App">
      
    
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Mainpagee/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/footer' element={<Footer/>}></Route>
        <Route path='/adlogin' element={<Adminlogin/>}></Route>
        <Route path='/agentdash' element={<AgentDashboard/>}></Route>
        <Route path='/userdash' element={<UserDash/>}></Route>
        <Route path='/addash' element={<Admindash/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/userheader' element={<Userdashheader/>}></Route>
        <Route path="/userdash/:id" element={<PropertyDetails />} />
        <Route path='/mylist' element={<MyList />}></Route>
        <Route path='/areg' element={<AgentRegistration/>}></Route>
        <Route path='/alog' element={<AgentLogin/>}></Route>
        <Route path='/wishlist' element={<Wishlist/>}></Route>
        <Route path='/payment' element={<Payment/>}></Route>
        <Route path='/ordersuccess' element={<Ordersuccess/>}></Route>
        <Route path='/payHis' element={<PaymentHis/>}></Route>
        <Route path='/serv' element={<Services/>}></Route>
        <Route path='/prg' element={<Pricing/>}></Route>

        <Route path='/todo' element={<Todo/>}></Route>
        


        {/* <Route path='/todo' element={<Todo/>}></Route>
        <Route path='/' element={<Dynamic/>}></Route> */}
      </Routes>
      </BrowserRouter>
     
    
    </div>
  );
}

export default App;
