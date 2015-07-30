sap.ui.jsview("sot.logon", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf sot.logon
	*/ 
	getControllerName : function() {
		return "sot.logon";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf sot.logon
	*/ 
	
	createContent : function(oController) {
		//test
		// create a matrix to uses as a UI place holder for the feedback form
		var oMatrix = new sap.ui.commons.layout.MatrixLayout({
			id : 'matrixFeedback',
			layoutFixed : true,
			width : '100%',
			columns : 3,
			widths : ['25%', '50%', '25%'] });
		
		var oMatrixPanelLog = new sap.ui.commons.layout.MatrixLayout({
			width : '75%',
			columns : 3,
			widths : ['20%', '40%', '40%']
			 });
		
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });

		var oPanelLog = new sap.ui.commons.Panel({width : '100%', showCollapseIcon: false});
		oPanelLog.setAreaDesign(sap.ui.commons.enums.AreaDesign.Plain);
		oPanelLog.setBorderDesign(sap.ui.commons.enums.BorderDesign.None);
		oPanelLog.setTitle(new sap.ui.core.Title({text: "Logon",  icon: "images/SAPLogo.png"}));
		
		oPanelLog.addContent(oMatrixPanelLog);
		oMatrix.createRow(oCell,oPanelLog);
		
		
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixPanelLog.createRow(oCell);
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixPanelLog.createRow(oCell);
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixPanelLog.createRow(oCell);
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixPanelLog.createRow(oCell);
		
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oLabel = new sap.ui.commons.Label({text: 'User Name '});
		oInput = new sap.ui.commons.TextField({
			id : 'TF-UserName',
			tooltip : 'Please insert your I-number',
			editable : true,
			value : '',
			width: '100%'});
		oMatrixPanelLog.createRow(oCell, oLabel, oInput);
		
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oLabel = new sap.ui.commons.Label({text: 'Password'});
		oInput = new sap.ui.commons.PasswordField({
			id : 'TF-Password',
			tooltip : 'Please insert your password',
			editable : true,
			value : '',
			width: '100%'});
		oMatrixPanelLog.createRow(oCell, oLabel, oInput);
		
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixPanelLog.createRow(oCell);
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixPanelLog.createRow(oCell);
		
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		var oCell2 = new sap.ui.commons.layout.MatrixLayoutCell({ });
		var oButton = new sap.ui.commons.Button({
			id : 'B-Save',
			text : 'Logon',
			enabled: true,
			press : function(){
				if (sap.ui.getCore().getControl("TF-UserName").getValue() == ""){
					alert("Please insert your I-Number to login.");
				}
				else if (sap.ui.getCore().getControl("TF-Password").getValue() == ""){
					alert("Please insert your Password to login.");
				}
				else{
					var userName = sap.ui.getCore().getControl("TF-UserName").getValue();
					var password = sap.ui.getCore().getControl("TF-Password").getValue();
					
					userName = userName.toUpperCase();
					
					oController.insertRecord(userName, password, function(count) {
						/*console.log("Retrieved value: " + count);*/
						
						if (count >= 1) {
							logInfo = function() {
								var loginInfo = {};
								loginInfo.userId = userName;
								loginInfo.password = password;

								return loginInfo;
							};
							/*var userName = sap.ui.getCore().getControl("TF-UserName").getValue();*/
							
							sessionStorage.setItem("login", JSON.stringify(logInfo()));
							
							
							//testing a retrieve feature
							/*var loginInfo = JSON.parse(sessionStorage.getItem("login"));
							var webUser = loginInfo.userId;
							var webPWD = loginInfo.password;
														
							alert(webUser + " " + webPWD);*/
							
							window.location = "http://dewdfglp00799.wdf.sap.corp:8001/sot/WebContent/sot_main.html";
						}
						else{
							alert("User Name or Password are incorrect, please try again.");
						}
					});
				}
			}
			/*press : function(oControlEvent) {
				sqlResult = readline();
				
				if (sqlResult != nullalert){
					alert(sqlResult);
				}
			}*/
		});
		
		oMatrixPanelLog.createRow(oCell, oCell2, oButton);
		
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixPanelLog.createRow(oCell);
		
		
		oMatrix.placeAt("content");
		return oMatrix;
	}

});
