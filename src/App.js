import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import EditPost from './EditPost';
import About from './About';
import Missing from './Missing';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect} from 'react';
import { format } from 'date-fns';
import api from './api/posts';
import useWindowSize from './hooks/useWindowSize';
import useAxiosFetch from './hooks/useAxiosFetch';

function App() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const navigate = useNavigate();
  const { width } = useWindowSize();

  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');
// do not need the useEffect below bc using useAxiosFetch
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await api.get('/posts');
  //       setPosts(response.data);
  //       console.log(response)
  //     } catch (error) {
  //       if(error.response){
  //           // not in the 200 response range.
  //           console.log(error.response.data);
  //           console.log(error.response.status);
  //           console.log(error.response.headers);
  //       } else {
  //         in case of no response or 404 error code.
  //         console.log(`Error: ${error.message}`);
  //       }
  //     }
  //   }
  //   fetchPosts();
  // }, [])

  // bringing data with the useAxiosFetch above, setting up the posts as the date from axios.
  useEffect(() => {
    setPosts(data)
  }, [data])

  useEffect(() => {
    const filteredResults = posts.filter(post => 
      ((post.body).toLowerCase()).includes(search.toLocaleLowerCase())
      ||((post.title).toLowerCase()).includes(search.toLocaleLowerCase()));

      setSearchResults(filteredResults.reverse());
  }, [posts, search])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id +1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    try {
      // adding axios to post new posts
      const response = await api.post('/posts', newPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostTitle('');
      setPostBody('');
      navigate('/');
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
    try {
      // adding axios for the update. Use put if updating the entire post. Use patch if updating a specific fileds of the post.
      const response = await api.put(`/posts/${id}`, updatedPost)
      // use .map() to eliminate the old post and keep the updated post.
      setPosts(posts.map(post => post.id === id ? { ...response.data } : post));
      setEditTitle('');
      setEditBody('');
      navigate('/');
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const postsList = posts.filter(post => post.id !==id);
      setPosts(postsList);
      navigate('/')
    } catch (error) {
      console.log(`Error: ${error.message}`);

  }
  }


  return (
    <div className="App">
        <Header title="Expat Blog" width={width} />
        <Nav search={search} setSearch={setSearch} />
        <Routes> 
            <Route path="/" 
                   element={<Home 
                      posts={searchResults}
                      fetchError={fetchError}
                      isLoading={isLoading} 
                   />} 
            />
            <Route path="/post" 
                   element={<NewPost 
                       handleSubmit={handleSubmit} 
                       postTitle={postTitle}
                       setPostTitle={setPostTitle}
                       postBody={postBody}
                       setPostBody={setPostBody}
                    />} 
            /> 
            <Route path="/edit/:id" 
                   element={<EditPost 
                       posts={posts}
                       handleEdit={handleEdit} 
                       editTitle={editTitle}
                       setEditTitle={setEditTitle}
                       editBody={editBody}
                       setEditBody={setEditBody}
                    />} 
            /> 
            <Route path="/post/:id" 
                   element={
                        <PostPage 
                              posts={posts} 
                              handleDelete={handleDelete} 
                        />} 
              /> 
            <Route path="/about" 
                    element={<About />} />
            {/* the path * is a catch all. If none of the other paths are catch, the * wll catch it and send to the missing component. */}
            <Route path="*" 
                    element={<Missing />} />
        </Routes>
        <Footer />
    </div>
  );
}

export default App;
