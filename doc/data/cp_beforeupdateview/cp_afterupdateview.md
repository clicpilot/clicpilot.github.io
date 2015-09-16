__CP\_AfterUpdateView__ will be invoked before a view updated.

	CP_BeforeUpdateView("actionname", function(param){
		//executed after view updated
	})

the param is object
	
	{
		"object": //data object of the action
	}

Here is an example of __CP\_BeforeUpdateView__. 