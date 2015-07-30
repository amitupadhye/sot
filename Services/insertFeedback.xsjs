

try{
	
	
var feedback1Rating = $.request.parameters.get('Feedback1Rating');//1
var feedback2Rating = $.request.parameters.get('Feedback2Rating');//2
var feedback3Rating = $.request.parameters.get('Feedback3Rating');//3
var feedback4Rating = $.request.parameters.get('Feedback4Rating');//4
var feedback5Rating = $.request.parameters.get('Feedback5Rating');//5
var feedback6Rating = $.request.parameters.get('Feedback6Rating');//6
var feedback7Rating = $.request.parameters.get('Feedback7Rating');//7
var feedback8Rating = $.request.parameters.get('Feedback8Rating');//8
var feedbackRemark =  $.request.parameters.get('FeedbackRemark');//remarks
var feedbackinternID = $.request.parameters.get('FeedbackinternID');//internID
var feedbackcoachID =  $.request.parameters.get('FeedbackcoachID');//coachID
var feedbackdateStamp = $.request.parameters.get('feedbackDateStamp');//datestampID
var internTask = $.request.parameters.get('internTask');//internTask


var output = {};  
output.data = [];  

// get primary key sequence

var connSeq = $.db.getConnection("sot.Services::anonuser");
var stSeq = connSeq.prepareStatement("select \"sot_schema\".\"sot.Data::addFeedbackSeq\".nextval from dummy");
var seqVal = stSeq.executeQuery();
if (!seqVal.next()) {
	$.response.setBody("Failed to generate auto-number for Primary Key.");
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
} else {
	var feedbackID = seqVal.getString(1);
}
connSeq.close();


var conn = $.db.getConnection("sot.Services::anonuser");  
  
var st = conn.prepareStatement("insert into \"sot_schema\".\"sot.Data::employeeFeedback\" values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)");  

st.setString(1,feedbackID);
st.setString(2,feedbackinternID);
st.setString(3,feedbackcoachID);
st.setString(4,feedbackdateStamp);
st.setString(5,internTask);
st.setString(6,feedback1Rating);
st.setString(7,feedback2Rating);
st.setString(8,feedback3Rating);
st.setString(9,feedback4Rating);
st.setString(10,feedback5Rating);
st.setString(11,feedback6Rating);
st.setString(12,feedback7Rating);
st.setString(13,feedback8Rating);
st.setString(14,feedbackRemark);



st.execute();  
conn.commit();  


var record = [];  
record.push(feedbackcoachID);  
record.push(feedbackinternID);  
output.data.push(record);  
conn.close();  
$.response.contentType = "text/json";  
$.response.setBody(JSON.stringify(output));  

}
catch(e){
	
	$.response.setBody('Error is' + e);
	
}
