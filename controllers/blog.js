const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', {username: 1, name: 1, id: 1})

  response.json(blogs)
})

blogRouter.put('/:id', async (request, response, params) => {
  const {likes} = request.body
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, { likes }, { new: true })
  response.status(200).json(updatedBlog)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body

  //console.log("Request token: " + request.token)
  //console.log("SECRET variable: " + process.env.SECRET)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  if (body.url === undefined || body.title === undefined) {
    return response.status(400).end()
  } 

  const user = request.user // await User.findById(decodedToken.id)  

  const blog = new Blog({
    title: body.title, 
    author: body.author,
    url: body.url,
    user: user.id,
    likes: body.likes === undefined ? 0 : body.likes,
  })
  
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()

  //console.log(user)
  response.status(201).json(savedBlog)
  //response.json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const id = request.params.id
  const blog = await Blog.findById(id)
  const user = request.user

  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(id)
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'error deleting blog' })
  }
})


module.exports = blogRouter
