<%@ page language="java" contentType="application/JSON" pageEncoding="UTF-8"%>
<%@include file="../importlib.jsp" %>
<%@include file="../dbAdapter.jsp" %>
<%@include file="../JavaFuncLib.jsp" %>


<%
Context initCtx = new InitialContext();
Context envCtx = (Context) initCtx.lookup("java:comp/env");
DataSource ds = (DataSource)envCtx.lookup("jdbc/AngularIntegration_MySQL");
Connection conn=ds.getConnection();
Map<String, Object> ctx = new HashMap<String, Object>();

String pathInfo =  (String)request.getAttribute("path");
String method = (String)request.getAttribute("method");
String data = (String)request.getAttribute("data");
String id = (String)request.getAttribute("id");
String refeId = (String)request.getAttribute("refeId");
String from = (String)request.getAttribute("from");
String size = (String)request.getAttribute("size");
ctx.put("_Method", method);
ctx.put("_Data", data);
ctx.put("_Id", id);
ctx.put("_RefeId", refeId);
ctx.put("_From", from);
ctx.put("_Size", size);

try{
	if(Default_CreateMsg_Check(ctx)) {

	    Default_CreateMsg_PrepareInput(ctx);

	    Map<String, Object> outMap = new HashMap<String, Object>();
	    ctx.put("_Out", outMap);
	    ctx.put("_Request", request);
	    ctx.put("_Session", new SessionHelper(session));
	    ctx.put("_Response", response);
	    ctx.put("_Connection", conn);


	    RunCallBackFunc("Default", "CreateMsg", "Before", ctx);

	    try {
			conn.setAutoCommit(false);

			if(ctx.get("stop")==null || !((Boolean)ctx.get("stop"))) {
				Default_CreateMsg_Execute(ctx);
	    		RunCallBackFunc("Default", "CreateMsg", "After", ctx);
			}
			conn.commit();
	    } catch(Exception e) {
			try {
				conn.rollback();
			} catch (SQLException e1) {

			}
			throw new RuntimeException(e.getMessage());
	    }
	    JSONObject outObj = new JSONObject();
	    map2json(outMap, outObj);

	    JSONObject resObj = new JSONObject();
	    resObj.put("success", true);

	    if(ctx.get("error")!=null) {
	    	JSONObject errObj = new JSONObject();
	    	map2json((Map)ctx.get("error"), errObj); 
	    	resObj.put("error", errObj);
		}

	    resObj.put("obj", outObj);
	    resObj.put("action", ctx.get("_ActionName"));
	    out.println(resObj.toString());
	    out.flush();
	} else {
		response.setStatus(400);
  		response.resetBuffer();
  		out.println("{\"message\":\"Service not available\"}");
  		out.flush();
	}
} catch(Exception e) {
	e.printStackTrace();
	response.setStatus(500);
	response.resetBuffer();
	out.println("{\"message\":\""+e.getMessage()+"\"}");
} finally {
  try {
    if(conn!=null) {
    	conn.close();
    }
  } catch (SQLException e1) {
  }
}
%>

<%!
private boolean Default_CreateMsg_Check(Map<String, Object> ctx){
	return "POST".equals(ctx.get("_Method"));
}
private void Default_CreateMsg_PrepareInput(Map<String, Object> ctx) throws Exception{
	ctx.put("_ActionName", "Default_CreateMsg");
	ctx.put("_EntName", "Msg");
	Object data = ctx.get("_Data");
	JSONObject inObj = new JSONObject(data.toString());
	Map<String, String> inMap = new HashMap<String, String>();
	json2map((JSONObject)inObj.get("obj"), inMap, null);
	ctx.put("_In", inMap);
	Map<String, String> msgMap = new HashMap<String, String>();
	json2map((JSONObject)inObj.get("msg"), msgMap, null);
	ctx.put("_Msg", msgMap);
}
private void Default_CreateMsg_Execute(Map<String, Object> ctx) throws Exception{
	Connection conn=(Connection)ctx.get("_Connection");
	final Map<String, Object> in=(Map<String, Object>)ctx.get("_In");
	final Map<String, Object> out=(Map<String, Object>)ctx.get("_Out");
	List<SQLTask> sqlArg = new ArrayList<SQLTask>();
	{
	SQLParamProvider sqlparamfunc = new SQLParamProvider() {
		public SQLParam[] get() {
			SQLParam[] sqlparam = new SQLParam[1];
			sqlparam[0]=new SQLParam(1, "String", ((in.get("MsgText")==null)?null:String.valueOf(in.get("MsgText"))));
			return sqlparam;
		}
	};
	SQLResultProvider resultfunc = new SQLResultProvider() {
		public SQLResult[] get() {
			SQLResult[] sqlresult = new SQLResult[1];
				sqlresult[0]=new SQLResult(1, "Id", "MsgId", new Map[]{out, in});
			return sqlresult;
		}
	};
	sqlArg.add(new SQLTask("INSERT INTO MSG(MSGTEXT)VALUES (?)", "INSERT",  sqlparamfunc, resultfunc, true, false));
	}
	executeSql(conn, sqlArg);
}



%>



<%@include file="../callback.jsp" %>