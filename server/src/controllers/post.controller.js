const Post = require('../models/Post');
const asyncHandler = require('../utils/asyncHandler');
const { uniqueSlug } = require('../utils/generateSlug');

exports.createPost = asyncHandler(async (req, res) => {
  const { title, imageURL, content } = req.body;

  const post = await Post.create({
    title,
    imageURL: imageURL || '',
    content,
    username: req.user.username,
    user: req.user.id,
    slug: uniqueSlug(title)
  });

  res.status(201).json(post);
});

exports.getPosts = asyncHandler(async (req, res) => {
  const page  = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 50);
  const search = (req.query.search || '').trim();

  const filter = search
    ? {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { username: { $regex: search, $options: 'i' } }
        ]
      }
    : {};

  const [items, total] = await Promise.all([
    Post.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).select('-__v'),
    Post.countDocuments(filter)
  ]);

  res.json({
    data: items,
    page,
    limit,
    totalDocs: total,
    totalPages: Math.ceil(total / limit)
  });
});

exports.getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).select('-__v');
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json(post);
});

exports.getPostBySlug = asyncHandler(async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug }).select('-__v');
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json(post);
});

exports.updatePost = asyncHandler(async (req, res) => {
  const { title, imageURL, content } = req.body;
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });

  if (post.user.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Forbidden: not the owner' });
  }

  if (title) {
    post.title = title;
    post.slug = uniqueSlug(title);
  }
  if (typeof imageURL === 'string') post.imageURL = imageURL;
  if (content) post.content = content;

  const saved = await post.save();
  res.json(saved);
});

exports.deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });

  if (post.user.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Forbidden: not the owner' });
  }

  await post.deleteOne();
  res.json({ message: 'Post deleted' });
});
