const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const api = supertest(app)

const bcrypt = require('bcryptjs')
const helper = require('./test_helper')

const User = require('../models/user')

/*beforeAll(() => {
    jest.setTimeout(10000)
})*/

beforeEach(async () => {
    await User.deleteMany({})
})

test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.userInDb()

    const newUser = {
      username: 'test user',
      name: 'user',
      password: 'dragon',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      //.expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.userInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)

})


test('error when username length shorter than 3', async () => {
    const usersAtStart = await helper.userInDb()

    const newUser = {
        username: 'o',
        name: 'jee',
        password: 'dragon',
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
    
    const usersAtEnd = await helper.userInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).not.toContain(newUser.username)

})

test('error when password length shorter than 3', async () => {
    const usersAtStart = await helper.userInDb()

    const newUser = {
        username: 'omg',
        name: 'jee',
        password: 'ha',
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
    
    const usersAtEnd = await helper.userInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).not.toContain(newUser.username)

})


afterAll(async () => {
    await User.deleteMany({})
    await mongoose.connection.close()
})