function createFilterEntry(rs,obj) {
		return {
			"Skill" :  rs.getNString(1),
			"ID"    :  rs.getNString(2)
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
	
	var query2 = "select count(distinct \"skillID\") from\"sot_schema\".\"sot.Data::skillDistribution\"";
	pstmt = conn.prepareStatement(query2);

	rs = pstmt.executeQuery();

	while (rs.next()){
		
		list.push(createFilterEntry2(rs,"Obj"));

		}	

var query ="select \"skillID\", count(\"iNumber\") as ID from \"sot.Data::skillDistribution\" group by \"skillID\" ";

pstmt = conn.prepareStatement(query);

rs = pstmt.executeQuery();

while (rs.next()){
	
	list.push(createFilterEntry(rs,"skill","iNumber"));

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