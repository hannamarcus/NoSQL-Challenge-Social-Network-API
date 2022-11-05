const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
      reactionBody: {
        type: String,
        required: true,
        max_length: 280,
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
          type: Date,
          default: Date.now,
      },
    },
    {
      toJSON: {
        getters: true,
      },
    }
  );

  const thoughtSchema = new Schema(
    {
      thoughtText: {
        type: String,
        required: true,
        max_length: 280,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      username: {
        type: String,
        required: true,
      },
      reactions: [reactionSchema],
    },
    {
      toJSON: {
        getters: true,
      },
    }
  );
  
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;