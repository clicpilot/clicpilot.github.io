In clicpilot, there are 9 kinds of action __Create__, __Read__, __Update__, __Delete__, __Query__, __QueryRef__, __QueryRefCandidate__, __AddReference__ and __RemoveReference__. To define an action. HTML tag need to have a class named as below.

|Action|Class Name|
|:------|:-------:|
|Create|cp-create|
|Read|cp-read|
|Update|cp-update|
|Delete|cp-delete|
|Query|cp-query|
|QueryRef|cp-query-ref|
|QueryRefCandidate|cp-query-ref-candidate|
|AddReference|cp-add-ref|
|RemoveReference|cp-remove-ref|

The HTML tag needs to have an attribute __cp-action-name__ to give a name of the action. As the name will be converted into a function code and program file name, the name can only contain characters [a-zA-Z0-9]. the whitespace and '_' cannot be used in action name. clcipilot use '_' as a special character internally.

The HTML tag needs to have an attribute __cp-entity-name__ to give the entity name of the action. As the name will be converted into a table name, the name can only contain characters [a-zA-Z0-9]. the whitespace and '_' cannot be used in action name. clcipilot use '_' as a special character internally.