var mongoose = require('mongoose');
var <%=module_name%> = require('./../models/<%=module_name%>.js');
var errorHandler = require('./errors.server.controller');
var _ = require('lodash');

module.exports.list = function(req, res) {
  <%=module_name%>.find(function(err, data) {
    if (err) {
      return res.status(400).send({

  				message: errorHandler.getErrorMessage(err)
  			});
    } else {
      res.status(200).send(data);
    }
  });
};

module.exports.create = function(req, res) {
  var <%=module_name%> = new <%=module_name%>(req.body);
  <%=module_name%>.user = req.user;
  <%=module_name%>.save(function(err, data) {
    if (err) {
      return res.status(400).send({

  				message: errorHandler.getErrorMessage(err)
  			});
    } else {
      res.status(200).send(data);
    }
  });
};

module.exports.read = function(req, res) {
  res.json(req.<%=module_name%>);
};


exports.delete = function(req, res) {
	var <%=module_name%> = req.<%=module_name%>;
	<%=module_name%>.remove(function(err) {
		if (err) {
			return res.status(400).send();
		} else {
			res.json(<%=module_name%>);
		}
	});
};


module.exports.update = function(req, res) {
  var <%=module_name%> = req.<%=module_name%>;

  	<%=module_name%> = _.extend(<%=module_name%>, req.body);

  	<%=module_name%>.save(function(err) {
  		if (err) {
  			return res.status(400).send();
  		} else {
  			res.json(<%=module_name%>);
  		}
  	});
};

exports.<%=module_name%>ByID = function(req, res, next, id) {
	<%=module_name%>.findById(id).populate('user', 'email').exec(function(err, <%=module_name%>) {
		if (err) return next(err);
		if (!<%=module_name%>) return next(new Error('Failed to load <%=module_name%> ' + id));
		req.<%=module_name%> = <%=module_name%>;
		next();
	});
};
