import Blog from './Blog'

const Bloglist = ({ blogs, user, addLike, handleRemove }) => {
  blogs.sort((a, b) => b.likes - a.likes)
  return blogs.map((blog) => (
    <Blog
      key={blog.id}
      blog={blog}
      addLike={addLike}
      handleRemove={handleRemove}
      user={user}
    />
  ))
}
export default Bloglist
