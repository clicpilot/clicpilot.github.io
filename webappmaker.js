if(window.CP_Init) {
  window.CP_Init(function(){

  	$('#loading-mask').hide();
    
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

    $(".contentitempane").hide();
  	$("#app-panel").show();

  });
}

window.renameApp = function() {
	var selectedAppId = $("#selectedAppId").val();
	if(eval(selectedAppId)) {
		var oldname=$('#selectedAppName').text();
		var name = window.prompt('New Application Name', oldname);
		if(name && name.trim().length>0){
			CP_RequestAction('RenameApp', 
				{obj:{AppId:selectedAppId, Name:name}}, 
				function(){
					updateView();
					SelectApp(selectedAppId);
				}, 
				function(e){alert(e.message)}
			);
		}
	} else {
		alert("Application not exist!");
	}
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

function createPropField() {
	window.propcount = window.propcount || 1; 
	var propname = "Prop"+propcount;
	window.propcount++;
	propname = window.prompt('Please input property field name.', propname);
	CP_RequestAction("CreatePropField", {obj:{PropName:propname, StorageName:propname, Label:propname, Nullable:true}}, function(res){
		$(".contentitempane").hide();
  		$("#prop-panel").show();
  		CP_UpdateView("UpdatePropField", {Id:res.obj.FieldId});
	}, function(e){
		alert(e.message);
	});
}

function createForm(type) {
	window.entcount = window.entcount || 1; 
	var entname = "Ent"+entcount;
	window.entcount++;
	entname = window.prompt('Please input entity name of the form.', entname);
	CP_RequestAction("CreateForm", {obj:{EntityName:entname, Name:type+entname, Label:type+entname, Type:type}}, function(res){
		$(".contentitempane").hide();
  		$("#form-panel").show();
  		CP_UpdateView("UpdateForm", {Id:res.obj.FormId});
	}, function(e){
		alert(e.message);
	});
}


function createApp(name) {
	window.appcount = window.appcount || 1; 
	var appname = name || window.prompt('Please input application name', "App"+(appcount++));
	$("#app-name").val(appname);
	CP_DoAction("CreateApp");

}

function updateView() {
	CP_UpdateView('QueryApp');


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
    if(appid==SelectedAppId) {
    	$("#app_nav").append("<li><a href='#' onclick='javascript:SelectApp("+appid+")'>"+apparray[1]+"</a><ul id='app_"+appid+"'></ul></li>");
		$("#app_"+appid).append("<li><a href='#'>Page</a><ul id='app_page_"+appid+"'></ul></li>");
		$("#app_"+appid).append("<li><a href='#'>Form</a><ul id='app_form_"+appid+"'></ul></li>");
		$("#app_"+appid).append("<li><a href='#'>List</a><ul id='app_list_"+appid+"'></ul></li>");
		$("#app_"+appid).append("<li><a href='#'>Menu</a><ul id='app_menu_"+appid+"'></ul></li>");
		$("#app_"+appid).append("<li><a href='#'>Field</a><ul id='app_field_"+appid+"'></ul></li>");
	}    
  });
  

  /*
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
	*/
	
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





  	$(".contentitempane").hide();
  	$("#app-panel").show();
}

/*
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

	$("#configcontent").show();
  	$("#editorcontent").hide();
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

	$("#filenamebar").html(apps["app_"+SelectedAppId]["file"]["file_"+id]);


	if(apps["app_"+SelectedAppId]["file"]["fileobj_"+id].editor) {
		$("#"+apps["app_"+SelectedAppId]["file"]["fileobj_"+id].editor).show();
	} else {
		window.editorcount = window.editorcount || 0;
		window.editorcount++;
		var fname = apps["app_"+SelectedAppId]["file"]["file_"+id]
	    if(fname.lastIndexOf(".jpg")==fname.length-4 || fname.lastIndexOf(".png")==fname.length-4) {
	      	var editorid =  "editor"+window.editorcount;
			$("#editorpanel").append('<div id="'+editorid+'" class="codeeditor" style="padding:0px;margin:0px;width:100%;height:100%;overflow:hidden;border: 1px solid black; border-color: #ccc;"></div>');
			CP_RequestAction("ReadFile", {id:id}, function(res){
		    	var fname = res.obj.Name;
			    $("#"+editorid).html("<img src='"+res.obj.Code+"''>");
		      	//var img = new Image();
				//img.src = res.obj.Code; 
				//document.getElementById(editorid).appendChild(img);
			    
		    	
		  	}, function(res){
		    
		  	});
	    } else {
			
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

		    

		    CP_RequestAction("ReadFile", {id:id}, function(res){
		    	var fname = res.obj.Name;
			    if(fname.lastIndexOf(".html")==fname.length-5) {
			      appCodeEditor.session.setMode("ace/mode/html");  
			    } else if(fname.lastIndexOf(".js")==fname.length-3) {
			      appCodeEditor.session.setMode("ace/mode/javascript");  
			    } else if(fname.lastIndexOf(".json")==fname.length-5) {
			      appCodeEditor.session.setMode("ace/mode/json");  
			    } else if(fname.lastIndexOf(".css")==fname.length-4) {
			      appCodeEditor.session.setMode("ace/mode/css");  
			    } else {
			    	appCodeEditor.session.setMode("ace/mode/text"); 	
			    }
		    	appCodeEditor.setValue(res.obj.Code,-1);
		  	}, function(res){
		    
		  	});
		}
	}

	$("#configcontent").hide();
  	$("#editorcontent").show();

}
*/

window.previewInWin = function() {
  var html = createAppHTML();
  var myWindow = window.open("clicpilot preview win", "");
  myWindow.document.open('text/html');
  myWindow.document.write(html);
  myWindow.document.close();

}

function exportApp() {
	var zip = new JSZip();
	var appid = window.SelectedAppId;
	var files = apps["app_"+appid]["file"];
	var folders = apps["app_"+appid]["folder"];
	var folderMap = {};
	for(var key in apps["app_"+appid]["folder"]) {
		if(key.indexOf("folderobj_")==-1) {
			continue;
		}
		var folderObj = apps["app_"+appid]["folder"][key];
		if(folderObj.parent) {
			var parentFolder = folderMap["folder_"+folderObj.parent];
			var zipfolder = parentFolder.folder(folderObj.name);
			folderMap["folder_"+folderObj.id] = zipfolder;
		} else {
			var zipfolder = zip.folder(folderObj.name);
			folderMap["folder_"+folderObj.id] = zipfolder;
		}
	}
	for(var key in apps["app_"+appid]["file"]) {
		if(key.indexOf("fileobj_")==-1) {
			continue;
		}
		var fileObj = apps["app_"+appid]["file"][key];
		CP_RequestAction("ReadFile", {id:fileObj.id}, function(res){
			var code = res.obj.Code;
			var fname = res.obj.Name;
			if(fname.lastIndexOf(".jpg")==fname.length-4 || fname.indexOf(".png")==fname.length-4) {
				var image = code.replace(/^data:image\/(png|jpg|jpeg);base64,/, "") 
				if(fileObj.folder) {
					var zipFolder = folderMap["folder_"+fileObj.folder];
					zipFolder.file(fileObj.name, image , {base64:true});
				} else {
					zip.file(fileObj.name, image , {base64:true});
				}
	      	} else {
	        	if(fileObj.folder) {
					var zipFolder = folderMap["folder_"+fileObj.folder];
					zipFolder.file(fileObj.name, code);
				} else {
					zip.file(fileObj.name, code);
				}
	      	}
	      	
      	});

			
	}

	var content = zip.generate({type:"blob"});
	saveAs(content, apps["app_"+appid].name.trim()+".zip");
}


function importApp() {

	  $("#hiddendiv").append('<input type="file" id="fileInput" class="input-file">');
	  $("#fileInput").hide();
	  document.getElementById('fileInput').addEventListener('change', function (evt) {
	    var files = evt.target.files;
	    for ( var i = 0, f; f = files[i]; i++) {
	      var reader = new FileReader();
	      reader.onload = (function(theFile) {
	        return function(e) {
	        	//createApp(theFile.name.replace(".zip", ""));
	        	var appId = 0;
	        	CP_RequestAction("CreateApp", {obj:{"Name":theFile.name.replace(".zip", "")}}, function(res){
	        		appId = res.obj.AppId;
	        	}, function(){

	        	});
	          	
				var zip = new JSZip(e.target.result);
				var key = null;
				var name = null;
				var folderMap = {};
				for(key in zip.files) {
					var f = zip.files[key];
					if(f.options.dir) {
						var names = f.name.split("/");
						var parentName = "";
						for(var j=0;j<names.length-2;j++) {
							parentName+="_"+names[j];
						}
						if(parentName) {
							parentId = folderMap[parentName];
						} else {
							parentId = 0;
						}
						CP_RequestAction("CreateFolder", {obj:{"Name":names[names.length-2], Parent:{FolderId:parentId}, App: {AppId: appId}}}, function(res){
			        		folderMap[parentName+"_"+names[names.length-2]] = res.obj.FolderId;
			        	}, function(){

			        	});
						
					} else {
						var names = f.name.split("/");
						var parentName = "";
						for(var j=0;j<names.length-1;j++) {
							parentName+="_"+names[j];
						}
						if(parentName) {
							parentId = folderMap[parentName];
						} else {
							parentId = 0;
						}
						var fname = names[names.length-1];
						var code = null;
						
						if(fname.lastIndexOf(".jpg")==fname.length-4 || fname.lastIndexOf(".png")==fname.length-4) {
              
              /*
              var blob = null;
              if(fname.lastIndexOf(".jpg")==fname.length-4) {
                blob = new Blob( [ f.asArrayBuffer() ], { type: "image/jpg" } );
              }	else if (fname.lastIndexOf(".png")==fname.length-4) {
                blob = new Blob( [ f.asArrayBuffer() ], { type: "image/png" } );
              }
              alert(blob);
              var imageUrl = URL.createObjectURL(blob);
              alert(imageUrl);
              //var urlCreator = window.URL || window.webkitURL;
              //var imageUrl = urlCreator.createObjectURL( blob );
              */
              
              if(fname.lastIndexOf(".jpg")==fname.length-4) {
                code = "data:image/jpg;base64,"+toBase64(f.asUint8Array())
              } else if (fname.lastIndexOf(".png")==fname.length-4) {
                code = "data:image/png;base64,"+toBase64(f.asUint8Array())
              }
              alert(code);
              //code = imageUrl;
						} else {
							code = f.asText();
						}
						
						CP_RequestAction("CreateFile", {obj:{"Name":names[names.length-1], Code:code, Folder:{FolderId:parentId}, App: {AppId: appId}}}, function(res){
			        		
			        	}, function(){

			        	});
					}

				}


				window.SelectedAppId = appId;
		    	updateView();
		    	drawAppList();
				SelectApp(window.SelectedAppId);

	        };
	      })(f);
	      reader.readAsArrayBuffer(f);
	    }
	  }, false);
	  $("#fileInput").click();
	  $("#fileInput").remove();

}

function toBase64(input) {
  var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var output = "";
  var i=0;
  while (i < input.length) {
    chr1 = input[i++];
    chr2 = input[i++];
    chr3 = input[i++];
    enc1 = chr1 >> 2;
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    enc4 = chr3 & 63;
    if (isNaN(chr2)) {
        enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
        enc4 = 64;
    }
    output = output +
    _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
    _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
  }
  return output;
}
function importFile() {
	$("#hiddendiv").append('<input type="file" id="fileInput" class="input-file">');
	$("#fileInput").hide();
	document.getElementById('fileInput').addEventListener('change', function (evt) {
	  var files = evt.target.files;
	  for ( var i = 0, f; f = files[i]; i++) {
	      	var reader = new FileReader();

      		reader.onload = (function(theFile) {
          		return function(e) {
	          		$("#file-name").val(theFile.name);
	          		$("#file-code").val(e.target.result);
					$("#file-folder-id").val($("#selectedFolderId").val()=="0"?"":$("#selectedFolderId").val());
					$("#file-app-id").val($("#selectedAppId").val());
					CP_DoAction("CreateFile");
          		};
          	})(f);
	      	
	      
	      reader.readAsText(f);
	  }
	}, false);
	$("#fileInput").click();
	$("#fileInput").remove();
}

function importImageFile() {
	$("#hiddendiv").append('<input type="file" id="fileInput" class="input-file">');
	$("#fileInput").hide();
	document.getElementById('fileInput').addEventListener('change', function (evt) {
	  var files = evt.target.files;
	  for ( var i = 0, f; f = files[i]; i++) {
	      	var reader = new FileReader();

      		reader.onload = (function(theFile) {
          		return function(e) {
	          		debugger;
	          		$("#file-name").val(theFile.name);
	          		$("#file-code").val(e.target.result);
					$("#file-folder-id").val($("#selectedFolderId").val()=="0"?"":$("#selectedFolderId").val());
					$("#file-app-id").val($("#selectedAppId").val());
					CP_DoAction("CreateFile");
          		};
          	})(f);
	      	
	      
	      	reader.readAsDataURL(f);	
	  }
	}, false);
	$("#fileInput").click();
	$("#fileInput").remove();
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
  '<','script src="/js/jquery.js"></','script>',
  '<','script src="clicpilot-js-1.0.3.js" class="clicpilot-js"></','script>',
  '</body>',
  '</html>'
  ];
  return html.join("");
}

