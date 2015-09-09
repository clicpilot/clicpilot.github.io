The above 30-line codes have finished the whole web application developement. Click the __"Run the code"__, the HTML code will be loaded in your browser and it runs as a real web application. Moreover, by clicking the __"clicpilot-js console"__ button on the right top corner of the page, you can export or preview the server-side code.

To use clicpilot-js, you need to download it to your local or just use the link _https://clicpilot.github.io/clicpilot-js-latest.js_. The class __"clicpilot-js"__ is required as a mark so that when code generation the link can be removed.

Here is a form from line 8 to 12.

	<form class="cp-create" cp-entity-name="Msg" cp-action-name="CreateMsg" cp-complete-observer="['QueryMsg']">
		<label>MsgText</label><p>
		<input type="text" class="cp-string" cp-prop-name="MsgText" value=""></input>
		<button type="button" class="cp-submit">Create</button>
	</form>

It defines one create action and one entity. The class __cp-create__ defines a create action. The attribute __cp-entity-name__ defined the entity name of the action. the entity is a database table in server-side. The attribute __cp-action-name__ defined the name of the action. The name is used to generate the code as function name. the attribute __cp-complete-observer__ is an array of actio names, which talk clicpilot-js when the action is executed completely, what actions will be executed from client-side. in this example, after a message is created, the query action will be invoked. So when a message created, the user can see it in the message list.

The input in line 10 defines a property of the entity "Msg". The class __cp-string__ define the type of the property is __string__. The attribute __cp-prop-name__ defines the name of the property, the name will be used as the column name of the table in database.

The button in line 11 with the class __cp-submit__ is a trigger of the create action. clcipilot-js also provide more flexible way to invoke actions by JavaScript.

Here is a list from line 15 to 19.

	<ul class="cp-query" cp-entity-name="Msg" cp-action-name="QueryMsg" cp-field="['MsgId','MsgText']">
		<li>
			<span>{{=it.MsgId}}</span><span>{{=it.MsgText}}</span>
		</li>
	</ul>

It defines a query action. The class __cp-query__ defines a query action. The attribute __cp-field__ is an array of properties which defines what properties will be included in the query. 

From line 16 to 18 is a template, clicpilot use doT.js (http://olado.github.io/doT/) as template engine at generation phase. In this example, the result of the query will be a set of message including "MsgId" and "MsgText", and clicpilot will generate a JavaScript function to render the result with the template.

Here is a script from line 20 to 26.

	<script>
	    window.ShowResponse = function(msg) {
	      $("#msg").text(msg);
	    }
	    window.ShowActionMsg = window.ShowResponse;
	    window.ShowMessage = window.ShowResponse;
    </script>

The function __ShowActionMsg__ and __ShowMessage__ is to show system messsages. Defaultly, it uses console.log to show messages. In this example, it shows message in the div with id "msg".

The example show a very simple web application. To support more complex features clicpilot-js more action, property and reference types. Reference is to describe the relationship between two entities.

There are 9 kinds of action __Create__, __Read__, __Update__, __Delete__, __Query__, __QueryRef__, __QueryRefCandidate__, __AddReference__ and __RemoveReference__. 

There are 11 kinds of properties, __String__, __Text__, __Short__, __Integer__, __Long__, __Float__, __Decimal__, __Date__, __DateTime__, __Time__, __TimeStamp__. 

There are 15 kinds of references, __One To One__, __One To One Single-directional__, __One To One Bidirectional__, __One To One Ancestry__, __One To One Descendant__, __One To Many__, __One To Many Single-directional__, __One To Many Bidirectional__, __One To Many Descendant__, __Many To One__, __Many To One Single-directional__, __Many To One Bidirectional__, __Many To One Ancestry__, __Many To Many__, __Many To Many Single-directional__.

clcipilot supports single HTML application or multiple HTML application. and it can work with any other JavaScript and CSS Framework.

clcipilot supports developer to implement customized logic by callback. Developers can write __BeforeRun__ or __AfterRun__ action callback code in JavaScript. clcipilot will convert it into server-side code.

