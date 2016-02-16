var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var mkdirp = require('mkdirp');
module.exports = yeoman.Base.extend({


  promptUser: function() {
    var done = this.async();

    // have Yeoman greet the user
    console.log("Hello ");

    var prompts = [{
      name: 'moduleName',
      message: 'What is your module name?'
    }, {
      type: 'confirm',
      name: 'addDemoSection',
      message: 'Would you like to generate a new CRUD component ?'
    }];

    this.prompt(prompts, function(props) {
      this.moduleName = props.moduleName;
      this.addDemoSection = props.addDemoSection;
      this.addFieldName = props.addFieldName;

      done();
    }.bind(this));
  },
  copyMainFiles: function() {
    if (this.addDemoSection) {
      var context = {
        module_name: this.moduleName
      };
      this.template("app/_CreateArticle.jsx", "app/components/" + this.moduleName + "/Create" + this.moduleName + ".jsx", context);
      this.template("app/_EditArticle.jsx", "app/components/" + this.moduleName + "/Edit" + this.moduleName + ".jsx", context);
      this.template("app/_ViewArticle.jsx", "app/components/" + this.moduleName + "/View" + this.moduleName + ".jsx", context);
      this.template("app/_ListArticles.jsx", "app/components/" + this.moduleName + "/List" + this.moduleName + ".jsx", context);

      this.template("app/stores/_ArticleStore.jsx", "app/stores/" + this.moduleName + "Store.jsx", context);

      this.template("server/_articles.server.controller.js", "server/controllers/" + this.moduleName + "s.server.controller.js", context);
      this.template("server/_routes.js", "server/routes/" + this.moduleName + ".server.routes.js", context);


      console.log(chalk.red.bgWhite.bold('Add the front-end route for the module in app.jsx and also add a backend-route in routeHelper.js'));
    } else {
      console.log(chalk.red.bgWhite.bold('Aborted'));
    }
  },
  AddFieldName: function() {
    if (this.addDemoSection) {
      var done = this.async();
      var prompts = [{
        name: 'fieldName',
        message: 'Add a field name to the model'
      }, {
        type: 'confirm',
        name: 'addFieldName2',
        message: 'Would you like to add another field name to the model?'
      }];

      this.prompt(prompts, function(props) {
        this.fieldName = props.fieldName;
        this.addFieldName2 = props.addFieldName2;



        done();
      }.bind(this));

    }

  },
  AddFieldName2: function() {
    if (this.addDemoSection && this.addFieldName2) {
      var done = this.async();
      var prompts = [{
        name: 'fieldName2',
        message: 'What is your other field name?'
      }];


      this.prompt(prompts, function(props) {
        this.fieldName2 = props.fieldName2;


        done();
      }.bind(this));

    }

  },

  createModel: function() {

    if (this.fieldName) {
      var text = this.fieldName + ": { \n type: String,  \n trim: true \n}, \n";
    }
    if (this.addFieldName2) {
      var text = text + this.fieldName2 + ": { \n type: String,  \n trim: true \n},";

    }
    var context = {
      fieldName: this.fieldName,
      module_name: this.moduleName,
      texts: text
    };

    this.template("server/_Article.js", "server/models/" + this.moduleName + ".js", context);
  }

});
