import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import SidePanel from './Components/SidePanel';
import SignIn from './Pages/Signin';
import Navbar from './Components/Navbar';

function AppContent() {
  const location = useLocation();
  const isSignInPage = location.pathname === '/signin';

  return (
    <div className="app-container font-primary">
      {!isSignInPage && ( <><SidePanel /> <Navbar/> </>)}
      <main className="content">
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          {/* <Route path="/user" element={<User />} /> */}
          {/* <Route path="/wallet" element={<Wallet />} /> */}
          {/* <Route path="/createad" element={<CreateAd />} /> */}
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
