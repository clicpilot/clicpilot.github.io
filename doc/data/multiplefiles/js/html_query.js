	    
window.ShowResponse = function(msg) {
  $("#msg").text(msg);
}
window.ShowActionMsg = window.ShowResponse;
window.ShowMessage = window.ShowResponse;

CP_Init(function(){
	alert("This is Query Page!");
});