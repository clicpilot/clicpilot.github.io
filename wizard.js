


if(window.CP_Init) {
  window.CP_Init(function(){

  	$("#contentlist").change(function(){
  		debugger;
  		var content = $("#contentlist").val();
  		var arr = content.split(',');
  		if(arr[0]=="Form") {
  			window.currentFormId = arr[1];
  			CP_UpdateView("UpdateForm", {Id:arr[1]});
  			$("#update-form").show();
  			CP_DoAction("QueryFormPropField", {Id:arr[1]});
  			CP_DoAction("QueryFormRefeField", {Id:arr[1]});
  			updateCode();
  		}
  	});

  	$("#fieldlist").change(function(){
  		window.currentPropFieldId = -1;
  		window.currentRefeFieldId = -1;
  		var content = $("#fieldlist").val();
  		if(content) {
	  		var arr = content.split(',');
	  		if(arr[0]=="Prop") {
	  			CP_UpdateView("UpdatePropField", {Id:arr[1]});
	  			$("#update-prop-field").show();
	  			$("#update-refe-field").hide();
	  		} else if(arr[0]=="Refe") {
	  			CP_UpdateView("UpdateRefeField", {Id:arr[1]});
	  			$("#update-refe-field").show();
	  			$("#update-prop-field").hide();
	  		}
  		} else {
  			$("#update-refe-field").hide();
	  		$("#update-prop-field").hide();
  		}
  	});

  	CP_AfterAction("QueryForm",function(p) {
  		if(window.currentFormId) {
  			$("#contentlist").val('Form,'+window.currentFormId);
  		}
  		$("#contentlist").change();
  	});

  	CP_AfterAction("QueryFormPropField",function(p) {
  		if(window.currentPropFieldId) {
  			$("#fieldlist").val('Prop,'+window.currentPropFieldId);
  		}
  		$("#fieldlist").change();
  	});

  	CP_AfterAction("QueryFormRefeField",function(p) {
  		if(window.currentRefeFieldId) {
  			$("#fieldlist").val('Refe,'+window.currentRefeFieldId);
  		}
  		$("#fieldlist").change();
  	});

  	CP_AfterAction("UpdateForm", function(res){
  		updateCode();
  	});

  	CP_AfterAction("UpdatePropField", function(res){
  		updateCode();
  	});

  	CP_AfterAction("UpdateRefeField", function(res){
  		updateCode();
  	});

  	window.appCodeEditor = ace.edit("editorpanel");
	appCodeEditor.getSession().setUseWorker(false);
	appCodeEditor.setTheme("ace/theme/chaos");

	window.onresize = function(event) {
        initUI();
    };
    initUI();
    CP_DoAction("QueryForm");
  	
  });
}

function initUI() {
	var winHeight = "innerHeight" in window 
           ? window.innerHeight
           : document.documentElement.offsetHeight; 
  	var winWidth = "innerWidth" in window 
               ? window.innerWidth
               : document.documentElement.offsetWidth; 
  	$("#editorpanel").css("height", (winHeight-32)+"px");
  	if(window.appCodeEditor) {
  		appCodeEditor.resize();
  	}
  	          
}

function createForm() {
	window.entcount = window.entcount || 1; 
	var entname = "Ent"+entcount;
	window.entcount++;
	entname = window.prompt('Please input entity name of the form.', entname);
	CP_RequestAction("CreateForm", {obj:{EntityName:entname, Name:entname+"Form", Label:entname+" Form", Type:"cp-create"}}, function(res){
  		//CP_UpdateView("UpdateForm", {Id:res.obj.FormId});
  		window.currentFormId = res.obj.FormId;
  		CP_DoAction("QueryForm");
  		//updateCode();
	}, function(e){
		alert(e.message);
	});
}


function createPropField() {
	
	var content = $("#contentlist").val();
	if(!content) {
		alert("Please select a Form first.");
		return;
	}
	window.propcount = window.propcount || 1; 
	var propname = "Prop"+propcount;
	window.propcount++;
	propname = window.prompt('Please input property name of the entity.', propname);
	if(!propname) {
		return;
	}
  	var arr = content.split(',');
	CP_RequestAction("CreatePropField", {obj:{PropName:propname, Label:propname, PropType:"cp-string", Form:{FormId:arr[1]}}}, function(res){
		window.currentPropFieldId = res.obj.PropFieldId;
  		CP_DoAction("QueryFormPropField", {Id:arr[1]});
  		updateCode();
	}, function(e){
		alert(e.message);
	});
}

function createRefeField() {
	
	var content = $("#contentlist").val();
	if(!content) {
		alert("Please select a Form first.");
		return;
	}
	window.refecount = window.refecount || 1; 
	var refename = "Refe"+refecount;
	window.refecount++;
	refename = window.prompt('Please input reference name of the entity.', refename);
	if(!refename) {
		return;
	}
  	var arr = content.split(',');
	CP_RequestAction("CreateRefeField", {obj:{RefeName:refename, Label:refename, RefeType:"cp-many2one", Element:"select",Form:{FormId:arr[1]}}}, function(res){
  		window.currentRefeFieldId = res.obj.RefeFieldId;
  		CP_DoAction("QueryFormRefeField", {Id:arr[1]});
  		updateCode();
	}, function(e){
		alert(e.message);
	});
}

function updateCode() {
	CP_RequestAction("UpdateReadForm", {id:window.currentFormId}, function(res){
		var param = res;
		CP_RequestAction("QueryFormPropField", {id:window.currentFormId}, function(res){
			param.obj.PropField = res.obj.data || [];
			CP_RequestAction("QueryFormRefeField", {id:window.currentFormId}, function(res){
				debugger;
				param.obj.RefeField = res.obj.data || [];
				var func = _.template($("#form-template").html());
				var code = func({it:param.obj});
				code = style_html(code);
				appCodeEditor.session.setMode("ace/mode/html");  
				appCodeEditor.setValue(code, -1);

			}, function(e) {

			});

		}, function(e) {

		});
		

	}, function(e){
		appCodeEditor.session.setMode("ace/mode/text");  
		appCodeEditor.setValue("Error occurred! "+e.message, -1);
	});

	
}

window.previewInWin = function(formcode) {

  var html = createFormAppHTML(appCodeEditor.getValue());
  var myWindow = window.open("clicpilot preview win", "");
  myWindow.document.open('text/html');
  myWindow.document.write(html);
  myWindow.document.close();

}

function createFormAppHTML(formcode) {
  var appid = window.SelectedAppId;
  var appObj = {};
  appObj.name = "FormPreview";
  appObj.file = ["./form.html"];
  var formhtmlcode = ['<!DOCTYPE html>',
  '<html lang="en">',
  '<head>',
  '<title>'+appObj.name+'</title>',
  '</head>',
  '<body>',
  formcode,
  '<','script src="./js/jquery.js"></','script>',
  '</body>',
  '</html>'
  ];
  appObj.code = [Base64.encode(formhtmlcode.join(""))];
  var html=
  ['<!DOCTYPE html>',
  '<html lang="en">',
  '<head>',
  '<title>'+appObj.name+'</title>',
  '</head>',
  '<body>',
  'Loading...',
  '<','script>',
  'window.CP_APP = ',
  CP.Util.Stringify(appObj),
  ';',
  '<','/script>',
  '<','script src="./js/jquery.js"></','script>',
  '<','script src="clicpilot-js-1.0.3.js" class="clicpilot-js"></','script>',
  '</body>',
  '</html>'
  ];
  return html.join("");
}