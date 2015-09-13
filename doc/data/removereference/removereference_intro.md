The HTML tag which has the class __cp-remove-ref__ defines a __RemoveReference__ action. While to demostrate remove reference, it needs to list the owner objects. so in the example there is a query to list all the items, all the subitems and reference objects and candidate objects.

After page loaded, 
* Click the "clicpilot-js console" button to open the console. 
* Select the Data in the menu. 
* In the SQL textarea, input "INSERT INTO ITEM(NAME) VALUES ('Item 1')"
* In the SQL textarea, input "INSERT INTO SUBITEM(SUBNAME) VALUES ('SubItem 1')"
* In the SQL textarea, input "INSERT INTO SUBITEM(SUBNAME) VALUES ('SubItem 2')"
* In the SQL textarea, input "INSERT INTO SUBITEM(SUBNAME) VALUES ('SubItem 3')"
* In the SQL textarea, input "INSERT INTO ITEM\_REFE1\_REF(ITEM\_ITEMID, SUBITEM\_SUBITEMID) VALUES (1,1)"
* the SQL above, create 1 Items and 3 SubItems and make the "Item 1" link to "SubItem 1".
* Click the "clicpilot-js console" button back to page preview.
* The data will be displayed in the console page. 'Item1', exists, and "SubItem 1" links to "Item 1", and "SubItem 2", "SubItem 3" are displayed as candidates for new Item.
* Click "Item 1", "SubItem 2", "SubItem 3" displayed as candidates of "Item 1".
* Click "Remove" of "SubItem 1", "SubItem 1" is removed from subitem of "Item 1".
* Click "Add" of "SubItem 3", "SubItem 3" is added as subitem of "Item 1".

The _cp-complete-observer_ is an array of actions, which will be invoked after the action execute completetly.

![Query Action](./data/removereference/removereference_action_1.jpg)