const NewBlogForm = ({ newBlog, handleNewBlog, handleCreateBlog }) => (
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

export default NewBlogForm
