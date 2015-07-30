sap.ui.jsview("sot.Maintenance", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf sot.Maintenance
	*/ 
	getControllerName : function() {
		return "sot.Maintenance";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf sot.Maintenance
	*/ 
	createContent : function(oController) {
		
		//setting up "Create user" form variables
		var iNumber;
		var empName;
		var empSex;
		var extEmail;
		var priLang;
		var secLang;
		var empStatus;
		var stDate;
		var endDate;
		var mentorName;
		var groupMonth;
		var groupNum;
		var trStDate;
		
		
		var oPanelMain = new sap.ui.commons.Panel();
		
		oPanelMain.setTitle(new sap.ui.core.Title({text: "Create new records"}));
		
		var oMatrixMainPanel = new sap.ui.commons.layout.MatrixLayout({
			id : 'matrix_Maintenance',
			layoutFixed : true,
			width : '100%',
			columns : 3,
			widths : ['10%','80%','10%'] });
		
		oPanelMain.addContent(oMatrixMainPanel);
		
		// create a simple matrix layout
		var oLayoutMain = new sap.ui.commons.layout.MatrixLayout({
			id : "matrix_oLayoutMain",
			layoutFixed : false
			});

		oLayoutMain.createRow(  oPanelMain );
		
		// adding space above the button
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixMainPanel.createRow(oCell);
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixMainPanel.createRow(oCell);
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixMainPanel.createRow(oCell);
		
		// adding "create intern content"
		var oMatrixCreateHolder = new sap.ui.commons.layout.MatrixLayout({
			id : 'matrix_CrHold',
			layoutFixed : true,
			width : '100%',
			columns : 3,
			widths : ['15%', '75%', '10%'] });
		
		var oMatrixCreateLayout = new sap.ui.commons.layout.MatrixLayout({
			id : 'matrix_CrLayout',
			layoutFixed : true,
			width : '100%',
			columns : 5,
			widths : ['20%', '20%', '15%', '20%', '25%']
		});
		
		oTV = new sap.ui.commons.TextView({
			id : 'TV-CreateIntern',
			text : 'Create New Record',
			design : sap.ui.commons.TextViewDesign.H2 });
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixCreateHolder.createRow(oCell);
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixCreateHolder.createRow(oCell,oTV);
		
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixCreateHolder.createRow(oCell);
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixCreateHolder.createRow(oCell);
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixCreateHolder.createRow(oCell,oMatrixCreateLayout);
		
		
		
		// CREATE EMPLOYEE FORM HERE
		//1
		oLabel0 = new sap.ui.commons.Label({
			id : 'L-INum',
			text : 'Employee I-Number',
			design: sap.ui.commons.LabelDesign.Bold});
		oTF0 = new sap.ui.commons.TextField({
			id: 'TF-INum',
			tooltip : 'Insert employee I-Number',
		});
		oLabel1 = new sap.ui.commons.Label({
			id : 'L-EmpStatus',
			text : 'Employment Status',
			design: sap.ui.commons.LabelDesign.Bold});
		var oDDB1 = new sap.ui.commons.DropdownBox("DDB-EmpStatus");
		oDDB1.setTooltip("Please select their employment status within SAP");
		oDDB1.setEditable(true);
		/*oDropdownBox1.setWidth("200px");*/
		var oItem = new sap.ui.core.ListItem("Int");
		oItem.setText("Intern");
		oDDB1.addItem(oItem);
		oItem = new sap.ui.core.ListItem("FT");
		oItem.setText("Full-time");
		oDDB1.addItem(oItem);
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixCreateLayout.createRow(oLabel0,oTF0,oCell,oLabel1,oDDB1);
		
		//2
		oLabel0 = new sap.ui.commons.Label({
			id : 'L-EmpName',
			text : 'Full Name',
			design: sap.ui.commons.LabelDesign.Bold});
		oTF0 = new sap.ui.commons.TextField({
			id: 'TF-EmpName',
			tooltip : 'Insert employees full name',
		});
		oLabel1 = new sap.ui.commons.Label({
			id : 'L-StDate',
			text : 'Start Date',
			design: sap.ui.commons.LabelDesign.Bold});
		var oDP1 = new sap.ui.commons.DatePicker('StDate', {
			value: {
				path: "/dateValue",
				type: new sap.ui.model.type.Date({pattern: "yyyy-MM-dd"})
			}
		});
		/*oDP1.setYyyymmdd("20100101");*/
		oDP1.setLocale("en-US"); // Try with "de" or "fr" instead!
		oDP1.attachChange(
				function(oEvent){
					if(oEvent.getParameter("invalidValue")){
						oEvent.oSource.setValueState(sap.ui.core.ValueState.Error);
					}else{
						oEvent.oSource.setValueState(sap.ui.core.ValueState.None);
					}
				}
		);
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixCreateLayout.createRow(oLabel0,oTF0,oCell,oLabel1,oDP1);
		
		//3
		oLabel0 = new sap.ui.commons.Label({
			id : 'L-Sex',
			text : 'Gender',
			design: sap.ui.commons.LabelDesign.Bold});
		var oRBG = new sap.ui.commons.RadioButtonGroup({
			id : 'RGB-Sex',
			tooltip : "Please select the employees gender",
			columns : 2
			});
		var oItem = new sap.ui.core.Item({
			text : "Male",
			tooltip : "Male",
			key : "M"});
		oRBG.addItem(oItem);
		var oItem = new sap.ui.core.Item({
			text : "Female",
			tooltip : "Female",
			key : "F"});
		oRBG.addItem(oItem);
		oLabel1 = new sap.ui.commons.Label({
			id : 'L-EndDate',
			text : 'End Date',
			design: sap.ui.commons.LabelDesign.Bold});
		var oDP1 = new sap.ui.commons.DatePicker('EndDate', {
			value: {
				path: "/dateValue",
				type: new sap.ui.model.type.Date({pattern: "yyyy-MM-dd"})
			}
		});
		/*oDP1.setYyyymmdd("20100101");*/
		oDP1.setLocale("en-US"); // Try with "de" or "fr" instead!
		oDP1.attachChange(
				function(oEvent){
					if(oEvent.getParameter("invalidValue")){
						oEvent.oSource.setValueState(sap.ui.core.ValueState.Error);
					}else{
						oEvent.oSource.setValueState(sap.ui.core.ValueState.None);
					}
				}
		);
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixCreateLayout.createRow(oLabel0,oRBG,oCell,oLabel1,oDP1);
		
		//4
		oLabel0 = new sap.ui.commons.Label({
			id : 'L-ExtEmail',
			text : 'External Email',
			design: sap.ui.commons.LabelDesign.Bold});
		oTF0 = new sap.ui.commons.TextField({
			id: 'TF-ExtEmail',
			tooltip : 'Insert employees external email address',
		});
		oLabel1 = new sap.ui.commons.Label({
			id : 'L-Mentor',
			text : 'Mentor Name',
			design: sap.ui.commons.LabelDesign.Bold});
		oTF1 = new sap.ui.commons.TextField({
			id: 'TF-Mentor',
			tooltip : 'Insert mentors name for the employee',
		});
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixCreateLayout.createRow(oLabel0,oTF0,oCell,oLabel1,oTF1);
		
		//5
		oLabel0 = new sap.ui.commons.Label({
			id : 'L-PriLanguage',
			text : 'Primary Language',
			design: sap.ui.commons.LabelDesign.Bold});
		var oDDB0 = new sap.ui.commons.DropdownBox("DDB-PrimLang");
		oDDB0.setTooltip("Please select their primary language");
		oDDB0.setEditable(true);
		/*oDropdownBox1.setWidth("200px");*/
		var oItem = new sap.ui.core.ListItem("P-English");
		oItem.setText("English");
		oDDB0.addItem(oItem);
		oItem = new sap.ui.core.ListItem("P-Spanish");
		oItem.setText("Spanish");
		oDDB0.addItem(oItem);
		oItem = new sap.ui.core.ListItem("P-French");
		oItem.setText("French");
		oDDB0.addItem(oItem);
		oItem = new sap.ui.core.ListItem("P-German");
		oItem.setText("German");
		oDDB0.addItem(oItem);
		oItem = new sap.ui.core.ListItem("P-Portuguese");
		oItem.setText("Portuguese");
		oDDB0.addItem(oItem);
		oItem = new sap.ui.core.ListItem("P-Mandarin");
		oItem.setText("Mandarin Chinese");
		oDDB0.addItem(oItem);
		oItem = new sap.ui.core.ListItem("P-Italian");
		oItem.setText("Italian");
		oDDB0.addItem(oItem);
		oDDB0.setValue("P-English");
		oLabel1 = new sap.ui.commons.Label({
			id : 'L-IntGroup',
			text : 'Intern/New Hire Group (month & group no.)',
			design: sap.ui.commons.LabelDesign.Bold});
		var oDDB1 = new sap.ui.commons.DropdownBox("DDB-IntMonth");
		oDDB1.setTooltip("Please select the employees start month");
		oDDB1.setEditable(true);
		oDDB1.setWidth("100px");
		var oItem = new sap.ui.core.ListItem("January");
		oItem.setText("January");
		oDDB1.addItem(oItem);
		oItem = new sap.ui.core.ListItem("February");
		oItem.setText("February");
		oDDB1.addItem(oItem);
		oItem = new sap.ui.core.ListItem("March");
		oItem.setText("March");
		oDDB1.addItem(oItem);
		oItem = new sap.ui.core.ListItem("April");
		oItem.setText("April");
		oDDB1.addItem(oItem);
		oItem = new sap.ui.core.ListItem("May");
		oItem.setText("May");
		oDDB1.addItem(oItem);
		oItem = new sap.ui.core.ListItem("June");
		oItem.setText("June");
		oDDB1.addItem(oItem);
		oItem = new sap.ui.core.ListItem("July");
		oItem.setText("July");
		oDDB1.addItem(oItem);
		oItem = new sap.ui.core.ListItem("August");
		oItem.setText("August");
		oDDB1.addItem(oItem);
		oItem = new sap.ui.core.ListItem("September");
		oItem.setText("September");
		oDDB1.addItem(oItem);
		oItem = new sap.ui.core.ListItem("October");
		oItem.setText("October");
		oDDB1.addItem(oItem);
		oItem = new sap.ui.core.ListItem("November");
		oItem.setText("November");
		oDDB1.addItem(oItem);
		oItem = new sap.ui.core.ListItem("December");
		oItem.setText("December");
		oDDB1.addItem(oItem);
		var oDDB2 = new sap.ui.commons.DropdownBox("DDB-IntNum");
		oDDB2.setTooltip("Please select the employees start group corresponding to their month");
		oDDB2.setEditable(true);
		oDDB2.setWidth("48px");
		var oItem = new sap.ui.core.ListItem("GR1");
		oItem.setText("1");
		oDDB2.addItem(oItem);
		oItem = new sap.ui.core.ListItem("GR2");
		oItem.setText("2");
		oDDB2.addItem(oItem);
		oItem = new sap.ui.core.ListItem("GR3");
		oItem.setText("3");
		oDDB2.addItem(oItem);
		oItem = new sap.ui.core.ListItem("GR4");
		oItem.setText("4");
		oDDB2.addItem(oItem);
		var oMatrixCell = new sap.ui.commons.layout.MatrixLayout({
			id : 'matrix_Cell',
			layoutFixed : true,
			width : '80%',
			columns : 2,
			widths : ['40%', '60%']
		});
		oMatrixCell.createRow(oDDB1,oDDB2);
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixCreateLayout.createRow(oLabel0,oDDB0,oCell,oLabel1,oMatrixCell);
		
		//6
		oLabel0 = new sap.ui.commons.Label({
			id : 'L-SecLanguage',
			text : 'Secondary Language',
			design: sap.ui.commons.LabelDesign.Bold});
		var oDDB0 = new sap.ui.commons.DropdownBox("DDB-SecLang");
		oDDB0.setTooltip("Please select their secondary language");
		oDDB0.setEditable(true);
		/*oDropdownBox1.setWidth("200px");*/
		var oItem = new sap.ui.core.ListItem("none");
		oItem.setText("[none]");
		oDDB0.addItem(oItem);
		oItem = new sap.ui.core.ListItem("S-English");
		oItem.setText("English");
		oDDB0.addItem(oItem);
		oItem = new sap.ui.core.ListItem("S-Spanish");
		oItem.setText("Spanish");
		oDDB0.addItem(oItem);
		oItem = new sap.ui.core.ListItem("S-French");
		oItem.setText("French");
		oDDB0.addItem(oItem);
		oItem = new sap.ui.core.ListItem("S-German");
		oItem.setText("German");
		oDDB0.addItem(oItem);
		oItem = new sap.ui.core.ListItem("S-Portuguese");
		oItem.setText("Portuguese");
		oDDB0.addItem(oItem);
		oItem = new sap.ui.core.ListItem("S-Mandarin");
		oItem.setText("Chinese (Mandarin)");
		oDDB0.addItem(oItem);
		oItem = new sap.ui.core.ListItem("S-Italian");
		oItem.setText("Italian");
		oDDB0.addItem(oItem);
		oDDB0.setValue("none");
		oLabel1 = new sap.ui.commons.Label({
			id : 'L-TrStDate',
			text : 'Training Start Date',
			design: sap.ui.commons.LabelDesign.Bold});
		var oDP1 = new sap.ui.commons.DatePicker('TrStDate', {
			value: {
				path: "/dateValue",
				type: new sap.ui.model.type.Date({pattern: "yyyy-MM-dd"})
			}
		});
		/*oDP1.setYyyymmdd("20100101");*/
		oDP1.setLocale("en-US"); // Try with "de" or "fr" instead!
		oDP1.attachChange(
				function(oEvent){
					if(oEvent.getParameter("invalidValue")){
						oEvent.oSource.setValueState(sap.ui.core.ValueState.Error);
					}else{
						oEvent.oSource.setValueState(sap.ui.core.ValueState.None);
					}
				}
		);
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixCreateLayout.createRow(oLabel0,oDDB0,oCell,oLabel1,oDP1);
		
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixCreateLayout.createRow(oCell);
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixCreateLayout.createRow(oCell);
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixCreateLayout.createRow(oCell);
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixCreateLayout.createRow(oCell);
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		var oCell0 = new sap.ui.commons.layout.MatrixLayoutCell({ });
		
		var oButton = new sap.ui.commons.Button({
			id : 'B-Save',
			text : 'Save',
			enabled: true,
			press : function(){
				
				iNumber = sap.ui.getCore().getControl("TF-INum").getValue();
				empName = sap.ui.getCore().getControl("TF-EmpName").getValue();
				if (sap.ui.getCore().getControl("RGB-Sex").getSelectedIndex() == 0){
					empSex = "M";
				} else {
					empSex = "F";
				}
				extEmail = sap.ui.getCore().getControl("TF-ExtEmail").getValue();
				priLang = sap.ui.getCore().getControl("DDB-PrimLang").getValue();
				if (sap.ui.getCore().getControl("DDB-SecLang").getValue() == "[none]"){
					secLang = "none";
				} else {
					secLang = sap.ui.getCore().getControl("DDB-SecLang").getValue();
				}
				empStatus = sap.ui.getCore().getControl("DDB-EmpStatus").getValue();
				stDate = sap.ui.getCore().getControl("StDate").getValue();
				endDate = sap.ui.getCore().getControl("EndDate").getValue();
				mentorName = sap.ui.getCore().getControl("TF-Mentor").getValue();
				groupMonth = sap.ui.getCore().getControl("DDB-IntMonth").getValue();
				groupNum = sap.ui.getCore().getControl("DDB-IntNum").getValue();
				trStDate = sap.ui.getCore().getControl("TrStDate").getValue();
				
				
				if (iNumber == "" || empName == "" || empSex == "" || extEmail == "" || priLang == "" || secLang == "" || empStatus == "" || stDate == "" || endDate == "" || mentorName == "" || groupMonth == "" || groupNum == "" || trStDate == ""){
					alert("ALL fields must be filled to create a new intern.");
				} else {
					oController.insertRecord(iNumber,empName,empSex,extEmail,priLang,secLang,empStatus,stDate,endDate,mentorName,groupMonth,groupNum,trStDate,function(count) {
						
						if (count >= 1) {
							alert("I-Number already exists, user already on system.");
							} 
						else {
							sap.ui.commons.MessageBox.alert("New intern saved successfully!");
							}
						
					});
					
					/*{
						sap.ui.commons.MessageBox.alert("New intern saved successfully!");
					} else {
						sap.ui.commons.MessageBox.alert("Something went wrong! Notify developer.",fnNotifyDev,"Oops.");
					}*/
				}
				
			}
		});
		
		
		function fnNotifyDev(){
			window.open('mailto:amit.upadhye@sap.com?subject=Issue with adding new employee&body=Dear Developer,');
		};
		
		
		oMatrixCreateLayout.createRow(oCell,oCell0,oButton);
		
		
		
		
		// create the container for the "create intern" action
		var oOverlayContainer = new sap.ui.ux3.OverlayContainer();
		oOverlayContainer.addContent(oMatrixCreateHolder);			
		
		// creating the button
		
		var oButtoncr = new sap.ui.commons.Button({
			id : 'B-Create',
			text : 'Create New Intern',
			enabled: true,
			width: '100%',
			press : function(){
				if(!oOverlayContainer.isOpen()){
					oOverlayContainer.open();
				}
			}
		});
		oMatrixMainPanel.createRow(oButtoncr);
		
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixMainPanel.createRow(oCell);
		
		var oDivider = new sap.ui.commons.HorizontalDivider("divider");
		oDivider.setWidth("100%");
		oDivider.setHeight(sap.ui.commons.HorizontalDividerHeight.Large);
		oDivider.setType(sap.ui.commons.HorizontalDividerType.Area);
		
		oMatrixMainPanel.createRow(oDivider);

		
		
		var id;
		var fbR;
		var fbG;
		var fbGemail;
		
		oLabelFR = new sap.ui.commons.Label({
			id : 'L-feedbackReceiver',
			text : 'Feedback Receiver',
			design: sap.ui.commons.LabelDesign.Bold});
		
		oLabelFP = new sap.ui.commons.Label({
			id : 'L-feedbackProvider',
			text : 'Feedback Provider',
			design: sap.ui.commons.LabelDesign.Bold});
		
		var oFeedbackReciever = new sap.ui.commons.TextField('FeedbackReciever');
		
		var oFeedbackProvider = new sap.ui.commons.TextField('FeedbackProvider');
		
		// creating the button
		
		var oButtonrf = new sap.ui.commons.Button({
			id : 'B-requestFeedback',
			text : 'FeedBack',
			enabled: true,
			widrh: '100%',
			press : function(){
				
				
				oController.sendEmail();
				
				fbR = oFeedbackReciever.getValue(); 
				fbG	= oFeedbackProvider.getValue();
				id = new Date().getTime();
				
				id = "FBR" + id ; 
				
				var aUrl = '../Services/getEmail.xsjs?iNumber='+escape(fbG);
			    jQuery.ajax({
			       url: aUrl,
			       method: 'GET',
			       dataType: 'json',
			       success: function(myJSON){
			    	   
			    	   fbGemail = myJSON[0].email;
			    	
			    	   var aUrl = '../Services/getUname.xsjs?iNumber='+escape(fbR);
		 			    jQuery.ajax({
		 			       url: aUrl,
		 			       method: 'GET',
		 			       dataType: 'json',
		 			       success: function(myJSON){
		 			    	  fbRName = myJSON[0].empname;
		 			    		
		 			    		oController.insertFBR(fbR,fbG,id,fbGemail,fbRName);
		 			       }
		 			       });
			    	   
			    	   
			    		
			       }
			       });
				
				
				
			   	
			    
				
			}
		});
		 
		

		
		
		
		oMatrixMainPanel.createRow(oLabelFR,oFeedbackReciever);
		
		oMatrixMainPanel.createRow(oLabelFP,oFeedbackProvider);
		
		oMatrixMainPanel.createRow(oButtonrf);
		
		//Attach the panel to the page
		
		return oLayoutMain;


	}

});
