"use strict";
let {get, post, del, put} = require("./RestAPI_Helper.js");
import auth from './../services/Authentication';

function studentStore() {

  let studentList = {},
    changeListeners = [],
    student = {},
    error = '',
    studentDeleted = 'false';

  function triggerListeners() {
    changeListeners.forEach(function(listener) {
      listener();
    })
  };
  function fetchstudentList() {
    get("/api/students").then((data) => {
      studentList = data;
      triggerListeners();
    });
  }
  function fetchstudent(id) {
    get(`api/students/${id}`).then((data) => {
      student = data;
      triggerListeners();
    });
  };

  function addstudent(student, history) {
    post("/api/students", student).then((g) => {
      student._id = g._id;
      history.pushState(null, '/students/' + g._id);
    }).catch((err) => {
      if (err.status == 401) {
        error = err.message;
        authCheck(history);
      }
    })
  }

  function editstudent(student, id, history) {

    put(`api/students/${id}`, student).then((data) => {
      student = data;
      triggerListeners();
      history.pushState(null, '/students/' + data._id);
    }).catch((err) => {
      if (err.status == 401) {
        error = err.message;
        authCheck(history);
      }
    })
  }

  function deletestudent(id, history) {

    del(`api/students/${id}`).then((g) => {
      studentDeleted = 'true';
      triggerListeners();
      history.pushState(null, '/students');
    }).catch((err) => {
      if (err.status == 401) {
        error = err.message;
        authCheck(history);
      }
    })
  }

  function getstudentList() {
    return studentList;
  };

  function getstudent() {
    studentDeleted = 'false';
    return student;
  };

  function studentDeletionStatus() {
    return studentDeleted;
  };

  function onChange(listener) {
    changeListeners.push(listener);
  }

  function removeChangeListener(listener) {
    var index = changeListeners.findIndex(i => i === listener);
    changeListeners.splice(index, 1);
  }
  function authCheck(history) {
    auth.logout();
    history.pushState(null, '/signin', {session: false});
  }

  function getError() {
    return error;
  };

  return {
    onChange: onChange,
    removeChangeListener: removeChangeListener,
    fetchstudent: fetchstudent,
    getError: getError,
    addstudent: addstudent,
    editstudent: editstudent,
    getstudentList: getstudentList,
    getstudent: getstudent,
    deletestudent: deletestudent,
    fetchstudentList: fetchstudentList,
    studentDeletionStatus: studentDeletionStatus
  }
}

module.exports = new studentStore();
