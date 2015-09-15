__CP\_AfterAction__ will be invoked when an action is executed.

	CP_AfterAction("actionname", function(param){
		//executed after action executed.
	})

the param is object
	
	{
		"object": //result of the action,
		"success": //true or false,
	}

Here is an example of __CP\_AfterAction__. It creates 3 items with __CP\_DoAction__ and in __CP\_AfterAction__ create a log to save a message in the page.