"use strict";
let {get, post, del, put} = require("./RestAPI_Helper.js");
import auth from './../services/Authentication';

function productsStore() {

  let productsList = {},
    changeListeners = [],
    products = {},
    error = '',
    productsDeleted = 'false';

  function triggerListeners() {
    changeListeners.forEach(function(listener) {
      listener();
    })
  };
  function fetchproductsList() {
    get("/api/productss").then((data) => {
      productsList = data;
      triggerListeners();
    });
  }
  function fetchproducts(id) {
    get(`api/productss/${id}`).then((data) => {
      products = data;
      triggerListeners();
    });
  };

  function addproducts(products, history) {
    post("/api/productss", products).then((g) => {
      products._id = g._id;
      history.pushState(null, '/productss/' + g._id);
    }).catch((err) => {
      if (err.status == 401) {
        error = err.message;
        authCheck(history);
      }
    })
  }

  function editproducts(products, id, history) {

    put(`api/productss/${id}`, products).then((data) => {
      products = data;
      triggerListeners();
      history.pushState(null, '/productss/' + data._id);
    }).catch((err) => {
      if (err.status == 401) {
        error = err.message;
        authCheck(history);
      }
    })
  }

  function deleteproducts(id, history) {

    del(`api/productss/${id}`).then((g) => {
      productsDeleted = 'true';
      triggerListeners();
      history.pushState(null, '/productss');
    }).catch((err) => {
      if (err.status == 401) {
        error = err.message;
        authCheck(history);
      }
    })
  }

  function getproductsList() {
    return productsList;
  };

  function getproducts() {
    productsDeleted = 'false';
    return products;
  };

  function productsDeletionStatus() {
    return productsDeleted;
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
    fetchproducts: fetchproducts,
    getError: getError,
    addproducts: addproducts,
    editproducts: editproducts,
    getproductsList: getproductsList,
    getproducts: getproducts,
    deleteproducts: deleteproducts,
    fetchproductsList: fetchproductsList,
    productsDeletionStatus: productsDeletionStatus
  }
}

module.exports = new productsStore();
