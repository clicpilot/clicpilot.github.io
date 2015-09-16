In this chapter, we introduce 7 JavaScript functions of clicpilot-js.

* CP_Init: invoke function when page loaded.
* CP_DoAction: invoke an action.
* CP_BeforeAction: invoke function before action executed.
* CP_AfterAction: invoke function after action executed.
* CP_UpdateView: refresh the view of an action.
* CP_BeforeUpdateView: invoke function before view refreshed.
* CP_AfterUpdateView: invoke function after view refreshed.

the HTML attribute __cp-complete-observer__ can save your effort to handle CP_AfterAction. you can put action names into an array of attribute's value. it will refresh the action's view, after the action is done. please find example in properties and references, it is widely used in those example code.

If you need more functions, please feel free to open tickets in https://github.com/clicpilot to us.