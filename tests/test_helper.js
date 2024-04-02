const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: "Blog 1",
        author: "Cat 1",
        likes: 0,
    },
    {
        title: "Blog 2",
        author: "Cat 2",
        likes: 0,
    },
]

const initialUser = {
    username: 'test user',
    name: 'user',
    password: 'dragon',
  }

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const userInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs,
    initialUser,
    blogsInDb,
    userInDb
}