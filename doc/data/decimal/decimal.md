To define a __Decimal__ property, it needs the class __cp-decimal__ and attribute below.

CSS class name mapping to property type as below.

|class name|property type|
|:------|:-------:|
|cp-decimal|Decimal|


There are some attributes to define the property details.

|attribute|description|
|:------|:-------:|
|cp-prop-name|property name|
|cp-storage-name|property storage name, convert to column name of a table, if not given, cp-prop-name is applied.|
|cp-max|when property type is Short, Integer, Long, Float, Double, Decimal, Date, Datetime or Time, the max value of the property.|
|cp-min|when property type is Short, Integer, Long, Float, Double, Decimal, Date, Datetime or Time, the min value of the property.|
|cp-nullable|if set as true, the value can be null, if set false the value cannot be null. the default is false.|
|cp-default-value| the default value the property.|
|cp-scale| when property type is Decimal, the scale value of the property.|
|cp-precision| when property type is Decimal, the precision value of the property.|

please check the example below of Decimal property.