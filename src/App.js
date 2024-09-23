import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SignIn from './Pages/Signin';
import Dashboard from './Pages/Dashboard';
import SignUp from './Pages/SignUp';
import VerifyOTP from './Pages/VerifyOpt';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<Dashboard/>} />
        <Route path='/login' element={<SignIn/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/verify-otp' element={<VerifyOTP/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
