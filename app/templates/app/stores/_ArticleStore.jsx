"use strict";
let {get, post, del, put} = require("./RestAPI_Helper.js");
import auth from './../services/Authentication';

function <%= module_name%>Store() {

  let <%=module_name%>List = {},
    changeListeners = [],
    <%=module_name%> = {},
    error = '',
    <%=module_name%>Deleted = 'false';

  function triggerListeners() {
    changeListeners.forEach(function(listener) {
      listener();
    })
  };
  function fetch<%=module_name%>List() {
    get("/api/<%=module_name%>s").then((data) => {
      <%=module_name%>List = data;
      triggerListeners();
    });
  }
  function fetch<%=module_name%>(id) {
    get(`api/<%=module_name%>s/${id}`).then((data) => {
      <%=module_name%> = data;
      triggerListeners();
    });
  };

  function add<%=module_name%>(<%=module_name%>, history) {
    post("/api/<%=module_name%>s", <%=module_name%>).then((g) => {
      <%=module_name%>._id = g._id;
      history.pushState(null, '/<%=module_name%>s/' + g._id);
    }).catch((err) => {
      if (err.status == 401) {
        error = err.message;
        authCheck(history);
      }
    })
  }

  function edit<%=module_name%>(<%=module_name%>, id, history) {

    put(`api/<%=module_name%>s/${id}`, <%=module_name%>).then((data) => {
      <%=module_name%> = data;
      triggerListeners();
      history.pushState(null, '/<%=module_name%>s/' + data._id);
    }).catch((err) => {
      if (err.status == 401) {
        error = err.message;
        authCheck(history);
      }
    })
  }

  function delete<%=module_name%>(id, history) {

    del(`api/<%=module_name%>s/${id}`).then((g) => {
      <%=module_name%>Deleted = 'true';
      triggerListeners();
      history.pushState(null, '/<%=module_name%>s');
    }).catch((err) => {
      if (err.status == 401) {
        error = err.message;
        authCheck(history);
      }
    })
  }

  function get<%=module_name%>List() {
    return <%=module_name%>List;
  };

  function get<%=module_name%>() {
    <%=module_name%>Deleted = 'false';
    return <%=module_name%>;
  };

  function <%=module_name%>DeletionStatus() {
    return <%=module_name%>Deleted;
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
    fetch<%=module_name%>: fetch<%=module_name%>,
    getError: getError,
    add<%=module_name%>: add<%=module_name%>,
    edit<%=module_name%>: edit<%=module_name%>,
    get<%=module_name%>List: get<%=module_name%>List,
    get<%=module_name%>: get<%=module_name%>,
    delete<%=module_name%>: delete<%=module_name%>,
    fetch<%=module_name%>List: fetch<%=module_name%>List,
    <%=module_name%>DeletionStatus: <%=module_name%>DeletionStatus
  }
}

module.exports = new <%=module_name%>Store();
