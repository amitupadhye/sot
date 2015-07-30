sap.ui.controller("sot.Table", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf sot.Table
*/
//onInit: function() {
//
//
//	
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf sot.Table
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf sot.Table
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf sot.Table
*/
//	onExit: function() {
//
//	}

	assignValues:function assignValues(iStartDate,iEndDate) {
		
		var dataSt = this.byId("employeeDataTable").getModel();
		
		this.byId("TF-Name").setValue(dataSt.getProperty("name",this.byId("employeeDataTable").getContextByIndex(this.byId("employeeDataTable").getSelectedIndex())));
		this.byId("TF-iNumber").setValue(dataSt.getProperty("iNumber",this.byId("employeeDataTable").getContextByIndex(this.byId("employeeDataTable").getSelectedIndex())));
		this.byId("DP-startDate").setValue(iStartDate);
		this.byId("DP-endDate").setValue(iEndDate);
		this.byId("TF-assignedMentor").setValue(dataSt.getProperty("assignedMentor",this.byId("employeeDataTable").getContextByIndex(this.byId("employeeDataTable").getSelectedIndex())));
		this.byId("TF-assignedCoach").setValue(dataSt.getProperty("assignedCoach",this.byId("employeeDataTable").getContextByIndex(this.byId("employeeDataTable").getSelectedIndex())));
		this.byId("TF-assignedGroup").setValue(dataSt.getProperty("assignedGroup",this.byId("employeeDataTable").getContextByIndex(this.byId("employeeDataTable").getSelectedIndex())));
		this.byId("TF-assignedTeam").setValue(dataSt.getProperty("assignedTeam",this.byId("employeeDataTable").getContextByIndex(this.byId("employeeDataTable").getSelectedIndex())));
		
		var langStr = dataSt.getProperty("knownLanguages",this.byId("employeeDataTable").getContextByIndex(this.byId("employeeDataTable").getSelectedIndex()));
		if(langStr){
		this.byId("TF-Language").setValue(langStr.replace("_",","));
		};
   
		var id = dataSt.getProperty("iNumber",this.byId("employeeDataTable").getContextByIndex(this.byId("employeeDataTable").getSelectedIndex()));
		var url = "https://avatars.wdf.sap.corp/avatar/"+ id +"?s=94";
		this.byId("IMG-Pic").setSrc(url);
		
		
 	
	},
	
	assignEduValues:function assignEduValues(myJSON) {
		
		var i = 1;
		var con = "";
 		var cnt = myJSON[0].count;	
 		while(i<=cnt){
 			
 	   	   var cT =  myJSON[i].courseTaken;
 		   var cN =  myJSON[i].collegeName;
 		   var cW =  myJSON[i].collegeWebsite;
 		   
 		   con = con.concat(cT,"  ","(",cN,")");
 		   i++;
 		   
 		}
  
 	this.byId("TL-Education").setText(con);
 	//this.byId("TL-Education").setHref();
		
	},
	
	assignSkillValues:function assignSkillValues(myJSON){
		
		/*var i = 1;
		var con = " ";
 		var cnt = myJSON[0].count;	
 		while(i<=cnt){
 			
 	   	   var SkillId =  myJSON[i].skillID;
 		 		   
 		   con = con.concat(SkillId," , ");
 		   i++;
 		   
 		}
 		
 		this.byId("TF-Skills").setValue(con);*/
	
	},
	assignCVLinkValue:function assignCVLinkValue(myJSON) {
		
		var a = toString(myJSON);
		console.log(a);
		
		if(myJSON[0]){
		var str = myJSON[0].link;
		this.byId("TL-cv").setHref(str);
		}
		else
		{
		this.byId("TL-cv").setText("CV Not stored");	
		}
			
		
		
	},
	
	
	assignFbAvValues:function assignFbAvValues(myJSON) {
		
		var r1 = myJSON[0].rating1;
		this.byId("Rt1-1").setText(r1.slice(0,3));
		
		var r2 = myJSON[0].rating2;
		this.byId("Rt2-1").setText(r2.slice(0,3));
		
		var r3 = myJSON[0].rating3;
		this.byId("Rt3-1").setText(r3.slice(0,3));
		
		var r4 = myJSON[0].rating4;
		this.byId("Rt4-1").setText(r4.slice(0,3));
		
		var r5 = myJSON[0].rating5;
		this.byId("Rt5-1").setText(r5.slice(0,3));
		
		var r6 = myJSON[0].rating6;
		this.byId("Rt6-1").setText(r6.slice(0,3));
		
		var r7 = myJSON[0].rating7;
		this.byId("Rt7-1").setText(r7.slice(0,3));
		
		var r8 = myJSON[0].rating8;
		this.byId("Rt8-1").setText(r8.slice(0,3));
	},
	
	openF1:function openF1(oTI,iiNumber,oOverview,oModelResult) {
		
		//content holder for the overview 
		var oFC1 = new sap.ui.ux3.ThingGroup({
			title : "Group 1",

		});
		
		//Filtering and bind data to the result table.
		
		var filteriNum = new  sap.ui.model.odata.Filter('iNumber', [{operator:"EQ",value1:iiNumber}]); 	
		this.byId("resulttable").setModel(oModelResult);
		this.byId("resulttable").bindRows({path: "/exResult", parameters: { select: 'iNumber,trainingDescription,trainingScore,examDate' },  
	        filters: [filteriNum] } ); 
	
		oFC1.addContent(oOverview);
		oTI.addFacetContent(oFC1);
		
	},
	
	openF2: function openF2(oTI,oWkActivity,oModelWkAct,iiNumber,oModeltp) {
		
		//content holder for the Activity 
		var oFC2 = new sap.ui.ux3.ThingGroup({
			title : "Group 2",

		});
		
		var filterNum = new  sap.ui.model.odata.Filter('iNumber', [{operator:"EQ",value1:iiNumber}]); 
		
		this.byId("activityTable").setModel(oModelWkAct);
	    this.byId("activityTable").bindRows({path: "/wkActivity", parameters: { select: 'iNumber,calWk,activity' },  
	        filters: [filterNum] } );  
	    this.byId("activityTable").clearSelection();
	    
	    
		this.byId("TrainingTable").setModel(oModeltp);
	    this.byId("TrainingTable").bindRows({path: "/trainingplan", parameters: { select: 'iNumber,calWk,trainingActivity' },  
	        filters: [filterNum] } );  
	    this.byId("TrainingTable").clearSelection();
	    
		oFC2.addContent(oWkActivity);
		oTI.addFacetContent(oFC2);
	},
	
	openF3: function openF3(oTI,oFeedback,oModelfb,iiNumber) {
		
		//content holder for the feedback 
		var oFC3 = new sap.ui.ux3.ThingGroup({
			title : "Group 3",
		});
		
			
		var filterN = new  sap.ui.model.odata.Filter('empiNumber', [{operator:"EQ",value1:iiNumber}]);
		this.byId("feedbackTable").setModel(oModelfb);
	    this.byId("feedbackTable").bindRows({path: "/fbOverview", parameters: { select: 'feedbackStatusID,dateStamp,coachName,task,Feedback1Rating,Feedback2Rating,Feedback3Rating,Feedback4Rating,Feedback5Rating,Feedback6Rating,Feedback7Rating,Feedback8Rating,FeedbackRemark'},  
	        filters: [filterN] } );  
		
		oFC3.addContent(oFeedback);
		oTI.addFacetContent(oFC3);
	},
		
	openTI: function openTI() {
	
	if (!this.byId("ti_employeeDetails").isOpen()) 
		
		{
		
		var data = this.byId("employeeDataTable").getModel();
		
		var name = data.getProperty("name",this.byId("employeeDataTable").getContextByIndex(this.byId("employeeDataTable").getSelectedIndex()));	
		this.byId("ti_employeeDetails").setFirstTitle(name);
		
		var startDate = data.getProperty("startDate",this.byId("employeeDataTable").getContextByIndex(this.byId("employeeDataTable").getSelectedIndex()));
		var exEmail = data.getProperty("externalEmail",this.byId("employeeDataTable").getContextByIndex(this.byId("employeeDataTable").getSelectedIndex()));
		var employeeID = data.getProperty("iNumber",this.byId("employeeDataTable").getContextByIndex(this.byId("employeeDataTable").getSelectedIndex()));

		var startDate_string = startDate.toString();
		var dateTime = startDate_string.split("00:00:00"); //split on 00:00:00
				
		var oTCAbout = 	new sap.ui.ux3.ThingGroup(
			{
				title : "About",
				content : [ new sap.ui.commons.layout.MatrixLayout(
						{
							rows : [
								    this.rowLabel( "Start Date" ),this.row(dateTime[0])			
								 ]
						}) ]
			});
		

		var urlicon = "https://avatars.wdf.sap.corp/avatar/"+ employeeID+"?s=94";
	
		   var oTCContact = new sap.ui.ux3.ThingGroup(
				{
					title : "Contact",
					content : [ new sap.ui.commons.layout.MatrixLayout(
							{
								rows : [
									
								    this.rowLabel( "Email" ),
								    this.row(  exEmail ),
								 ]
							}) ]
				});
		
		
		this.byId("ti_employeeDetails").removeAllHeaderContent();
		this.byId("ti_employeeDetails").setIcon(urlicon);
		this.byId("ti_employeeDetails").addHeaderContent(oTCAbout);
		this.byId("ti_employeeDetails").addHeaderContent(oTCContact);
		

		
	
		//Opening the things inspector 
		this.byId("ti_employeeDetails").open();
		
		this.byId("ti_employeeDetails").setSelectedFacet(this.byId("overviewFacet"));	
		
		
		}
		
	},	


filterEmployees:function filterEmployees(sVal,nameFilter,suggestArray) {
	
	
	var fromName = sVal;
	var filter = new sap.ui.model.Filter("name",sap.ui.model.FilterOperator.Contains, fromName);
	nameFilter.length = 0;						
	nameFilter.push(filter);
	this.byId("employeeDataTable").bindRows("/empDetails",new sap.ui.commons.TextView().bindProperty("text", "name"), nameFilter);
	
	//suggestArray.push(sVal);														
	//return suggestArray;
	
},

searchEmployees:function searchEmployees(oEvent,nameFilter) {
	
	var fromQuery = oEvent.getParameter("query");
	var filter = new sap.ui.model.Filter("name",sap.ui.model.FilterOperator.Contains, fromQuery);
	nameFilter.length = 0;							
	nameFilter.push(filter);
	this.byId("employeeDataTable").bindRows("/employeeDetails",new sap.ui.commons.TextView().bindProperty("text", "name"), nameFilter);

	
},
// Helper function to easier create a Matrixlayout
	
rowLabel:function rowLabel(srowLabel) {
	var orowLabel = new sap.ui.commons.Label({
		text : srowLabel + ":",
		design: sap.ui.commons.LabelDesign.Bold,
		
	});	
	var oMLCell = new sap.ui.commons.layout.MatrixLayoutCell(
			{
				hAlign : sap.ui.commons.layout.HAlign.left,
				vAlign : sap.ui.commons.layout.VAlign.Top,
				content : [ orowLabel ]
			});
	return new sap.ui.commons.layout.MatrixLayoutRow({
		cells : [oMLCell]
	});
},
row:function row(sText) {
	var oControl;
	
		oControl = new sap.ui.commons.TextView({
			text : sText,
			tooltip : sText
		});
		
	var oMLCell1 = new sap.ui.commons.layout.MatrixLayoutCell(
			{
				hAlign : sap.ui.commons.layout.HAlign.Begin,
				vAlign : sap.ui.commons.layout.VAlign.Top,
				content : [ oControl ]
			});

	return new sap.ui.commons.layout.MatrixLayoutRow({
		cells : [oMLCell1]
	});
},

createOverview:function createOverview() {
	
	var oPanelPD = new sap.ui.commons.Panel({width : '1100px'});
	oPanelPD.setTitle(new sap.ui.core.Title({text: "Personal Details"}));
	
	var oPanelEdu = new sap.ui.commons.Panel({width : '1100px'});
	oPanelEdu.setTitle(new sap.ui.core.Title({text: "Results"}));
	
	var oPanelPer = new sap.ui.commons.Panel({width : '1100px'});
	oPanelPer.setTitle(new sap.ui.core.Title({text: "Performance"}));
	
	var oMatrixMain = new sap.ui.commons.layout.MatrixLayout({
		id : this.createId("matrixMain"),
		width : '1100px',
		});
	
	var oMatrix = new sap.ui.commons.layout.MatrixLayout({
		id : this.createId("matrixPd"),
		layoutFixed : true,
		width : '1000px',
		columns : 5,
		widths : ['150px', '250px', '200px', '200px', '200px'] });

	var oCell = new sap.ui.commons.layout.MatrixLayoutCell({
		colSpan: 5 });

	var oLabel = new sap.ui.commons.Label({
		id : this.createId("LB-Name"),
		text : 'Name', 
		design: sap.ui.commons.LabelDesign.Bold	});

	var oTF = new sap.ui.commons.TextField({
		id :  this.createId("TF-Name"),
		tooltip : 'Name',
		editable : false,
		width : '200px' });

	oLabel.setLabelFor(oTF);

	oCell = new sap.ui.commons.layout.MatrixLayoutCell();
	oCell1 = new sap.ui.commons.layout.MatrixLayoutCell({
		rowSpan : 7 });
				var oImg = new sap.ui.commons.Image({
					id : this.createId("IMG-Pic"),
					src : 'images/employee.jpg',
					alt : 'Face',
					height : '150px',
					width : '150px'});
	oCell1.addContent(oImg);
	oMatrix.createRow(oLabel, oTF, oCell, oCell1);

	oLabel = new sap.ui.commons.Label({
		id : this.createId("LB-iNumber"),
		text : 'iNumber',
		design: sap.ui.commons.LabelDesign.Bold
		});

	oTF = new sap.ui.commons.TextField({
		id : this.createId("TF-iNumber"),
		tooltip : 'First Name',
		editable : false,
		width : '200px' });
	oLabel.setLabelFor(oTF);
	oMatrix.createRow(oLabel, oTF);

	oLabel = new sap.ui.commons.Label({
		id : this.createId("LB-startDate"),
		text : 'StartDate', 
		design: sap.ui.commons.LabelDesign.Bold
		});

	oDP = new sap.ui.commons.TextField({
		id : this.createId("DP-startDate"),
		tooltip : 'startDate',
		editable : false,
		width : '110px'
		 });
	
	oLabel.setLabelFor(oDP);
	
	oMatrix.createRow(oLabel, oDP);
	
	oLabel = new sap.ui.commons.Label({
		id : this.createId("LB-endDate"),
		text : 'EndDate', 
		design: sap.ui.commons.LabelDesign.Bold
		});
	
	oDP2 = new sap.ui.commons.TextField({
		id : this.createId("DP-endDate"),
		tooltip : 'endDate',
		editable : false,
		width : '110px'
		 });
	
	oLabel.setLabelFor(oDP2);
	
	oMatrix.createRow(oLabel, oDP2);
		
	oLabel = new sap.ui.commons.Label({
		id : this.createId("LB-assignedMentor"),
		text : 'Mentor', 
	    design: sap.ui.commons.LabelDesign.Bold});

	oTF = new sap.ui.commons.TextField({
		id : this.createId("TF-assignedMentor"),
		tooltip : 'assignedMentor',
		editable : false,
		width : '200px' });
	
	oLabel.setLabelFor(oTF);
	
	oMatrix.createRow(oLabel, oTF);
	
	oLabel = new sap.ui.commons.Label({
		id : this.createId("LB-assignedCoach"),
		text : 'Coach',
		design: sap.ui.commons.LabelDesign.Bold});
	
	oTF = new sap.ui.commons.TextField({
		id : this.createId("TF-assignedCoach"),
		tooltip : 'gender',
		value: 'M/F',
		editable : false,
		width : '200px' });
	
	oLabel.setLabelFor(oTF);
	
	oMatrix.createRow(oLabel, oTF);
		
	oLabel = new sap.ui.commons.Label({
		id : this.createId("LB-assignedGroup"),
		text : 'Group',
		design: sap.ui.commons.LabelDesign.Bold
		});

	oTF = new sap.ui.commons.TextField({
		id : this.createId("TF-assignedGroup"),
		tooltip : 'assignedGroup',
		editable : false,
		width : '200px' });
	
	oLabel.setLabelFor(oTF);
	
	oMatrix.createRow(oLabel, oTF);

	oLabel = new sap.ui.commons.Label({
		id : this.createId("LB-assignedTeam"),
		text : 'Team',
		design: sap.ui.commons.LabelDesign.Bold
		});

	oTF = new sap.ui.commons.TextField({
		id : this.createId("TF-assignedTeam"),
		tooltip : 'assignedTeam',
		editable : false,
		width : '200px' });
	
	oLabel.setLabelFor(oTF);
	
	oMatrix.createRow(oLabel, oTF);

	
	oLabel = new sap.ui.commons.Label({
		id : this.createId("LB-Language"),
		text : 'Language',
		design: sap.ui.commons.LabelDesign.Bold
		});

	oTF = new sap.ui.commons.TextField({
		id : this.createId("TF-Language"),
		tooltip : 'Special',
		editable : false,
		value:'English,Spanish,German',
		width : '800px' });
	oLabel.setLabelFor(oTF);
	oMatrix.createRow(oLabel, oTF);
	
	oCell = new sap.ui.commons.layout.MatrixLayoutCell();

	oLabel.setLabelFor(oTF);

	oMatrix.createRow(oLabel, oTF, oCell);

	oLabel = new sap.ui.commons.Label({
		id :  this.createId("LB-Education"),
		text : 'Education', 
		design: sap.ui.commons.LabelDesign.Bold	});
	
	oCell = new sap.ui.commons.layout.MatrixLayoutCell({
		colSpan : 4 });
	
	oTL = new sap.ui.commons.Link({
		id : this.createId("TL-Education"),
		text: "Not available", 
		tooltip: "Education",
		});
	
	oLabel.setLabelFor(oTL);
	
	oCell.addContent(oTL);
	
	oMatrix.createRow(oLabel, oCell);
	
	/*oLabel = new sap.ui.commons.Label({
		id :  this.createId("LB-Skills"),
		text : 'Skills', 
		design: sap.ui.commons.LabelDesign.Bold	});
	
	oCell = new sap.ui.commons.layout.MatrixLayoutCell({
		colSpan : 4 });
	
	oTA = new sap.ui.commons.TextField({
		id : this.createId("TF-Skills"),
		tooltip : 'Skills',
		editable : false,
		width : '800px' });
	
	oLabel.setLabelFor(oTA);
	
	oCell.addContent(oTA);
	
	oMatrix.createRow(oLabel, oCell);
*/
	oLabel = new sap.ui.commons.Label({
		id :  this.createId("LB-cv"),
		text : 'Link to CV', 
		design: sap.ui.commons.LabelDesign.Bold	});
	
	oCell = new sap.ui.commons.layout.MatrixLayoutCell({
		colSpan : 4 });
	
	oTL = new sap.ui.commons.Link({
		id : this.createId("TL-cv"),
		text: "CV", 
		tooltip: "CV",
		});
	
	oLabel.setLabelFor(oTL);

	oCell.addContent(oTL);
	
	oMatrix.createRow(oLabel, oCell);
	
	oPanelPD.addContent(oMatrix);
	
	//start of the result overview
	
	var oResultTable = new sap.ui.table.Table(this.createId("resulttable"),
			{
		
				visibleRowCount : 5,
				selectionMode : sap.ui.table.SelectionMode.Single,
				navigationMode : sap.ui.table.NavigationMode.Scrollbar,
				selectionBehavior : sap.ui.table.SelectionBehavior.Row,
				editable : false,
				enableColumnReordering : false,
				rowSelectionChange : function(oControlEvent) {
					
				}
				
			});
	
	oResultTable.addColumn(new sap.ui.table.Column({
		label : new sap.ui.commons.Label({
			text : "Exam Topic"
		}),
		template : new sap.ui.commons.TextView().bindProperty("text", "trainingDescription",function(sValue){
				    return sValue && sValue.toUpperCase();}),
	}));
	
	oResultTable.addColumn(new sap.ui.table.Column({
		label : new sap.ui.commons.Label({
			text : "Score"
		}),
		template : new sap.ui.commons.TextView().bindProperty("text", "trainingScore"),
	}));
	
	oResultTable.addColumn(new sap.ui.table.Column({
		label : new sap.ui.commons.Label({
			text : "Exam Date"
		}),
		template : new sap.ui.commons.DatePicker().bindProperty("value", "examDate"),
	}));
	
	oPanelEdu.addContent(oResultTable);
	
	var oMatrixPerformance = new sap.ui.commons.layout.MatrixLayout({
		id : this.createId("MatrixPerformance"),
		layoutFixed : true,
		width : '1000px',
		columns : 2,
		widths : ['200px', '800px'] });
	

	oLabel = new sap.ui.commons.Label({
		id : this.createId("LB-Special"),
		text : 'Achievements',
		design: sap.ui.commons.LabelDesign.Bold
		});

	oTF = new sap.ui.commons.TextField({
		id : this.createId("TF-Special"),
		tooltip : 'Special',
		editable : false,
		value:'worked on internal projects (Hard Coaded value)',
		width : '800px' });
	oLabel.setLabelFor(oTF);
	oMatrixPerformance.createRow(oLabel, oTF);
	
	oPanelPer.addContent(oMatrixPerformance);
	
	oMatrixMain.createRow(oPanelPD);
	oMatrixMain.createRow(oPanelEdu);
	//oMatrixMain.createRow(oPanelPer);
	
	
	return oMatrixMain;
	

	
},

createWkActivity:function createWkActivity() {
	
	var oPanelWkActivity = new sap.ui.commons.Panel({width : '1100px'});
	
	oPanelWkActivity.setTitle(new sap.ui.core.Title({text: "Weekly Activity"}));
	
	var otrainingActivity = new sap.ui.commons.Panel({width : '1100px'});
	
	otrainingActivity.setTitle(new sap.ui.core.Title({text: "Training Plan"}));
	
	var oMatrixWkActivity = new sap.ui.commons.layout.MatrixLayout({
		id : 'MatrixWkActivity',
		width : '1100px',
		});
	
	var oActivityTable = new sap.ui.table.Table(this.createId("activityTable"),
			{

				visibleRowCount : 10,
				selectionMode : sap.ui.table.SelectionMode.Single,
				navigationMode : sap.ui.table.NavigationMode.Scrollbar,
				selectionBehavior : sap.ui.table.SelectionBehavior.Row,
				editable : false,
				enableColumnReordering : false,
				rowSelectionChange : function(oControlEvent) {
	
				}
				
			});
	
	

	oActivityTable.addColumn(new sap.ui.table.Column({
		label : new sap.ui.commons.Label({
			text : "Calender Week"
		}),
		template : new sap.ui.commons.TextView().bindProperty("text", "calWk",function(sValue){
				    return sValue && sValue.toUpperCase();}),
	
				
	}));
	
	oActivityTable.addColumn(new sap.ui.table.Column({
		label : new sap.ui.commons.Label({
			text : "Activity"
		}),
		template : new sap.ui.commons.TextView().bindProperty("text", "activity"),
		
		
	}));
	
	
// Training Plan
	
	var oTTrainingTable = new sap.ui.table.Table(this.createId("TrainingTable"),
			{

				visibleRowCount : 10,
				selectionMode : sap.ui.table.SelectionMode.Single,
				navigationMode : sap.ui.table.NavigationMode.Scrollbar,
				selectionBehavior : sap.ui.table.SelectionBehavior.Row,
				editable : false,
				enableColumnReordering : false,
				rowSelectionChange : function(oControlEvent) {
	
				}
				
			});
	
	oTTrainingTable.addColumn(new sap.ui.table.Column({
		label : new sap.ui.commons.Label({
			text : "Calender Week"
		}),
		template : new sap.ui.commons.TextView().bindProperty("text", "calWk",function(sValue){
				    return sValue && sValue.toUpperCase();}),
	
				
	}));
	
	oTTrainingTable.addColumn(new sap.ui.table.Column({
		label : new sap.ui.commons.Label({
			text : "Training activity"
		}),
		template : new sap.ui.commons.TextView().bindProperty("text", "trainingActivity"),
		
		
	}));

	
	oPanelWkActivity.addContent(oActivityTable);
	otrainingActivity.addContent(oTTrainingTable);
	
	oMatrixWkActivity.createRow(oPanelWkActivity);
	oMatrixWkActivity.createRow(otrainingActivity);
	
	return oMatrixWkActivity;
	
},

createFeedbackPg:function createFeedbackPg() {
	
	var oPanelFbPgOv = new sap.ui.commons.Panel({width : '1100px'});
	
	oPanelFbPgOv.setTitle(new sap.ui.core.Title({text: "Average Ratings"}));
	
	var oPanelFbPgDe = new sap.ui.commons.Panel({width : '1100px'});
	
	oPanelFbPgDe.setTitle(new sap.ui.core.Title({text: "Detailed Ratings"}));
	
	var oMatrixFbPg = new sap.ui.commons.layout.MatrixLayout({
		id : 'MatrixFbPg',
		width : '1100px',
		});
	
	
	oMatrixFbPg.createRow(oPanelFbPgOv);
	oMatrixFbPg.createRow(oPanelFbPgDe);
		
	
	//Create the Carousel control
	var oCarousel = new sap.ui.commons.Carousel({height:'60px',defaultItemWidth:100});
	oCarousel.setWidth("100%");
	oCarousel.setOrientation("horizontal");
	
	// Carousel control group 1
	
	var oMatrix1Rt = new sap.ui.commons.layout.MatrixLayout({
		columns : 3,
		width : '250px',
		layoutFixed : true,
		widths : ['20%','60%','20%']
		 });
	
	
	oTV1RtV = new sap.ui.commons.TextView({
		id : this.createId('Rt1-1'),
		design : sap.ui.commons.TextViewDesign.H1 });

	var oLabel1Rt = new sap.ui.commons.Label("lb-1Rt");
	oLabel1Rt.setIcon('images/star_10p.jpg');
	
	oTV1Rt = new sap.ui.commons.TextView({
		id : 'Rt1-2',
		text : 'Technical Knowledge',
		design : sap.ui.commons.TextViewDesign.H6 });
	

	var oCell1Rt = new sap.ui.commons.layout.MatrixLayoutCell({ 
		
		hAlign : sap.ui.commons.layout.HAlign.Center,
		vAlign : sap.ui.commons.layout.VAlign.Center,
		
		}
	);
	

	oCell1Rt.addContent(oTV1RtV);
	oCell1Rt.addContent(oLabel1Rt);
	
	
	var oCellblank = new sap.ui.commons.layout.MatrixLayoutCell();
	var oCellblank2 = new sap.ui.commons.layout.MatrixLayoutCell();
	
	oMatrix1Rt.createRow(oCellblank,oCell1Rt);
	oMatrix1Rt.createRow(oCellblank2,oTV1Rt);
	
	oCarousel.addContent(oMatrix1Rt);
	
	// Carousel control group 2
	
	var oMatrix2Rt = new sap.ui.commons.layout.MatrixLayout({
		columns : 3,
		width : '250px',
		layoutFixed : true,
		widths : ['20%','60%','20%']
		 });
	
	
	oTV2RtV = new sap.ui.commons.TextView({
		id : this.createId('Rt2-1'),
		design : sap.ui.commons.TextViewDesign.H1 });

	var oLabel2Rt = new sap.ui.commons.Label("lb-2Rt");
	oLabel2Rt.setIcon('images/star_10p.jpg');
	
	oTV2Rt = new sap.ui.commons.TextView({
		id : 'Rt2-2',
		text : 'Problem Solving Skills ',
		tooltip:'Problem Solving & Decision Making',
		design : sap.ui.commons.TextViewDesign.H6 });
	

	var oCell2Rt = new sap.ui.commons.layout.MatrixLayoutCell({ 
		
		hAlign : sap.ui.commons.layout.HAlign.Center,
		vAlign : sap.ui.commons.layout.VAlign.Center,
		
		}
	);
	
	oCell2Rt.addContent(oTV2RtV);
	oCell2Rt.addContent(oLabel2Rt);
	
	
	var oCellblank = new sap.ui.commons.layout.MatrixLayoutCell();
	var oCellblank2 = new sap.ui.commons.layout.MatrixLayoutCell();
	
	oMatrix2Rt.createRow(oCellblank,oCell2Rt);
	oMatrix2Rt.createRow(oCellblank2,oTV2Rt);
	
	oCarousel.addContent(oMatrix2Rt);
	

	// Carousel control group 3
	
	var oMatrix3Rt = new sap.ui.commons.layout.MatrixLayout({
		columns : 3,
		width : '250px',
		layoutFixed : true,
		widths : ['20%','60%','20%']
		 });
	
	
	oTV3RtV = new sap.ui.commons.TextView({
		id : this.createId('Rt3-1'),
		design : sap.ui.commons.TextViewDesign.H1 });

	var oLabel3Rt = new sap.ui.commons.Label("lb-3Rt");
	oLabel3Rt.setIcon('images/star_10p.jpg');
	
	oTV3Rt = new sap.ui.commons.TextView({
		id : 'Rt3-2',
		text : 'Planning & Organization',
		design : sap.ui.commons.TextViewDesign.H6 });
	

	var oCell3Rt = new sap.ui.commons.layout.MatrixLayoutCell({ 
		
		hAlign : sap.ui.commons.layout.HAlign.Center,
		vAlign : sap.ui.commons.layout.VAlign.Center,
		
		}
	);
	
	oCell3Rt.addContent(oTV3RtV);
	oCell3Rt.addContent(oLabel3Rt);
	
	
	var oCellblank = new sap.ui.commons.layout.MatrixLayoutCell();
	var oCellblank2 = new sap.ui.commons.layout.MatrixLayoutCell();
	
	oMatrix3Rt.createRow(oCellblank,oCell3Rt);
	oMatrix3Rt.createRow(oCellblank2,oTV3Rt);
	
	oCarousel.addContent(oMatrix3Rt);
		
	// Carousel control group 4
	
	var oMatrix4Rt = new sap.ui.commons.layout.MatrixLayout({
		columns : 3,
		width : '250px',
		layoutFixed : true,
		widths : ['20%','60%','20%']
		 });
	
	
	oTV4RtV = new sap.ui.commons.TextView({
		id : this.createId('Rt4-1'),
		design : sap.ui.commons.TextViewDesign.H1 });

	var oLabel4Rt = new sap.ui.commons.Label("lb-4Rt");
	oLabel4Rt.setIcon('images/star_10p.jpg');
	
	oTV4Rt = new sap.ui.commons.TextView({
		id : 'Rt4-2',
		text : 'Communication Skills',
		tooltip: 'Communication - Verbal & Written',
		design : sap.ui.commons.TextViewDesign.H6 });
	

	var oCell4Rt = new sap.ui.commons.layout.MatrixLayoutCell({ 
		
		hAlign : sap.ui.commons.layout.HAlign.Center,
		vAlign : sap.ui.commons.layout.VAlign.Center,
		
		}
	);
	
	oCell4Rt.addContent(oTV4RtV);
	oCell4Rt.addContent(oLabel4Rt);
	
	
	var oCellblank = new sap.ui.commons.layout.MatrixLayoutCell();
	var oCellblank2 = new sap.ui.commons.layout.MatrixLayoutCell();
	
	oMatrix4Rt.createRow(oCellblank,oCell4Rt);
	oMatrix4Rt.createRow(oCellblank2,oTV4Rt);
	
	oCarousel.addContent(oMatrix4Rt);	
	
	// Carousel control group 5
	
	var oMatrix5Rt = new sap.ui.commons.layout.MatrixLayout({
		columns : 3,
		width : '250px',
		layoutFixed : true,
		widths : ['20%','60%','20%']
		 });
	
	
	oTV5RtV = new sap.ui.commons.TextView({
		id : this.createId('Rt5-1'),
		design : sap.ui.commons.TextViewDesign.H1 });

	var oLabel5Rt = new sap.ui.commons.Label("lb-5Rt");
	oLabel5Rt.setIcon('images/star_10p.jpg');
	
	oTV5Rt = new sap.ui.commons.TextView({
		id : 'Rt5-2',
		text : 'Interpersonal Skills ',
		tooltip:'Interpersonal Skills & Teamwork',
		design : sap.ui.commons.TextViewDesign.H6 });
	

	var oCell5Rt = new sap.ui.commons.layout.MatrixLayoutCell({ 
		
		hAlign : sap.ui.commons.layout.HAlign.Center,
		vAlign : sap.ui.commons.layout.VAlign.Center,
		
		}
	);
	
	oCell5Rt.addContent(oTV5RtV);
	oCell5Rt.addContent(oLabel5Rt);
	
	
	var oCellblank = new sap.ui.commons.layout.MatrixLayoutCell();
	var oCellblank2 = new sap.ui.commons.layout.MatrixLayoutCell();
	
	oMatrix5Rt.createRow(oCellblank,oCell5Rt);
	oMatrix5Rt.createRow(oCellblank2,oTV5Rt);
	
	oCarousel.addContent(oMatrix5Rt);
	
	// Carousel control group 6
	
	var oMatrix6Rt = new sap.ui.commons.layout.MatrixLayout({
		columns : 3,
		width : '250px',
		layoutFixed : true,
		widths : ['20%','60%','20%']
		 });
	
	
	oTV6RtV = new sap.ui.commons.TextView({
		id : this.createId('Rt6-1'),
		design : sap.ui.commons.TextViewDesign.H1 });

	var oLabel6Rt = new sap.ui.commons.Label("lb-6Rt");
	oLabel6Rt.setIcon('images/star_10p.jpg');
	
	oTV6Rt = new sap.ui.commons.TextView({
		id : 'Rt6-2',
		text : 'Adherence org. Policy',
		tooltip:'Adherence to Company Policy / Safety',
		design : sap.ui.commons.TextViewDesign.H6 });
	

	var oCell6Rt = new sap.ui.commons.layout.MatrixLayoutCell({ 
		
		hAlign : sap.ui.commons.layout.HAlign.Center,
		vAlign : sap.ui.commons.layout.VAlign.Center,
		
		}
	);
	
	oCell6Rt.addContent(oTV6RtV);
	oCell6Rt.addContent(oLabel6Rt);
	
	
	var oCellblank = new sap.ui.commons.layout.MatrixLayoutCell();
	var oCellblank2 = new sap.ui.commons.layout.MatrixLayoutCell();
	
	oMatrix6Rt.createRow(oCellblank,oCell6Rt);
	oMatrix6Rt.createRow(oCellblank2,oTV6Rt);
	
	oCarousel.addContent(oMatrix6Rt);
	
	// Carousel control group 7
	
	var oMatrix7Rt = new sap.ui.commons.layout.MatrixLayout({
		columns : 3,
		width : '250px',
		layoutFixed : true,
		widths : ['20%','60%','20%']
		 });
	
	
	oTV7RtV = new sap.ui.commons.TextView({
		id : this.createId('Rt7-1'),
		design : sap.ui.commons.TextViewDesign.H1 });

	var oLabel7Rt = new sap.ui.commons.Label("lb-7Rt");
	oLabel7Rt.setIcon('images/star_10p.jpg');
	
	oTV7Rt = new sap.ui.commons.TextView({
		id : 'Rt7-2',
		text : '     Initiative',
		design : sap.ui.commons.TextViewDesign.H6 });
	

	var oCell7Rt = new sap.ui.commons.layout.MatrixLayoutCell({ 
		
		hAlign : sap.ui.commons.layout.HAlign.Center,
		vAlign : sap.ui.commons.layout.VAlign.Center,
		
		}
	);
	
	oCell7Rt.addContent(oTV7RtV);
	oCell7Rt.addContent(oLabel7Rt);
	
	
	var oCellblank = new sap.ui.commons.layout.MatrixLayoutCell();
	var oCellblank2 = new sap.ui.commons.layout.MatrixLayoutCell();
	
	oMatrix7Rt.createRow(oCellblank,oCell7Rt);
	oMatrix7Rt.createRow(oCellblank2,oTV7Rt);
	
	oCarousel.addContent(oMatrix7Rt);
	
	// Carousel control group 8
	
	var oMatrix8Rt = new sap.ui.commons.layout.MatrixLayout({
		columns : 3,
		width : '250px',
		layoutFixed : true,
		widths : ['20%','60%','20%']
		 });
	
	
	oTV8RtV = new sap.ui.commons.TextView({
		id : this.createId('Rt8-1'),
		design : sap.ui.commons.TextViewDesign.H1 });

	var oLabel8Rt = new sap.ui.commons.Label("lb-8Rt");
	oLabel8Rt.setIcon('images/star_10p.jpg');
	
	oTV8Rt = new sap.ui.commons.TextView({
		id : 'Rt8-2',
		text : '      Enthusiasm',
		design : sap.ui.commons.TextViewDesign.H6 });
	

	var oCell8Rt = new sap.ui.commons.layout.MatrixLayoutCell({ 
		
		hAlign : sap.ui.commons.layout.HAlign.Center,
		vAlign : sap.ui.commons.layout.VAlign.Center,
		
		}
	);
	
	oCell8Rt.addContent(oTV8RtV);
	oCell8Rt.addContent(oLabel8Rt);
	
	
	var oCellblank = new sap.ui.commons.layout.MatrixLayoutCell();
	var oCellblank2 = new sap.ui.commons.layout.MatrixLayoutCell();
	
	oMatrix8Rt.createRow(oCellblank,oCell8Rt);
	oMatrix8Rt.createRow(oCellblank2,oTV8Rt);
	
	oCarousel.addContent(oMatrix8Rt);

	
	//*****************************************************************************************		
	//THE FOLLOWING CODE PERTAINS TO THE BOTTOM SECTION WHERE THE DETAILED FEEDBACK IS SHOWN
	//*****************************************************************************************	
		
	var oMatrixPanelDt = new sap.ui.commons.layout.MatrixLayout({
		width : '90%',
		columns : 4,
		widths : ['10%', '30%', '30%','30%']
		 });
	
	
	// row describing the columns' function
		oTV = new sap.ui.commons.TextView({
			id : 'TV-Criteria',
			text : 'Assessment Criteria',
			design : sap.ui.commons.TextViewDesign.H3 });
		
		var oTV2 = new sap.ui.commons.TextView({
			id : 'TV-Rating',
			text : 'Rating',
			design : sap.ui.commons.TextViewDesign.H3 });
		
		//Just adding empty rows
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		var oCell1 = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixPanelDt.createRow(oCell,oCell1);
		//Just adding empty rows
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		var oCell1 = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixPanelDt.createRow(oCell,oCell1);
		//Just adding empty rows
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		var oCell1 = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixPanelDt.createRow(oCell,oCell1);
		//Just adding empty rows	
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		var oCell1 = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixPanelDt.createRow(oCell,oCell1);
		//Just adding empty rows
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		var oCell1 = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixPanelDt.createRow(oCell,oCell1);

		
		//Create an instance of the table control
		var oTableFeedback = new sap.ui.table.Table(this.createId("feedbackTable"),{
			visibleRowCount : 4,
			selectionMode : sap.ui.table.SelectionMode.Single,
			navigationMode : sap.ui.table.NavigationMode.Scrollbar,
			selectionBehavior : sap.ui.table.SelectionBehavior.Row,
			editable : false,
			enableColumnReordering : false,
			rowSelectionChange: function(){
				
			//Get the selected index and assign it to a variable
				
				oM = oTableFeedback.getModel();
			
			    
			    oTA_task.setHtmlText(oM.getProperty("task",oTableFeedback.getContextByIndex(oTableFeedback.getSelectedIndex())));
				oRating1.setValue(oM.getProperty("Feedback1Rating",oTableFeedback.getContextByIndex(oTableFeedback.getSelectedIndex())));
				oRating2.setValue(oM.getProperty("Feedback2Rating",oTableFeedback.getContextByIndex(oTableFeedback.getSelectedIndex())));
				oRating3.setValue(oM.getProperty("Feedback3Rating",oTableFeedback.getContextByIndex(oTableFeedback.getSelectedIndex())));
				oRating4.setValue(oM.getProperty("Feedback4Rating",oTableFeedback.getContextByIndex(oTableFeedback.getSelectedIndex())));
				oRating5.setValue(oM.getProperty("Feedback5Rating",oTableFeedback.getContextByIndex(oTableFeedback.getSelectedIndex())));
				oRating6.setValue(oM.getProperty("Feedback6Rating",oTableFeedback.getContextByIndex(oTableFeedback.getSelectedIndex())));
				oRating7.setValue(oM.getProperty("Feedback7Rating",oTableFeedback.getContextByIndex(oTableFeedback.getSelectedIndex())));
				oRating8.setValue(oM.getProperty("Feedback8Rating",oTableFeedback.getContextByIndex(oTableFeedback.getSelectedIndex())));
				oTA.setHtmlText(oM.getProperty("FeedbackRemark",oTableFeedback.getContextByIndex(oTableFeedback.getSelectedIndex())));
				
				oLabelrating1.setText(oM.getProperty("Feedback1Rating",oTableFeedback.getContextByIndex(oTableFeedback.getSelectedIndex()))+" / 10");
				oLabelrating2.setText(oM.getProperty("Feedback2Rating",oTableFeedback.getContextByIndex(oTableFeedback.getSelectedIndex()))+" / 10");
				oLabelrating3.setText(oM.getProperty("Feedback3Rating",oTableFeedback.getContextByIndex(oTableFeedback.getSelectedIndex()))+" / 10");
				oLabelrating4.setText(oM.getProperty("Feedback4Rating",oTableFeedback.getContextByIndex(oTableFeedback.getSelectedIndex()))+" / 10");
				oLabelrating5.setText(oM.getProperty("Feedback5Rating",oTableFeedback.getContextByIndex(oTableFeedback.getSelectedIndex()))+" / 10");
				oLabelrating6.setText(oM.getProperty("Feedback6Rating",oTableFeedback.getContextByIndex(oTableFeedback.getSelectedIndex()))+" / 10");
				oLabelrating7.setText(oM.getProperty("Feedback7Rating",oTableFeedback.getContextByIndex(oTableFeedback.getSelectedIndex()))+" / 10");
				oLabelrating8.setText(oM.getProperty("Feedback8Rating",oTableFeedback.getContextByIndex(oTableFeedback.getSelectedIndex()))+" / 10");
		
					
				
			}
		});
		
		
	
		//Define the columns and the control templates to be used
		oTableFeedback.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Date"}),
			template : new sap.ui.commons.DatePicker().bindProperty("value", "dateStamp"),
			width: "200px"
			
		}));

		oTableFeedback.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Coach Name"}),
			template: new sap.ui.commons.TextField().bindProperty("value", "coachName"),
            width: "200px"
			
		}));
		
	
		//Just adding empty rows
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		var oCell1 = new sap.ui.commons.layout.MatrixLayoutCell({colSpan:2 });
		oCell1.addContent(oTableFeedback);
		oMatrixPanelDt.createRow(oCell,oCell1);
		
		//Just adding empty rows
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		var oCell1 = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixPanelDt.createRow(oCell,oCell1);
		
		// create a standard divider
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({colSpan: 2});
		var oCell1 = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oCell.addContent(new sap.ui.commons.HorizontalDivider());
		oMatrixPanelDt.createRow(oCell1, oCell);
		
		//Just adding empty rows
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		var oCell1 = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixPanelDt.createRow(oCell,oCell1);
		
		//Just adding empty rows
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		var oCell1 = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixPanelDt.createRow(oCell,oCell1);

		
// row describing the columns' function
		oDTTV = new sap.ui.commons.TextView({
			id : 'DTTV-Criteria',
			text : 'Assessment Criteria',
			design : sap.ui.commons.TextViewDesign.H3 });
		var oDTTV2 = new sap.ui.commons.TextView({
			id : 'DTTV-Rating',
			text : 'Rating',
			design : sap.ui.commons.TextViewDesign.H3 });
		
		//Just adding empty rows
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		var oCell1 = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixPanelDt.createRow(oCell,oCell1);
		//Just adding empty rows
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		var oCell1 = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixPanelDt.createRow(oCell,oCell1);
		//Just adding empty rows
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		var oCell1 = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixPanelDt.createRow(oCell,oCell1);
		
		var oCellD = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixPanelDt.createRow(oCellD,oDTTV, oDTTV2);
		//Just adding empty rows	
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		var oCell1 = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixPanelDt.createRow(oCell,oCell1);
		//Just adding empty rows
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		var oCell1 = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixPanelDt.createRow(oCell,oCell1);
		
// Task that is rated  	
	    oLabel = new sap.ui.commons.Label({
		id : 'L-RATEDTASK',
		text : 'Rated Task',
		design: sap.ui.commons.LabelDesign.Bold	});
	
	   	oTA_task = new sap.ui.commons.FormattedTextView({
			id : this.createId("TA-RatedTask"),
			//tooltip : 'RatedTask',
			//editable : false,
			//wrapping : sap.ui.core.Wrapping.Off,
			visible: true,
			width : '100%',
			height : '40px'
			});
	
		
	   	var oCellD = new sap.ui.commons.layout.MatrixLayoutCell({ });
	   	oMatrixPanelDt.createRow(oCellD,oLabel,oTA_task);
		//Just adding empty rows	
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		var oCell1 = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixPanelDt.createRow(oCell,oCell1);
		//Just adding empty rows
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		var oCell1 = new sap.ui.commons.layout.MatrixLayoutCell({ });
		var oCellD = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixPanelDt.createRow(oCellD,oCell,oCell1);
		
// Technical knowledge rating
		oLabel = new sap.ui.commons.Label({
			id : 'L-Tech',
			text : '1. Technical Knowledge',
			design: sap.ui.commons.LabelDesign.Bold});
		
//Create a RatingIndicator instance 
		var oRating1 = new sap.ui.commons.RatingIndicator(this.createId("techKnowledge"), {
			maxValue: 10,
			visualMode: sap.ui.commons.RatingIndicatorVisualMode.Continuous,
			editable: false
		});
		
//Create a label to display rating given
		
		oLabelrating1 = new sap.ui.commons.Label({
			id : this.createId("rating1Lbl"),
			design: sap.ui.commons.LabelDesign.Bold});
		
		var oCellD = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixPanelDt.createRow(oCellD,oLabel,oRating1,oLabelrating1);
		//Just adding empty rows	
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		var oCell1 = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixPanelDt.createRow(oCell,oCell1);
		//Just adding empty rows
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		var oCell1 = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixPanelDt.createRow(oCell,oCell1);
		
// Problem solving and Decision making 
		oLabel = new sap.ui.commons.Label({
			id : 'L-Prob',
			text : '2. Problem Solving & Decision Making',
			design: sap.ui.commons.LabelDesign.Bold});
		
		var oRating2 = new sap.ui.commons.RatingIndicator(this.createId("probSol"), {
			maxValue: 10,
			visualMode: sap.ui.commons.RatingIndicatorVisualMode.Continuous,
			editable: false
		});
		
	//Create a label to display rating given
		
		oLabelrating2 = new sap.ui.commons.Label({
			id : this.createId("rating2Lbl"),
			design: sap.ui.commons.LabelDesign.Bold});
	
		var oCellD = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixPanelDt.createRow(oCellD,oLabel,oRating2,oLabelrating2);
		
		//Just adding empty rows	
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		var oCell1 = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixPanelDt.createRow(oCell,oCell1);
		//Just adding empty rows
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		var oCell1 = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixPanelDt.createRow(oCell,oCell1);
	
// Planning & Organisation rating
		oLabel = new sap.ui.commons.Label({
		id : 'L-Plan',
		text : '3. Planning & Organization',
		design: sap.ui.commons.LabelDesign.Bold});
		
		var oRating3 = new sap.ui.commons.RatingIndicator(this.createId("planOrg"), {
		maxValue: 10,
		visualMode: sap.ui.commons.RatingIndicatorVisualMode.Continuous,
		editable: false
		});
//Create a label to display rating given
		
		oLabelrating3 = new sap.ui.commons.Label({
			id : this.createId("rating3Lbl"),
			design: sap.ui.commons.LabelDesign.Bold});
	
		var oCellD = new sap.ui.commons.layout.MatrixLayoutCell({ });	
		oMatrixPanelDt.createRow(oCellD,oLabel,oRating3,oLabelrating3);
		//Just adding empty rows	
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		var oCell1 = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixPanelDt.createRow(oCell,oCell1);
		//Just adding empty rows
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		var oCell1 = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixPanelDt.createRow(oCell,oCell1);
		
// Verbal & Written rating
		oLabel = new sap.ui.commons.Label({
			id : 'L-Comm',
			text : '4. Communication - Verbal & Written',
			design: sap.ui.commons.LabelDesign.Bold});
		
		var oRating4 = new sap.ui.commons.RatingIndicator(this.createId("verbWri"), {
			maxValue: 10,
			visualMode: sap.ui.commons.RatingIndicatorVisualMode.Continuous,
			editable: false
			});
//Create a label to display rating given
		
		oLabelrating4 = new sap.ui.commons.Label({
			id : this.createId("rating4Lbl"),
			design: sap.ui.commons.LabelDesign.Bold});
		
			var oCellD = new sap.ui.commons.layout.MatrixLayoutCell({ });
			oMatrixPanelDt.createRow(oCellD,oLabel,oRating4,oLabelrating4);
			//Just adding empty rows	
			var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
			var oCell1 = new sap.ui.commons.layout.MatrixLayoutCell({ });
			oMatrixPanelDt.createRow(oCell,oCell1);
			//Just adding empty rows
			var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
			var oCell1 = new sap.ui.commons.layout.MatrixLayoutCell({ });
			oMatrixPanelDt.createRow(oCell,oCell1);
		
// Interpersonal Skills / Teamwork Rating
		oLabel = new sap.ui.commons.Label({
			id : 'L-Team',
			text : '5. Interpersonal Skills / Teamwork',
			design: sap.ui.commons.LabelDesign.Bold });
		
		var oRating5 = new sap.ui.commons.RatingIndicator(this.createId("intTeam"), {
			maxValue: 10,
			visualMode: sap.ui.commons.RatingIndicatorVisualMode.Continuous,
			editable: false
			});
		
//Create a label to display rating given
		
		oLabelrating5 = new sap.ui.commons.Label({
			id : this.createId("rating5Lbl"),
			design: sap.ui.commons.LabelDesign.Bold});		
		
		var oCellD = new sap.ui.commons.layout.MatrixLayoutCell({ });
			oMatrixPanelDt.createRow(oCellD,oLabel,oRating5,oLabelrating5);
			//Just adding empty rows	
			var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
			var oCell1 = new sap.ui.commons.layout.MatrixLayoutCell({ });
			oMatrixPanelDt.createRow(oCell,oCell1);
			//Just adding empty rows
			var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
			var oCell1 = new sap.ui.commons.layout.MatrixLayoutCell({ });
			oMatrixPanelDt.createRow(oCell,oCell1);
			
// Adherence to Company Policy / Safety rating
		oLabel = new sap.ui.commons.Label({
			id : 'L-Safe',
			text : '6. Adherence to Company Policy / Safety', 
			design: sap.ui.commons.LabelDesign.Bold	});
		
		var oRating6 = new sap.ui.commons.RatingIndicator(this.createId("polSaf"), {
			maxValue: 10,
			visualMode: sap.ui.commons.RatingIndicatorVisualMode.Continuous,
			editable: false
			});
//Create a label to display rating given
		
		oLabelrating6 = new sap.ui.commons.Label({
			id : this.createId("rating6Lbl"),
			design: sap.ui.commons.LabelDesign.Bold});	
		
		var oCellD = new sap.ui.commons.layout.MatrixLayoutCell({ });
			oMatrixPanelDt.createRow(oCellD,oLabel,oRating6,oLabelrating6);
			//Just adding empty rows	
			var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
			var oCell1 = new sap.ui.commons.layout.MatrixLayoutCell({ });
			oMatrixPanelDt.createRow(oCell,oCell1);
			//Just adding empty rows
			var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
			var oCell1 = new sap.ui.commons.layout.MatrixLayoutCell({ });
			oMatrixPanelDt.createRow(oCell,oCell1);
		
// Self-Management Skills rating
		    oLabel = new sap.ui.commons.Label({
			id : 'L-MGMT',
			text : '7. Initiative',
			design: sap.ui.commons.LabelDesign.Bold	});
		
		    var oRating7 = new sap.ui.commons.RatingIndicator(this.createId("selfManage"), {
			maxValue: 10,
			visualMode: sap.ui.commons.RatingIndicatorVisualMode.Continuous,
			editable: false
			});
		    
//Create a label to display rating given
			
			oLabelrating7 = new sap.ui.commons.Label({
				id : this.createId("rating7Lbl"),
				design: sap.ui.commons.LabelDesign.Bold});			    
		
		    var oCellD = new sap.ui.commons.layout.MatrixLayoutCell({ });
			oMatrixPanelDt.createRow(oCellD,oLabel,oRating7,oLabelrating7);
			//Just adding empty rows	
			var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
			var oCell1 = new sap.ui.commons.layout.MatrixLayoutCell({ });
			oMatrixPanelDt.createRow(oCell,oCell1);
			//Just adding empty rows
			var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
			var oCell1 = new sap.ui.commons.layout.MatrixLayoutCell({ });
			oMatrixPanelDt.createRow(oCell,oCell1);

// Enthusiasm Skills rating
		    oLabel = new sap.ui.commons.Label({
			id : 'L-ENTHU',
			text : '8. Enthusiasm',
			design: sap.ui.commons.LabelDesign.Bold	});
		
		    var oRating8 = new sap.ui.commons.RatingIndicator(this.createId("Enthusiasm"), {
			maxValue: 10,
			visualMode: sap.ui.commons.RatingIndicatorVisualMode.Continuous,
			editable: false
			});
		    
//Create a label to display rating given
			
			oLabelrating8 = new sap.ui.commons.Label({
				id : this.createId("rating8Lbl"),
				design: sap.ui.commons.LabelDesign.Bold});			    
		
		    var oCellD = new sap.ui.commons.layout.MatrixLayoutCell({ });
			oMatrixPanelDt.createRow(oCellD,oLabel,oRating8,oLabelrating8);
			//Just adding empty rows	
			var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
			var oCell1 = new sap.ui.commons.layout.MatrixLayoutCell({ });
			oMatrixPanelDt.createRow(oCell,oCell1);
			//Just adding empty rows
			var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
			var oCell1 = new sap.ui.commons.layout.MatrixLayoutCell({ });
			oMatrixPanelDt.createRow(oCell,oCell1);			
			
// Final remarks about the rating 	
		    oLabel = new sap.ui.commons.Label({
			id : 'L-remarks',
			text : 'Remarks',
			design: sap.ui.commons.LabelDesign.Bold	});
		
		   	oTA = new sap.ui.commons.FormattedTextView({
				id : this.createId("TA-remarks"),
				//tooltip : 'Remarks',
				//editable : false,
				//wrapping : sap.ui.core.Wrapping.Off,
				visible: true,
				width : '100%',
				height : '80px'
				});
		
			
		   	var oCellD = new sap.ui.commons.layout.MatrixLayoutCell({ });
		   	oMatrixPanelDt.createRow(oCellD,oLabel,oTA);
			//Just adding empty rows	
			var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
			var oCell1 = new sap.ui.commons.layout.MatrixLayoutCell({ });
			oMatrixPanelDt.createRow(oCell,oCell1);
			//Just adding empty rows
			var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
			var oCell1 = new sap.ui.commons.layout.MatrixLayoutCell({ });
			var oCellD = new sap.ui.commons.layout.MatrixLayoutCell({ });
			oMatrixPanelDt.createRow(oCellD,oCell,oCell1);
			
		// Adding te cirousel for the average ratings 
			oPanelFbPgOv.addContent(oCarousel);
		//adding the content for the matrix in the details panels	
			oPanelFbPgDe.addContent(oMatrixPanelDt);
			
	return oMatrixFbPg;
	
},

clearFeedbacFacet:function clearFeedbackFacet(){
	
	this.byId("Rt1-1").setText("");
	this.byId("Rt2-1").setText("");
	this.byId("Rt3-1").setText("");
	this.byId("Rt4-1").setText("");
	this.byId("Rt5-1").setText("");
	this.byId("Rt6-1").setText("");
	this.byId("Rt7-1").setText("");
	this.byId("Rt8-1").setText("");
	
	this.byId("techKnowledge").setValue(0);
	this.byId("probSol").setValue(0);
	this.byId("planOrg").setValue(0);
	this.byId("verbWri").setValue(0);
	this.byId("intTeam").setValue(0);
	this.byId("polSaf").setValue(0);
	this.byId("selfManage").setValue(0);
	this.byId("Enthusiasm").setValue(0);
	this.byId("TA-remarks").setHtmlText("");
	this.byId("TA-RatedTask").setHtmlText("");
	
	this.byId("rating1Lbl").setText("");
	this.byId("rating2Lbl").setText("");
	this.byId("rating3Lbl").setText("");
	this.byId("rating4Lbl").setText("");
	this.byId("rating5Lbl").setText("");
	this.byId("rating6Lbl").setText("");
	this.byId("rating7Lbl").setText("");
	this.byId("rating8Lbl").setText("");
},

setFilter: function(terms)
{
    gFilterTerms = terms;
    
    var mySplitResults = terms.split(' : ' + "|" + ' ');
    
    gFilterTerms = mySplitResults[0];
    
    gFilterAttribute = mySplitResults[1];
    
      
    if(gFilterTerms=="*") this.emptyFilter();
    if(gFilterTerms=="") this.emptyFilter();
    
    oTable = this.byId("employeeDataTable");

    //Change from the Display Attribute Names to the property names in the ODATA service
    
    switch(gFilterAttribute)
    {
    case 'name':gFilterAttribute='name';
    

/*	    //change the style sheet 
	var oText = sap.ui.getCore().byId("TFDSPSHANA");
	oText.addStyleClass('detailhighlight');
	oText.setValue(gFilterTerms);*/
    	break;
    	
    case 'iNumber':gFilterAttribute='iNumber';
/*	  //change the style sheet 
    var  oText = sap.ui.getCore().byId("TFDSPSHANAFix");
    oText.addStyleClass('detailhighlight');
    oText.setValue(gFilterTerms);*/

    	break;	    	
   	    }
    
    //Build the OData Service Filter Options
  	var filter = new  sap.ui.model.odata.Filter(gFilterAttribute, [{operator:"EQ",value1:gFilterTerms}]); 
		
	
	if(gFilterTerms=="" || gFilterTerms=="*")
    	
   	{ 	
	
		oTable.bindRows("/employeeDetails"); }
	else
		{
  	oTable.bindRows({path: "/employeeDetails", parameters: { select: 'name,iNumber' },  
        filters: [filter] } );
		};

	

	
	oTable.clearSelection();  
	
	
},

emptyFilter: function()
{

	gFilterTerms ="";
    gFilterAttribute ="";
	},

loadFilter: function(oEvent)
{
    
	if(oEvent == "suggest"){
		gSearchParam = sap.ui.getCore().byId("filterBy").getValue();
		}
		else{
	
			if (oEvent != "  "){
    
				gSearchParam = oEvent.getParameter("value");
				}
			else{
		
				gSearchParam = oEvent;
		
				}
		    }
	

   
	var aUrl = '../Services/Search.xsjs?cmd=filter'+'&query='+escape(gSearchParam)+'&page=1&start=0&limit=25';
    jQuery.ajax({
       url: aUrl,
       method: 'GET',
       dataType: 'json',
       success: onLoadFilter,
       error: onErrorCall });
} ,

getDataSD:function getDataSD(myJSON) {
	
	
	
	
	var s1 = myJSON[0].count;
	 var collection1 = [] ;
	 var collection2 = [] ;
	 
	 for (var i = 0; i <= s1 ; i++)
		 {
		 collection1[i] = myJSON[i].Skill;
		 collection2[i] = myJSON[i].ID;
		
		 };
		 
		 var recSet = [];
	 
		 for (i = 1 ; i <= s1 ; i++)
		 {
			 recSet.push(createEntrySD1(collection1[i],collection2[i]));
		 
		 
		 };
	 	
		
	
		
		 var oModel = new sap.ui.model.json.JSONModel(createEntrySD2(recSet));	
				

	    // A Dataset defines how the model data is mapped to the chart 
		var oDataset = new sap.viz.ui5.data.FlattenedDataset({

			// a Bar Chart requires exactly one dimension (x-axis) 
			dimensions : [ 
				{
					axis : 1, // must be one for the x-axis, 2 for y-axis
					name : 'skill', 
					value : "{Skill}"
				} 
			],

			// it can show multiple measures, each results in a new set of bars in a new color 
			measures : [ 
			    // measure 1
				{
					name : 'count', // 'name' is used as label in the Legend 
					value : '{ID}' // 'value' defines the binding for the displayed value   
				}
			
			],
			
			// 'data' is used to bind the whole data collection that is to be displayed in the chart 
			data : {
				path : "/skillOverview"
			}
			
		});

	    // create a Bar chart
	    // you also might use Combination, Line, StackedColumn100, StackedColumn or Column
	    // for Donut and Pie please remove one of the two measures in the above Dataset.  
		var oBarChart = new sap.viz.ui5.Bar({
			width : "80%",
			height : "400px",
			plotArea : {
			//'colorPalette' : d3.scale.category20().range()
			},
			title : {
				visible : true,
				text : 'Skill Distribution in Interns'
			},
			dataset : oDataset
		});

	
		oBarChart.setModel(oModel);
		this.byId("panel1Kpi").addContent(oBarChart);


	
	},
	
	getDataCT:function getDataCT(myJSON) {
		
		 var s1 = myJSON[0].count;
		 var collection1 = [] ;
		 var collection2 = [] ;
		 
		 for (var i = 0; i <= s1 ; i++)
			 {
			 collection1[i] = myJSON[i].collegeName;
			 collection2[i] = myJSON[i].count;
			
			 };
			 
			 var recSet = [];
		 
			 for (i = 1 ; i <= s1 ; i++)
			 {
				 recSet.push(createEntryCT1(collection1[i],collection2[i]));
			 
			 
			 };
		 	
			
		
			
			 var oModel = new sap.ui.model.json.JSONModel(createEntryCT2(recSet));	
					
			
	
			 
			 // A Dataset defines how the model data is mapped to the chart 
				var oDataset = new sap.viz.ui5.data.FlattenedDataset({

					// a Bar Chart requires exactly one dimension (x-axis) 
					dimensions : [ 
						{
							axis : 1, // must be one for the x-axis, 2 for y-axis
							name : 'collegeName', 
							value : "{collegeName}"
						} 
					],

					// it can show multiple measures, each results in a new set of bars in a new color 
					measures : [ 
					    // measure 1
						{
							name : 'count', // 'name' is used as label in the Legend 
							value : '{count}' // 'value' defines the binding for the displayed value   
						}
					
					],
					
					// 'data' is used to bind the whole data collection that is to be displayed in the chart 
					data : {
						path : "/courseTaken"
					}
					
				});

			    // create a Bar chart
			    // you also might use Combination, Line, StackedColumn100, StackedColumn or Column
			    // for Donut and Pie please remove one of the two measures in the above Dataset.  
				var oBarChart = new sap.viz.ui5.Bar({
					width : "80%",
					height : "400px",
					plotArea : {
					//'colorPalette' : d3.scale.category20().range()
					},
					title : {
						visible : true,
						text : 'College wise distribution of intens '
					},
					dataset : oDataset
				});

			
				oBarChart.setModel(oModel);
				this.byId("panel2Kpi").addContent(oBarChart);
		
	},
	
	getDataTT:function getDataTT(myJSON) {
		
		 var s1 = myJSON[0].count;
		 var collection1 = [] ;
		 var collection2 = [] ;
		 
		 for (var i = 0; i <= s1 ; i++)
			 {
			 collection1[i] = myJSON[i].training;
			 collection2[i] = myJSON[i].count;
			
			 };
			 
			 var recSet = [];
		 
			 for (i = 1 ; i <= s1 ; i++)
			 {
				 recSet.push(createEntryTT1(collection1[i],collection2[i]));
			 
			 
			 };
		 	
			
		
			
			 var oModel = new sap.ui.model.json.JSONModel(createEntryTT2(recSet));	

		   // A Dataset defines how the model data is mapped to the chart 
			var oDataset = new sap.viz.ui5.data.FlattenedDataset({

				// a Bar Chart requires exactly one dimension (x-axis) 
				dimensions : [ 
					{
						axis : 1, // must be one for the x-axis, 2 for y-axis
						name : 'training', 
						value : "{training}"
					} 
				],

				// it can show multiple measures, each results in a new set of bars in a new color 
				measures : [ 
				    // measure 1
					{
						name : 'count', // 'name' is used as label in the Legend 
						value : '{count}' // 'value' defines the binding for the displayed value   
					}
				
				],
				
				// 'data' is used to bind the whole data collection that is to be displayed in the chart 
				data : {
					path : "/trainingTaken"
				}
				
			});

		    // create a Bar chart
		    // you also might use Combination, Line, StackedColumn100, StackedColumn or Column
		    // for Donut and Pie please remove one of the two measures in the above Dataset.  
			var oBarChart = new sap.viz.ui5.Bar({
				width : "80%",
				height : "400px",
				plotArea : {
				//'colorPalette' : d3.scale.category20().range()
				},
				title : {
					visible : true,
					text : 'Trainings Completed '
				},
				dataset : oDataset
			});

		
			oBarChart.setModel(oModel);
			this.byId("panel3Kpi").addContent(oBarChart);

		  
		
	},
	
	getDataIF:function getDataIF(myJSON) {
		

		
		
		 var s1 = myJSON[0].count;
		 var collection1 = [] ;
		 var collection2 = [] ;
		 
		 for (var i = 0; i <= s1 ; i++)
			 {
			 collection1[i] = myJSON[i].Status;
			 collection2[i] = myJSON[i].count;
			
			 };
			 
			 var recSet = [];
		 
			 for (i = 1 ; i <= s1 ; i++)
			 {
				 recSet.push(createEntryIF1(collection1[i],collection2[i]));
			 
			 
			 };
		 	
			
		
			
			 var oModel = new sap.ui.model.json.JSONModel(createEntryIF2(recSet));	

		    // A Dataset defines how the model data is mapped to the chart 
			var oDataset = new sap.viz.ui5.data.FlattenedDataset({

				// a Bar Chart requires exactly one dimension (x-axis) 
				dimensions : [ 
					{
						axis : 1, // must be one for the x-axis, 2 for y-axis
						name : 'Status', 
						value : "{Status}"
					} 
		
				],

				// it can show multiple measures, each results in a new set of bars in a new color 
				measures : [ 
				    // measure 1
					{
						
						name : 'count', // 'name' is used as label in the Legend 
						value : '{count}' // 'value' defines the binding for the displayed value   
					}
		
				],
				
				// 'data' is used to bind the whole data collection that is to be displayed in the chart 
				data : {
					path : "/statusOverview"
				}
				
			});

				// create a stacked column chart
			    // you also might use Combination, Line, StackedColumn100, StackedColumn or Column
			    // for Donut and Pie please remove one of the two measures in the above Dataset.  
				
			var oBarChart = new sap.viz.ui5.Bar({
				width : "80%",
				height : "400px",
				plotArea : {
				//'colorPalette' : d3.scale.category20().range()
				},
				title : {
					visible : true,
					text : 'Intern Fulltime employee distribution '
				},
				dataset : oDataset
			});

			
			oBarChart.setModel(oModel);
				this.byId("panel4Kpi").addContent(oBarChart);

		
	}

});


function createEntrySD1(c1,c2){
	
	return {
		"Skill" :  c1,
		"ID" :  c2
		
		  };
}

function createEntrySD2(recSet){
	
	return {
		"skillOverview" :  recSet
			
		  };
}


function createEntryCT1(c1,c2){
	
	return {
		"collegeName" :  c1,
		"count" :  c2
		
		  };
}

function createEntryCT2(recSet){
	
	return {
		"courseTaken" :  recSet
			
		  };
}

function createEntryTT1(c1,c2){
	
	return {
		"training" :  c1,
		"count" :  c2
		
		  };
}

function createEntryTT2(recSet){
	
	return {
		"trainingTaken" :  recSet
			
		  };
}

function createEntryIF1(c1,c2){
	
	return {
		"Status" :  c1,
		"count" :  c2
		
		  };
}

function createEntryIF2(recSet){
	
	return {
		"statusOverview" :  recSet
			
		  };
}

function onLoadFilter(myJSON){
	  var oSearchControl = sap.ui.getCore().byId("filterBy");
	  var aSuggestions = [];
	  var aData = [];
		
		var oFTVIssue = new sap.ui.commons.FormattedTextView();
		var oFTVRootCause = new sap.ui.commons.FormattedTextView();
		
		
		var NumbRecords = myJSON.length -1; // - 2 because the terms are the last one
		
		var LastRecord = myJSON.length-1;
		var terms = myJSON[LastRecord].terms;
		var sugi = 0;	  
	  for( var i = 0; i<NumbRecords; i++)	
		{
		  var textwrappedname = myJSON[i].name;
    	  var textwrappediNumber = myJSON[i].iNumber;
    	        	  
    	  
    	//initial check if the term seached is in the text
	       var termsLUC = new RegExp(terms , "gi" );	//for lower and upper case
	       
	      	             
	    // for SPSHANA
	       var n = textwrappedname.match(termsLUC);
	      
	       if ( n != null){
	    	   
	    	//make the text searched highlighted
	       
	       var texthighlightedname = textwrappedname;//termHighlight(textwrappedSPSHANA, terms);
	       
	       var sugrow = myJSON[i].name + ' : ' + "|" + ' ' + "name";
	       var a = aSuggestions.indexOf(sugrow);
	       	if (a == -1){
	       		aSuggestions[sugi] = sugrow
	       		sugi ++;
	       		}
	       }
	       else
	    	   {
	    	   
	    	   var texthighlightedname = textwrappedname;
	    	   }
	       
	       // for SPSHANAFix
	       var n = textwrappediNumber.match(termsLUC);
	      
	       if ( n != null){
	    	   
	    	   	       //make the text searched highlighted
	       var texthighlightediNumber = textwrappediNumber; 
	       
	       var sugrow = myJSON[i].iNumber + ' : ' + "|" + ' ' + "iNumber";
	       var a = aSuggestions.indexOf(sugrow);
	       	if (a == -1){
	       		aSuggestions[sugi] = sugrow
	       		sugi ++;
	       		}
	       
	       }
	       else
	    	   {
	    	   
	    	   var texthighlightediNumber = textwrappediNumber;
	    	   }
	       
	       oFTVIssue.setHtmlText(texthighlightedname);
	       oFTVRootCause.setHtmlText(texthighlightediNumber);
	       
	       aData[i] = { name: oFTVIssue.getHtmlText(), iNumber: oFTVRootCause.getHtmlText()};
		}
	  
	  oSearchControl.suggest(gSearchParam, aSuggestions);//Set the found suggestions on the search control
	  
	 //populate the table
	  
	  var oTable= sap.ui.getCore().byId("employeeDataTable");
	  
	 
	 //Create a model and bind the table rows to this model
	 
	  var oModel = new sap.ui.model.json.JSONModel();
	  
	  oModel.setData({id: aData});
	  oTable.setModel(oModel);
	  oTable.bindRows("/id");
	  
	  //Set the Number of Rows in table header and clear the table lead selection
	  
	  	var iNumberOfRows = oTable.getBinding("rows").iLength;
	  	oTable.setTitle("numberOfFindings"[numericSimpleFormatter(iNumberOfRows)]);    
	  	oTable.clearSelection(); 
	}


function onErrorCall(jqXHR, textStatus, errorThrown){
	 sap.ui.commons.MessageBox.show(jqXHR.responseText, 
			 "ERROR",
			 oBundle.getText("error_action") );	
	return;
}


