Query action is to query a set of objects of an entity by conditions. In SQL, it will be converted into SELECT statement. To define a __Query__ action, the below is mandatory.

|type|code|
|:------|:-------:|
|class|class="cp-query"|
|attribute|cp-action-name="_actionname_"|
|attribute|cp-entity-name="_entityname_"|
|attribute|cp-field="['_propertyname_','_referencename_',...]"|

You can give a alias to field, such as 'Prop1 P', here Prop1 is Property name, P is alias. If you need to add condition or order in the query, you can use alias instead of property name.

The HTML code in the action is a HTML template which renders the views of the query result.

Here is an example of __Query__ action.