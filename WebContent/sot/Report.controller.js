sap.ui.controller("sot.Report", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf sot.Report
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf sot.Report
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf sot.Report
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf sot.Report
*/
//	onExit: function() {
//
//	}

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


		
		}

});