var CP = CP || {};

CP.Util = CP.Util || {};


CP.Util.ShowError = CP.Util.ShowError || function(e) {
  
  //window.ShowError ? ShowError(e.message) : console.log(e.message);
  window.ShowError ? ShowError(e.stack||e.message) : console.log(e.stack||e.message);
}

CP.Util.ShowMessage = CP.Util.ShowMessage || function(m) {
  
  window.ShowMessage ? ShowMessage(m) : console.log(m);
}

CP.Util.ShowActionMsg = CP.Util.ShowActionMsg || function(act, mdl, msg) {
  
  window.ShowActionMsg ? ShowActionMsg(msg) : console.log(act+": "+msg);
}

CP.Util.DecorateUI = CP.Util.DecorateUI || function() {

}

CP.Util.ShowObj = CP.Util.ShowObj || function(obj) {
 var text = "";
 for(n in obj) {
   text += obj[n]+" ";
 }
 return text;
}


CP.Util.Json2map = CP.Util.Json2map || function(obj, map, prefixKey) {


  for(var key in obj) {
    var val = obj[key];
    if(Array.isArray(val)) {
      var arrayList = new Array();
      var length = val.length;
      for(var i=0;i<length;i++) {
        var item = val[i];
        var objMap = new HashMap();
        CP.Util.Json2map(item, objMap, null);
        arrayList.push(objMap);
        map.put(prefixKey!=null?prefixKey+key:key, arrayList);
      }
    } else if(typeof(val) === 'object') {
      CP.Util.Json2map(val, map, prefixKey!=null?prefixKey+key+",":key+",");
    } else {
      map.put(prefixKey!=null?prefixKey+key:key, obj[key]);
    }

  }


}

CP.Util.Map2json = CP.Util.Map2json || function(map, obj) {

  var keySet = map.keys();
  for(var i=0;i<keySet.length;i++) {
    var key = keySet[i];
    var keys = key.split(",");
    var newObj = obj;
    for(var j=0;j<keys.length-1;j++) {
      var newObj2 = eval("newObj."+keys[j]);
      if(newObj2 == null) {
        newObj2 = new Object();
        eval("newObj."+keys[j]+"=newObj2");
      }
      newObj = newObj2;
    }
    var val = map.get(key);
    if(Array.isArray(val)) {
      var array = new Array();
      for(var k=0;k<val.length;k++) {
        var newObj3 = new Object();
        CP.Util.Map2json(val[k], newObj3);
        array.push(newObj3);
      }
      eval("newObj."+keys[keys.length-1]+"=array");
    } else if(val instanceof HashMap) {
      var newObj3 = new Object();
      CP.Util.Map2json(val, newObj3);
      eval("newObj."+keys[keys.length-1]+"=newObj3");
    } else {
      eval("newObj."+keys[keys.length-1]+"=val");
    }
  }

}


CP.Util.AddInitFunc = CP.Util.AddInitFunc || function(func) {
  if(!window.CP_Util_InitMethodSetup) {
    window.onload = function() {

      if(window.CP_Util_InitFuncArray) {
        for(var i=0;i<window.CP_Util_InitFuncArray.length;i++) {
          window.CP_Util_InitFuncArray[i]();
        }
      }
    }
    window.CP_Util_InitMethodSetup = true;
  }

  if(!window.CP_Util_InitFuncArray) {
    window.CP_Util_InitFuncArray = new Array();
  }
  window.CP_Util_InitFuncArray.push(func);
}

CP.Util.Stringify = CP.Util.Stringify || function (obj) {
 return  JSON.stringify(obj);

  
};
CP.Util.StringifyQuoted = CP.Util.StringifyQuoted || function (obj) {
  var t = typeof (obj);
  if (t != "object" || obj === null) {
    // simple data type
    if (t == "string") obj = '&quot;'+CP.Util.EscapeJSON(obj)+'&quot;';
    return String(obj);
  }
  else {
    // recurse array or object
    var n, v, json = [], arr = (obj && obj.constructor == Array);
    for (n in obj) {
      v = obj[n]; t = typeof(v);
      if (t == "string") v = '&quot;'+CP.Util.EscapeJSON(v)+'&quot;';
      else if (t == "object" && v !== null) v = CP.Util.StringifyQuoted(v);
      json.push((arr ? "" : '&quot;' + n + '&quot;:') + String(v));
    }
    return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
  }
};
CP.Util.EscapeJSON = CP.Util.EscapeJSON || function (json) {
  if(json) {

    json = json.replace(/[\\]/g, '\\\\');
    json = json.replace(/[\"]/g, '\\\"');
    json = json.replace(/[\/]/g, '\\/');
    json = json.replace(/[\b]/g, '\\b');
    json = json.replace(/[\f]/g, '\\f');
    json = json.replace(/[\n]/g, '\\n');
    json = json.replace(/[\r]/g, '\\r');
    json = json.replace(/[\t]/g, '\\t');

  }
  return json;
};

function HashMap()
{
	this.length = 0;
	this.items = new Array();
	for (var i = 0; i < arguments.length; i += 2) {
		if (typeof(arguments[i + 1]) != 'undefined') {
			this.items[arguments[i]] = arguments[i + 1];
			this.length++;
		}
	}

  this.keys = function() {
    var keys = [];
    for (var i in this.items) {
			 if(typeof(this.items[i])!="function")
       keys.push(i);
		}
    return keys;
  }

  this.vals = function() {
    return this.items ;
  }

  this.values = function() {
    var values = [];
    for (var i in this.items) {
     
       values.push(this.items[i]);
    }
    return values;
  }

	this.remove = function(in_key)
	{
		var tmp_previous;
		if (typeof(this.items[in_key]) != 'undefined') {
			this.length--;
			var tmp_previous = this.items[in_key];
			delete this.items[in_key];
		}

		return tmp_previous;
	}


	this.put = function(in_key, in_val) {
		return this.items[in_key] = in_val;
	}

	this.get = function(in_key) {
		return this.items[in_key];
	}

	this.set = function(in_key, in_value)
	{
		var tmp_previous;
		if (typeof(in_value) != 'undefined') {
			if (typeof(this.items[in_key]) == 'undefined') {
				this.length++;
			}
			else {
				tmp_previous = this.items[in_key];
			}

			this.items[in_key] = in_value;
		}

		return tmp_previous;
	}

	this.containsKey = function(in_key)
	{
		return typeof(this.items[in_key]) != 'undefined';
	}

	this.clear = function()
	{
		for (var i in this.items) {
			delete this.items[i];
		}

		this.length = 0;
	}
}


CP.Util.RunClientCallBackFunction = CP.Util.RunClientCallBackFunction || function(mdl, act, name, type, functions, arg, param) {

    var actSysName = mdl+"_"+act;
    if(arg.action && arg.action != actSysName) {//update's read action will use read action name not update's name, Data2UI
      return;
    }

    var my_Folder_ExecuteCallback = function(arg, param) {
      if(window[actSysName+"_"+type+name]) {
        window[actSysName+"_"+type+name](arg, param);
      }
    };

    var my_ExecuteCallback = function(arg, param) {
      if(window[mdl+"_"+type+name]) {
        window[mdl+"_"+type+name](arg, param, my_Folder_ExecuteCallback);
      } else if(window[actSysName+"_"+type+name]) {
        window[actSysName+"_"+type+name](arg, param);
      } 
      
    };
    

    if(window["_"+type+name]) {
      window["_"+type+name](arg, param, my_ExecuteCallback);
    } else if(window[mdl+"_"+type+name]) {
      window[mdl+"_"+type+name](arg, param, my_Folder_ExecuteCallback);
    } else {
      my_Folder_ExecuteCallback(arg, param);
    }
}

CP.Util.RegClientCallBackFunction = CP.Util.RegClientCallBackFunction || function(mdl, act, name, type, functions, callback) {

    if(mdl==null && act==null) {
      window["_"+type+name]=callback;
    } else if(act==null) {
      window[mdl+"_"+type+name]=callback;
    } else {
      var actSysName = mdl+"_"+act;
      window[actSysName+"_"+type+name] = callback;
    }
}

window.CP_AfterAction = function(action, callback, mdl) {
  
  if(!mdl) {
    window["Default_"+action+"_AfterData2UI"] = callback;
  } else {
    window[action+"_AfterData2UI"] = callback;
  }
}

window.CP_AfterUpdateView = function(action, callback, mdl) {
  if(!mdl) {
    window["Default_"+action+"_AfterInitUI"] = callback;
  } else {
    window[action+"_AfterInitUI"] = callback;
  }
}

window.CP_BeforeUpdateView = function(action, callback, mdl) {
  if(!mdl) {
    window["Default_"+action+"_BeforeInitUI"] = callback;
  } else {
    window[action+"_BeforeInitUI"] = callback;
  }
}

window.CP_UpdateView = function(action, arg, mdl) {

  arg = arg || {};
  arg.updateView = true;
  if(!mdl) {
    eval("Default_"+action+"_ClientPart.functions.Default_"+action+"_Main(arg)");
  } else {
    eval(action+"_ClientPart.functions."+action+"_Main(arg)")
  }
}

window.CP_DoAction = function(action, arg, mdl) {

  arg = arg || {};
  arg.AutoRequest = true;
  arg.doAction = true;
  if(!mdl) {
    eval("Default_"+action+"_ClientPart.functions.Default_"+action+"_Main(arg)");
  } else {
    eval(action+"_ClientPart.functions."+action+"_Main(arg)")
  }
}

window.CP_BeforeAction = function(action, callback, mdl) {
  if(!mdl) {
    window["Default_"+action+"_BeforeRequest"] = callback;
  } else {
    window[action+"_BeforeRequest"] = callback;
  }
}

window.CP_BlockAction = function(action, mdl) {
  if(!mdl) {
    window["Default_"+action+"_UI2Data"] = function(){return null};
  } else {
    window[action+"_UI2Data"] = function(){return null};
  }
}

window.CP_AfterCandAction = function(act, refe, callback, mdl) {
  var action = "CPGen"+act+refe+"CandQry";
  window.CP_AfterAction(action, callback, mdl)
}

window.CP_UpdateCandView = function(act, refe, arg, mdl) {
  var action = "CPGen"+act+refe+"CandQry";
  CP_UpdateView(action, arg, mdl);
}

window.CP_UpdateReadView = function(act, arg, mdl) {
  var action = "CPGen"+act+"Read";
  CP_UpdateView(action, arg, mdl);
}

window.CP_Init = function(func) {
  CP.Util.AddInitFunc(func);
}

window.CP_RequestAction = function(action, obj, succ, err, msg, mdl) {
  if(!mdl) {
    eval("Default_"+action+"_ClientPart.functions.Default_"+action+"_Request(obj, succ, err, msg)");
  } else {
    eval(mdl+"_"+action+"_ClientPart.functions."+mdl+"_"+action+"_Request(obj, succ, err, msg)");
  }
}


window.CP_AfterRequestAction = function(action, callback, mdl) {
  if(!mdl) {
    window["Default_"+action+"_AfterRequest"] = callback;
  } else {
    window[action+"_AfterRequest"] = callback;
  }
}

window.CP_BeforeRequestAction= function(action, callback, mdl) {
  if(!mdl) {
    window["Default_"+action+"_BeforeRequest"] = callback;
  } else {
    window[action+"_BeforeRequest"] = callback;
  }
}

window.Base64 = {

 


    // private property


    _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

 


    // public method for encoding


    encode : function (input) {


        var output = "";


        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;


        var i = 0;

 


        input = Base64._utf8_encode(input);

 


        while (i < input.length) {

 


            chr1 = input.charCodeAt(i++);


            chr2 = input.charCodeAt(i++);


            chr3 = input.charCodeAt(i++);

 


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


            this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +


            this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

 


        }

 


        return output;


    },

 


    // public method for decoding


    decode : function (input) {


        var output = "";


        var chr1, chr2, chr3;


        var enc1, enc2, enc3, enc4;


        var i = 0;

 


        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

 


        while (i < input.length) {

 


            enc1 = this._keyStr.indexOf(input.charAt(i++));


            enc2 = this._keyStr.indexOf(input.charAt(i++));


            enc3 = this._keyStr.indexOf(input.charAt(i++));


            enc4 = this._keyStr.indexOf(input.charAt(i++));

 


            chr1 = (enc1 << 2) | (enc2 >> 4);


            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);


            chr3 = ((enc3 & 3) << 6) | enc4;

 


            output = output + String.fromCharCode(chr1);

 


            if (enc3 != 64) {


                output = output + String.fromCharCode(chr2);


            }


            if (enc4 != 64) {


                output = output + String.fromCharCode(chr3);


            }

 


        }

 


        output = Base64._utf8_decode(output);

 


        return output;

 


    },

 


    // private method for UTF-8 encoding


    _utf8_encode : function (string) {


        string = string.replace(/\r\n/g,"\n");


        var utftext = "";

 


        for (var n = 0; n < string.length; n++) {

 


            var c = string.charCodeAt(n);

 


            if (c < 128) {


                utftext += String.fromCharCode(c);


            }


            else if((c > 127) && (c < 2048)) {


                utftext += String.fromCharCode((c >> 6) | 192);


                utftext += String.fromCharCode((c & 63) | 128);


            }


            else {


                utftext += String.fromCharCode((c >> 12) | 224);


                utftext += String.fromCharCode(((c >> 6) & 63) | 128);


                utftext += String.fromCharCode((c & 63) | 128);


            }

 


        }

 


        return utftext;


    },

 


    // private method for UTF-8 decoding


    _utf8_decode : function (utftext) {


        var string = "";


        var i = 0;


        var c = c1 = c2 = 0;

 


        while ( i < utftext.length ) {

 


            c = utftext.charCodeAt(i);

 


            if (c < 128) {


                string += String.fromCharCode(c);


                i++;


            }


            else if((c > 191) && (c < 224)) {


                c2 = utftext.charCodeAt(i+1);


                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));


                i += 2;


            }


            else {


                c2 = utftext.charCodeAt(i+1);


                c3 = utftext.charCodeAt(i+2);


                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));


                i += 3;


            }

 


        }

 


        return string;


    }

 

}
//2 usage: block clicpilotjs run duplicated, check if the js is loaded.
window.CP_Loaded = true;

