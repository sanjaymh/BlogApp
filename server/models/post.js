const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'user' },
    comments: [
        {
         title:{type:String},
         description:{type:String}
        } 
    ]
});

module.exports = mongoose.model('post', postSchema);