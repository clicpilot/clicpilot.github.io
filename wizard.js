if(window.CP_Init) {
  window.CP_Init(function(){

  	$("#contentlist").change(function(){
  		var content = $("#contentlist").val();
  		var arr = content.split(',');
  		if(arr[0]=="Form") {
  			CP_UpdateView("UpdateForm", {Id:arr[1]});
  			$("#update-form").show();
  		}
  	});

  	$("#fieldlist").change(function(){debugger;
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
  		}
  	});

  	CP_AfterAction("QueryForm",function(p) {
  		$("#contentlist").val('Form,'+window.currentFormId);
  		$("#contentlist").change();
  	});

  	CP_AfterAction("QueryFormPropField",function(p) {
  		$("#fieldlist").val('Prop,'+window.currentPropFieldId);
  		$("#fieldlist").change();
  	});

  	CP_AfterAction("QueryFormRefeField",function(p) {
  		$("#fieldlist").val('Refe,'+window.currentRefeFieldId);
  		$("#fieldlist").change();
  	});

  	
  });
}


function createForm() {
	window.entcount = window.entcount || 1; 
	var entname = "Ent"+entcount;
	window.entcount++;
	entname = window.prompt('Please input entity name of the form.', entname);
	CP_RequestAction("CreateForm", {obj:{EntityName:entname, Name:entname+"Form", Label:entname+" Form", Type:"Create"}}, function(res){
  		//CP_UpdateView("UpdateForm", {Id:res.obj.FormId});
  		window.currentFormId = res.obj.FormId;
  		CP_DoAction("QueryForm");
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
  	var arr = content.split(',');
	CP_RequestAction("CreatePropField", {obj:{PropName:propname, Label:propname, PropType:"cp-string", Form:{FormId:arr[1]}}}, function(res){
		window.currentPropFieldId = res.obj.PropFieldId;
  		CP_DoAction("QueryFormPropField", {Id:arr[1]});
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
  	var arr = content.split(',');
	CP_RequestAction("CreateRefeField", {obj:{RefeName:refename, Label:refename, RefeType:"cp-many2one", Form:{FormId:arr[1]}}}, function(res){
  		window.currentRefeFieldId = res.obj.RefeFieldId;
  		CP_DoAction("QueryFormRefeField", {Id:arr[1]});
	}, function(e){
		alert(e.message);
	});
}