const { User } = require('../models');

const friendController = {
  addFriend({ params, body }, res) {
    User.findOneAndUpdate(
      { _id: params.friendId },
      { $push: { replies: body } },
      { new: true }
    )
    .then(dbUserData => {
       if (!dbUserData) {
         res.status(404).json({ message: 'No user found with this id!' });
         return;
       }
       res.json(dbUserData);
     })
    .catch(err => res.json(err));
  },
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.friendId },
      { $pull: { replies: { friendId: params.friendId } } },
      { new: true }
    )
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.json(err));
  }
};

module.exports = friendController;