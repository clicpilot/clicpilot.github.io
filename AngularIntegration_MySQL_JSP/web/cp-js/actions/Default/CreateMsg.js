var Default_CreateMsg_ClientPart = (function(){
var view = {};
var functions = {};
var parameter = {};
var result = {};

functions.Default_CreateMsg_Request = 
function(arg, succ, error, msg){
var param= new Object();
param.app = "AngularIntegration";
param.mdl = "Default";
param.act = "CreateMsg";
param.obj = arg.obj;
param.msg = msg;
param.method = "POST";
param.succ = succ;
param.error = error;
CP.Util.RunClientCallBackFunction("Default", "CreateMsg", "Request", "Before", functions, arg, param)
if(arg.blocked) return;
result.Default_CreateMsg=CP.Util.RequestAction(param);
CP.Util.RunClientCallBackFunction("Default", "CreateMsg", "Request", "After", functions, arg, param)
parameter.Default_CreateMsg=param;
}
functions.Default_CreateMsg_InitUI = 
function(arg){
CP.Util.RunClientCallBackFunction("Default", "CreateMsg", "InitUI", "Before", functions, arg)
if(arg.blocked) return;
CP.Util.RunClientCallBackFunction("Default", "CreateMsg", "InitUI", "After", functions, arg)
}
functions.Default_CreateMsg_PaintUI = 
function(element){
view.MsgText_input = $("FORM[cp-action-name='CreateMsg'] INPUT[cp-prop-name='MsgText']")
if(!view.MsgId_input){
view.MsgId_input=$("<input type='hidden' value='0'>");
$("FORM[cp-action-name='CreateMsg']").append($(view.MsgId_input));
}
view.submitbtn = $("FORM[cp-action-name='CreateMsg'] .cp-submit");
$(view.submitbtn).unbind( "click");
$(view.submitbtn).bind("click", function(){
var arg = {};
var inputData = functions.Default_CreateMsg_UI2Data(arg);
if(!inputData) return false;
view.submitbtn.attr("disabled", true);
var succcallback = function(res){functions.Default_CreateMsg_Data2UI(res);view.submitbtn.removeAttr("disabled");}
var errorcallback = function(e){CP.Util.ShowActionMsg("CreateMsg", "Default", e.message);view.submitbtn.removeAttr("disabled");}
try{
functions.Default_CreateMsg_Request(inputData, succcallback, errorcallback);
} catch(e) {
view.submitbtn.attr("disabled", false);
CP.Util.ShowError(e);
throw e;
}
});
}
functions.Default_CreateMsg_UI2Data = 
function(arg){
CP.Util.RunClientCallBackFunction("Default", "CreateMsg", "UI2Data", "Before", functions, arg)
if(arg.blocked) return;
var obj = new Object();
if(!arg.idOnly){
var param= new Object();
param.mdl = "Default";
param.act = "CreateMsg";
var MsgText_val =  view.MsgText_input.val();
if(MsgText_val == "") {
CP.Util.ShowActionMsg(param.act, param.mdl, "The value of MsgText cannot be empty.");
return false;
}

obj.MsgText=MsgText_val;
}
CP.Util.RunClientCallBackFunction("Default", "CreateMsg", "UI2Data", "After", functions, arg, obj)
return {"obj":obj};
}
functions.Default_CreateMsg_Data2UI = 
function(arg){
CP.Util.RunClientCallBackFunction("Default", "CreateMsg", "Data2UI", "Before", functions, arg)
if(arg.blocked) return;
view.MsgText_input = $("FORM[cp-action-name='CreateMsg'] INPUT[cp-prop-name='MsgText']")
if(!view.MsgId_input){
view.MsgId_input=$("<input type='hidden' value='0'>");
$("FORM[cp-action-name='CreateMsg']").append($(view.MsgId_input));
}
view.submitbtn = $("FORM[cp-action-name='CreateMsg'] .cp-submit");
$(view.submitbtn).unbind( "click");
$(view.submitbtn).bind("click", function(){
var arg = {};
var inputData = functions.Default_CreateMsg_UI2Data(arg);
if(!inputData) return false;
view.submitbtn.attr("disabled", true);
var succcallback = function(res){functions.Default_CreateMsg_Data2UI(res);view.submitbtn.removeAttr("disabled");}
var errorcallback = function(e){CP.Util.ShowActionMsg("CreateMsg", "Default", e.message);view.submitbtn.removeAttr("disabled");}
try{
functions.Default_CreateMsg_Request(inputData, succcallback, errorcallback);
} catch(e) {
view.submitbtn.attr("disabled", false);
CP.Util.ShowError(e);
throw e;
}
});
var obj = new Object();
obj.MsgId="0";
view.MsgText_input.val("");
CP.Util.ShowActionMsg("CreateMsg", "Default", "Data Created!")
var arg1 = {Id: arg["obj"]["MsgId"], updateView : true}
Default_QueryMsg_ClientPart.functions.Default_QueryMsg_Main(arg1);
CP.Util.RunClientCallBackFunction("Default", "CreateMsg", "Data2UI", "After", functions, arg)
}
functions.Default_CreateMsg_ErrorHandle = function(e){CP.Util.ShowError(e);};
functions.Default_CreateMsg_Main=function(arg) {
var id = arg.Id;
var from = arg.From;
var refeId = arg.RefeId;
var repaint = !arg.NotRepaint;
var updateView = arg.updateView;
var resetView = arg.resetView;
var element = arg.Element;
var autoRequest = false || arg.AutoRequest;
if(!id && updateView && !resetView){
var idParam = functions.Default_CreateMsg_UI2Data({id:id, refeId:refeId, from:from, idOnly:true});
id=idParam?(idParam.obj?(idParam.obj.MsgId):id):id;
id=idParam?(idParam.id?(idParam.id):id):id;
}
functions.Default_CreateMsg_PaintUI($(element));
if(!arg.doAction || eval(id))
functions.Default_CreateMsg_InitUI({id:(id?id:0), refeId:(refeId?refeId:0)});
if(autoRequest || !repaint) {
var param = functions.Default_CreateMsg_UI2Data({id:(id?id:0), refeId:(refeId?refeId:0), from:from});
if(!param) return false;
functions.Default_CreateMsg_Request(param, functions.Default_CreateMsg_Data2UI, functions.Default_CreateMsg_ErrorHandle, arg.msg);
}
}
if(!window.CP_TEST){
CP.Util.AddInitFunc(function(){
functions.Default_CreateMsg_Main({});
});
}
return {
functions : functions,
};
})();