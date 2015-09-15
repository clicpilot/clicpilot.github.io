window.ShowResponse = function(msg) {
  $("#msg").text(msg);
}
window.ShowActionMsg = window.ShowResponse;
window.ShowMessage = window.ShowResponse;

CP.Util.AddInitFunc(function(){
	alert("This is Create Page!");
});