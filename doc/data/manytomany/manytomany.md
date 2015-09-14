Here is a list of Many To One features.



| - |Many To Many|Many To Many Single-directional|
|:------|:-------:|:-------:|
|When creating or updating the Owner Entity object, The Foreign Entity object can be null.	|YES	|YES|
|When creating the Owner Entity object, the Foreign Entity object can be included.	|YES	|YES|
|When reading the Owner Entity object, the Foreign Entity object can be included.	|NO	|NO|
|When updating the Owner Entity object, the Foreign Entity object can be included.	|YES	|YES|
|When deleting the Owner Entity object, the Foreign Entity object will be deleted together.	|NO	|NO|
|Not deleting the Owner Entity object, if any Foreign Entity object uses it.	|NO	|NO|
|InvName is needed.	|NO	|YES|
|InvRefeDisplayFunction is needed.	|NO	|YES|
|When creating or updating the Owner Entity object, The Owner Entity object can be null.	|YES	|YES|
|When creating the Foreign Entity object, the Owner Entity object can be included.	|NO	|YES|
|When reading the Foreign Entity object, the Owner Entity object can be included.	|NO	|NO|
|When updating the Foreign Entity object, the Owner Entity object can be included.	|NO	|YES|
|When deleting the Foreign Entity object, the Owner Entity object will be deleted together.	|NO	|NO|
|Not deleting the Foreign Entity object, if any Owner Entity object uses it.	|YES	|NO|


Below is 2 examples of 
* Many To Many 
* Many To Many Single-directional


Here is an example of __Many To Many__.



