var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var mkdirp = require('mkdirp');
var s = require("underscore.string");
module.exports = yeoman.Base.extend({

  promptUser: function () {
    var done = this.async();

    // have Yeoman greet the user
    console.log('Hello There Fellow MERN User');

    var prompts = [{
      name: 'moduleName',
      message: 'What is your module name?'
    }, {
      type: 'confirm',
      name: 'module',
      message: 'Would you like to generate a new CRUD component ?'
    }];

    this.prompt(prompts, function (props) {
      this.moduleName = props.moduleName;
      this.module = props.module;

      done();
    }.bind(this));
  },

  copyMainFiles: function () {
    if (this.module) {
      console.log(chalk.red.bgWhite.bold('Add the front-end routes for the module in app.jsx, add the backend-routes in routeHelper.js, require the backend-route file in the express.js file and require the model in server.js file'));
    } else {
      console.log(chalk.red.bgWhite.bold('Aborted'));
    }
  },

  AddFieldName: function () {
    if (this.module) {
      var done = this.async();
      var prompts = [{
        name: 'fieldName',
        message: 'Add a field name to the model'
      }, {
        type: 'confirm',
        name: 'addFieldName2',
        message: 'Would you like to add another field name to the model?'
      }];

      this.prompt(prompts, function (props) {
        this.fieldName = props.fieldName;
        this.addFieldName2 = props.addFieldName2;

        done();
      }.bind(this));
    }
  },

  AddFieldName2: function () {
    if (this.module && this.addFieldName2) {
      var done = this.async();
      var prompts = [{
        name: 'fieldName2',
        message: 'What is your other field name?'
      }];


      this.prompt(prompts, function (props) {
        this.fieldName2 = props.fieldName2;

        done();
      }.bind(this));

    }

  },

  createModel: function () {

        var smallModuleName = s.decapitalize(this.moduleName);
        var capitalfieldName = s.capitalize(this.fieldName);
        var capitalfieldName2 = s.capitalize(this.fieldName2);


    if (this.fieldName) {
      var modelFields = this.fieldName + ": { \n type: String,\n default: \'\',  \n trim: true \n}, \n";
      var handleInputBind = "this.handleInput"+ capitalfieldName + "= this.handleInput" +capitalfieldName+ ".bind(this);\n";
      var handleInput = "handleInput"+capitalfieldName+"(value) { \n this.setState({ "+this.moduleName+": value }); \n }; \n \n";
      var inputHtml = "handleInput"+capitalfieldName+" = {this.handleInput"+capitalfieldName+"} ";
      var formhandleInput = "handleInput"+capitalfieldName+"(e) { \n this.props."+this.moduleName+"."+this.fieldName+" = e.target.value; \n this.props.handleInput"+capitalfieldName+"(this.props."+this.moduleName+"); \n } \n ";
      var formInputHtml = "<Input type=\"text\" value={"+this.moduleName+"."+this.fieldName+"} label=\""+capitalfieldName+"\" required onChange={this.handleInput"+capitalfieldName+"} placeholder=\"Enter "+this.moduleName+" "+capitalfieldName+"\" /> \n";
      }
    if (this.addFieldName2) {
      var modelFields = modelFields + this.fieldName2 + ": { \n type: String,\n default: \'\',  \n trim: true \n},";
      var handleInputBindedit = handleInputBind +"    this.handleInput"+capitalfieldName2 + "= this.handleInput" +capitalfieldName2+ ".bind(this);";
      var handleInputBind = handleInputBind +"   this.handleInput"+capitalfieldName2 + "= this.handleInput" +capitalfieldName2+ ".bind(this);";
      var handleInput = handleInput +"handleInput"+capitalfieldName2+"(value) { \n this.setState({ "+this.moduleName+": value }); \n }; \n \n";
      var inputHtml = inputHtml+"handleInput"+capitalfieldName2+" = {this.handleInput"+capitalfieldName2+"}";
      var formhandleInput = formhandleInput +"handleInput"+capitalfieldName2+"(e) { \n this.props."+this.moduleName+"."+this.fieldName2+" = e.target.value; \n this.props.handleInput"+capitalfieldName2+"(this.props."+this.moduleName+"); \n } \n ";
      var formInputHtml = formInputHtml + "<Input type=\"text\" value={"+this.moduleName+"."+this.fieldName2+"} label=\""+capitalfieldName2+"\" required onChange={this.handleInput"+capitalfieldName2+"} placeholder=\"Enter "+this.moduleName+" "+capitalfieldName2+"\" /> ";
    }

    var context = {
      fieldName: this.fieldName,
      module_name: this.moduleName,
      fieldName2: this.fieldName2,
      modelFields: modelFields,
      handleInput: handleInput,
      handleInputBind: handleInputBind,
      handleInputBindedit: handleInputBindedit,
      inputHtml: inputHtml,
      formhandleInput: formhandleInput,
      smallModuleName : smallModuleName,
      capitalfieldName: capitalfieldName,
      capitalfieldName2: capitalfieldName2,
      formInputHtml: formInputHtml

    };

    this.template("app/_CreateArticle.jsx", "app/components/" + smallModuleName + "s/Create" + this.moduleName + ".jsx", context);
    this.template("app/_EditArticle.jsx", "app/components/" + smallModuleName + "s/Edit" + this.moduleName + ".jsx", context);
    this.template("app/_ViewArticle.jsx", "app/components/" + smallModuleName + "s/View" + this.moduleName + ".jsx", context);
    this.template("app/_ViewArticleChild.jsx", "app/components/" + smallModuleName + "s/View" + this.moduleName + "Child.jsx", context);
    this.template("app/_ListArticles.jsx", "app/components/" + smallModuleName + "s/List" + this.moduleName + "s.jsx", context);
    this.template("app/_ListArticlesChild.jsx", "app/components/" + smallModuleName + "s/List" + this.moduleName + "sChild.jsx", context);
    this.template("app/_Form.jsx", "app/components/" + smallModuleName + "s/Form.jsx", context);

    this.template("app/stores/_ArticleStore.jsx", "app/stores/" + this.moduleName + "Store.jsx", context);

    this.template("server/_Article.js", "server/models/" + this.moduleName + ".js", context);
    this.template("server/_articles.server.controller.js", "server/controllers/" + smallModuleName + "s.server.controller.js", context);
    this.template("server/_routes.js", "server/routes/" + smallModuleName + ".server.routes.js", context);
}

});
