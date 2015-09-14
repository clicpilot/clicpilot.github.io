To define a __Text__ property, it needs the class __cp-text__ and attribute below.

CSS class name mapping to property type as below.

|class name|property type|
|:------|:-------:|
|cp-text|Text|


There are some attributes to define the property details.

|attribute|description|
|:------|:-------:|
|cp-prop-name|property name|
|cp-storage-name|property storage name, convert to column name of a table, if not given, cp-prop-name is applied.|
|cp-max-len|when property type is String or Text, the max length of the string or text length.|
|cp-min-len|when property type is String or Text, the min length of the string or text length.|
|cp-reg-expr|when property type is String or Text, the value need to match the regular expression.|
|cp-nullable|if set as true, the value can be null, if set false the value cannot be null. the default is false.|


please check the example below of Text property.