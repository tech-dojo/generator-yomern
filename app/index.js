var yeoman = require('yeoman-generator');
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
            name: 'appName',
            message: 'What is your app\'s name ?'
        },{
            type: 'confirm',
            name: 'addDemoSection',
            message: 'Would you like to generate a demo section ?'
        }];

        this.prompt(prompts, function (props) {
            this.appName = props.appName;
            this.addDemoSection = props.addDemoSection;

            done();
        }.bind(this));
    },

    scaffoldFolders: function(){
if(this.addDemoSection){
    mkdirp("app");
    mkdirp("app/components");
  //  mkdirp("app/components/"+this.appName);
  //  mkdirp("app/stores");
  //  mkdirp("app/routes");
  //  mkdirp("server");
}
else{
  console.log("aborted");
}
},
copyMainFiles: function(){


    var context = {
        site_name: this.appName
    };

    this.template("_home.jsx", "app/components/articles/createHome.jsx", context);
}

});
