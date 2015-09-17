The __Export__ view is to export web application. It supports JSP and NodeJS. PHP, Python, Go and Ruby is under way.



#### JSP + MySQL/PostgreSQL

For JSP based web application, the export file is a zip file, which includes all the server-side and client-side code except the JDBC and org.json jar files. They can be downloaded from the links below. To deploy the webapplication, unzip the zip file and copy the files into webapps folder of the J2EE web container.

Here is step by step deployment instructions after you export a web application from clicpilot-js console.


1. Unzip the zip file into the __webapps__ folder the J2EE web container, such as Apache Tomcat.

2. Copy the JDBC and org.json jar file into the __WEB-INF/lib__ folder of the web application.

3. Open the __META-INF/context.xml__ to modify the JDBC connection information, such ip address, username and password.

4. Done! Open web browser and visit the web application. the URL may be http://localhost:8080/_appname_/index.html.



#### NodeJS + MySQL

For NodeJS based web application, the export file is a zip file, which includes all the server-side and client-side code. While the web application requires the module mysql and connect. If you have not them please install them first.

Here is step by step deployment instructions after you export a web application from clicpilot-js console.

1. Unzip the zip file and go to root folder.
2. Install __MySQL__ module if it is not installed. the command is 
	
		npm install mysql

3. Install __Connect__ module if it is not installed. the command is 
	
		npm install connect
		npm install serve-static
		npm install compression
		npm install express-session

4. Open the server.js to modify the port (default is 8891), secret and so on. You can skip this step for non-production deployment.
5. Start the web application by
	
		node server.js
	
6. Done! Open web browser and visit the web application. http://localhost:8891/index.html.

 