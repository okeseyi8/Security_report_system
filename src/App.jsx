import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/images/vite.svg'
import './App.css'
import Home from './pages/Home'
import Router from './router/Router'
import { Toaster } from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';
function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in ms
      once: true,     // whether animation should happen only once
    });
  }, []);

  return (
    <>
    
    <Router />
    <Toaster position='top-center'/>
    </>
   
   
  )
}

export default App
