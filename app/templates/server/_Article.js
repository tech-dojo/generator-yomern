var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var <%= module_name%>Schema = {

  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title required'
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

var< %=module_name %> = mongoose.model('<%=module_name%>', <%=module_name%>Schema, '<%=module_name%>s');
module.exports = <%=module_name%>;
