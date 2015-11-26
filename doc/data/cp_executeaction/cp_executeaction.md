The function CP_ExecuteAction(ctx, actionName, success, error) in callback.js, is to call an action at serverside.


* The parameter 'ctx' is a HashMap of execution context.
* The parameter 'actionName' is the name of the action to be invoked.
* The parameter 'sucess' is a function invoked when the action executed successfully.
* The parameter 'error' is a function invoked when some error occur during the action execution, if it is null, the error will be thrown.


Please see the example below.