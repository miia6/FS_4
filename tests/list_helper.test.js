const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://localhost:3001/api/blogs',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  const listWithMultipleBlogs = [
    {
      _id: '5a422aa71b54a676234d17f1',
      title: 'Blog 1',
      author: 'Cat 1',
      url: 'http://localhost:3001/api/blogs',
      likes: 1,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f2',
      title: 'Blog 2',
      author: 'Cat 2',
      url: 'http://localhost:3001/api/blogs',
      likes: 2,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f3',
      title: 'Blog 3',
      author: 'Cat 3',
      url: 'http://localhost:3001/api/blogs',
      likes: 3,
      __v: 0
    }
  ]

  test('when list has multiple blogs, equals the likes of those', () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs)
    expect(result).toBe(1+2+3)
  })
})


describe('favorite blog', () => {

  const blogs1 = [
    {
      _id: '5a422aa71b54a676234d17f5',
      title: 'Blog 1',
      author: 'Cat 1',
      url: 'http://localhost:3001/api/blogs',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17g8',
      title: 'Blog 2',
      author: 'Cat 2',
      url: 'http://localhost:3001/api/blogs',
      likes: 7,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Blog 3',
      author: 'Cat 3',
      url: 'http://localhost:3001/api/blogs',
      likes: 6,
      __v: 0
    }
  ]

  test('when list has multiple blogs, favorite is the most liked', () => {
    const result = listHelper.favoriteBlog(blogs1)
    expect(result).toEqual({
      title: 'Blog 2',
      author: 'Cat 2',
      likes: 7
    })
  })

  const blogs2 = [
    {
      _id: '5a422aa71b54a676234d17g1',
      title: 'Blog 4',
      author: 'Cat 4',
      url: 'http://localhost:3001/api/blogs',
      likes: 6,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17g2',
      title: 'Blog 5',
      author: 'Cat 5',
      url: 'http://localhost:3001/api/blogs',
      likes: 6,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17g3',
      title: 'Blog 6',
      author: 'Cat 6',
      url: 'http://localhost:3001/api/blogs',
      likes: 4,
      __v: 0
    }
  ]

  const favorites = [
    {
      title: 'Blog 4',
      author: 'Cat 4',
      likes: 6
    },
    {
      title: 'Blog 5',
      author: 'Cat 5',
      likes: 6
    }
  ]

  test('when list has multiple blogs but two has same amount of likes, favorite is one of them', () => {
    const result = listHelper.favoriteBlog(blogs2)
    expect(favorites).toContainEqual(result)
  })


})

describe('most blogs', () => {
  const blogs3 = [
    {
      _id: '5a422aa71b54a676234d17a1',
      title: 'Blog 7',
      author: 'Cat 7',
      url: 'http://localhost:3001/api/blogs',
      likes: 3,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17a2',
      title: 'Blog 8',
      author: 'Cat 8',
      url: 'http://localhost:3001/api/blogs',
      likes: 6,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17a3',
      title: 'Blog 9',
      author: 'Cat 7',
      url: 'http://localhost:3001/api/blogs',
      likes: 8,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17a4',
      title: 'Blog 10',
      author: 'Cat 7',
      url: 'http://localhost:3001/api/blogs',
      likes: 2,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17a5',
      title: 'Blog 11',
      author: 'Cat 9',
      url: 'http://localhost:3001/api/blogs',
      likes: 4,
      __v: 0
    }
  ]

  test('when list has multiple blogs, returns the author with the most blogs and the blog count', () => {
    const result = listHelper.mostBlogs(blogs3)
    expect(result).toEqual({
      author: 'Cat 7',
      blogs: 3,
    })
  })

  const blogs4 = [
    {
      _id: '5a422aa71b54a676234d17b1',
      title: 'Blog 12',
      author: 'Cat 10',
      url: 'http://localhost:3001/api/blogs',
      likes: 3,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17b2',
      title: 'Blog 13',
      author: 'Cat 10',
      url: 'http://localhost:3001/api/blogs',
      likes: 6,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17b3',
      title: 'Blog 14',
      author: 'Cat 11',
      url: 'http://localhost:3001/api/blogs',
      likes: 8,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17b4',
      title: 'Blog 15',
      author: 'Cat 11',
      url: 'http://localhost:3001/api/blogs',
      likes: 2,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17b5',
      title: 'Blog 16',
      author: 'Cat 12',
      url: 'http://localhost:3001/api/blogs',
      likes: 4,
      __v: 0
    }
  ]

  const topAuthors = [
    {
      author: 'Cat 10',
      blogs: 2
    },
    {
      author: 'Cat 11',
      blogs: 2
    }
  ]

  test('when list has multiple blogs and many top authors, returns one of the authors and the blog count', () => {
    const result = listHelper.mostBlogs(blogs4)
    expect(topAuthors).toContainEqual(result)
  })

})

describe('most likes', () => {

  const blogs5 = [
    {
      _id: '5a422aa71b54a676234d17c1',
      title: 'Blog 17',
      author: 'Cat 13',
      url: 'http://localhost:3001/api/blogs',
      likes: 3,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17c2',
      title: 'Blog 18',
      author: 'Cat 13',
      url: 'http://localhost:3001/api/blogs',
      likes: 6,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17c3',
      title: 'Blog 19',
      author: 'Cat 14',
      url: 'http://localhost:3001/api/blogs',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17c4',
      title: 'Blog 20',
      author: 'Cat 15',
      url: 'http://localhost:3001/api/blogs',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17c5',
      title: 'Blog 21',
      author: 'Cat 15',
      url: 'http://localhost:3001/api/blogs',
      likes: 4,
      __v: 0
    }
  ]

  test('when list has multiple blogs, returns the author with the most likes and the total number of likes', () => {
    const result = listHelper.mostLikes(blogs5)
    expect(result).toEqual({
      author: 'Cat 15',
      likes: 14,
    })
  })

  
  const blogs6 = [
    {
      _id: '5a422aa71b54a676234d17d1',
      title: 'Blog 22',
      author: 'Cat 16',
      url: 'http://localhost:3001/api/blogs',
      likes: 3,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17d2',
      title: 'Blog 23',
      author: 'Cat 16',
      url: 'http://localhost:3001/api/blogs',
      likes: 6,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17d3',
      title: 'Blog 24',
      author: 'Cat 17',
      url: 'http://localhost:3001/api/blogs',
      likes: 7,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17d4',
      title: 'Blog 25',
      author: 'Cat 17',
      url: 'http://localhost:3001/api/blogs',
      likes: 2,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17d5',
      title: 'Blog 26',
      author: 'Cat 18',
      url: 'http://localhost:3001/api/blogs',
      likes: 4,
      __v: 0
    }
  ]

  const topAuthors = [
    {
      author: 'Cat 16',
      likes: 9
    },
    {
      author: 'Cat 17',
      likes: 9
    }
  ]

  test('when list has multiple blogs and many top authors, returns one of the authors and the total number of likes', () => {
    const result = listHelper.mostLikes(blogs6)
    expect(topAuthors).toContainEqual(result)
  })


})