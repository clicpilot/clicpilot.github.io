The HTML tag which has the class __cp-query-ref-candidate__ defines a __QueryRefCandidate__ action. While to demostrate query reference, it needs to list the onwer objects. so in the example there is a query to list all the items, all the subitems and reference objects and candidate objects.

After page loaded, 
* Click the "clicpilot-js console" button to open the console. 
* Select the Data in the menu. 
* In the SQL textarea, input "INSERT INTO ITEM(NAME) VALUES ('Item 1')"
* In the SQL textarea, input "INSERT INTO SUBITEM(SUBNAME) VALUES ('SubItem 1')"
* In the SQL textarea, input "INSERT INTO SUBITEM(sUBNAME) VALUES ('SubItem 2')"
* In the SQL textarea, input "INSERT INTO SUBITEM(SUBNAME) VALUES ('SubItem 3')"
* In the SQL textarea, input "INSERT INTO ITEM_REFE1_REF(ITEM_ITEMID, SUBITEM_SUBITEMID) VALUES (1,1)"
* the SQL above, create 1 Items and 3 SubItems and make the "Item 1" link to "SubItem 1".
* Click the "clicpilot-js console" button back to page preview.
* The data will be displayed in the console page. 'Item1', exists, and "SubItem 1" links to "Item 1", and "SubItem 2", "SubItem 3" are displayed as candidates of new Item.
* Click "Item 1", "SubItem 2", "SubItem 3" displayed as candidates of "Item 1".

![Query Action](./data/queryrefcandidate/queryrefcandidate_action_1.jpg)
