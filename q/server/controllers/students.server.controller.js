var mongoose = require('mongoose');
var student = require('./../models/student.js');
var errorHandler = require('./errors.server.controller');
var _ = require('lodash');

module.exports.list = function(req, res) {
  student.find(function(err, data) {
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
  var student = new student(req.body);
  student.user = req.user;
  student.save(function(err, data) {
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
  res.json(req.student);
};


exports.delete = function(req, res) {
	var student = req.student;
	student.remove(function(err) {
		if (err) {
			return res.status(400).send();
		} else {
			res.json(student);
		}
	});
};


module.exports.update = function(req, res) {
  var student = req.student;

  	student = _.extend(student, req.body);

  	student.save(function(err) {
  		if (err) {
  			return res.status(400).send();
  		} else {
  			res.json(student);
  		}
  	});
};

exports.studentByID = function(req, res, next, id) {
	student.findById(id).populate('user', 'email').exec(function(err, student) {
		if (err) return next(err);
		if (!student) return next(new Error('Failed to load student ' + id));
		req.student = student;
		next();
	});
};
