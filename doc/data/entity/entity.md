Entity is the data model of the application. It contains properties, reference, index profile and unique profile.

Entity is always defiend with Action together.

|type|code|description|
|:------|:-------:|:-------:|
|attribute|cp-entity-name="_entityname_"|the name of entity|
|attribute|cp-storage-name="_entitystoragename_"|the name of table name, Optional, if not set, cp-entity-name will be used as cp-storage-name.|

There are 11 kinds of __properties__, String, Text, Short, Integer, Long, Float, Decimal, Date, DateTime, Time, TimeStamp.

There are 15 kinds of __references__, One To One, One To One Single-directional, One To One Bidirectional, One To One Ancestry, One To One Descendant, One To Many, One To Many Single-directional, One To Many Bidirectional, One To Many Descendant, Many To One, Many To One Single-directional, Many To One Bidirectional, Many To One Ancestry, Many To Many, Many To Many Single-directional.

__Index Profile__ is a set of properties. The index profile is to be converted into index of a database table.

__Unique Profile__ is a set of properties. It is constrain of one or a set of properties. It is to be converted into unique setting of a database table.
