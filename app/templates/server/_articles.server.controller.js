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
  var <%=smallModuleName%> = new <%=module_name%>(req.body);
  <%=smallModuleName%>.user = req.user;
  <%=smallModuleName%>.save(function(err, data) {
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
  res.json(req.<%=smallModuleName%>);
};


exports.delete = function(req, res) {
	var <%=smallModuleName%> = req.<%=smallModuleName%>;
	<%=smallModuleName%>.remove(function(err) {
		if (err) {
			return res.status(400).send();
		} else {
			res.json(<%=smallModuleName%>);
		}
	});
};


module.exports.update = function(req, res) {
  var <%=smallModuleName%> = req.<%=smallModuleName%>;

  	<%=smallModuleName%> = _.extend(<%=smallModuleName%>, req.body);

  	<%=smallModuleName%>.save(function(err) {
  		if (err) {
  			return res.status(400).send();
  		} else {
  			res.json(<%=smallModuleName%>);
  		}
  	});
};

exports.<%=smallModuleName%>ByID = function(req, res, next, id) {
	<%=module_name%>.findById(id).populate('user', 'email').exec(function(err, <%=smallModuleName%>) {
		if (err) return next(err);
		if (!<%=smallModuleName%>) return next(new Error('Failed to load <%=module_name%> ' + id));
		req.<%=smallModuleName%> = <%=smallModuleName%>;
		next();
	});
};
