function createFilterEntry(rs,obj) {
		return {
			"count"  :  rs.getNString(1),
						
			  };
	}	

function createFilterEntry2(rs,obj) {
	return {
		"status" : rs.getNString(1),
		"employee" : rs.getNString(2),
		"feedbackProvider" : rs.getNString(3),
		   };
}

var ucode = $.request.parameters.get('ucode');

var conn = $.db.getConnection("sot.Services::anonuser");
var pstmt;
var rs;
var query;
var list = [];
var body = '';

try{

	

var query ="select  count (\"uCode\") from \"sot_schema\".\"sot.Data::requestFeedback\" where \"uCode\" = ? ";

pstmt = conn.prepareStatement(query);

pstmt.setString(1, ucode);

rs = pstmt.executeQuery();

while (rs.next()){
	
	list.push(createFilterEntry(rs,"obj"));

	}

var query2 ="select  \"feedbackStatus\",\"employee\",\"feedbackProvider\" from \"sot_schema\".\"sot.Data::requestFeedback\" where \"uCode\" = ? ";

pstmt = conn.prepareStatement(query2);

pstmt.setString(1, ucode);

rs = pstmt.executeQuery();

while (rs.next()){
	
	list.push(createFilterEntry2(rs,"obj"));

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