Here is a list of One To Many features.


| - |One To Many Single-directional|One To Many|One To Many Bidirectional|One To Many Descendant|One To Many Descendant Weak|
|:------|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|
|class|cp-one2many-s|cp-one2many|cp-one2many-i|cp-one2many-d|cp-one2many-dw|
|When creating or updating the Owner Entity object, The Foreign Entity object can be null.	|YES	|YES	|YES	|YES|YES|
|When creating the Owner Entity object, the Foreign Entity object can be included.	|YES	|YES	|YES	|NO|YES|
|When reading the Owner Entity object, the Foreign Entity object can be included.	|NO	|NO	|NO	|NO|NO|
|When updating the Owner Entity object, the Foreign Entity object can be included.	|YES	|YES	|YES	|NO|YES|
|When deleting the Owner Entity object, the Foreign Entity object will be deleted together.	|NO	|NO	|NO	|YES|YES|
|Not deleting the Owner Entity object, if any Foreign Entity object uses it.	|NO	|NO	|NO	|NO|NO|
|InvName is needed.	|NO	|YES	|YES	|YES|YES|
|InvRefeDisplayFunction is needed.	|NO	|YES	|YES	|YES|YES|
|When creating or updating the Owner Entity object, The Owner Entity object can be null.	|YES	|YES	|YES	|NO|YES|
|When creating the Foreign Entity object, the Owner Entity object can be included.	|NO	|YES	|YES	|YES|YES|
|When reading the Foreign Entity object, the Owner Entity object can be included.	|NO	|YES	|YES	|YES|YES|
|When updating the Foreign Entity object, the Owner Entity object can be included.	|NO	|YES	|YES	|YES|YES|
|When deleting the Foreign Entity object, the Owner Entity object will be deleted together.	|NO	|NO	|NO	|NO|NO|
|Not deleting the Foreign Entity object, if any Owner Entity object uses it.	|YES	|NO	|YES	|NO|NO|


Below is 5 examples of 
* One To Many 
* One To Many Single-directional
* One To Many Bidirectional 
* One To Many Descendant
* One To Many Descendant Weak

Here is an example of __One To Many__