

function createFilterEntry(rs,obj) {
		return {
			"link" : rs.getNString(1),

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

var query ="select \"link\" from \"sot_schema\".\"sot.Data::links\" where \"iNumber\" = ? ";


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