if(window.CP_Init) {
  window.CP_Init(function(){
  	window.onresize = function(event) {
          initUI();
      };

  	window.appCodeEditor = ace.edit("file-code-editor");
    appCodeEditor.getSession().setUseWorker(false);
    appCodeEditor.setTheme("ace/theme/chaos");

    appCodeEditor.getSession().on('change', function(e) {
      clearTimeout(window.triggerAppCodeChangeDelay);
      window.triggerAppCodeChangeDelay = setTimeout(function() {
        debugger;
        var code = appCodeEditor.getValue();
        if(window.SelectedFileId) {
          CP_RequestAction("UpdateFileCode", {obj:{FileId:window.SelectedFileId, Code:code}}, function() {

          }, function(){

          });
        }
      }, 500);
    });


    CP_AfterAction("CreateFile",function(){
       CP_UpdateView("QueryFolder");
    });

    CP_AfterAction("CreateFolder",function(){
        CP_DoAction("QueryFolder");
    });

    CP_AfterAction("QueryFolder", function(){
      CP_DoAction("QueryFile");
    });

    CP_AfterAction("QueryFile", function(){
      drawTree();
    });

    CP_AfterAction("CreateApp", function(res){
      if(res.success) {

        CP_UpdateView("ReadApp", {Id: res.obj.AppId});


        $("#folder-parent-id").val(0);
        $("#folder-name").val("js");
        $("#folder-app-id").val(res.obj.AppId);
        CP_DoAction("CreateFolder");
        
        $("#folder-parent-id").val(0);
        $("#folder-name").val("css");
        $("#folder-app-id").val(res.obj.AppId);
        CP_DoAction("CreateFolder");
        
        $("#folder-parent-id").val(0);
        $("#folder-name").val("img");
        $("#folder-app-id").val(res.obj.AppId);
        CP_DoAction("CreateFolder");

        $("#file-folder-id").val(0);
        $("#file-name").val("index.html");
        $("#file-app-id").val(res.obj.AppId);
        CP_DoAction("CreateFile");

        $("#file-folder-id").val(1);
        $("#file-name").val("app.js");
        $("#file-code").val("/* app.js */");
        $("#file-app-id").val(res.obj.AppId);
        CP_DoAction("CreateFile");
      }
    });

    initUI();
    CP_DoAction("ReadApp", {Id:1});
    CP_DoAction("QueryFolder");
  });
}

function initUI() {
	var winHeight = "innerHeight" in window 
           ? window.innerHeight
           : document.documentElement.offsetHeight; 
  var winWidth = "innerWidth" in window 
               ? window.innerWidth
               : document.documentElement.offsetWidth; 
  $("#file-code-editor").css("height", (winHeight-51)+"px");
  window.appCodeEditor.resize();             
}

function createFile() {
	var fname = window.prompt('Please input file name. ".html", ".js", ".css", ".callback.js" ".json"');
	$("#file-name").val(fname);
	CP_DoAction("CreateFile");

}

function createFolder() {
	var fname = window.prompt('Please input folder name');
	$("#folder-name").val(fname);
	CP_DoAction("CreateFolder");


}

function createApp() {
  var appname = window.prompt('Please input application name');
  $("#app-name").val(appname);

  CP_DoAction("CreateApp");

}


function drawTree() {
  $("#file_nav").empty();
  $(".FolderItem").each(function(idx, elm){
    var folder = $(this).val();
    var folderarray = folder.split(",");
    if(!eval(folderarray[2]))
      $("#file_nav").append("<li><a href='#' onclick='javascript:SelectFile(filearray[1].trim())'>"+folderarray[1]+"</a><ul id='folder_"+folderarray[0].trim()+"'></ul></li>");
  });

  $(".FileItem").each(function(idx, elm){
    var file = $(this).val();
    var filearray = file.split(",");
    if(!eval(filearray[2].trim()))
      $("#file_nav").append("<li id='file_"+filearray[0].trim()+"'><a href='#' onclick='javascript:SelectFile("+filearray[0].trim()+")'>"+filearray[1]+"</a></li>");
    else
      $("#folder_"+filearray[2].trim()).append("<li id='file_"+filearray[0].trim()+"'><a href='#' onclick='javascript:SelectFile("+filearray[0].trim()+")'>"+filearray[1]+"</a></li>");
  });
}

function SelectFile(id) {
  debugger;
  CP_RequestAction("ReadFile", {id:id}, function(res){
    debugger;
    
    if(res.obj.Name.indexOf(".html")) {
      appCodeEditor.session.setMode("ace/mode/html");  
    } else if(res.obj.Name.indexOf(".js")) {
      appCodeEditor.session.setMode("ace/mode/javascript");  
    } else if(res.obj.Name.indexOf(".json")) {
      appCodeEditor.session.setMode("ace/mode/json");  
    } else if(res.obj.Name.indexOf(".css")) {
      appCodeEditor.session.setMode("ace/mode/css");  
    }
    window.SelectedFileId = id;
    appCodeEditor.setValue(res.obj.Code,-1);
  }, function(res){
    debugger;
  })
}
