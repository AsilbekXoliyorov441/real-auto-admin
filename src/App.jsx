import './App.css'
import { BrowserRouter, Route,  Routes } from 'react-router-dom'
import AdminLayout from './components/admin-layout'
import LoginPage from './pages/login/LoginPage';
import { useEffect } from 'react';
import CategoriesPage from './pages/categories';
import BrandsPage from './pages/brands';
import CitiesPage from './pages/cities';
import LocationPage from './pages/location';
import CarsPage from './pages/cars';
import ModelsPage from './pages/models';

function App() {

  const token = localStorage.getItem("TOKEN")
  const message = localStorage.getItem("Message")
  console.log(message);

  useEffect(() => {
      if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark')
    }
  } , [])

  return (
    <BrowserRouter>
      <Routes>
        {token && message ? (
          <Route element={<AdminLayout />}>
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/brands" element={<BrandsPage />} />
            <Route path="/cities" element={<CitiesPage />} />
            <Route path="/locations" element={<LocationPage />} />
            <Route path="/cars" element={<CarsPage />} />
            <Route path="/models" element={<ModelsPage />} />
          </Route>
        ) : (
          <Route path="/login" element={<LoginPage />} />
        )}
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
