__RemoveReference__ action is to remove the linkbetween an object to another object. In SQL, it will be converted into DELETE or UPDATE statement. To define a __RemoveReference__ action, the below is required.

|type|code|
|:------|:-------:|
|class|class="cp-remove-ref"|
|attribute|cp-action-name="_actionname_"|
|attribute|cp-entity-name="_entityname_"|
|attribute|cp-refe-name="_referencename_"|
|attribute|cp-inv-name="_referenceinvname_"|
|attribute|cp-refe-entity="_referenceentityname_"|
|attribute|cp-field="['_propertyname_','_referencename_',...]"|

*__cp-refe-entity__ is need when defining the releationship between the two objects.

*__cp-inv-name__ is need when defining the relationship between the two objects and inverse is allowed.

for more details, please check this document's _reference_ part.

The code in the action is a HTML template which renders the views of the query result.

Here is an example of __AddReference__ action.