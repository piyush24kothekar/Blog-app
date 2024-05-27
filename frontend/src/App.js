import { useState } from 'react';
import Login from './components/accounts/Login.js';
import './App.css';
import DataProvider from './context/DataProvider.js';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';//</BrowserRouter> puri application me routing ko enable kar dega  aur jis jis component ke liye aapko routing karni hai unko Routes ke andar dalna padega

import Home from './components/Home/Home.js';
import Header from './components/Header/Header.js';
import CreatePost from './components/create/CreatePost.js';
import DetailView from './components/details/DetailView.js';
import UpdatePost from './components/create/update.js';
import Contact from './contact/contact.js';
import About from './about/about.js';

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ? 
  <>
  <Header/>
    <Outlet />
    {/* Outlet ki help se PrivateRoute ke andar ke child components ko dikhayega */}
  </> 
  : 
  <Navigate replace to='/login' />//agar user login nhi hai toh login karo
}

function App() {

  const [isAuthenticated, isUserAuthenticated] = useState(false);

  return (
    <DataProvider>
      <BrowserRouter>
        <div style={{ marginTop: 160 }}>
          <Routes>
          {/* user bydefault login ko acesss kar sakhta hai */}
            <Route path='/login' element={<Login isUserAuthenticated={isUserAuthenticated} />} />

            <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/" element={<Home />} />
            </Route>

            <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/create" element={<CreatePost />} />
            </Route>
            
            <Route path='/details/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/details/:id' element={<DetailView />} />
            </Route>

            <Route path='/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/update/:id' element={<UpdatePost />} />
            </Route>

            <Route path='/about' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/about' element={<About />} />
            </Route>

            <Route path='/contact' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/contact' element={<Contact />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
