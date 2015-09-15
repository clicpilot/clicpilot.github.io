In the above examples, to make things easy, they just have one HTML page. While in the real world, a web application contains some HTML, JavaScript, CSS, image files. clicpilot-js supports multiple files. Here is an example, it has 2 HTML, 2 CSS, 2 JavaScript and 2 image files and they are in different folders. To include these files we need another HTML, called main.html, you can give any name to it in your application.

In the _main.html_, we need to define a variable named "CP_APP". it is an JavaScript object, and have two members. one is __name__, which is the name of application. the other is __file__, which is an array of the filenames included in this application.

clicpilot support the following file types:

* html - HTML file.
* htm - HTML file.
* js - JavaScript file.
* css - CSS file.
* json - JSON file, which can define clicpilot objects directly, such as entity, action and test.
* png - Image file.
* jpg - Image file.
* callback.js - Action callback program file in JavaScript, see the chapter of Callback.

Here is the folder structure of this example.


		WebApp/
		  |--img/
		  |  |--clicpilot.png
		  |
		  |--query/
		  |  |--html_query.html
		  |
		  |--js/
		  |  |--html_query.js
		  |
		  |--clicpilot.jpg
		  |--html_create.css
		  |--html_create.html
		  |--html_create.js
		  |--html_query.css
		  |--main.html



You can put your files as you need, but need to follow the rules below.
* The files need to be put into the array of __file__ member in __CP_APP__ variable, so that clicpilot-js can load them.
* The main.html should be put in root folder of the application. 
* The files need to use correct relative path name in the main.html. 
* The files need to use correct relative path name link to another one, such as A's href and IMG's src. 
* Relative path need to start with './' or '../'.
* clicpilot-js and JQuery need to put in the main.html.
* Other HTML files need to have JQuery only.



