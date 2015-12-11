* Background

A web application includes three tiers, user interface(UI), middle-tier and database layer. The popular UI is made by HTML/JavaScript/CSS. Middle-tier has many choices such as Java/PHP/Python/Ruby, and the popular methodolgy is REST API, UI can send request through AJAX to the REST API and execute the middle-tier code. The middle-tier normally has a connection to the database layer and send SQL or commands to control the storage. 
So that, we need write code in these three layers. Some code generation tools can generate code from data model to middle-tier and some UI code. It can speed up the application development. clicpilot is to generate middle-tier and database layer code from UI.

* Concept

HTML is a programming language to build user interface, while it can be used to describe server-side logic. FORM, for example, can be used to describe a create or update action in the middle-tier and it can be generated as a table of database layer, the input fields of the FORM are the columns of the table. In this way, developers can write UI code then get server-side code.

clicpilot can mockup the application in browser without server-side environment. 

While the truth is that not all of the server-side code can be generated. Some special logic can only be written by manual. In clicpilot, developers can write action callback code to implement special logics. the callback will be execute before or after an action executed. the action code is generated. the callback is written in JavaScript, clicpilot will convert into Java, NodeJS, PHP and so on.

* clicpilot-js

clicpilot-js is a JavaScript library to convert HTML into middle-tier code, database schema and a part of client-side JavaScript code, including JSP, NodeJS, SQL and so on. 

* clicpilot-builder

clicpilot-builder is an online tool to apply clicpilot-js.