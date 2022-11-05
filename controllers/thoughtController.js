const { User, Thought} = require('../models');

module.exports = {
  getAllThought(req, res) {
    Thought.find()
    .then((thought) => res.json(thought))
    .catch((err) => res.status(500).json(err));
},
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.id })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'Please try again. No thought with that ID found' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
    
  },    
  createThought(req, res) {
    Thought.create(req.body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'Thought created' })
            : res.json(thought)
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
},
  updateThought(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { runValidators: true, new: true }
      )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'Please try again. No thought with that ID found' })
            : res.json(thought)
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.id })
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: 'Please try again. No thought with that ID found' })
        : User.findOneAndUpdate(
            { videos: req.params.id },
            { $pull: { videos: req.params.id } },
            { new: true }
          )
    )
    .then((thought) =>
          !thought
            ? res.status(404).json({
                message: 'Thought not deleted',
              })
            : res.json({ message: 'Thought has been successfully deleted' })
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },

    createReaction(req, res){
        Thought.findOneAndUpdate(
            { _id: req.params.id},
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true},
        )
        .then((thought) => 
            !thought
                ? res.status(404).json({
                    message: 'Reaction created',
                })
                : res.json({ message: 'Reaction has been successfully created'})
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
    .then((thought) =>
    !thought
      ? res.status(404).json({ message: 'Please try again. No thought with that ID found' })
      : res.json(thought)
  )
  .catch((err) => res.status(500).json(err));
},

};