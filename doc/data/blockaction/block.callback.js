function Default_CreateItem_BeforeRun(ctx) {
	ctx.put("stop", true);
	ctx.put("message", "Cannot create Item!");
}