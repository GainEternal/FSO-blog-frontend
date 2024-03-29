import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const addLike = async (updatedBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(
    baseUrl + '/' + updatedBlog.id,
    updatedBlog,
    config,
  )
  return response.data
}

const remove = async (blogToRemove) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(baseUrl + '/' + blogToRemove.id, config)
  return response
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken, addLike, remove }
