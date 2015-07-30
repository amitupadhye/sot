

try{
	
	
var employee = $.request.parameters.get('employee');//1
var feedbackprovider = $.request.parameters.get('feedbackprovider');//2
var fbr = $.request.parameters.get('fbr');//3
var status = "N";



var output = {};  
output.data = [];  

// get primary key sequence

var connSeq = $.db.getConnection("sot.Services::anonuser");
var stSeq = connSeq.prepareStatement("select \"sot_schema\".\"sot.Data::genFeedbackreq\".nextval from dummy");
var seqVal = stSeq.executeQuery();
if (!seqVal.next()) {
	$.response.setBody("Failed to generate auto-number for Primary Key.");
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
} else {
	var feedbackID = seqVal.getString(1);
}
connSeq.close();


var conn = $.db.getConnection("sot.Services::anonuser");  
  
var st = conn.prepareStatement("insert into \"sot_schema\".\"sot.Data::requestFeedback\" values (?,?,?,?,?)");  

st.setString(1,feedbackID);
st.setString(2,employee);
st.setString(3,feedbackprovider);
st.setString(4,fbr);
st.setString(5,status);




st.execute();  
conn.commit();  


var record = [];  
record.push(employee);  
record.push(feedbackprovider);  
output.data.push(record);  
conn.close();  
$.response.contentType = "text/json";  
$.response.setBody(JSON.stringify(output));  

}
catch(e){
	
	$.response.setBody('Error is' + e);
	
}
