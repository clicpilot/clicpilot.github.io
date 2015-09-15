window.onload=function(){
	var html1 = [];
	var html2 = [];
	window.loadfiles=[]
	
	for(var i=0;i<content.length;i++) {
		drawConntentItem(content[i], html1, true);
		drawPageItem(content[i], html2, 2);
	}

	$("#target_nav").html( '<ul><li style="">clicpilot documentation</li>'+html1.join("")+'</ul>');
	$("#target_page").html(html2.join(""));

	for(var i=0;i<loadfiles.length;i++) {
		loadfiles[i]();
	}
}

function drawConntentItem(item, html, first) {

	var title = item.title;
	var key = title.replace(/\s/g, "").toLowerCase();
	
	if(!first)
	html.push("<ul>");
	html.push("<li>");
	html.push("<a href='#"+key+"' id='"+key+"_link'>"+title+"</a>");
	if(item.children) {
		for(var i=0;i<item.children.length;i++) {
			drawConntentItem(item.children[i], html);
		}
	}
	html.push("</li>");
	if(!first)
	html.push("</ul>");
}

function drawPageItem(item, html, level) {

	var title = item.title;
	var key = title.replace(/\s/g, "").toLowerCase();
	html.push('<div id="'+key+'" style="padding-top: 30px;">');
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
	    	var extname = file.substring(findex+1);
	    	html.push('<div id="'+fname+"_"+extname+'"></div>');
	    	loadFile(key, file, fname+"_"+extname);
	    }
	}
    html.push('</div>');
    html.push("<a href='#"+key+"_link'>Back to top</a>");
    html.push('<hr>');


    if(item.children) {
    	var l = level+1;
		for(var j=0;j<item.children.length;j++) {
			drawPageItem(item.children[j], html, l);
		}
		
	}

}


function loadFile(key, file, id, runnable) {
	loadfiles.push(

		(function(key, file, id){
			return function() {
				var findex = file.indexOf(".");
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
    							code+='<a href="./data/'+key+'/'+file+'" target="_blank" class="btn btn-success btn-sm" role="button">Run the code</a><p>'
   							}
	    				}
	    				if(extname.toLowerCase() == 'js') {
	    					
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

