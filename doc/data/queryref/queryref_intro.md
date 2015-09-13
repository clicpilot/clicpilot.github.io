The HTML tag which has the class __cp-query-ref__ defines a __QueryRef__ action. While to demostrate query reference, it needs to list the onwer objects. so in the example there is a query to list all the items and all the subitems.

After page loaded, 
* Click the "clicpilot-js console" button to open the console. 
* Select the Data in the menu. 
* In the SQL textarea, input "INSERT INTO ITEM(NAME) VALUES ('Item 1')"
* In the SQL textarea, input "INSERT INTO ITEM(NAME) VALUES ('Item 2')"
* In the SQL textarea, input "INSERT INTO SUBITEM(SUBNAME) VALUES ('SubItem 1')"
* In the SQL textarea, input "INSERT INTO SUBITEM(sUBNAME) VALUES ('SubItem 2')"
* In the SQL textarea, input "INSERT INTO SUBITEM(SUBNAME) VALUES ('SubItem 3')"
* In the SQL textarea, input "INSERT INTO SUBITEM(sUBNAME) VALUES ('SubItem 4')"
* In the SQL textarea, input "INSERT INTO ITEM\_REFE1\_REF(ITEM\_ITEMID, SUBITEM\_SUBITEMID) VALUES (1,1)"
* In the SQL textarea, input "INSERT INTO ITEM\_REFE1\_REF(ITEM\_ITEMID, SUBITEM\_SUBITEMID) VALUES (1,2)"
* In the SQL textarea, input "INSERT INTO ITEM\_REFE1\_REF(ITEM\_ITEMID, SUBITEM\_SUBITEMID) VALUES (2,3)"
* In the SQL textarea, input "INSERT INTO ITEM\_REFE1\_REF(ITEM\_ITEMID, SUBITEM\_SUBITEMID) VALUES (2,4)"
* the SQL above, create 2 Items and 4 SubItems and make the "Item 1" link to "SubItem 1", "SubItem 2" and the "Item 2" link to "SubItem 3", "SubItem 4".
* Click the "clicpilot-js console" button back to page preview.
* The data will be displayed in the console page. 'Item1', 'Item 2' exists, and "SubItem 1", "SubItem 2" links to "Item 1", and "SubItem 3", "SubItem 4" links to "Item 2".
* Click "Item 1", "SubItem 1", "SubItem 2" will be displayed, and Click "Item 2", "SubItem 3", "SubItem 4" will be displayed. This is Query Reference.

![Query Action](./data/queryref/queryref_action_1.jpg)

![Query Action](./data/queryref/queryref_action_2.jpg)
