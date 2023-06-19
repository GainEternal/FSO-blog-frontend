import { useState } from 'react'

const NewBlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  })

  const handleNewBlog = (event) => {
    if (event.target.name === 'title') {
      setNewBlog({ ...newBlog, title: event.target.value })
    } else if (event.target.name === 'author') {
      setNewBlog({ ...newBlog, author: event.target.value })
    } else if (event.target.name === 'url') {
      setNewBlog({ ...newBlog, url: event.target.value })
    }
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    })

    setNewBlog({
      title: '',
      author: '',
      url: '',
    })
  }

  return (
    <>
      <h2>Create New Blog</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          Title:
          <input
            type="text"
            value={newBlog.title}
            name="title"
            onChange={handleNewBlog}
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            value={newBlog.author}
            name="author"
            onChange={handleNewBlog}
          />
        </div>
        <div>
          URL:
          <input
            type="url"
            value={newBlog.url}
            name="url"
            onChange={handleNewBlog}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </>
  )
}

export default NewBlogForm
