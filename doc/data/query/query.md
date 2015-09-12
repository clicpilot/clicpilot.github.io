Query action is to query a set of objects of an entity by conditions. In SQL, it will be converted into SELECT statement. To define a __Query__ action, the below is mandatory.

|type|code|
|:------|:-------:|
|class|class="cp-query"|
|attribute|cp-action-name="_actionname_"|
|attribute|cp-entity-name="_entityname_"|
|attribute|cp-field="['_propertyname_','_referencename_',...]"|

The code in the action is a HTML template which renders the views of the query result.

Here is an example of __Query__ action.