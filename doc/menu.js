window.onload = function() {
    window.menulevel = 0;
    for(var i=0;i<content.length;i++) {
        drawMenuItem(content[i], "menu-list");
    }
    $("#page_about").click();
    $("#menu-list").listview();
    $("#menu-list").listview('refresh');
}

window.drawMenuItem=function(item, level) {
    menulevel++;
    var space = "";
    for(var i=0;i<menulevel;i++) {
        space+="&nbsp;";
    }
    var key = item.title.replace(/\s/g, "").toLowerCase();
    if(!item.children) {
        $("#menu-list").append('<li><a href="#" id="page_'+key+'">'+space+item.title+'</a></li>');
        $("#page_"+key)
        $("body").delegate("#page_"+key, "click", {item:item, menulevel:menulevel}, function(e){
            var html = [];
            drawPageItem(e.data.item, html, e.data.menulevel);
            $("#main").html(html.join("\n"));
            location.href = "#main-page";
            //alert(e.data.item.title);
        });
    } else {
        $("#menu-list").append('<li data-role="list-divider">'+space+item.title+'</li>');
        for(var i=0;i<item.children.length;i++) {
            drawMenuItem(item.children[i]);
        }
    }
    menulevel--;
}

function drawPageItem(item, html, level) {
    window.loadfiles = [];
	var title = item.title;
	var key = title.replace(/\s/g, "").toLowerCase();
	html.push('<div id="'+key+'">');
    html.push('<h'+level+'>'+title+'</h'+level+'>');
    

    html.push('<div id="'+key+'_md"></div>');

    loadFile(key, key+".md", key+'_md');
    if(item.file) {
	    for(var j=0;j<item.file.length;j++){
	    	var file = item.file[j];
	    	var findex = file.lastIndexOf(".");
	    	var name = file.substring(0, findex);
	    	var pindex = file.lastIndexOf("/");
	    	var fname = name;
	    	if(pindex!=-1) {
	    		fname = file.substring(pindex+1, findex);
	    	}
	    	fname = fname.replace(/\./g,"_");
	    	var extname = file.substring(findex+1);
	    	html.push('<div id="'+fname+"_"+extname+'"></div>');
	    	loadFile(key, file, fname+"_"+extname);
	    }
	}
    html.push('</div>');

    
    for(var i=0;i<loadfiles.length;i++) {
		loadfiles[i]();
	}
    
}


function loadFile(key, file, id, runnable) {
	loadfiles.push(

		(function(key, file, id){
			return function() {
				
				var findex = file.lastIndexOf(".");
	    		var name = file.substring(0, findex);
	    		var extname = file.substring(findex+1);
				$.ajax({
					url: "./data/"+key+"/"+file,
					dataType : "text",
					async:true,
					success: function(code) {

						
	    				if(extname.toLowerCase() == 'md') {
	    					var converter = new showdown.Converter({tables: true});
    						code      = converter.makeHtml(code);

	    				}
	    				if(extname.toLowerCase() == 'html') {
	    					
    						code='<pre style="white-space:pre" class="prettyprint linenums">'+safe_tags_replace(code)+'</pre>';
    						if(file.indexOf("html_")==-1) {
    							code+='<a href="./data/'+key+'/'+file+'" target="_blank" class="ui-btn">Run the code</a><p>'
   							}
	    				}
	    				if(extname.toLowerCase() == 'js' || extname.toLowerCase() == 'json') {
	    					
    						code='<pre style="white-space:pre" class="prettyprint linenums">'+safe_tags_replace(code)+'</pre>';
    						
	    				}
	    				if(extname.toLowerCase() == 'css') {
	    					
    						code='<pre style="white-space:pre" class="prettyprint linenums">'+safe_tags_replace(code)+'</pre>';
    						
	    				}
						$("#"+id).html(((extname.toLowerCase() == 'md')?'':('<span>'+file+'</span>'))+code);
						(function () { prettyPrint(); })();
						$("table").addClass("table").addClass("table-bordered");
					},
					error:function(xhr) {
						$("#"+id).html(file+" not ready.");
					}
				});
			}
		})(key, file, id)

	);
	
}


var tagsToReplace = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
};

function replaceTag(tag) {
    return tagsToReplace[tag] || tag;
}

function safe_tags_replace(str) {
    return str.replace(/[&<>]/g, replaceTag);
}