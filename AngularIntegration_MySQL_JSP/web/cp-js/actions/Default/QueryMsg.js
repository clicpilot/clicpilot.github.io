var Default_QueryMsg_ClientPart = (function(){
var view = {};
var functions = {};
var parameter = {};
var result = {};

functions.Default_QueryMsg_Request = 
function(arg, succ, error, msg){
var param= new Object();
param.app = "AngularIntegration";
param.mdl = "Default";
param.act = "QueryMsg";
param.conditions = new Object();
param.msg = msg;
param.method = "POST";
param.succ = succ;
param.error = error;
CP.Util.RunClientCallBackFunction("Default", "QueryMsg", "Request", "Before", functions, arg, param)
if(arg.blocked) return;
result.Default_QueryMsg=CP.Util.RequestAction(param);
CP.Util.RunClientCallBackFunction("Default", "QueryMsg", "Request", "After", functions, arg, param)
parameter.Default_QueryMsg=param;
}
functions.Default_QueryMsg_InitUI = 
function(arg){
CP.Util.RunClientCallBackFunction("Default", "QueryMsg", "InitUI", "Before", functions, arg)
if(arg.blocked) return;
CP.Util.RunClientCallBackFunction("Default", "QueryMsg", "InitUI", "After", functions, arg)
}
functions.Default_QueryMsg_PaintUI = 
function(element){
var arg = {};
CP.Util.RunClientCallBackFunction("Default", "QueryMsg", "PaintUI", "Before", functions, arg, element)
if(arg.blocked) return;

view=view || {};
view.container = $(".cp-query[cp-action-name='QueryMsg']");

var arg = {};
CP.Util.RunClientCallBackFunction("Default", "QueryMsg", "PaintUI", "After", functions, arg, element)
}
functions.Default_QueryMsg_UI2Data = 
function(arg){
CP.Util.RunClientCallBackFunction("Default", "QueryMsg", "UI2Data", "Before", functions, arg)
if(arg.blocked) return;
arg.conditions = new Object();
CP.Util.RunClientCallBackFunction("Default", "QueryMsg", "UI2Data", "After", functions, arg)
return arg;
}
functions.Default_QueryMsg_Data2UI = 
function(res){
var arg = {};
CP.Util.RunClientCallBackFunction("Default", "QueryMsg", "Data2UI", "Before", functions, arg, res);
if(arg.blocked) return;
if(view.container){
view.container.empty();
}
function anonymous(it
/**/) {
var out='\n        <li>\n            <span>'+(it.MsgId)+'</span><span>'+(it.MsgText)+'</span>\n        </li>\n        ';return out;
}
for(var i=0;i<res.obj.data.length;i++){
view.container.append(anonymous(res.obj.data[i]));
}
CP.Util.RunClientCallBackFunction("Default", "QueryMsg", "Data2UI", "After", functions, arg, res);
}
functions.Default_QueryMsg_ErrorHandle = function(e){CP.Util.ShowError(e);};
functions.Default_QueryMsg_Main=function(arg) {
var id = arg.Id;
var from = arg.From;
var refeId = arg.RefeId;
var repaint = !arg.NotRepaint;
var updateView = arg.updateView;
var resetView = arg.resetView;
var element = arg.Element;
var autoRequest = true || arg.AutoRequest;
if(!id && updateView && !resetView){
var idParam = functions.Default_QueryMsg_UI2Data({id:id, refeId:refeId, from:from, idOnly:true});
id=idParam?(idParam.obj?(idParam.obj.MsgId):id):id;
id=idParam?(idParam.id?(idParam.id):id):id;
}
functions.Default_QueryMsg_PaintUI($(element));
if(!arg.doAction || eval(id))
functions.Default_QueryMsg_InitUI({id:(id?id:0), refeId:(refeId?refeId:0)});
if(autoRequest || !repaint) {
var param = functions.Default_QueryMsg_UI2Data({id:(id?id:0), refeId:(refeId?refeId:0), from:from});
if(!param) return false;
functions.Default_QueryMsg_Request(param, functions.Default_QueryMsg_Data2UI, functions.Default_QueryMsg_ErrorHandle, arg.msg);
}
}
if(!window.CP_TEST){
CP.Util.AddInitFunc(function(){
functions.Default_QueryMsg_Main({});
});
}
return {
functions : functions,
};
})();