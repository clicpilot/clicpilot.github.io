__CP\_DoAction__ is function to invoke an action with javascript and it still need the html elements to get inputs.

	CP_DoAction("actionname", parameter);

Here is an example of CP_DoAction. It creates 3 items with __CP\_DoAction__

The parameter is an object
	
	{
		"Id" : //object id, used when Delete
		"RefeId" : //foreign object id, used when AddReference and RemoveReference
	}