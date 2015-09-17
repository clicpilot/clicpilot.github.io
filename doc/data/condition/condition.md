To apply a condition to query, it needs the attribute __cp-condition-expr__ and the value of the attribute is an expression. It support the following operator:

* = 
* !=
* > 
* >= 
* < 
* <=
* Start-With - only for string and text
* End-With - only for string and text 
* Contains - only for string and text
* Is-Not-Null
* Is-Null 

For more multiple expressions, you can use __&&__ and __||__ to connect them. Brackets are supported as well.

If the value is from an input of HTML, the input needs to have an ID, and use the ID in the expression.

In the below example, there is an condition expression: _(Prop2>2 && (Prop2<8)) || Prop1=#PP1 || Prop1 Start-With 'a2'_


