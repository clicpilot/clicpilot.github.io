__CP\_RequestAction__ is function to invoke an action with javascript only.

	CP_RequestAction("actionname", parameter, succ, error);

* actionname the name of action.
* parameter of the action input. the parameter is an JSON object, at Read and Delete action, the JSON object need to have an 'id' member. at Create and Update  the JSON object need to have an 'obj' memeber.

* succ the callback function when action executed successfully.
* error the callback function when action failed to execute.

Here is an example of CP_RequestAction used in Create, Read, Update, Delete and Query. It creates item.

