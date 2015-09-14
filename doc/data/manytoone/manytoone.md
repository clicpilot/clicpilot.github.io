Here is a list of Many To One features.



| - |Many To One Single-directional|Many To One|Many To One Bidirectional|Many To One Ancestry|
|:------|:-------:|:-------:|:-------:|:-------:|:-------:|
|class|cp-many2one-s|cp-many2one|cp-many2one-i|cp-many2one-a|
|When creating or updating the Owner Entity object, The Foreign Entity object can be null.	|YES	|YES	|YES	|NO|
|When creating the Owner Entity object, the Foreign Entity object can be included.	|YES	|YES	|YES	|YES|
|When reading the Owner Entity object, the Foreign Entity object can be included.	|YES	|YES	|YES	|YES|
|When updating the Owner Entity object, the Foreign Entity object can be included.	|YES	|YES	|YES	|YES|
|When deleting the Owner Entity object, the Foreign Entity object will be deleted together.	|NO	|NO	|NO	|NO|
|Not deleting the Owner Entity object, if any Foreign Entity object uses it.	|NO	|NO	|NO	|NO|
|InvName is needed.	|NO	|YES	|YES	|YES|
|InvRefeDisplayFunction is needed.	|NO	|YES	|YES	|YES|
|When creating or updating the Owner Entity object, The Owner Entity object can be null.	|YES	|YES	|YES	|YES|
|When creating the Foreign Entity object, the Owner Entity object can be included.	|NO	|YES	|YES	|NO|
|When reading the Foreign Entity object, the Owner Entity object can be included.	|NO	|NO	|NO	|NO|
|When updating the Foreign Entity object, the Owner Entity object can be included.	|NO	|NO	|NO	|NO|
|When deleting the Foreign Entity object, the Owner Entity object will be deleted together.	|NO	|NO	|NO	|YES|
|Not deleting the Foreign Entity object, if any Owner Entity object uses it.	|YES	|NO	|YES	|NO|


Below is 5 examples of 
* Many To One 
* Many To One Single-directional
* Many To One Bidirectional 
* Many To One Ancestry

Here is an example of __Many To One__.