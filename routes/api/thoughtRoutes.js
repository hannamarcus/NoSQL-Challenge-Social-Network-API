const router = require('express').Router();
const {
  getThoughts,
  createThought,
  deleteThought,
  createReaction,
  deleteReaction
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:id
router.route('/:id').get(createThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:id/reactions').post(createReaction);

router.route('/:id/reactions/:reactionId').delete(deleteReaction);

module.exports = router;