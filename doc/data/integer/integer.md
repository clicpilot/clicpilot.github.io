To define a __Integer__ property, it needs the class __cp-integer__ and attribute below.

CSS class name mapping to property type as below.

|class name|property type|
|:------|:-------:|
|cp-integer|Integer|


There are some attributes to define the property details.

|attribute|description|
|:------|:-------:|
|cp-prop-name|property name|
|cp-storage-name|property storage name, convert to column name of a table, if not given, cp-prop-name is applied.|
|cp-max|when property type is Short, Integer, Long, Float, Double, Decimal, Date, Datetime or Time, the max value of the property.|
|cp-min|when property type is Short, Integer, Long, Float, Double, Decimal, Date, Datetime or Time, the min value of the property.|
|cp-nullable|if set as true, the value can be null, if set false the value cannot be null. the default is false.|
|cp-default-value| the default value the property.|

please check the example below of Integer property.