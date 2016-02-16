var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var mkdirp = require('mkdirp');
module.exports = yeoman.Base.extend({

  method1: function () {
    console.log('method 1 just ran');
  },
  method2: function () {
    console.log('method 2 just ran');
  },
  promptUser: function() {
        var done = this.async();

        // have Yeoman greet the user
        console.log("Hello ");

        var prompts = [{
            name: 'moduleName',
            message: 'What is your module name?'
        },{
            type: 'confirm',
            name: 'addDemoSection',
            message: 'Would you like to generate a new CRUD component ?'
        }];

        this.prompt(prompts, function (props) {
            this.moduleName = props.moduleName;
            this.addDemoSection = props.addDemoSection;

            done();
        }.bind(this));
    },

//     scaffoldFolders: function(){
// if(this.addDemoSection){
//    mkdirp("app");
//    mkdirp("app/components");
//    mkdirp("app/components/" + this.moduleName);
//    mkdirp("app/stores");
//    mkdirp("app/routes");
//    mkdirp("server");
//    mkdirp("app/controllers/" + this.moduleName);
//    mkdirp("app/models/" + this.moduleName);
// }
// else{
//   console.log(chalk.red.bgWhite.bold('Aborted'));
//   }
// },
copyMainFiles: function(){
if(this.addDemoSection){
var text = "Hello \n Duffer \n Hi";
    var context = {
        module_name: this.moduleName,
        text_name: text
    };
    this.template("app/_CreateArticle.jsx", "app/components/"+this.moduleName+"/Create"+this.moduleName+".jsx", context);
    this.template("app/_EditArticle.jsx", "app/components/"+this.moduleName+"/Edit"+this.moduleName+".jsx", context);
    this.template("app/_ViewArticle.jsx", "app/components/"+this.moduleName+"/View"+this.moduleName+".jsx", context);
    this.template("app/_ListArticles.jsx", "app/components/"+this.moduleName+"/List"+this.moduleName+".jsx", context);

    this.template("app/stores/_ArticleStore.jsx", "app/stores/"+this.moduleName+"Store.jsx", context);

    this.template("server/_articles.server.controller.js", "server/controllers/"+this.moduleName+"s.server.controller.js", context);
    this.template("server/_Article.js", "server/models/"+this.moduleName+".js", context);

    console.log(chalk.red.bgWhite.bold('Do Route Files'));
  }

  else{
     console.log(chalk.red.bgWhite.bold('Aborted'));
     }
}

});
