sap.ui.controller("sot.Maintenance", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf sot.Maintenance
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf sot.Maintenance
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf sot.Maintenance
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf sot.Maintenance
*/
//	onExit: function() {
//
//	}

	insertRecord:function(iNumber,empName,empSex,extEmail,priLang,secLang,empStatus,stDate,endDate,mentorName,groupMonth,groupNum,trStDate,callback){

		/*var returnCode = true;*/
			var aUrl = '/../sot/Services/createIntern.xsjs?iNumber='
				
					+ encodeURIComponent(iNumber)
					+ '&name='
					+ encodeURIComponent(empName)
					+ '&sex='
					+ encodeURIComponent(empSex)
					+ '&email='
					+ encodeURIComponent(extEmail)
					+ '&lang1='
					+ encodeURIComponent(priLang)
					+ '&lang2='
					+ encodeURIComponent(secLang)
					+ '&status='
					+ encodeURIComponent(empStatus)
					+ '&start='
					+ encodeURIComponent(stDate)
					+ '&end='
					+ encodeURIComponent(endDate)
					+ '&mentor='
					+ encodeURIComponent(mentorName)
					+ '&grMonth='
					+ encodeURIComponent(groupMonth)
					+ '&grNum='
					+ encodeURIComponent(groupNum)
					+ '&trStDate='
					+ encodeURIComponent(trStDate);
			
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
			});
	},
	
insertFBR:function insertFBR(fbR,fbG,id,fbGemail,fbRName){
		
		var aUrl = '/../sot/Services/createFeedbackReq.xsjs?employee='
			
			+ encodeURIComponent(fbR)
			+ '&feedbackprovider='
			+ encodeURIComponent(fbG)
			+ '&fbr='
			+ encodeURIComponent(id);
		
		console.log(aUrl);		
		
		$.ajax({
			url : aUrl,
			type : 'GET',
			dataType : 'json',
			success: function(myJSON){
			
			var link = 'mailto:' + fbGemail + '?cc=anita.rogers@sap.com&subject=Feedback requested(' + fbRName + ') '+
			'&body= Hi,'+'                                                                                                                                         '+
			' Please provide feedback about '+ fbRName + ". " + 'Your feedback request number is'+ " " + id + " ." +
			' Please make a comment on each of the categories in the remarks field. This feedback will be used to judge if the intern was successful in their internship.'+
			'We request you to respond to this feedback form today  as we are planning to review the feedbacks today. '+
			'Please use following link to access the feedback form http://dewdfglp00799.wdf.sap.corp:8001/sot/WebContent/sot_feedback.html' +
			'  (Use google Chrome or Firefox to open the link).' ;
			
			window.location.href = link;
				
				},
		});
},

sendEmail:function sendEmail(){
	
	console.log('sending email using mandril ')
	
/*	$.ajax({
		
		type: 'POST',
		url: 'https://mandrillapp.com/api/1.0/messages/send.json',
		data: {
		    key: 'lIHnxJYaVISbX9nh9EBROQ',
		    message: {
		      from_email: 'amit.upadhye@gmail.com',
		      to: [
		          {
		            email: 'amit.upadhye@sap.com',
		            name: 'Amit',
		            type: 'to'
		          }
		          ],
		          autotext: 'true',
		          subject: 'sample email using the mandrill',
		          html: 'trying out the sample email'
		        }
		      }
		     }).done(function(response) {
		       console.log(response); // if you're into that sorta thing
	});
	

*/
	
}
	
});