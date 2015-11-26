The funciton in CP_AppInit in callback.js file, will be invoked when application's database schema initialized. It can install initial data of an application.

    function CP_AppInit(ctx) {
        for(var i=0;i<10;i++) {
            CP_ExecuteAction(ctx, "CreateEnt", {
                obj:{Prop1:"Prop"+i}
            }, function(res){

            }, function(e){

            });
        };
    }

The example above insert 10 reocrds, after the database schema setup.

The parameter of ctx is an HashMap, which has the database connection information.

See a real example in CP_ExecuteAction section.
