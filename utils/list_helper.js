const lodash = require('lodash');

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {

    const favoriteBlog = blogs.reduce((favBlog, blog) => 
        (blog.likes > favBlog.likes ? blog : favBlog), blogs[0])
    
    return {
        title: favoriteBlog.title,
        author: favoriteBlog.author,
        likes: favoriteBlog.likes
    }
}

const mostBlogs = (blogs) => {
    const blogCounts = lodash.countBy(blogs, 'author')
    const topAuthor = lodash.maxBy(lodash.entries(blogCounts), ([, count]) => count)

    //console.log(blogCounts)
    //console.log(topAuthor)

    return {
        author: topAuthor[0],
        blogs: topAuthor[1]
    }
}

const mostLikes = (blogs) => {
    const authors = lodash.groupBy(blogs, 'author')
    const totalLikes = lodash.mapValues(authors, (blogs) => lodash.sumBy(blogs, 'likes'))
    const topAuthor = lodash.maxBy(lodash.entries(totalLikes), ([, likes]) => likes)

    return {
        author: topAuthor[0],
        likes: topAuthor[1]
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}