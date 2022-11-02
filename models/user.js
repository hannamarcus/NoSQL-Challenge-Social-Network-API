const { Schema, model } = require('mongoose');


// Schema to create User model
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        dropDups: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validator: function (value) {
            return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
        },
        message: (props) => `${props.value} is not a valid email address!`,
    },
    thoughts: {
        type: Schema.Types.ObjectID,
        ref: 'Thought'
    },
    friends: [{
        type: Schema.Types.ObjectID,
        ref: 'User'
    }],
},

    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

const User = model('User', userSchema);

module.exports = User;