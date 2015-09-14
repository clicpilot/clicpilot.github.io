Here is a list of One To One features.


| - |One To One Single-directional|One To One|One To One Bidirectional|One To One Ancestry|One To One Descendant|
|:------|:-------:|:-------:|:-------:|:-------:|:-------:|
|class|cp-one2one-s|cp-one2one|cp-one2one-i|cp-one2one-a|cp-one2pne-d|
|When creating or updating the Owner Entity object, The Foreign Entity object can be null.	|YES	|YES	|YES	|NO	|YES|
|When creating the Owner Entity object, the Foreign Entity object can be included.	|YES	|YES	|YES	|YES	|NO|
|When reading the Owner Entity object, the Foreign Entity object can be included.	|YES	|YES	|YES	|YES	|YES|
|When updating the Owner Entity object, the Foreign Entity object can be included.	|YES	|YES	|YES	|YES	|NO|
|When deleting the Owner Entity object, the Foreign Entity object will be deleted together.	|NO	|NO	|NO	|NO	|YES|
|Not deleting the Owner Entity object, if any Foreign Entity object uses it.	|NO	|NO	|NO	|NO	|NO|
|InvName is needed.	|NO	|YES	|YES	|YES	|YES|
|InvRefeDisplayFunction is needed.	|NO	|YES	|YES	|YES	|YES|
|When creating or updating the Owner Entity object, The Owner Entity object can be null.	|YES	|YES	|YES	|YES	|NO|
|When creating the Foreign Entity object, the Owner Entity object can be included.	|NO	|YES	|YES	|NO	|YES|
|When reading the Foreign Entity object, the Owner Entity object can be included.	|NO	|YES	|YES	|YES	|YES|
|When updating the Foreign Entity object, the Owner Entity object can be included.	|NO	|YES	|YES	|NO	|YES|
|When deleting the Foreign Entity object, the Owner Entity object will be deleted together.	|NO	|NO	|NO	|YES	|NO|
|Not deleting the Foreign Entity object, if any Owner Entity object uses it.	|YES	|NO	|YES	|NO	|NO|

Below is 5 examples of 
* One To One 
* One To One Single-directional
* One To One Bidirectional 
* One To One Ancestry
* One To One Descendant

Here is an example of __One To One__