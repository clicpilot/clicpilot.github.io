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
        
        var code = appCodeEditor.getValue();
        if(window.SelectedFileId) {
          CP_RequestAction("UpdateFileCode", {obj:{FileId:window.SelectedFileId, Code:code}}, function() {

          }, function(){

          });
        }
      }, 500);
    });

    CP_BeforeAction("QueryCandFileFolder",function(){
       
    });

    CP_AfterAction("RenameApp",function(){
       CP_UpdateView("QueryApp");
    });

    CP_AfterAction("RenameFolder",function(){
       CP_UpdateView("QueryApp");
    });

    CP_AfterAction("RenameFile",function(){
       CP_UpdateView("QueryApp");
    });

    CP_AfterAction("CreateFile",function(){
       CP_UpdateView("QueryApp");
    });

    CP_AfterAction("CreateFile2",function(){
       CP_UpdateView("QueryApp");
    });

    CP_AfterAction("CreateFolder2",function(){
       CP_UpdateView("QueryApp");
    });

    CP_AfterAction("CreateFolder",function(){
        CP_DoAction("QueryApp");
    });

    CP_AfterAction("DeleteFolder",function(){
        CP_DoAction("QueryApp");
    });

    CP_AfterAction("DeleteFile",function(){
        CP_DoAction("QueryApp");
    });

    CP_AfterAction("DeleteApp",function(){
        CP_DoAction("QueryApp");
    });



    CP_AfterAction("QueryApp",function(){
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

        //CP_UpdateView("ReadApp", {Id: res.obj.AppId});

        window.SelectedAppId = res.obj.AppId;
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

        $("#selectedAppId").val(window.SelectedAppId);

      }
    });

    initUI();
    //CP_DoAction("ReadApp", {Id:1});
    CP_DoAction("QueryApp");
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
  $("#preview-div").css("height", (winHeight-51)+"px");
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

  window.apps = {};
  $("#app_nav").empty();
  $(".AppItem").each(function(idx, elm){
    var app = $(this).val();
    var apparray = app.split(",");
    var appid = apparray[0].trim();
    apps["app_"+appid] = {};
    apps["app_"+appid].name = apparray[1];
    apps["app_"+appid]["file"] = {};
    apps["app_"+appid]["folder"] = {};
    $("#app_nav").append("<li><a href='#' onclick='javascript:SelectApp("+appid+")'>"+apparray[1]+"</a><ul id='app_"+appid+"'></ul></li>");
    
  });

  $(".FolderItem").each(function(idx, elm){
    var folder = $(this).val();
    var folderarray = folder.split(",");
    
    var folderid = folderarray[0].trim();
    var appid = folderarray[4].trim();
    if(!eval(folderarray[2].trim())) {
      apps["app_"+appid]["folder"]["folder_"+folderid] = "./"+folderarray[1].trim();
      $("#app_"+folderarray[4].trim()).append("<li><a href='#' onclick='javascript:SelectFolder("+folderarray[0].trim()+")'>"+folderarray[1]+"</a><ul id='folder_"+folderarray[0].trim()+"'></ul></li>");
    }
    else {
      var parentid = folderarray[2].trim();
      apps["app_"+appid]["folder"]["folder_"+folderid] = apps["app_"+appid]["folder"]["folder_"+parentid]+"/"+folderarray[1].trim();
      $("#folder_"+folderarray[2].trim()).append("<li><a href='#' onclick='javascript:SelectFolder("+folderarray[0].trim()+")'>"+folderarray[1]+"</a><ul id='folder_"+folderarray[0].trim()+"'></ul></li>");
    }
  });

  $(".FileItem").each(function(idx, elm){
    var file = $(this).val();
    var filearray = file.split(",");
    var fileid = filearray[0].trim();
    var appid = filearray[4].trim();
    if(!eval(filearray[2].trim())) {
      apps["app_"+appid]["file"]["file_"+fileid] = "./"+filearray[1].trim();
      $("#app_"+filearray[4].trim()).append("<li id='file_"+filearray[0].trim()+"'><a href='#' onclick='javascript:SelectFile("+filearray[0].trim()+")'>"+filearray[1]+"</a></li>");
    } else {
      var parentid = filearray[2].trim();
       apps["app_"+appid]["file"]["file_"+fileid] = apps["app_"+appid]["folder"]["folder_"+parentid]+"/"+filearray[1].trim();
      $("#folder_"+filearray[2].trim()).append("<li id='file_"+filearray[0].trim()+"'><a href='#' onclick='javascript:SelectFile("+filearray[0].trim()+")'>"+filearray[1]+"</a></li>");
    }
  });
}
function SelectFolder(id) {
  window.SelectedFolderId = id;
}

function SelectApp(id) {
  window.SelectedAppId = id;
  $("#selectedAppId").val(id);
}

function SelectFile(id) {

  CP_RequestAction("ReadFile", {id:id}, function(res){

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
    window.SelectedFolderId = res.obj.Folder?res.obj.Folder.FolderId:null;
    window.SelectedAppId = res.obj.App.AppId;
    appCodeEditor.setValue(res.obj.Code,-1);
  }, function(res){
    
  })
}

window.previewInWin = function() {
  var html = createAppHTML();
  var myWindow = window.open("", "");
  myWindow.document.open('text/html');
  myWindow.document.write(html);
  myWindow.document.close();

}

window.closePreviewFrame = function(app) {
  $("#preview-div").hide();
  $("#file-code-editor").show();
}
window.previewInFrame = function(app) {

  var html = createAppHTML();
  $("#preview-div").show();
  $("#file-code-editor").hide();
  $("#preview-div").empty();
  $("#preview-div").html('<iframe id="previewFrame" style="width:100%;height:100%;margin: 0; padding: 0;" ></iframe>');
  var previewFrame = document.getElementById('previewFrame');
  var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;
  preview.open();
  preview.write(html);
  preview.close();
}

function createAppHTML() {
  var appid = window.SelectedAppId;
  var appObj = {};
  appObj.name = apps["app_"+appid].name;
  appObj.file = [];
  appObj.code = [];
  var files = apps["app_"+appid]["file"];
  for(var key in files) {
    var fileId = key.substring(5);
    var path = files[key].trim();
    appObj.file.push(path);
    debugger;
    CP_RequestAction("ReadFile", {id:fileId}, function(res){

      if(res.obj.Name.indexOf(".jpg")==-1 && res.obj.Name.indexOf(".png")==-1) {
        var code = res.obj.Code;
        /*
        var param = {code:code, path:path};
        if(res.obj.Name.indexOf(".html")!=-1 || res.obj.Name.indexOf(".htm")!=-1) {
          
            
            $(code).filter('script').each(function(param) {
              var path = param.path
              var thisCode = $("<div />").append($(this).clone()).html();
              if($(this).attr('class')=='clicpilot-js') {
                var srcpath = $(this).attr("src");
                if(!srcpath) return;
                var path = "";
                param.code = param.code.replace(srcpath, path);
                return;
              }

              var srcpath = $(this).attr("src");
              if(!srcpath) return;
              var srcpath2 = CP.Util.RelativePath(path, srcpath);
              for(var key2 in files) {
                var fileId2 = key2.substring(5);
                var path2 = files[key2].trim();
                if(srcpath2 == path2){
                  CP_RequestAction("ReadFile", {id:fileId2}, function(res2){
                    param.code = param.code.replace(thisCode, "<script>"+res2.obj.Code+"</script>");
                  }, function(res){

                  });
                  break;
                }
              }
              


            }, [param]);
            $(code).filter('style').each(function(param) {
              var thisCode = $("<div />").append($(this).clone()).html();
              var srcpath = $(this).attr("link");
              if(!srcpath) return;
              var srcpath2 = CP.Util.RelativePath(path, srcpath);
              for(var key2 in files) {
                var fileId2 = key2.substring(5);
                var path2 = files[key2].trim();
                if(srcpath2 == path2){
                  CP_RequestAction("ReadFile", {id:fileId2}, function(res2){
                    param.code = param.code.replace(thisCode, "<style>"+res2.obj.Code+"</style>");
                  }, function(res){

                  });
                  break;
                }
              }
              //htmlcontent = htmlcontent.replace(srcpath, path);
            }, [param]);


          
        }
        */
        appObj.code.push(Base64.encode(code));
      } else {
        
        appObj.code.push((res.obj.Code));
      }
    }, function(res){
      
    })
  }

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
  //JSON.stringify(appObj),
  CP.Util.Stringify(appObj),
  ';',
  '<','/script>',
  '<','script src="https://code.jquery.com/jquery-1.11.1.min.js"></','script>',
  '<','script src="clicpilot-js-1.0.3.js" class="clicpilot-js"></','script>',
  '</body>',
  '</html>'
  ];
  return html.join("");
}

