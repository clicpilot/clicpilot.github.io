There are 11 kinds of __properties__, String, Text, Short, Integer, Long, Float, Decimal, Date, DateTime, Time, TimeStamp.

CSS class name mapping to property type as below.

|class name|property type|
|:------|:-------:|
|cp-boolean|Boolean|
|cp-short|Short|
|cp-integer|Integer|
|cp-long|Long|
|cp-float|Float|
|cp-double|Double|
|cp-decimal|Decimal|
|cp-string|String|
|cp-text|Text|
|cp-date|Date|
|cp-datetime|Datetime|
|cp-time|Time|
|cp-timestamp|TimeStamp|

There are some attributes to define the property details.

|attribute|description|
|:------|:-------:|
|cp-prop-name|property name|
|cp-storage-name|property storage name, convert to column name of a table, if not given, cp-prop-name is applied.|
|cp-max-len|when property type is String or Text, the max length of the string or text length.|
|cp-min-len|when property type is String or Text, the min length of the string or text length.|
|cp-max|when property type is Short, Integer, Long, Float, Double, Decimal, Date, Datetime or Time, the max value of the property.|
|cp-min|when property type is Short, Integer, Long, Float, Double, Decimal, Date, Datetime or Time, the min value of the property.|
|cp-reg-expr|when property type is String or Text, the value need to match the regular expression.|
|cp-nullable|if set as true, the value can be null, if set false the value cannot be null. the default is false.|
|cp-default-value| the default value the property.|
|cp-scale| when property type is Decimal, the scale value of the property.|
|cp-precision| when property type is Decimal, the precision value of the property.|