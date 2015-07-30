sap.ui.jsview("sot.mainView", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf sot.mainView
	*/ 
	getControllerName : function() {
		return "sot.mainView";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf sot.mainView
	*/ 
	createContent : function(oController) {
		
	// executing security based function on page load
		
		/*window.onload = function() {*/
		if (JSON.parse(sessionStorage.getItem("login")) === null)
			{
				window.location = "http://dewdfglp00799.wdf.sap.corp:8001/sot/WebContent/sot_logon.html";
			}
		else
			{
				var loginInfo = JSON.parse(sessionStorage.getItem("login"));
				var userName = loginInfo.userId;
				var password = loginInfo.password;
		
				oController.insertRecord(userName, password, function(count) {
					console.log("Retrieved value: " + count);
					if (count == 0) {
						window.location = "http://dewdfglp00799.wdf.sap.corp:8001/sot/WebContent/sot_logon.html";
					}
				});
			}
		/*};*/
		
		// test for issues in retrieving data in web storage
		/*alert(webUser + " " + webPWD);*/
		
		
		
	// declaring  the various views in the main view
		
		var oTableView = sap.ui.view({id:this.createId("table_view"), viewName:"sot.Table", type:sap.ui.core.mvc.ViewType.JS});
		var oReportView = sap.ui.view({id:this.createId("report_view"), viewName:"sot.Report", type:sap.ui.core.mvc.ViewType.JS});
		var oMaintenanceView = sap.ui.view({id:this.createId("maintenance_view"), viewName:"sot.Maintenance", type:sap.ui.core.mvc.ViewType.JS});
		
	// Shell creation to create the container for the different views 
		
		var oShell = new sap.ui.ux3.Shell("myShell", {
			appTitle: "Skill Overview Tool",
			appIcon: "images/SAPLogo.png",
			appIconTooltip: "SAP logo",
			showLogoutButton: true,
			showSearchTool: false,
			showInspectorTool: false,
			showFeederTool: false,
			
			content:oTableView,
			
			worksetItems: [new sap.ui.ux3.NavigationItem("WI_home",{key:"wi_home",text:"Skill Overview Tool"}),
			               new sap.ui.ux3.NavigationItem("WI_report",{key:"wi_report",text:"Reports"}),
			               new sap.ui.ux3.NavigationItem("WI_maintenance",{key:"wi_maintenance",text:"Maintenance"})],
											
			worksetItemSelected: function(oEvent){
				var sId = oEvent.getParameter("id");
				var oShell = oEvent.oSource;
				switch (sId) {
				case "WI_home":
					oShell.setContent(oTableView);
					break;
				case "WI_report":
					oShell.setContent(oReportView);
					break;
				case "WI_maintenance":
					oShell.setContent(oMaintenanceView);
					break;
				default:
					break;
				}
			},
			
			headerItems: [new sap.ui.commons.TextView({text:"User",tooltip:"U.Name"}),
			              new sap.ui.commons.Button({text:"Personalize",tooltip:"Personalize",press:function(oEvent){alert("Here could open an personalize dialog");}}),
						  new sap.ui.commons.MenuButton({
							  text: "Help",
							  tooltip: "Help Menu",
							  menu: new sap.ui.commons.Menu("menu1",{items:[
								  new sap.ui.commons.MenuItem("menuitem1",{text:"Help"}),
								  new sap.ui.commons.MenuItem("menuitem2",{text:"Report Incident"}),
								  new sap.ui.commons.MenuItem("menuitem3",{text:"About"})]})
										})],
				
			
		});
		
		return oShell;

		
	}
});

