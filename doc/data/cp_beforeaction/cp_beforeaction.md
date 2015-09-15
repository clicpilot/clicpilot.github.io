__CP\_BeforeAction__ will be invoked before an action executing.

	CP_BeforeAction("actionname", function(param){
		//executed before action executed.
	})

the param is object
	
	{
		"object": //data object of the action
	}

Here is an example of __CP\_BeforeAction__. It creates 3 items with __CP\_DoAction__ and in __CP\_BeforeAction__ create a log to save a message in the page.