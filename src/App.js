import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SignIn from './Pages/Signin';
import SignUp from './Pages/SignUp';
import VerifyOTP from './Pages/VerifyOpt';
import DashboardLayout from './Layout/DashboardLayout';
import AdDetails from './Pages/AdDetails';
import CreateAd from './Pages/CreateAd';
import Wallet from './Pages/Wallet';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DashboardLayout />}>
          <Route index element={<AdDetails />} />
          <Route path='dashboard' element={<AdDetails />} />
          <Route path='create-ad' element={<CreateAd />} />
          <Route path='wallet' element={<Wallet />} />
        </Route>
        <Route path='/login' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/verify-otp' element={<VerifyOTP />} />
        <Route path='*' element={<SignIn />} /> {/* Redirect any unknown route to SignIn */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;