function Default_CreateEnt_BeforeRun(ctx) {

    var inMap = ctx.get("_In");
    
    CP_ExecuteAction(ctx, "CreateEnt2", {
            obj:{Prop1:"Before "+inMap.get('Prop1')}
        }, function(res){
            Log.debug("Ent created. Id: "+res.obj.EntId);
        }, function(ctx){

        });

}


function CP_AppInit(ctx) {
    for(var i=0;i<10;i++) {
        CP_ExecuteAction(ctx, "CreateEnt", {
            obj:{Prop1:"Prop"+i}
        }, function(res){

        }, function(e){

        });
    };
}
