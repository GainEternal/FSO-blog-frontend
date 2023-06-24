import Blog from './Blog'

const Bloglist = ({ blogs, addLike }) =>
  blogs.map((blog) => <Blog key={blog.id} blog={blog} addLike={addLike} />)

export default Bloglist
