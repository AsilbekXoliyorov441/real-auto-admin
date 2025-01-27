import './App.css'
import { BrowserRouter, Route,  Routes } from 'react-router-dom'
import AdminLayout from './components/admin-layout'
import DashboardPage from './pages/DashboardPage'
import LoginPage from './pages/login/LoginPage';

function App() {

  const token = localStorage.getItem("TOKEN")
  const message = localStorage.getItem("Message")
  console.log(message);

  return (
    <BrowserRouter>
      <Routes>
        {token && message ? 
        <Route  element={<AdminLayout />}>
          <Route path='/dashboard' element={<DashboardPage />} />
        </Route> :
        <Route path='/login' element={<LoginPage/>} />  
      }
        <Route path='/login' element={<LoginPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App
