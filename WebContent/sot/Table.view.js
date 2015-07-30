sap.ui.jsview("sot.Table", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf sot.Table
	*/ 
	getControllerName : function() {
		return "sot.Table";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf sot.Table
	*/ 
	createContent : function(oController) {
		
	
		
		var oItem = new sap.ui.core.ListItem(this.createId("DropdownBoxItem"));
		
		
		var oOverview = oController.createOverview();
		var oWkActivity = oController.createWkActivity();
		var oFeedback = oController.createFeedbackPg();

		
		var nameFilter = new Array();
		var suggestArray = new Array();	
		
		//create a simple SearchField with suggestion list (list expander hidden)
		var oSearch = new sap.ui.commons.SearchField("filterBy", {
		enableListSuggest: true,
		showListExpander: false,
		maxHistoryItems: 0,
        enableFilterMode: true,
        startSuggestion: 1,
        maxSuggestionItems: 3,
        enableClear: true,
        width: "400px",
        search: function(oEvent){
	     oController.setFilter(oEvent.getParameter("query")); 
	        },
	     suggest: oController.loadFilter 
        	} 
		);
		
		
		//Creating a label for the search
		var oLabel = new sap.ui.commons.Label(this.createId("title"));
		oLabel.setText("Employee Search");
		oLabel.setDesign(sap.ui.commons.LabelDesign.Bold);
		oLabel.setWidth( "120px");
	
		//Create a panel instance
		var oPanelsearch = new sap.ui.commons.Panel({showCollapseIcon : false,width : "50%"});
		//Add something to the panel's content area
		oPanelsearch.addContent(oLabel);
		oPanelsearch.addContent(oSearch);
										
		// create a simple matrix layout
		var oLayout = new sap.ui.commons.layout.MatrixLayout({
			id : this.createId("matrix_Tableview"),
			layoutFixed : true
		});
		
		// Preparing the model for table control
		var oModel = new sap.ui.model.odata.ODataModel(
				"../Services/empDetails.xsodata/", false);
		
		//Model for the weeklyactivity facet 
		var oModelWkAct = new sap.ui.model.odata.ODataModel(
				"../Services/wkActivity.xsodata/", false);
		
		//Model for the examResults facet 
			var oModelResult = new sap.ui.model.odata.ODataModel(
				"../Services/exResult.xsodata/", false);
			
		//Model for the feedback facet 
			var oModelfb = new sap.ui.model.odata.ODataModel(
		  			"../Services/feedbackOverview.xsodata/", false);
		
		// Preparing the model for table control
			var oModeltp = new sap.ui.model.odata.ODataModel(
					"../Services/trainingplan.xsodata/", false);
	
		
		//Declaring the thing inspector control
		var oTI = new sap.ui.ux3.ThingInspector(this.createId("ti_employeeDetails"),
				{
					
					type : "Employee",
					favoriteActionEnabled :false,
					updateActionEnabled : false,
					followActionEnabled : false,
					updateActionEnabled : false,
					flagActionEnabled : false,
					openButtonVisible : false,
					
					
					facets : [ new sap.ui.ux3.NavigationItem({
						id : this.createId("overviewFacet"),
						key : "overview",
						text : "Overview"
					}),
					new sap.ui.ux3.NavigationItem({
						key : "weeklyactivity",
						text : "WeeklyActivity"
					}),
					new sap.ui.ux3.NavigationItem({
						key : "feedback",
						text : "Feedback"
					})],
					facetSelected : function(oEvent) {
						oTI.removeAllFacetContent();
						oTI.removeAllActions();
						
						switch (oEvent.getParameter("key")) {
						case "overview":
							
							oController.openF1(oTI,iiNumber,oOverview,oModelResult);
							
							break;
						case "weeklyactivity":

							console.log("in the wa "+ iiNumber);
							
							oController.openF2(oTI,oWkActivity,oModelWkAct,iiNumber,oModeltp);
							
							break;
						case "feedback":
							
							var aUrl = '../Services/feedbackAverage.xsjs?iNumber='+escape(iiNumber);
						    jQuery.ajax({
						       url: aUrl,
						       method: 'GET',
						       dataType: 'json',
						       success: function(myJSON){
						    	
						    	   oController.assignFbAvValues(myJSON);
						    	   
						       },
						       //error: onErrorCall //needs to be handled
						       });

							oController.openF3(oTI,oFeedback,oModelfb,iiNumber);
							break;
							
						}
					},

				});
	
		
		
		
		oTI.attachClose(function(oControlEvent) {
			var id = oControlEvent.getParameters().id;
			oTable.clearSelection();
			oTI.removeAllFacetContent();
			oController.clearFeedbacFacet();
			
		});
		
		// create a table to display searchable employee data 			
		var oTable = new sap.ui.table.Table(this.createId("employeeDataTable"),
				{

					visibleRowCount : 8,
					selectionMode : sap.ui.table.SelectionMode.Single,
					navigationMode : sap.ui.table.NavigationMode.Scrollbar,
					selectionBehavior : sap.ui.table.SelectionBehavior.Row,
					editable : false,
					width: "100%",
					enableColumnReordering : false,
					rowSelectionChange : function(oControlEvent) {
					
						
					
					iiNumber           = oModel.getProperty("iNumber",oTable.getContextByIndex(oTable.getSelectedIndex()));
					iName              = oModel.getProperty("name",oTable.getContextByIndex(oTable.getSelectedIndex()));
					iStartDate         = oModel.getProperty("startDate",oTable.getContextByIndex(oTable.getSelectedIndex()));						
					iEndDate           = oModel.getProperty("endDate",oTable.getContextByIndex(oTable.getSelectedIndex()));
					iTrainingStartDate = oModel.getProperty("trainingStartDate",oTable.getContextByIndex(oTable.getSelectedIndex()));
					iAssignedGroup     = oModel.getProperty("assignedGroup",oTable.getContextByIndex(oTable.getSelectedIndex()));
					iAssignedMentor    = oModel.getProperty("assignedMentor",oTable.getContextByIndex(oTable.getSelectedIndex()));
					
				
					console.log("in the rsc "+ iiNumber);
									
					var Form_StartDate = String(iStartDate)
					Form_StartDate = Form_StartDate.slice(4,15);
					
					var Form_EndDate = String(iEndDate)
					Form_EndDate = Form_EndDate.slice(4,15);
									
				
					
					var aUrl = '../Services/eduDetails.xsjs?iNumber='+escape(iiNumber);
				    jQuery.ajax({
				       url: aUrl,
				       method: 'GET',
				       dataType: 'json',
				       success: function(myJSON){
					    	
				    	   oController.assignEduValues(myJSON);
				    	   
				       }				      
				    });
				   					

				    var aUrl = '../Services/skillDisplay.xsjs?iNumber='+escape(iiNumber);
				    jQuery.ajax({
				       url: aUrl,
				       method: 'GET',
				       dataType: 'json',
				       success: function(myJSON){
					    	
				    	   oController.assignSkillValues(myJSON);
				    	   
				       }
				       });
				   			
				    
				    var aUrl = '../Services/cvlink.xsjs?iNumber='+escape(iiNumber);
				    jQuery.ajax({
				       url: aUrl,
				       method: 'GET',
				       dataType: 'json',
				       success: function(myJSON){
					    	
				    	   oController.assignCVLinkValue(myJSON);
				    	   
				       }
				       });
				    
				    
				    oController.assignValues(Form_StartDate,Form_EndDate);	
									    			    
				    oController.openF1(oTI,iiNumber,oOverview,oModelResult);
					
				    oController.openTI();
					
					}
					
				});
		
					// Defining and adding the columns and the control templates to the table
			
					oTable.addColumn(new sap.ui.table.Column({
						label : new sap.ui.commons.Label({
							text : "Name"
						}),
						template : new sap.ui.commons.TextField().bindProperty("value", "name",function(sValue){
								    return sValue && sValue.toUpperCase();}),
					    width: "200px",	
								
					}));
					
					oTable.addColumn(new sap.ui.table.Column({
						label : new sap.ui.commons.Label({
							text : "iNumber"
						}),
						template : new sap.ui.commons.TextView()
								.bindProperty("text", "iNumber"),
						sorted : true,
						width: "80px"
					}));
			
						
					oTable.addColumn(new sap.ui.table.Column({
						label : new sap.ui.commons.Label({
							text : "StartDate"
						}),
						template : new sap.ui.commons.DatePicker().bindProperty("value", "startDate"),
						width: "140px",	
					}));
					
					oTable.addColumn(new sap.ui.table.Column({
						label : new sap.ui.commons.Label({
							text : "EndDate"
						}),
						template : new sap.ui.commons.DatePicker()
								.bindProperty("value", "endDate"),
						width: "140px",		
					}));
					
					oTable.setModel(oModel);
					oTable.bindRows("/employeeDetails");
			
					//Creating a matrix for showing visual KPIs
					
					var oMatrixVisKpi = new sap.ui.commons.layout.MatrixLayout({
						width : '100%',
						columns : 2,
						widths : ['50%', '50%']
						 });
					
					//creating the panels now for 
					
					var oPanelKpi1 = new sap.ui.commons.Panel(this.createId("panel1Kpi"),{showCollapseIcon : false});
					//oPanelKpi1.setText("Skill Distribution in Interns");
					var oPanelKpi2 = new sap.ui.commons.Panel(this.createId("panel2Kpi"),{showCollapseIcon : false});
					//oPanelKpi2.setText("College wise distribution of intens");
					var oPanelKpi3 = new sap.ui.commons.Panel(this.createId("panel3Kpi"),{showCollapseIcon : false});
					//oPanelKpi3.setText("Trainings Completed");
					var oPanelKpi4 = new sap.ui.commons.Panel(this.createId("panel4Kpi"),{showCollapseIcon : false});
					//oPanelKpi4.setText("Intern Fulltime employee distribution");
					
					//getting data for the visual representation Skill distribution 
					
					var aUrl = 'http://dewdfglp00799.wdf.sap.corp:8001/sot/Services/skillDistribution.xsjs';
				    jQuery.ajax({
				       url: aUrl,
				       method: 'GET',
				       dataType: 'json',
				       success: function(myJSON){
				    	   
				    	 oController.getDataSD(myJSON);
				    	   
				    	   
				    	  
				    	     },
				       error: onErrorCall });
				    //getting data for the visual representation of courseTaken 
					
					var aUrl = 'http://dewdfglp00799.wdf.sap.corp:8001/sot/Services/coursesTaken.xsjs';
				    jQuery.ajax({
				       url: aUrl,
				       method: 'GET',
				       dataType: 'json',
				       success: function(myJSON){
				    	   
				    	   oController.getDataCT(myJSON);
				    	   
				    	   
				    	  
				    	     },
				       error: onErrorCall });
				    //getting data for the visual representation TrainingTaken
					
					var aUrl = 'http://dewdfglp00799.wdf.sap.corp:8001/sot/Services/trainingTaken.xsjs';
				    jQuery.ajax({
				       url: aUrl,
				       method: 'GET',
				       dataType: 'json',
				       success: function(myJSON){
				    	   
				    	  oController.getDataTT(myJSON);
				    	   
				    	   
				    	  
				    	     },
				       error: onErrorCall });
			    //getting data for the visual representation EmpInt distribution 
					
					var aUrl = 'http://dewdfglp00799.wdf.sap.corp:8001/sot/Services/intfte.xsjs';
				    jQuery.ajax({
				       url: aUrl,
				       method: 'GET',
				       dataType: 'json',
				       success: function(myJSON){
				    	   
				    	 oController.getDataIF(myJSON);
				    	   
				    	   
				    	  
				    	     },
				       error: onErrorCall });
					
					
					//adding the panels to the matrix for KPI display 
					
				  
				    
				   oMatrixVisKpi.createRow(oPanelKpi1,oPanelKpi2);
				   oMatrixVisKpi.createRow(oPanelKpi3,oPanelKpi4);
					
					// Creating a rows in the matrix layout for the table
					
					oLayout.createRow(oPanelsearch);
					
					oLayout.createRow(oTable);	
					
					oLayout.createRow(oMatrixVisKpi);
					

					
					return oLayout;

					


	}	
	});

