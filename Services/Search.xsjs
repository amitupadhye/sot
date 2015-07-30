

function getFilter() {
	function createFilterEntry(rs,obj) {
		return {
			"name" : rs.getNString(1),
			"iNumber" : rs.getNString(2),
			
		};
	}
		
	var body = '';
	var terms = $.request.parameters.get('query');
	var termList = terms.split(" ");
	var searchedterm = terms;
	var termStr = "";
	var i;
	for (i = 0; i < termList.length; i++) {
		termStr += termList[i].replace(/\s+/g, '') + "* ";
	}
	terms = termStr;

	var conn = $.db.getConnection("sot.Services::anonuser");
	var pstmt;
	var rs;
	var query;
	var list = [];

	try
	{	
		
		query = "SELECT TOP 20 DISTINCT TO_NVARCHAR(\"name\"),TO_NVARCHAR(\"iNumber\") FROM \"sot_schema\".\"sot.Data::employeeDetails\" WHERE CONTAINS(\"name\",?) OR CONTAINS(\"iNumber\",?)";
		pstmt = conn.prepareStatement(query);
		pstmt.setString(1, terms);
		pstmt.setString(2, terms);
		
		rs = pstmt.executeQuery();

		while (rs.next()) {
			
			list.push(createFilterEntry(rs,"name", "iNumber"));
		}

		rs.close();
		pstmt.close();
		list.push({"terms" : searchedterm});

	
		conn.close();
		

	
	body = JSON.stringify(list);
	$.trace.debug(body);
	$.response.contentType = 'application/json';
	$.response.setBody(body);
	$.response.headers.set('access-control-allow-origin', '*');
	$.response.status = $.net.http.OK;
	
	} catch (e) {
		
		$.response.setBody('Error is = '+ e );
		return;
	}
}

var aCmd = $.request.parameters.get('cmd');
switch (aCmd) {

case "filter":
	getFilter();
	break;	

default:
	$.response.setBody('Error is = '+ e );
}
