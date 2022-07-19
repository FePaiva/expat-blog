import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect} from 'react';

function App() {
  return (
    <div className="App">
        <Header />
        <Nav />
        <Routes> 
            <Route path="/" element={<Home />} />
            <Route path="/post" element={<NewPost />} /> 
            <Route path="/post/:id" element={<PostPage />} /> 
            <Route path="/about" element={<About />} />
            {/* the path * is a catch all. If none of the other paths are catch, the * wll catch it and send to the missing component. */}
            <Route path="*" element={<Missing />} />
        </Routes>
        <Footer />
    </div>
  );
}

export default App;
