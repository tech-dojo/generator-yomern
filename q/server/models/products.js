var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var productsSchema = {


title: { 
 type: String, 
 trim: true 
}, 
price: { 
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

var products = mongoose.model('products', productsSchema, 'productss');
module.exports = products;
