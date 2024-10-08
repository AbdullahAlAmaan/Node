const Blog = require('../models/blog');

const blog_index = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.render('index', { blogs, title: 'All Blogs' });
  } catch (err) {
    console.log(err);
    res.render('index', { blogs: [], title: 'All Blogs' }); // Pass empty array if there's an error
  }
};
const blog_details = async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await Blog.findById(id);
    res.render('details', { blog, title: 'Blog Details' });
  } catch (err) {
    console.log(err);
    res.render('404', { title: 'Blog not found' });
  }
};

const blog_create_get = (req, res) => {
  res.render('create', { title: 'Create a new blog' });
};

const blog_create_post = async (req, res) => {
  const blog = new Blog(req.body);
  try {
    await blog.save();
    res.redirect('/blogs');
  } catch (err) {
    console.log(err);
  }
};

const blog_delete = async (req, res) => {
  const id = req.params.id;
  try {
    await Blog.findByIdAndDelete(id);
    res.json({ redirect: '/blogs' });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  blog_index, 
  blog_details, 
  blog_create_get, 
  blog_create_post, 
  blog_delete
};
