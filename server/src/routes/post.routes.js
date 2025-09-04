const router = require('express').Router();
const { body, param, query } = require('express-validator');
const { validate } = require('../middleware/validate');
const auth = require('../middleware/auth');

const {
  createPost, getPosts, getPostById, getPostBySlug,
  updatePost, deletePost
} = require('../controllers/post.controller');

router.get(
  '/',
  validate([
    query('page').optional().isInt({ min: 1 }).withMessage('page must be >=1'),
    query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('limit 1–50')
  ]),
  getPosts
);

router.get(
  '/:id',
  validate([ param('id').isMongoId().withMessage('invalid post id') ]),
  getPostById
);

router.get('/slug/:slug', getPostBySlug);

router.post(
  '/',
  auth,
  validate([
    body('title').isString().isLength({ min: 5, max: 120 }).withMessage('title 5–120 chars'),
    body('imageURL').optional().isURL().withMessage('imageURL must be a valid URL'),
    body('content').isString().isLength({ min: 50 }).withMessage('content min 50 chars')
  ]),
  createPost
);

router.put(
  '/:id',
  auth,
  validate([
    param('id').isMongoId(),
    body('title').optional().isString().isLength({ min: 5, max: 120 }),
    body('imageURL').optional().isURL(),
    body('content').optional().isString().isLength({ min: 50 })
  ]),
  updatePost
);

router.delete(
  '/:id',
  auth,
  validate([ param('id').isMongoId() ]),
  deletePost
);

module.exports = router;
