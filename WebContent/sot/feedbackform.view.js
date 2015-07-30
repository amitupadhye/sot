sap.ui.jsview("sot.feedbackform", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf sot.feedbackform
	*/ 
	getControllerName : function() {
		return "sot.feedbackform";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf sot.feedbackform
	*/ 
	createContent : function(oController) {
		

		
	// get other values to be inserted into the URL
		
		var lv_internID ;
		var lv_coachID ;
		var lv_interntask;
		var lv_rate1;
		var lv_rate2;
		var lv_rate3;
		var lv_rate4;
		var lv_rate5;
		var lv_rate6;
		var lv_rate7;
		var lv_rate8;
		var lv_remark;
		var lv_internID;
		var lv_coachID;
		var sta;
		var emp;
		var feedback;
		var uCode;
		
	
		
		// create a matrix to use as a UI place holder for the feedback form
		var oMatrix = new sap.ui.commons.layout.MatrixLayout({
			id : 'matrixFeedback',
			layoutFixed : true,
			width : '100%',
			columns : 3,
			widths : ['15%', '70%', '15%'] });
		
		var oMatrixPanelFf = new sap.ui.commons.layout.MatrixLayout({
			width : '75%',
			columns : 3,
			widths : ['20%', '40%', '40%']
		 });
		
		var oMatrixPanelR = new sap.ui.commons.layout.MatrixLayout({
			width : '75%',
			columns : 4,
			widths : ['20%', '40%','30%','10%']
			
			 });


		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });

		var oPanelFf = new sap.ui.commons.Panel({width : '100%',showCollapseIcon : false});
		oPanelFf.setTitle(new sap.ui.core.Title({text: "Feedback Form"}));
		
		oPanelFf.addContent(oMatrixPanelFf);
		oMatrix.createRow(oCell,oPanelFf);
		
		
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		
		var oPanelR = new sap.ui.commons.Panel({width : '100%',showCollapseIcon : false});
		oPanelR.setTitle(new sap.ui.core.Title({text: "Provide your ratings"}));
		
		
		oPanelR.addContent(oMatrixPanelR);
		oMatrix.createRow(oCell,oPanelR);
		
// create Input field to input the FeedbackCode
		
	oLabel = new sap.ui.commons.Label({
	id : 'L-FeedbackCode',
	text : 'FeedbackCode:',
	design: sap.ui.commons.LabelDesign.Bold});	
	
var oInputFeedbackCode = new sap.ui.commons.TextField({
	id: 'ipFeedbackCode',
	value : '',
	tooltip : 'Enter the feedback code from the email',
	width : '75%',
	change : function(){
		
		var aUrl = '../Services/feedbackFormconfirm.xsjs?ucode='+escape(oInputFeedbackCode.getValue());
	    jQuery.ajax({
	       url: aUrl,
	       method: 'GET',
	       dataType: 'json',
	       success: function(myJSON){
	    	
	 
	    	   
	    	   var cnt =  myJSON[0].count;
			   if (cnt!=0)
			   {
			   sta =       myJSON[1].status;
	 		   emp =       myJSON[1].employee;
	 		   feedback =  myJSON[1].feedbackProvider;
	 		   var n;
	 		   var fg;
	 		   
			 		   if (cnt!=0 && sta == 'N' )
		 			   {
		
			 				var aUrl = '../Services/getUname.xsjs?iNumber='+escape(emp);
			 			    jQuery.ajax({
			 			       url: aUrl,
			 			       method: 'GET',
			 			       dataType: 'json',
			 			       success: function(myJSON){
			 			    		n = myJSON[0].empname;
			 			    		
			 			    		oController.setname(n);
			 			       }
			 			       });
			 				
			 			    var aUrl = '../Services/getUname.xsjs?iNumber='+escape(feedback);
			 			    jQuery.ajax({
			 			       url: aUrl,
			 			       method: 'GET',
			 			       dataType: 'json',
			 			       success:function(myJSON){
			 			    		fg = myJSON[0].empname;
			 			    		
			 			    		oController.setfbprovider(fg);
			 			    		
			 			       }
			 			       });
					  
			 	
			 			   
			 			
			 				
			 			   
			 			    
		 			   }
			 		   else 
		 			   {
			 			   sap.ui.commons.MessageBox.alert("Feedback was already provided for this FBR Number");
		 			   };
 		   
			   }
			   else 
 			   {
 			  sap.ui.commons.MessageBox.alert("Please enter correct FBR Number");
 			   };
	    	   
	       },
	       error:function(){
	    	   
	    	   sap.ui.commons.MessageBox.alert("Please enter correct FBR Number");
	       }

	       });

	}
});

var oCellD = new sap.ui.commons.layout.MatrixLayoutCell({ });
oMatrixPanelFf.createRow(oCellD,oLabel,oInputFeedbackCode);

//Mentor name who is providing the feedback
		
		oLabel = new sap.ui.commons.Label({
			id : 'L-MentorName',
			text : 'Coach Name:',
			design: sap.ui.commons.LabelDesign.Bold});
		
	
		var oTFm = new sap.ui.commons.TextField({
			id : this.createId("TF-MentorName"),
			editable : false,
			value : '  ',
			width : '200px' });
				
		var oCellD = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixPanelFf.createRow(oCellD,oLabel,oTFm);
		
// Intern name for which the feedback is provided 
		
		oLabel = new sap.ui.commons.Label({
			id : 'L-InternName',
			text : 'Intern Name',
			design: sap.ui.commons.LabelDesign.Bold
			});
		
		
		var oTFi = new sap.ui.commons.TextField({
			id : this.createId("TF-InternName"),		
			editable : false,
			value : '',
			width : '200px' });
				
		var oCellD = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixPanelFf.createRow(oCellD,oLabel,oTFi);
		
//Task for which the feedback is provided 
		
		oLabel = new sap.ui.commons.Label({
			id : 'L-InternTask',
			text : 'Intern Task',
			design: sap.ui.commons.LabelDesign.Bold
			});
		

		oTAI = new sap.ui.commons.TextArea({
			id : this.createId("TA-InternTask"),
			tooltip : 'InternTask',
			editable : true,
			wrapping : sap.ui.core.Wrapping.Off,
			width : '75%',
			height : '40px'
			});
	
		
		var oCellD = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixPanelFf.createRow(oCellD,oLabel,oTAI);
	       
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
		oMatrixPanelR.createRow(oCell);
		//Just adding empty rows
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixPanelR.createRow(oCell);
		//adding the titles
		var oCellD = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixPanelR.createRow(oCellD,oTV, oTV2);
		//Just adding empty rows	
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({colSpan:3 });
		oCell.addContent(new sap.ui.commons.HorizontalDivider());
		var oCell1 = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixPanelR.createRow(oCell1,oCell);
		//Just adding empty rows
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixPanelR.createRow(oCell);
		

		
// Technical knowledge rating
		oLabel = new sap.ui.commons.Label({
			id : 'L-Tech',
			text : '1. Technical Knowledge',
			design: sap.ui.commons.LabelDesign.Bold});
			//Create a RatingIndicator instance with 5 "stars" and visualization mode "Continuous"
	
		var oRating1 = new sap.ui.commons.RatingIndicator("techKnowledge", {
			maxValue: 10,
			visualMode: sap.ui.commons.RatingIndicatorVisualMode.Continuous
		});
		
		//Create a label to display rating given
		
		oLabelrating1 = new sap.ui.commons.Label({
			id : 'rating1Lb',
			design: sap.ui.commons.LabelDesign.Bold});
		
		//React on change
		oRating1.attachChange(function(){
			var val = oRating1.getValue();
			// oRating.setEditable(false); // Use this if only one vote is allowed
			oLabelrating1.setText( val+" / 10" );
			//setRatingValue();
		});
		
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });		
	
		oMatrixPanelR.createRow(oCell,oLabel,oRating1,oLabelrating1);
		
		//Just adding empty rows	
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixPanelR.createRow(oCell);
		
		//Just adding empty rows
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixPanelR.createRow(oCell);
		
// Problem solving and Decision making 
		oLabel = new sap.ui.commons.Label({
			id : 'L-Prob',
			text : '2. Problem Solving & Decision Making',
			design: sap.ui.commons.LabelDesign.Bold});
		

		var oRating2 = new sap.ui.commons.RatingIndicator("probSol", {
			maxValue: 10,
			visualMode: sap.ui.commons.RatingIndicatorVisualMode.Continuous
		});
		//Create a label to display rating given
		
		oLabelrating2 = new sap.ui.commons.Label({
		id : 'rating2Lb',
		design: sap.ui.commons.LabelDesign.Bold});
		
		//React on change
		oRating2.attachChange(function(){
		var val = oRating2.getValue();
		// oRating.setEditable(false); // Use this if only one vote is allowed
		oLabelrating2.setText( val+" / 10" );
		//setRatingValue();
		});
		
		
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixPanelR.createRow(oCell,oLabel,oRating2,oLabelrating2);
		
		//Just adding empty rows	
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixPanelR.createRow(oCell);
		//Just adding empty rows
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixPanelR.createRow(oCell);
	
	
		
// Planning & Organisation rating
		oLabel = new sap.ui.commons.Label({
		id : 'L-Plan',
		text : '3. Planning & Organization',
		design: sap.ui.commons.LabelDesign.Bold});
		
		var oRating3 = new sap.ui.commons.RatingIndicator("planOrg", {
		maxValue: 10,
		visualMode: sap.ui.commons.RatingIndicatorVisualMode.Continuous
		});
	
		//Create a label to display rating given
		
		oLabelrating3 = new sap.ui.commons.Label({
		id : 'rating3Lb',
		design: sap.ui.commons.LabelDesign.Bold});
		
		//React on change
		oRating3.attachChange(function(){
		var val = oRating3.getValue();
		// oRating.setEditable(false); // Use this if only one vote is allowed
		oLabelrating3.setText( val+" / 10" );
		//setRatingValue();
		});
		
		var oCellD = new sap.ui.commons.layout.MatrixLayoutCell({ });	
		oMatrixPanelR.createRow(oCellD,oLabel,oRating3,oLabelrating3);
		//Just adding empty rows
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixPanelR.createRow(oCell);
		//Just adding empty rows
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixPanelR.createRow(oCell);
				
// Verbal & Written rating
		oLabel = new sap.ui.commons.Label({
			id : 'L-Comm',
			text : '4. Communication - Verbal & Written',
			design: sap.ui.commons.LabelDesign.Bold});
		
		var oRating4 = new sap.ui.commons.RatingIndicator("verbWri", {
			maxValue: 10,
			visualMode: sap.ui.commons.RatingIndicatorVisualMode.Continuous
			});
		
		//Create a label to display rating given
		
		oLabelrating4 = new sap.ui.commons.Label({
		id : 'ratin4Lb',
		design: sap.ui.commons.LabelDesign.Bold});
		
		//React on change
		oRating4.attachChange(function(){
		var val = oRating4.getValue();
		// oRating.setEditable(false); // Use this if only one vote is allowed
		oLabelrating4.setText( val+" / 10" );
		//setRatingValue();
		});	
		
			var oCellD = new sap.ui.commons.layout.MatrixLayoutCell({ });
			oMatrixPanelR.createRow(oCellD,oLabel,oRating4,oLabelrating4);
			//Just adding empty rows
			var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
			oMatrixPanelR.createRow(oCell);
			//Just adding empty rows
			var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
			oMatrixPanelR.createRow(oCell);
			
// Interpersonal Skills / Team work Rating
		oLabel = new sap.ui.commons.Label({
			id : 'L-Team',
			text : '5. Interpersonal Skills / Teamwork',
			design: sap.ui.commons.LabelDesign.Bold });
		
		var oRating5 = new sap.ui.commons.RatingIndicator("intTeam", {
			maxValue: 10,
			visualMode: sap.ui.commons.RatingIndicatorVisualMode.Continuous
			});
		
		//Create a label to display rating given
		
		oLabelrating5 = new sap.ui.commons.Label({
		id : 'rating5Lb',
		design: sap.ui.commons.LabelDesign.Bold});
		
		//React on change
		oRating5.attachChange(function(){
		var val = oRating5.getValue();
		// oRating.setEditable(false); // Use this if only one vote is allowed
		oLabelrating5.setText( val+" / 10" );
		//setRatingValue();
		});
		
		var oCellD = new sap.ui.commons.layout.MatrixLayoutCell({ });
			oMatrixPanelR.createRow(oCellD,oLabel,oRating5,oLabelrating5);
			//Just adding empty rows
			var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
			oMatrixPanelR.createRow(oCell);
			//Just adding empty rows
			var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
			oMatrixPanelR.createRow(oCell);
		
		
// Adherence to Company Policy / Safety rating
		oLabel = new sap.ui.commons.Label({
			id : 'L-Safe',
			text : '6. Adherence to Company Policy / Safety', 
			design: sap.ui.commons.LabelDesign.Bold	});
		
		var oRating6 = new sap.ui.commons.RatingIndicator("polSaf", {
			maxValue: 10,
			visualMode: sap.ui.commons.RatingIndicatorVisualMode.Continuous
			});
		
		//Create a label to display rating given
		
		oLabelrating6 = new sap.ui.commons.Label({
		id : 'rating6Lb',
		design: sap.ui.commons.LabelDesign.Bold});
		
		//React on change
		oRating6.attachChange(function(){
		var val = oRating6.getValue();
		// oRating.setEditable(false); // Use this if only one vote is allowed
		oLabelrating6.setText( val+" / 10" );
		//setRatingValue();
		});
		
		var oCellD = new sap.ui.commons.layout.MatrixLayoutCell({ });
			oMatrixPanelR.createRow(oCellD,oLabel,oRating6,oLabelrating6);
			//Just adding empty rows
			var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
			oMatrixPanelR.createRow(oCell);
			//Just adding empty rows
			var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
			oMatrixPanelR.createRow(oCell);
		
		
		
// Initiative rating
		    oLabel = new sap.ui.commons.Label({
			id : 'L-INIT',
			text : '7. Initiative',
			design: sap.ui.commons.LabelDesign.Bold	});
		
		    var oRating7 = new sap.ui.commons.RatingIndicator("initiative", {
			maxValue: 10,
			visualMode: sap.ui.commons.RatingIndicatorVisualMode.Continuous
			});
		
			//Create a label to display rating given
			
			oLabelrating7 = new sap.ui.commons.Label({
			id : 'rating7Lb',
			design: sap.ui.commons.LabelDesign.Bold});
			
			//React on change
			oRating7.attachChange(function(){
			var val = oRating7.getValue();
			// oRating.setEditable(false); // Use this if only one vote is allowed
			oLabelrating7.setText( val+" / 10" );
			//setRatingValue();
			});
			
		    var oCellD = new sap.ui.commons.layout.MatrixLayoutCell({ });
			oMatrixPanelR.createRow(oCellD,oLabel,oRating7,oLabelrating7);
			//Just adding empty rows
			var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
			oMatrixPanelR.createRow(oCell);
			//Just adding empty rows
			var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
			oMatrixPanelR.createRow(oCell);
			
// enthusiasm rating
		    oLabel = new sap.ui.commons.Label({
			id : 'L-ENTHU',
			text : '8. Enthusiasm',
			design: sap.ui.commons.LabelDesign.Bold	});
		
		    var oRating8 = new sap.ui.commons.RatingIndicator("enthusiasm", {
			maxValue: 10,
			visualMode: sap.ui.commons.RatingIndicatorVisualMode.Continuous
			});
		
			//Create a label to display rating given
			
			oLabelrating8 = new sap.ui.commons.Label({
			id : 'rating8Lb',
			design: sap.ui.commons.LabelDesign.Bold});
			
			//React on change
			oRating8.attachChange(function(){
			var val = oRating8.getValue();
			// oRating.setEditable(false); // Use this if only one vote is allowed
			oLabelrating8.setText( val+" / 10" );
			//setRatingValue();
			});
			
		    var oCellD = new sap.ui.commons.layout.MatrixLayoutCell({ });
			oMatrixPanelR.createRow(oCellD,oLabel,oRating8,oLabelrating8);
			//Just adding empty rows
			var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
			oMatrixPanelR.createRow(oCell);
			//Just adding empty rows
			var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
			oMatrixPanelR.createRow(oCell);
			
// Final remarks about the rating 	
		
		    oLabel = new sap.ui.commons.Label({
			id : 'L-remarks',
			text : 'Remarks',
			design: sap.ui.commons.LabelDesign.Bold	});
		
		   	oTA = new sap.ui.commons.TextArea({
				id : this.createId("TA-remarks"),
				tooltip : 'Remarks',
				editable : true,
				wrapping : sap.ui.core.Wrapping.Off,
				width : '100%',
				height : '100px'
				});
		
			
		   	var oCellD = new sap.ui.commons.layout.MatrixLayoutCell({ });
		   	oMatrixPanelR.createRow(oCellD,oLabel,oTA);
	
			//Just adding empty rows
			var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
			oMatrixPanelR.createRow(oCell);
	
			//Just adding empty rows
			var oCell = new sap.ui.commons.layout.MatrixLayoutCell({colSpan:3 });
			var oCell1 = new sap.ui.commons.layout.MatrixLayoutCell({ });
			oCell.addContent(new sap.ui.commons.HorizontalDivider());
			oMatrixPanelR.createRow(oCell1,oCell);
			
			
			
		var oButton = new sap.ui.commons.Button({
			id : 'B-Save',
			text : 'Submit',
			enabled: true,
			widrh: '100%',
			press : function(){
				
				// get other values to be inserted into the URL
			
				lv_rate1 = oRating1.getValue();
				lv_rate2 = oRating2.getValue();
				lv_rate3 = oRating3.getValue();
				lv_rate4 = oRating4.getValue();
				lv_rate5 = oRating5.getValue();
				lv_rate6 = oRating6.getValue();
				lv_rate7 = oRating7.getValue();
				lv_rate8 = oRating8.getValue();
				lv_interntask = oTAI.getValue();
				lv_remark = oTA.getValue();
				lv_internID = emp;
				lv_coachID = feedback;
				uCode = oInputFeedbackCode.getValue();
			
				if(lv_interntask == "" || lv_remark == "" || lv_rate1 == "" || lv_rate2 == ""|| lv_rate3 == ""|| lv_rate4 == ""|| lv_rate5 == ""|| lv_rate6 == ""|| lv_rate7 == ""|| lv_rate8 == ""|| uCode == "")
				
				{
				
				sap.ui.commons.MessageBox.alert("All the fields are mandatory!","Plsease complete the form");
				}
				else{
								
				sap.ui.commons.MessageBox.confirm("Do you want to submit the feedback?", fnCallbackConfirm, "Confirm");
						
			
				}
				
				
			}
		});
		
		function fnCallbackConfirm(bResult) {
		
		
			if (bResult){

				if(oController.insertRecord(lv_interntask,lv_rate1,lv_rate2,lv_rate3,lv_rate4,lv_rate5,lv_rate6,lv_rate7,lv_rate8,lv_remark,lv_internID,lv_coachID,uCode)){
				sap.ui.commons.MessageBox.alert("Feedback submitted successfully!",fnWindowClose,"Thank you!");
				
				}
				
				else
				{
				
				sap.ui.commons.MessageBox.alert("Something went wrong! Notify developer.",fnNotifyDev,"Oops.");
				
				}
				
				}
			
		};
		
		function fnWindowClose() {
			
			window.location.href = "about:home";
			
		};
		
		function fnNotifyDev(){
			
			window.open('mailto:amit.upadhye@sap.com?subject=Issue with submitting Feedbackform&body=Dear Developer,');
			window.location.href = "about:home";
		};
		
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
		var oBtCell = new sap.ui.commons.layout.MatrixLayoutCell(
				{
					hAlign : sap.ui.commons.layout.HAlign.Begin,
					vAlign : sap.ui.commons.layout.VAlign.Top,
					content : [ oButton ]
				});
		var oCellD = new sap.ui.commons.layout.MatrixLayoutCell({ });
		oMatrixPanelR.createRow(oCellD,oCell,oBtCell);

		
		
		return oMatrix;


	}

});
