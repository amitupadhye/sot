sap.ui.controller("sot.feedbackform", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf sot.feedbackform
*/
/*	onInit: function() {
		
	

	},
*/
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf sot.feedbackform
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf sot.feedbackform
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf sot.feedbackform
*/
//	onExit: function() {
//
//	}
	
insertRecord:function insertRecord(lv_interntask,lv_rate1,lv_rate2,lv_rate3,lv_rate4,lv_rate5,lv_rate6,lv_rate7,lv_rate8,lv_remark,lv_internID,lv_coachID,uCode)

{

		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1;
		var yyyy = today.getFullYear();

		if(dd<10) {
		    dd='0'+dd
		} 

		if(mm<10) {
		    mm='0'+mm
		} 

		lv_DateStamp = yyyy+'-'+mm+'-'+dd;
		
		
		
		var returnCode = true;
		
			var aUrl = '/../sot/Services/insertFeedback.xsjs?Feedback1Rating='
				
					+ encodeURIComponent(lv_rate1)
					+ '&Feedback2Rating='
					+ encodeURIComponent(lv_rate2)
					+ '&Feedback3Rating='
					+ encodeURIComponent(lv_rate3)
					+ '&Feedback4Rating='
					+ encodeURIComponent(lv_rate4)
					+ '&Feedback5Rating='
					+ encodeURIComponent(lv_rate5)
					+ '&Feedback6Rating='
					+ encodeURIComponent(lv_rate6)
					+ '&Feedback7Rating='
					+ encodeURIComponent(lv_rate7)
					+ '&Feedback8Rating='
					+ encodeURIComponent(lv_rate8)
					+ '&FeedbackRemark='
					+ encodeURIComponent(lv_remark)
					+ '&FeedbackinternID='
					+ encodeURIComponent(lv_internID)
					+ '&FeedbackcoachID='
					+ encodeURIComponent(lv_coachID)
					+ '&feedbackDateStamp='
					+ encodeURIComponent(lv_DateStamp)
					+ '&internTask='
					+ encodeURIComponent(lv_interntask);
					
		console.log(aUrl);

		console.log(uCode);
//Works just commented before the xsjs is finalised 
		$.ajax({
			
				url : aUrl,
				type : 'POST',
				dataType : 'text',
				
			success: function(){
				
				returnCode = true;
				
				var aUrl = '../Services/updateFeedbackReq.xsjs?uCode='+escape(uCode);
			    jQuery.ajax({
			       url: aUrl,
			       method: 'POST',
			       dataType: 'text',
			       success: function(){
			    	   
			    	   
			       }
			    });
			   
				
				
				},
			
			error: function(){returnCode = false;},
			
		       });
			
		
		return returnCode;
		
	},
		
		setname:function setname(n)
	
		{
			
			this.byId("TF-InternName").setValue(n);
	 
		},
		
		setfbprovider:function setfbprovider(fg)
		
		{
			 this.byId("TF-MentorName").setValue(fg);
		}

});


