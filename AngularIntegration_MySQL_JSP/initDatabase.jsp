<%@ page language="java" contentType="application/json" pageEncoding="UTF-8"%>

<%@page import="java.lang.reflect.*" %>
<%@page import="java.io.*" %>
<%@page import="java.math.*" %>
<%@page import="java.sql.*" %>
<%@page import="java.text.*" %>
<%@page import="java.util.*" %>
<%@page import="javax.sql.*" %>
<%@page import="javax.naming.*" %>
<%@page import="org.json.*" %>
<%@include file="dbAdapter.jsp" %>

<%
Context initCtx = new InitialContext();
Context envCtx = (Context) initCtx.lookup("java:comp/env");
DataSource ds = (DataSource)envCtx.lookup("jdbc/AngularIntegration_MySQL");
Connection conn=ds.getConnection();
try{
	initDatabase(conn, (Boolean)(request.getAttribute("sampleData")));
	response.setStatus(200);
	response.resetBuffer();
	out.println("{\"message\":\"Done!\"}");
	
} catch( Exception e) {
	response.setStatus(500);
	response.resetBuffer();
	out.println("{\"message\":\""+e.getMessage()+"!\"}");
}
%>
<%!
static void initDatabase(Connection conn, boolean needSampleData) throws Exception {
List<SQLTask> sqlArg = new ArrayList<SQLTask>();
sqlArg.add(new SQLTask("SET foreign_key_checks = 0;", "UPDATE"));
sqlArg.add(new SQLTask("drop table  if exists Msg;", "UPDATE"));
sqlArg.add(new SQLTask("CREATE TABLE Msg(MSGID BIGINT NOT NULL AUTO_INCREMENT ,MSGTEXT VARCHAR(64) NOT NULL, CONSTRAINT  PK_Msg  PRIMARY KEY (MSGID)) ENGINE=InnoDB ;", "UPDATE"));
sqlArg.add(new SQLTask("SET foreign_key_checks = 1;", "UPDATE"));
executeSql(conn, sqlArg);
}
%>