function createFilterEntry(rs,obj) {
		return {
			"courseTaken"    : rs.getNString(1),
			"collegeName"    : rs.getNString(2),
			"collegeWebsite" :  rs.getNString(3)
			
			  };
	}	
function createFilterEntry2(rs,obj) {
	return {
		"count" : rs.getNString(1),
		   };
}	

var iNumber = $.request.parameters.get('iNumber');//1

var conn = $.db.getConnection("sot.Services::anonuser");
var pstmt;
var rs;
var query;
var list = [];
var body = '';

try{
	
var query2 = "select count( \"courseTaken\") from \"sot_schema\".\"sot.Data::coursesTaken\" where \"iNumber\" = ?";

pstmt = conn.prepareStatement(query2);

pstmt.setString(1, iNumber);

rs = pstmt.executeQuery();

while (rs.next()){
	
	list.push(createFilterEntry2(rs,"Obj"));

	}	

var query = "select \"courseTaken\",\"collegeName\",\"collegeWebsite\" from \"sot_schema\".\"sot.Data::coursesTaken\" where \"iNumber\" = ?";

pstmt = conn.prepareStatement(query);

pstmt.setString(1, iNumber);

rs = pstmt.executeQuery();

while (rs.next()){
	
	list.push(createFilterEntry(rs,"Obj"));

	}


rs.close();
pstmt.close();
conn.close();





body = JSON.stringify(list);
$.trace.debug(body);
$.response.contentType = 'application/json';
$.response.setBody(body);
$.response.headers.set('access-control-allow-origin', '*');
$.response.status = $.net.http.OK;

}
catch(e){
	
	
	$.response.setBody('Error is = '+ e );
	
}