"use strict";
let {get, post, del, put} = require("./RestAPI_Helper.js");
import auth from './../services/Authentication';

function <%= module_name%>Store() {

  let <%=smallModuleName%>List = {},
    changeListeners = [],
    <%=smallModuleName%> = {},
    error = '',
    <%=smallModuleName%>Deleted = 'false';

  function triggerListeners() {
    changeListeners.forEach(function(listener) {
      listener();
    })
  };
  function fetch<%=module_name%>List() {
    get("/api/<%=smallModuleName%>s").then((data) => {
      <%=smallModuleName%>List = data;
      triggerListeners();
    });
  }
  function fetch<%=module_name%>(id) {
    get(`api/<%=smallModuleName%>s/${id}`).then((data) => {
      <%=smallModuleName%> = data;
      triggerListeners();
    });
  };

  function add<%=module_name%>(<%=smallModuleName%>, history) {
    post("/api/<%=smallModuleName%>s", <%=smallModuleName%>).then((g) => {
      <%=smallModuleName%>._id = g._id;
      history.pushState(null, '/<%=smallModuleName%>s/' + g._id);
    }).catch((err) => {
      if (err.status == 401) {
        error = err.message;
        authCheck(history);
      }
    })
  }

  function edit<%=module_name%>(<%=smallModuleName%>, id, history) {

    put(`api/<%=smallModuleName%>s/${id}`, <%=smallModuleName%>).then((data) => {
      <%=smallModuleName%> = data;
      triggerListeners();
      history.pushState(null, '/<%=smallModuleName%>s/' + data._id);
    }).catch((err) => {
      if (err.status == 401) {
        error = err.message;
        authCheck(history);
      }
    })
  }

  function delete<%=module_name%>(id, history) {

    del(`api/<%=smallModuleName%>s/${id}`).then((g) => {
      <%=smallModuleName%>Deleted = 'true';
      triggerListeners();
      history.pushState(null, '/<%=smallModuleName%>s');
    }).catch((err) => {
      if (err.status == 401) {
        error = err.message;
        authCheck(history);
      }
    })
  }

  function get<%=module_name%>List() {
    return <%=smallModuleName%>List;
  };

  function get<%=module_name%>() {
    <%=smallModuleName%>Deleted = 'false';
    return <%=smallModuleName%>;
  };

  function <%=module_name%>DeletionStatus() {
    return <%=smallModuleName%>Deleted;
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
