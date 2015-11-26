As clicpilot-js has handled the onload event. If you want to invoke some function after the page loaded. you need to call the function __CP\_Init__ and your function as parameter.


	CP_Init(function(){
		...
	})


Here is an example to invoke a function after page loading, and write the application name.

