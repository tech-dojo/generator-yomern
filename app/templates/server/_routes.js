module.exports = function(app){

 var <%=module_name%>s = require('./../controllers/<%=module_name%>s.server.controller.js');
 var users = require('./../controllers/users.server.controller.js');

 app.route('/api/<%=module_name%>s')
	.get(<%=module_name%>s.list)
	.post(users.requiresLogin, <%=module_name%>s.create);

  app.route('/<%=module_name%>s/api/<%=module_name%>s/:id')
	.get(<%=module_name%>s.read)
  .delete(users.requiresLogin, <%=module_name%>s.delete);

	app.route('/<%=module_name%>s/edit/api/<%=module_name%>s/:id')
	.get(<%=module_name%>s.read)
	.put(users.requiresLogin, <%=module_name%>s.update);


app.param('id', <%=module_name%>s.<%=module_name%>ByID);


}
