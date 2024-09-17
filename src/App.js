import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SignIn from './Pages/Signin';
import Dashboard from './Pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<Dashboard/>} />
        <Route path='/signin' element={<SignIn/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
