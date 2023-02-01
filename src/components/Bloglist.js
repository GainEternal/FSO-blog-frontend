import Blog from './Blog'

const Bloglist = ({ blogs }) =>
  blogs.map((blog) => <Blog key={blog.id} blog={blog} />)

export default Bloglist
