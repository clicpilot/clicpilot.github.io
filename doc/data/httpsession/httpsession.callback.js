function Default_CreateEntSsn_BeforeRun(ctx) {
	var d = (new Date());
	var obj = ctx.get("_In");
	var prop = obj.get("Prop1");
	obj.put("Prop1", prop+" "+d.getFullYear());
	var session = ctx.get("_Session");
	var user = session.get("user");
	if(user==null) {
		session.put("user", "clicpilot");
		session.put("pwd", "123456");
	} else {
		user = session.get("user");
		var pwd = session.get("pwd");
		var id = session.get("userid");
		obj.put("Prop1", obj.get("Prop1")+" by "+user+"/"+pwd+"/"+id);
	}
	if(prop=="x") {
		session.remove("user");
	}
}


function Default_CreateEntSsn_AfterRun(ctx) {

	var obj = ctx.get("_Out");
	var id = obj.get("EntSsnId");
	var session = ctx.get("_Session");
	session.remove("pwd");
	session.put("userid", id);


}
