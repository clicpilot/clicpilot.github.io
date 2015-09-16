HTTP Session is a kind of server-side storage. It can store the user's status. You can use __session__ object in callback to check if the user's status is correct. The __session__ object have three methods

* put(key, value);
* get(key);
* remove(key);

And the __session__ Object can be get from context object.
	
	var session = ctx.get("_Session");

Here is an example to use session.


