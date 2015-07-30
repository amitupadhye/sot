

function createFilterEntry(rs,obj) {
		return {
			"rating1" : rs.getNString(1),
			"rating2" : rs.getNString(2),
			"rating3" : rs.getNString(3),
			"rating4" : rs.getNString(4),
			"rating5" : rs.getNString(5),
			"rating6" : rs.getNString(6),
			"rating7" : rs.getNString(7),
			"rating8" : rs.getNString(8),
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

var query ="select avg(\"Feedback1Rating\"),avg(\"Feedback2Rating\"),avg(\"Feedback3Rating\"),avg(\"Feedback4Rating\"),avg(\"Feedback5Rating\"),avg(\"Feedback6Rating\"),avg(\"Feedback7Rating\"),avg(\"Feedback8Rating\")"+
			"from \"sot_schema\".\"sot.Data::employeeFeedback\" where \"iNumber\" = ? ";


pstmt = conn.prepareStatement(query);

pstmt.setString(1,iNumber);

rs = pstmt.executeQuery();

while (rs.next()){
	
	list.push(createFilterEntry(rs,"object"));

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