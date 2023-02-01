import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Login from './components/Login'
import Bloglist from './components/Bloglist.js'
import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [showAll, setShowAll] = useState(true)
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
      //noteService.setToken(user.token)
    }
  }, [])

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
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setDisplayMessage({ type: 'error', message: 'Wrong credentials' })
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
      <h2>blogs</h2>

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
          <Bloglist blogs={blogs} />
        </>
      )}
    </div>
  )
}

export default App
