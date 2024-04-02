const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const api = supertest(app)

const bcrypt = require('bcryptjs')
const helper = require('./test_helper')

const Blog = require('../models/blog')
const User = require('../models/user')


beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
    await User.deleteMany({})
}, 10000)

test('2 blogs (initial) are shown', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
}, 10000)

test('blogs have parameter called id (not _id)', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
        expect(blog.id).toBeDefined()
    })
}, 10000)

describe('addition of a new blog', () => {

    beforeEach(async () => {
        await User.deleteMany({})
    }, 10000)

    test('creating a new blog post works', async () => {

        const newUser = helper.initialUser

        await api
            .post('/api/users')
            .send(newUser)

        const loginResponse = await api
            .post('/api/login')
            .send(newUser)

        const token = loginResponse.body.token

        const blog = {
            title: 'Blog 3',
            author: "Cat 3",
            url: "test1",
            likes: 0,
        }
    
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(blog)
            .expect(201)
    
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    
    }, 10000)

    test('likes value is set to 0 if not defined', async () => {

        const newUser = helper.initialUser

        await api
            .post('/api/users')
            .send(newUser)

        const loginResponse = await api
            .post('/api/login')
            .send(newUser)

        const token = loginResponse.body.token

        const blog = {
            title: "Blog 4",
            author: "Cat 4",
            url: "test2",
        }
    
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(blog)
        
        const blogsAtEnd = await helper.blogsInDb()
        const newBlog = blogsAtEnd.find(blog => blog.title === "Blog 4")
        expect(newBlog.likes).toBe(0)
    
    }, 10000)
    
    test('backend responds with 400 if the title is missing', async () => {    

        const newUser = helper.initialUser

        await api
            .post('/api/users')
            .send(newUser)

        const loginResponse = await api
            .post('/api/login')
            .send(newUser)

        const token = loginResponse.body.token

        const blog = {
            author: "Cat 5",
            likes: 4,
            url: "test1",
        }
    
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(blog)
            .expect(400)
    
    }, 10000)

    test('backend responds with 400 if the url is missing', async () => {

        const newUser = helper.initialUser

        await api
            .post('/api/users')
            .send(newUser)

        const loginResponse = await api
            .post('/api/login')
            .send(newUser)

        const token = loginResponse.body.token
        
        const blog = {
            title: "Blog 6",
            author: "Cat 6",
            likes: 3
        }
    
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(blog)
            .expect(400)
    
    }, 10000)

})

test('updating likes succeeds', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = {
        likes: blogToUpdate.likes + 1,
    }

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const uptadedBlogAtEnd = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)
    expect(uptadedBlogAtEnd.likes).toBe(blogToUpdate.likes + 1)

}, 10000)

describe('deletion of a blog', () => {

    beforeEach(async () => {
        await User.deleteMany({})
        await Blog.deleteMany({})
    }, 10000)

        
    test('deletion of a blog succeeds', async () => {

        const newUser = helper.initialUser

        await api
            .post('/api/users')
            .send(newUser)

        const loginResponse = await api
            .post('/api/login')
            .send(newUser)

        const token = loginResponse.body.token

        const blog = {
            title: 'Blog',
            author: 'test',
            url: "test",
            likes: 0,
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(blog)
            .expect(201)
        
        const blogs = await helper.blogsInDb()
        const blogToDelete = blogs[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(0)

        const titles = blogsAtEnd.map(blog => blog.title)
        expect(titles).not.toContain(blogToDelete.title)

    }, 10000)

})


afterAll(async () => {
    await mongoose.connection.close()
})