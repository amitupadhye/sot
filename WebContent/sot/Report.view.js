sap.ui.jsview("sot.Report", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf sot.Report
	*/ 
	getControllerName : function() {
		return "sot.Report";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf sot.Report
	*/ 
	createContent : function(oController) {
		
		var oPanelRpHd = new sap.ui.commons.Panel(this.createId("hdpanel"),{showCollapseIcon : false});
		
		
		oPanelRpHd.setTitle(new sap.ui.core.Title({text: "Input for the reports"}));
		
		var oPanelRpDt = new sap.ui.commons.Panel(this.createId("dtpanel"),{showCollapseIcon : false});
		
		oPanelRpDt.setTitle(new sap.ui.core.Title({text: "Report Details"}));
		
		// create a simple matrix layout
		var oLayout = new sap.ui.commons.layout.MatrixLayout({
			id : "matrix_reportview",
			layoutFixed : false,
			width : "100%"
			});

			var oLabel = new sap.ui.commons.Label("tempLbl");
			oLabel.setText("Select report to be displayed :               ");
			oLabel.setDesign(sap.ui.commons.LabelDesign.Bold);
		 
			oPanelRpHd.addContent(oLabel);
		
			var oListBox = new sap.ui.commons.ListBox("days", {items : [
				                                                 			new sap.ui.core.ListItem("Report1", {text:"College wise distribution of intens"}),
				                                                 			new sap.ui.core.ListItem("Report2", {text:"Trainings Completed"})
				                                                 		
				                                                 	    ]
				                                                 		
				                                                 		});
			
			var oDropdownBox_reports = new sap.ui.commons.DropdownBox("DropdownBox_reports",{"association:listBox" : oListBox});
			oDropdownBox_reports.setTooltip("Report name ");
			oDropdownBox_reports.setEditable(true);
			oDropdownBox_reports.setWidth("200px");
			

			
			oPanelRpHd.addContent(oDropdownBox_reports);
			
			oLayout.createRow(  oPanelRpHd );
			oLayout.createRow(  oPanelRpDt );


		
		//Attach the panel to the page
		
		return oLayout;

	}

});
