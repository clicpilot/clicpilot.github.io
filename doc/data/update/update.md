Update action is to update an object of an entity by its Id. In SQL, it will be converted into UPDATE statement. To define a __Update__ action, the below is mandatory.

|type|code|
|:------|:-------:|
|class|class="cp-update"|
|attribute|cp-action-name="_actionname_"|
|attribute|cp-entity-name="_entityname_"|
|attribute|cp-read-action-name="_readactionname_"|
|attribute|cp-field="['_propertyname_','_referencename_',...]"|


the attribute "_cp-read-action-name_" is to give a name of the action to load the object to display in update form.

Here is an example of __Update__ action.