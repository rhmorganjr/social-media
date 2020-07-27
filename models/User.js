const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  username: {
    type: String
  },
  email: {
    type: String
  },
  thoughts: [
    {
    type: Schema.Types.ObjectId,
    ref: 'Thought'
    }
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
},
{
  toJSON: {
    virtuals: true,
  },
  id: false
});

// get total count of thoughts and reactions on retrieval
//UserSchema.virtual('thoughtCount').get(function() {
//  return this.thoughts.reduce((total, thought) => total + thought.reactions.length + 1, 0);
//});

UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

// create the Pizza model using the PizzaSchema
const User = model('User', UserSchema);

// export the Pizza model
module.exports = User;