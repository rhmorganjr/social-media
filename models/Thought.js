const { Schema, model } = require('mongoose');
const moment = require('moment');

const ReactionSchema = new Schema (
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      reactionBody: {
        type: String
      },
      username: {
        type: String
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
      }
    },
    {
      toJSON: {
        getters: true
      }
    }
  );

  // create the model using the Schema
//const Thought = model('Thought', ThoughtSchema);

const ThoughtSchema = new Schema({
  thoughtText: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
  },
  username: {
    type: String
  },
  reactions: [
    ReactionSchema
  ]
},
{
  toJSON: {
    virtuals: true,
    getters: true
  },
  id: false
});

// get total count of reactions
ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

// create the model using the Schema
const Thought = model('Thought', ThoughtSchema);

// export the model
module.exports = Thought;