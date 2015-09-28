if(window.CP_Init) {
  window.CP_Init(function(){
  	window.showeditor = false;
  	$("#manageApp").click( function() {
  		if(window.showeditor) {
  			$("#configcontent").hide();
  			$("#editorcontent").show();
  			$("#manageApp").text("Manage Panel")

  		} else {
  			$("#configcontent").show();
  			$("#editorcontent").hide();
  			$("#manageApp").text("Code Editor")

  		}
  		window.showeditor = !window.showeditor ;
  	});
  	$("#manageApp").click();
  	/*
  	

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
	*/
    
    CP_AfterAction("CreateApp", function(res){
	    if(res.success) {
	    	window.SelectedAppId = res.obj.AppId;
	    	updateView();
	    	drawAppList();
			SelectApp(window.SelectedAppId);
	    } else {
	    	alert("System error, cannot create application!");
	    }
    });

    CP_AfterAction("DeleteApp", function(res){
	    if(res.success) {
	    	window.SelectedAppId = null;
	        updateView();
	        drawAppList();
	        SelectApp(window.SelectedAppId);	
	    } else {
	    	alert("System error, cannot delete application!");
	    }

    	
    });
    



    

    CP_AfterAction("CreateFolder", function(res){

	    if(res.success) {

	        updateView();
    		SelectFolder(res.obj.FolderId);


	    } else {
	    	alert("System error, cannot create application!");
	    }

    	
    });

    CP_AfterAction("DeleteFolder", function(res){

	    if(res.success) {

	        updateView();
    		SelectFolder();


	    } else {
	    	alert("System error, cannot create application!");
	    }

    	
    });

    CP_AfterAction("CreateFile", function(res){

	    if(res.success) {

	        updateView();
    		SelectFile(res.obj.FileId);


	    } else {
	    	alert("System error, cannot create application!");
	    }

    	
    });

    CP_AfterAction("DeleteFile", function(res){

	    if(res.success) {

	        updateView();
    		SelectFile();


	    } else {
	    	alert("System error, cannot create application!");
	    }

    	
    });

    $("#applist").change(function(){
    	window.SelectedAppId = $("#applist").val();
    	updateView();
    	if(window.SelectedAppId>0) {
    		SelectApp(window.SelectedAppId);
    	} else {
    		SelectApp();
    	}
    	
    });

    window.onresize = function(event) {
        initUI();
    };
    initUI();

/*
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

	$("#manageApp").click(function(){
		$(".contentpane").hide();
		$(".configcontent").show();
	})


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
    */
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
  //$("#preview-div").css("height", (winHeight-51)+"px");
  	if(window.apps) {
  		for(var key in apps["app_"+SelectedAppId]["file"]) {
  			if(apps["app_"+SelectedAppId]["file"][key].editorObj) {
  				apps["app_"+SelectedAppId]["file"][key].editorObj.resize();
  			}
  		}
  	}
  	          
}

function createFile(type) {
	window.filecount = window.filecount || 1; 
	var fname = "file"+filecount;
	filecount++;
	if(type=="html") {
		fname += ".html";
	} else if(type=="js") {
		fname += ".js";
	} else if(type=="css") {
		fname += ".css";
	} else if(type=="json") {
		fname += ".json";
	} else if(type=="callback") {
		fname += ".callback.js";
	} 
	var fname = window.prompt('Please input file name.', fname);
	$("#file-name").val(fname);
	$("#file-folder-id").val($("#selectedFolderId").val()=="0"?"":$("#selectedFolderId").val());
	$("#file-app-id").val($("#selectedAppId").val());
	CP_DoAction("CreateFile");

}

function createFolder() {
	window.foldercount = window.foldercount || 1; 
	var foldername = window.prompt('Please input folder name', "Folder"+(foldercount++));
	$("#folder-name").val(foldername);
	$("#folder-parent-id").val($("#selectedFolderId").val());
	$("#folder-app-id").val($("#selectedAppId").val());
	CP_DoAction("CreateFolder");


}

function createApp() {
	window.appcount = window.appcount || 1; 
	var appname = window.prompt('Please input application name', "App"+(appcount++));
	$("#app-name").val(appname);
	CP_DoAction("CreateApp");
}

function updateView() {
	CP_UpdateView('QueryApp');
	CP_UpdateView("QueryFolder");
	CP_UpdateView("QueryFile");

	drawTree();
}

function drawAppList() {

	$("#applist").empty();
	$(".AppItem").each(function(idx, elm){

 	    var app = $(this).val();
	    var apparray = app.split(",");
	    var appid = apparray[0].trim();
	    var appname = apparray[1].trim();
	    if(idx==0 && SelectedAppId==null) {
			 window.SelectedAppId = appid;
		}
	    var selected = (SelectedAppId==appid)?"selected":"";
	    $("#applist").append("<option value='"+appid+"' "+selected+">"+appname+"</option>");

  	});
}

function drawTree() {

  window.apps = {};
  $("#app_nav").empty();

  $(".AppItem").each(function(idx, elm){
    var app = $(this).val();
    var apparray = app.split(",");
    var appid = apparray[0].trim();
    apps["app_"+appid] = {};
    apps["app_"+appid].id = appid;
    apps["app_"+appid].name = apparray[1];
    apps["app_"+appid]["file"] = {};
    apps["app_"+appid]["folder"] = {};
    if(appid==SelectedAppId) 
    	$("#app_nav").append("<li><a href='#' onclick='javascript:SelectApp("+appid+")'>"+apparray[1]+"</a><ul id='app_"+appid+"'></ul></li>");
	
    
  });
  
  $(".FolderItem").each(function(idx, elm){
    var folder = $(this).val();
    var folderarray = folder.split(",");
    
    var folderid = folderarray[0].trim();
    var appid = folderarray[4].trim();
    if(!eval(folderarray[2].trim())) {
      apps["app_"+appid]["folder"]["folder_"+folderid] = "./"+folderarray[1].trim();
      apps["app_"+appid]["folder"]["folderobj_"+folderid] = {id:folderid, name:folderarray[1].trim(), parent:0, app:appid};
      if(appid==SelectedAppId) 
      $("#app_"+folderarray[4].trim()).append("<li><a href='#' onclick='javascript:SelectFolder("+folderarray[0].trim()+")'>"+folderarray[1]+"</a><ul id='folder_"+folderarray[0].trim()+"'></ul></li>");
    }
    else {
      var parentid = folderarray[2].trim();
      apps["app_"+appid]["folder"]["folder_"+folderid] = apps["app_"+appid]["folder"]["folder_"+parentid]+"/"+folderarray[1].trim();
      apps["app_"+appid]["folder"]["folderobj_"+folderid] = {id:folderid, name:folderarray[1].trim(), parent:parentid, app:appid};
      if(appid==SelectedAppId) 
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
      apps["app_"+appid]["file"]["fileobj_"+fileid] = {id:fileid, name:filearray[1].trim(), folder:0, app:appid};
      if(appid==SelectedAppId) 
      $("#app_"+filearray[4].trim()).append("<li id='file_"+filearray[0].trim()+"'><a href='#' onclick='javascript:SelectFile("+filearray[0].trim()+")'>"+filearray[1]+"</a></li>");
    } else {
      var parentid = filearray[2].trim();
      apps["app_"+appid]["file"]["file_"+fileid] = apps["app_"+appid]["folder"]["folder_"+parentid]+"/"+filearray[1].trim();
      apps["app_"+appid]["file"]["fileobj_"+fileid] = {id:fileid, name:filearray[1].trim(), folder:parentid, app:appid};
      if(appid==SelectedAppId) 
      $("#folder_"+filearray[2].trim()).append("<li id='file_"+filearray[0].trim()+"'><a href='#' ondblclick='javascript:SelectFile("+filearray[0].trim()+");$(\"#manageApp\").click();return false;' onclick='javascript:SelectFile("+filearray[0].trim()+")'>"+filearray[1]+"</a></li>");
    }
  });
	
}
function SelectFolder(id) {
  	window.SelectedFolderId = id;
  	if(id) {
		window.SelectedFolderId = id;
		$("#selectedFolderId").val(id);
		$("#selectedFolderName").text(apps["app_"+SelectedAppId]["folder"]["folderobj_"+id].name);

	} else {
		window.SelectedFolderId = 0;
		$("#selectedFolderId").val(0);
		$("#selectedFolderName").text(SelectedAppId?(apps["app_"+SelectedAppId].name+" Root"):"N/A");
	}
	SelectFile();
}

function SelectApp(id) {
	if(id) {
  		window.SelectedAppId = id;
  		$("#selectedAppId").val(id);
  		$("#selectedAppName").text(apps["app_"+id].name);

	} else {
		window.SelectedAppId = 0;
  		$("#selectedAppId").val(0);
  		$("#selectedAppName").text("N/A");
	}

	SelectFolder();
}

function SelectFile(id) {
	$(".codeeditor").hide();
	if(id) {
  		window.SelectedFileId = id;
  		$("#selectedFileId").val(id);
  		$("#selectedFileName").text(apps["app_"+SelectedAppId]["file"]["fileobj_"+id].name);

	} else {
		window.SelectedFileId = 0;
  		$("#selectedFileId").val(0);
  		$("#selectedFileName").text("N/A");
  		return;
	}

	$("#editorbar").html("<span class='text'>"+apps["app_"+SelectedAppId]["file"]["file_"+id]+"</span>")
	if(apps["app_"+SelectedAppId]["file"]["fileobj_"+id].editor) {
		$("#"+apps["app_"+SelectedAppId]["file"]["fileobj_"+id].editor).show();
	} else {
		window.editorcount = window.editorcount || 1;
		var editorid =  "editor"+window.editorcount;
		$("#editorpanel").append('<div id="'+editorid+'" class="codeeditor" style="padding:0px;margin:0px;width:100%;height:100%;overflow:hidden;border: 1px solid black; border-color: #ccc;"></div>');
		apps["app_"+SelectedAppId]["file"]["fileobj_"+id].editor = editorid;

		
		var appCodeEditor = ace.edit(editorid);
	    appCodeEditor.getSession().setUseWorker(false);
	    appCodeEditor.setTheme("ace/theme/chaos");
	    apps["app_"+SelectedAppId]["file"]["fileobj_"+id].editorObj = appCodeEditor;
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

	   


	    window.editorcount++;

	    CP_RequestAction("ReadFile", {id:id}, function(res){
	    if(res.obj.Name.indexOf(".html")!=-1) {
	      appCodeEditor.session.setMode("ace/mode/html");  
	    } else if(res.obj.Name.indexOf(".js")!=-1) {
	      appCodeEditor.session.setMode("ace/mode/javascript");  
	    } else if(res.obj.Name.indexOf(".json")!=-1) {
	      appCodeEditor.session.setMode("ace/mode/json");  
	    } else if(res.obj.Name.indexOf(".css")!=-1) {
	      appCodeEditor.session.setMode("ace/mode/css");  
	    } else {
	    	appCodeEditor.session.setMode("ace/mode/text"); 	
	    }
	    appCodeEditor.setValue(res.obj.Code,-1);
	  }, function(res){
	    
	  })
	}

}

window.previewInWin = function() {
  var html = createAppHTML();
  var myWindow = window.open("clicpilot preview win", "");
  myWindow.document.open('text/html');
  myWindow.document.write(html);
  myWindow.document.close();

}



function createAppHTML() {
  var appid = window.SelectedAppId;
  var appObj = {};
  appObj.name = apps["app_"+appid].name;
  appObj.file = [];
  appObj.code = [];
  var files = apps["app_"+appid]["file"];
  for(var key in files) {
  	if(key.indexOf("file_")==0) {
    var fileId = key.substring(5);
    var path = files[key].trim();
    appObj.file.push(path);
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

