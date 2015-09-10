Read action is to read an object of an entity by its Id. In SQL, it will be converted into SELECT statement. To define a __Read__ action, the below is mandatory.

|type|code|
|:------|:-------:|
|class|class="cp-read"|
|attribute|cp-action-name="_actionname_"|
|attribute|cp-entity-name="_entityname_"|
|attribute|cp-field="['_propertyname_','_referencename_',...]"|

Here is an example of __Read__ action.