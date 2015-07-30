function createFilterEntry(rs,obj) {
		return {
			"Status" :  rs.getNString(1),
			"count"    :  rs.getNString(2)
			  };
	}	
function createFilterEntry2(rs,obj) {
	return {
		"count" : rs.getNString(1),
		   };
}

var conn = $.db.getConnection("sot.Services::anonuser");
var pstmt;
var rs;
var query;
var list = [];
var body = '';

try{
	
	var query2 = "select count(distinct \"empStatus\") from \"sot_schema\".\"sot.Data::employeeDetails\"";
	pstmt = conn.prepareStatement(query2);

	rs = pstmt.executeQuery();

	while (rs.next()){
		
		list.push(createFilterEntry2(rs,"Obj"));

		}	

var query ="select \"empStatus\", count(\"iNumber\") from \"sot_schema\".\"sot.Data::employeeDetails\" group by \"empStatus\"";

pstmt = conn.prepareStatement(query);

rs = pstmt.executeQuery();

while (rs.next()){
	
	list.push(createFilterEntry(rs,"obj"));

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