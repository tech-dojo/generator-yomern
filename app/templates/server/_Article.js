var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var <%= module_name%>Schema = {

<%-modelFields%>
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },

  created: {
    type: Date,
    default: Date.now
  }
}

var <%=module_name%> = mongoose.model('<%=module_name%>', <%=module_name%>Schema,'<%=smallModuleName%>s');
module.exports = <%=module_name%>;
