const { User, Thought } = require('../models');

module.exports = {
    getAllUsers(req, res) {
        User.find()
        .then(async (users) => {
          const userObj = {
            users,
            friendCount: await friendCount,
          };
          return res.json(userObj);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },
    getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId  })
    .select('-__v')
    .then(async (user) =>
      !user
        ? res.status(404).json({ message: 'No user with that email' })
        : res.json(user))
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
},
    createNewUser(req, res){
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res){
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new:true }
        )
        .then((user) => 
            !user
                ? res.status(404).json({ message: 'No user found with that ID.' })
                : res.json(user)
        )
        .catch((err) => { 
            console.log(err);
            res.status(500).json(err);
        });
    },
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No such user exists' })
            : Thought.findOneAndUpdate(
                { users: req.params.userId },
                { $pull: { users: req.params.userId } },
                { new: true }
              )
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
      
    addFriend(req, res){
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId }},
            { runValidators: true, new: true },            
        )
        .then((user) => 
            !user   
                ? res.status(404).json( { message: 'No user with this ID'})
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    removeFriend(req, res){
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId }},
            { new: true },
        )
        .then((user) => 
            !user 
                ? res.status(404).json({ message: 'No user with this ID'})
                :res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    }
};