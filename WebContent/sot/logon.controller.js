sap.ui.controller("sot.logon", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf sot.logon
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf sot.logon
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf sot.logon
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf sot.logon	
*/
//	onExit: function() {
//
//	}

	insertRecord:function(userName, password, callback){

		var aUrl = '/../sot/Services/logon.xsjs?iNumber='
				+ escape(userName)
				+ '&password='
				+ escape(password);
	console.log(aUrl);
		$.ajax({
			url : aUrl,
			type : 'POST',
			dataType : 'json',
			success: function(myJSON){

				count = myJSON[0].id;
				
				if(typeof callback === "function") 
					callback (count);
				},

				//error: onErrorCall //needs to be handled

				});


	}
	
});