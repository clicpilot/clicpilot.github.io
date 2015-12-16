__CP\_AfterAction__ will be invoked when an action is executed.

	CP_AfterAction("actionname", function(arg, res){
		//executed after action executed.
	})

the arg is the object of input of the action, the res is the object of result of the action


Here is an example of __CP\_AfterAction__. It creates 3 items with __CP\_DoAction__ and in __CP\_AfterAction__ create a log to save a message in the page.