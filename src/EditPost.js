import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

const EditPost = ({
    // pass picture and any other info from the post you want.
    posts, handleEdit, editTitle, editBody, setEditBody, setEditTitle
 }) => {
    const { id } = useParams();
    // setting it to .toString() bc when it comes out of the params in the URL, it is a string.
    const post = posts.find(post => (post.id).toString() === id);

    useEffect(() => {
        if(post) {
          setEditTitle(post.title);
          setEditBody(post.body);
        }
    }, [post, setEditTitle, setEditBody])
    return (
      <main className="NewPost">
        {editTitle && 
          <> 
            <h2>Edit Post</h2>
            <form className="newPostForm" onSubmit={(e) => e.preventDefault()} >
                <label htmlFor="postTitle">Title:</label>
                <input
                    id='postTitle'
                    type="text"
                    required
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                />
                <label htmlFor="postBody">Post:</label>
                <textarea 
                    id="postBody"
                    required
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                />
                <button type="submit" onClick={() => handleEdit(post.id)}>Post</button>
            </form>
          </>
        }
        {!editTitle && 
          <>
            <h2>Post Not Found.</h2>
            <p> Not sure what you are looking for.</p>
            <p>
                <Link to='/'>Visit Our Homepage.</Link>
            </p>
          </>
        }
    </main>
    )
}

export default EditPost