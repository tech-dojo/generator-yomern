module.exports = function(app){

 var <%=smallModuleName%>s = require('./../controllers/<%=smallModuleName%>s.server.controller.js');
 var users = require('./../controllers/users.server.controller.js');

 app.route('/api/<%=smallModuleName%>s')
	.get(<%=smallModuleName%>s.list)
	.post(users.requiresLogin, <%=smallModuleName%>s.create);

  app.route('/<%=smallModuleName%>s/api/<%=smallModuleName%>s/:<%=smallModuleName%>id')
	.get(<%=smallModuleName%>s.read)
  .delete(users.requiresLogin, <%=smallModuleName%>s.delete);

	app.route('/<%=smallModuleName%>s/edit/api/<%=smallModuleName%>s/:<%=smallModuleName%>id')
	.get(<%=smallModuleName%>s.read)
	.put(users.requiresLogin, <%=smallModuleName%>s.update);


app.param('<%=smallModuleName%>id', <%=smallModuleName%>s.<%=smallModuleName%>ByID);


}
