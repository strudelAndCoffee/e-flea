const mongoose = require('mongoose');
const { Schema } = mongoose;

const plusSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Plus = mongoose.model('Plus', plusSchema);
module.exports = Plus;