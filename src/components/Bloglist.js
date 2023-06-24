import Blog from './Blog'

const Bloglist = ({ blogs, addLike }) => {
  blogs.sort((a, b) => b.likes - a.likes)
  return blogs.map((blog) => (
    <Blog key={blog.id} blog={blog} addLike={addLike} />
  ))
}
export default Bloglist
