__Reference__ is to define a relationship between two entities(Owner entity and Foreign entity). There are all the kinds of references, 

* __One To One__
* __One To One Single-directional__
* __One To One Bidirectional__
* __One To One Ancestry__
* __One To One Descendant__
* __One To One Ancestry Weak__
* __One To One Descendant Weak__
* __One To Many__
* __One To Many Single-directional__
* __One To Many Bidirectional__
* __One To Many Descendant__
* __One To Many Descendant Weak__
* __Many To One__
* __Many To One Single-directional__
* __Many To One Bidirectional__
* __Many To One Ancestry__
* __Many To One Ancestry Weak__
* __Many To Many__
* __Many To Many Single-directional__

__One To One__

Each object of the Owner Entity is linked to one and only one object of the Foreign Entity.

__One To Many__

Each object of the Owner Entity can be linked to many objects of the Foreign Entity.

__Many To One__

Multiple objects of the Owner Entity can be linked to one object of the Foreign Entity.

__Many To Many__

One or more objects of the Owner Entity can be related to zero, one or many objects of the Foreign Entity.

__Single-directional__

Only the object of the Owner Entity can create, update, read, deleet, query the relationship to the Foreign Entity.

__Bidirectional__

Both the object of the Owner Entity and the object of the Foreign Entity can create, update, read, deleet, query the relationship of them.

__Ancestry__

The object of the Owner Entity cannot exist without the object of the Foreign Entity.
When deleting the object of the Owner Entity, the object of the Foreign Entity will be removed as well.

__Descendant__

The object of the Foreign Entity cannot exist without the object of the Owner Entity.
When deleting the object of the Owner Entity, the object of the Foreign Entity will be removed as well.

__Ancestry Weak__

The object of the Owner Entity can exist without the object of the Foreign Entity.
When deleting the object of the Owner Entity, the object of the Foreign Entity will be removed as well.

__Descendant Weak__

The object of the Foreign Entity can exist without the object of the Owner Entity.
When deleting the object of the Owner Entity, the object of the Foreign Entity will be removed as well.



CSS class name mapping to reference type as below.

|class name|property type|
|:------|:-------:|
|cp-one2one|__One To One__|
|cp-one2one-s|__One To One Single-directional__|
|cp-one2one-i|__One To One Bidirectional__|
|cp-one2one-a|__One To One Ancestry__|
|cp-one2one-aw|__One To One Ancestry Weak__|
|cp-one2one-d|__One To One Descendant__|
|cp-one2one-dw|__One To One Descendant Weak__|
|cp-one2many|__One To Many__|
|cp-one2many-s|__One To Many Single-directional__|
|cp-one2many-i|__One To Many Bidirectional__|
|cp-one2many-d|__One To Many Descendant__|
|cp-one2many-dw|__One To Many Descendant Weak__|
|cp-many2one|__Many To One__|
|cp-many2one-s|__Many To One Single-directional__|
|cp-many2one-b|__Many To One Bidirectional__|
|cp-many2one-a|__Many To One Ancestry__|
|cp-many2one-aw|__Many To One Ancestry Weak__|
|cp-many2many|__Many To Many__|
|cp-many2many-s|__Many To Many Single-directional__|


There are some attributes to define the reference details.

|attribute|description|
|:------|:-------:|
|cp-refe-name|reference name|
|cp-storage-name|reference storage name, convert to column name of a table, if not given, cp-refe-name is applied.|
|cp-inv-name|when reference is not Single-directional, the inverse name need to be given|
|cp-inv-storage-name|inverse reference storage name, convert to column name of a table, if not given, cp-inv-name is applied.|
|cp-refe-entity|the name of the Foreign Entity|
|cp-entity-name|the name of the Owner Entity|


