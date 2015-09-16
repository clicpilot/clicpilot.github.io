function Default_CreateItem_BeforeRun(ctx) {
	var d = (new Date());
	var obj = ctx.get("_In");
	var prop = obj.get("Name");
	obj.put("Name", prop+" at "+d.toString());

}

function Default_CreateItem_AfterRun(ctx) {
	var d = (new Date());
	var out = ctx.get("_Out");
	console.log("Item Id: "+out.get("ItemId"));
}
