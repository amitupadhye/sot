
try{
	
	
var uCode = $.request.parameters.get('uCode');//1

var output = {};  
output.data = [];  


var conn = $.db.getConnection("sot.Services::anonuser");  
  
var st = conn.prepareStatement("update \"sot_schema\".\"sot.Data::requestFeedback\" set \"feedbackStatus\" = 'Y' where \"uCode\" = ?");  

st.setString(1,uCode);

st.execute();  
conn.commit();  

  

}
catch(e){
	
	$.response.setBody('Error is' + e);
	
}
