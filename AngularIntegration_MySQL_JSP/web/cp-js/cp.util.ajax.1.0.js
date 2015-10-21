var CP = CP || {};

CP.Util = CP.Util || {};

CP.Util.RequestAction =  CP.Util.RequestAction || function(param) {
  
  var app = param.app;
  var mdl = param.mdl;
  var act = param.act;
  var obj = param.obj || param.conditions;
  var msg = param.msg!=null?param.msg:{};
  var id = param.id==null?"":param.id;
  var refeId = param.refeId==null?"":param.refeId;
  var method = param.method;
  var succ = param.succ;
  var error = param.error;
  var before = param.before;
  var from = param.from;
  var size = param.size;

  $.ajax({
    type: method,
    url: ""+"/"+app+"/rest/"+mdl+"/"+act+(id?"/"+id:"")+(refeId?"/"+refeId:"")+((typeof(from)!="undefined")?"/"+from:"")+((typeof(size)!="undefined")?"/"+size:""),
    async: false,
    data: ((method.toLowerCase()!="get")?(CP.Util.Stringify({obj:obj,msg:msg})):"q="+(CP.Util.Stringify({obj:obj,msg:msg}))),
    mimeType: "application/json;charset=UTF-8",
    dataType: "json"
  }).done(function( res, p  ) {
    if(res) {
      var arg={};
      CP.Util.RunClientCallBackFunction(mdl, act, "Request", "Done", window, arg, res);
      if(arg.blocked) {
        if(param.error)
          param.error({message:arg.blockedMsg});
        return;
      } else if(param.succ) {
        param.succ(res, param);
      }
    }
  }).fail(function(jqXHR, textStatus) {
    var errObj = null;
    if(jqXHR.responseText) {
      errObj = eval("("+jqXHR.responseText+")")
    } else if(jqXHR.statusText) { 
      errObj = {"Error":"1","ErrMsg":jqXHR.statusText};
    }
    if(param.error) {
      param.error(errObj, param);
    }
  });
}

CP.Util.GetQueryString = CP.Util.GetQueryString || function() {
  var assoc  = {};
  var decode = function (s) { return decodeURIComponent(s.replace(/\+/g, " ")); };
  if(location.search.length<1)
    return null;
  var queryString = location.search.substring(1); 
  if(!queryString)
    return null;
  var keyValues = queryString.split('&'); 

  for(var i in keyValues) { 
    var key = keyValues[i].split('=');
    if (key.length > 1) {
      assoc[decode(key[0])] = decode(key[1]);
    }
  } 

  return assoc; 
}

CP.Util.OpenPage = CP.Util.OpenPage || function(page, queryString) {
  location.href = page+".html"+(queryString?("?"+queryString):"");
}