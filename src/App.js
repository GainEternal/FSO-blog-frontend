import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import Login from './components/Login'
import NewBlogForm from './components/NewBlogForm.js'
import Bloglist from './components/Bloglist.js'
import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  })
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

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleNewBlogChange = (event) => {
    if (event.target.name === 'title') {
      setNewBlog({ ...newBlog, title: event.target.value })
    } else if (event.target.name === 'author') {
      setNewBlog({ ...newBlog, author: event.target.value })
    } else if (event.target.name === 'url') {
      setNewBlog({ ...newBlog, url: event.target.value })
    }
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

  const handleCreateBlog = async (event) => {
    event.preventDefault()

    try {
      const returnedBlog = await blogService.create({
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url,
      })

      setBlogs(blogs.concat(returnedBlog))
      setDisplayMessage({
        type: 'success',
        message: `A new blog,  "${returnedBlog.title}" by ${returnedBlog.author}, has been added`,
      })
      setTimeout(() => {
        setDisplayMessage(null)
      }, 5000)

      setNewBlog({
        title: '',
        author: '',
        url: '',
      })
    } catch (exception) {
      setDisplayMessage({ type: 'error', message: 'Invalid Blog' })
      setTimeout(() => {
        setDisplayMessage(null)
      }, 5000)
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

          <NewBlogForm
            newBlog={newBlog}
            handleNewBlog={handleNewBlogChange}
            handleCreateBlog={handleCreateBlog}
          ></NewBlogForm>
          <p></p>
          <Bloglist blogs={blogs} />
        </>
      )}
    </div>
  )
}

export default App
