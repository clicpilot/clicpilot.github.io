<%@ page language="java" contentType="application/json" pageEncoding="UTF-8"%>


<%@page import="java.io.*" %>
<%@page import="java.math.*" %>
<%@page import="java.sql.*" %>
<%@page import="java.text.*" %>
<%@page import="java.util.*" %>
<%@page import="javax.sql.*" %>
<%@page import="javax.naming.*" %>
<%@page import="org.json.*" %>

<%
String pathInfo = request.getRequestURI();
String method = request.getMethod();

request.setAttribute("path",pathInfo);
request.setAttribute("method",method);
String[] paramArray = pathInfo.split("/");
if (paramArray[1].equals("AngularIntegration") && paramArray[2].equals("rest") && 
    (paramArray[3].equals("InitDatabase") || paramArray[3].equals("InitDatabaseAndSampleData")) && 
    method.equals("POST")) {
    boolean sampleData = paramArray[3].equals("InitDatabaseAndSampleData"); 
    request.setAttribute("sampleData",sampleData);
    %>
    <jsp:forward page="initDatabase.jsp"/>
    <%
} else if (paramArray[1].equals("AngularIntegration") && paramArray[2].equals("rest")) {


    String folder = paramArray[3];
    String action = paramArray[4];
    String id = null;
    String refeId = null;
    String from = null;
    String size = null;
    if (paramArray.length == 6) {
        id = paramArray[5];
    } else if (paramArray.length == 7) {
        id = paramArray[5];
        refeId = paramArray[6];
        from = paramArray[5];
        size = paramArray[6];
    } else if (paramArray.length == 8) {
        id = paramArray[5];
        from = paramArray[6];
        size = paramArray[7];
    } 
    String actionSysName = folder+"_"+action;
    if(method.toLowerCase().equals("get")) {
        String queryString = request.getParameter("q");
        request.setAttribute("data",queryString);
    } else {
        StringBuffer data = new StringBuffer();
        String line = null;
        BufferedReader reader = request.getReader();
        while ((line = reader.readLine()) != null) {
          data.append(line);
        }
        request.setAttribute("data",data.toString());
    }
    request.setAttribute("id",id);
    request.setAttribute("refeId",refeId);
    request.setAttribute("from",from);
    request.setAttribute("size",size);
    if(actionSysName.equals("Default_CreateMsg")){
%>
<jsp:forward page="./actions/Default_CreateMsg.jsp" />
<% 
}
else 
if(actionSysName.equals("Default_QueryMsg")){
%>
<jsp:forward page="./actions/Default_QueryMsg.jsp" />
<% 
}
    else {
        response.setStatus(404);
        response.resetBuffer();
        out.println("{\"message\":\""+actionSysName+" Not Found!\"}");
    }
    
} else {
    response.setStatus(404);
    response.resetBuffer();
    out.println("Not Found");
}
%>