__QueryRefCandidate__ action is to query a set of objects of an entity's reference's candidate, it is usually used with __Create__, __Update__ and __AddReference__ actions. In SQL, it will be converted into SELECT statement. To define a __QueryRefCandidate__ action, the below is required.

|type|code|
|:------|:-------:|
|class|class="cp-query-ref-candidate"|
|attribute|cp-action-name="_actionname_"|
|attribute|cp-entity-name="_entityname_"|
|attribute|cp-refe-name="_referencename_"|
|attribute|cp-inv-name="_referenceinvname_"|
|attribute|cp-refe-entity="_referenceentityname_"|
|attribute|cp-field="['_propertyname_','_referencename_',...]"|

*__cp-refe-entity__ is need when defining the relationship between the two objects.

*__cp-inv-name__ is need when defining the releationship between the two objects and inverse is allowed.

for more details, please check this document's _reference_ part.

The code in the action is a HTML template which renders the views of the query result.

Here is an example of __QueryRefCandidate__ action.