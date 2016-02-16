var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var studentSchema = {


name: { 
 type: String, 
 trim: true 
}, 
age: { 
 type: String,  
 trim: true 
},
  content: {
    type: String,
    default: '',
    trim: true,
    required: 'Content required'

  },

  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },

  created: {
    type: Date,
    default: Date.now
  }
}

var student = mongoose.model('student', studentSchema, 'students');
module.exports = student;
