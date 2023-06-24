import { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import Login from './components/Login'
import NewBlogForm from './components/NewBlogForm.js'
import Bloglist from './components/Bloglist.js'
import loginService from './services/login'
import blogService from './services/blogs'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [displayMessage, setDisplayMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      blogService.setToken(user.token)
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setDisplayMessage({
        type: 'error',
        message: 'Invalid Username or Password',
      })
      setTimeout(() => {
        setDisplayMessage(null)
      }, 5000)
    }
  }

  const createBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)

      setBlogs(blogs.concat({ ...returnedBlog, user: user }))
      setDisplayMessage({
        type: 'success',
        message: `A new blog,  "${returnedBlog.title}" by ${returnedBlog.author}, has been added`,
      })
      setTimeout(() => {
        setDisplayMessage(null)
      }, 5000)
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      setDisplayMessage({ type: 'error', message: 'Invalid Blog' })
      setTimeout(() => {
        setDisplayMessage(null)
      }, 5000)
    }
  }

  const addLike = async (blog) => {
    const returnedBlog = await blogService.addLike({
      ...blog,
      likes: blog.likes + 1,
    })
    setBlogs(
      blogs.map((blog) => {
        return blog.id === returnedBlog.id
          ? { ...blog, likes: returnedBlog.likes }
          : blog
      }),
    )
  }

  const handleRemove = async (blogToRemove) => {
    const confirmString =
      'Remove blog "' + blogToRemove.title + '" by ' + blogToRemove.author + '?'
    if (window.confirm(confirmString)) {
      const response = await blogService.remove(blogToRemove)
      console.log(response)
      setBlogs(blogs.filter((blog) => blog.id !== blogToRemove.id))
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    setUser(null)
    window.localStorage.clear()
  }

  return (
    <div>
      <h1>Blogz</h1>

      <Notification message={displayMessage} />

      {user === null ? (
        <Login
          username={username}
          password={password}
          handleLogin={handleLogin}
          handleUsername={handleUsernameChange}
          handlePassword={handlePasswordChange}
        />
      ) : (
        <>
          <p>
            {user.name} is logged in{' '}
            <button onClick={handleLogout}>Logout</button>
          </p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <NewBlogForm createBlog={createBlog} />
          </Togglable>
          <p></p>
          <Bloglist
            blogs={blogs}
            user={user}
            addLike={addLike}
            handleRemove={handleRemove}
          />
        </>
      )}
    </div>
  )
}

export default App
