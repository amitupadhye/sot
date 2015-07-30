function createFilterEntry(rs,obj) {
	return {
		"id" : rs.getNString(1),
	};
}

try {
	var iNumber = $.request.parameters.get('iNumber'); // 2
	
	// check to see if iNumber already exists in database
	var body = '';
	var list = [];
	
	var connINum = $.db.getConnection("sot.Services::anonuser");
	var stINum = connINum
			.prepareStatement("Select count(*) from \"sot_schema\".\"sot.Data::employeeDetails\" where \"iNumber\" = ?");
	stINum.setString(1, iNumber);
	var Val = stINum.executeQuery();
	var users;
	while (Val.next()) {
		users = Val.getString(1);
		list.push(createFilterEntry(Val, "object"));
	}
	Val.close();
	stINum.close();
	connINum.close();

	body = JSON.stringify(list);
    $.trace.debug(body);
    $.response.contentType = 'application/json';
    $.response.setBody(body);
    $.response.headers.set('access-control-allow-origin', '*');
    $.response.status = $.net.http.OK;
	
	
	if (users == 0) {
		// sequence select for the empID
		var connSeq = $.db.getConnection("sot.Services::anonuser");
		var stSeq = connSeq
				.prepareStatement("Select \"sot_schema\".\"newEmpDetails\".nextval from dummy");
		var seqVal = stSeq.executeQuery();
		if (!seqVal.next()) {
			$.response
					.setBody("Failed to generate auto-number for Primary Key.");
			$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		} else {
			var empID = seqVal.getString(1); // 1
		}
		connSeq.close();

		// timestamp
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth() + 1; // Jan is equal to 0, therefore +1 is
										// needed
		var yyyy = today.getFullYear();
		if (dd < 10) {
			dd = '0' + dd;
		}
		if (mm < 10) {
			mm = '0' + mm;
		}
		today = yyyy + '-' + mm + '-' + dd; // 3

		var empName = $.request.parameters.get('name'); // 4
		var empSex = $.request.parameters.get('sex'); // 7
		var extEmail = $.request.parameters.get('email'); // 9
		var priLang = $.request.parameters.get('lang1');
		var secLang = $.request.parameters.get('lang2');
		var empStatus = $.request.parameters.get('status');
		var stDate = $.request.parameters.get('start'); // 5
		var endDate = $.request.parameters.get('end'); // 6
		var mentorName = $.request.parameters.get('mentor'); // 12
		var groupMonth = $.request.parameters.get('grMonth');
		var groupNum = $.request.parameters.get('grNum');
		var trStDate = $.request.parameters.get('trStDate'); // 10

		var language; // 8
		var empStat; // 13
		var group; // 11

		// computing final fields to be inserted into database
		// language field
		if (secLang == "none") {
			language = priLang;
		} else {
			language = priLang + "_" + secLang;
		}
		// employment status field
		if (empStatus == "Intern") {
			empStat = "int";
		} else {
			empStat = "fte";
		}
		// intern/new hire group field
		group = "grp" + groupNum + groupMonth;

		var list = [];

		var conn = $.db.getConnection("sot.Services::anonuser");
		var st = conn
				.prepareStatement("Insert into \"sot_schema\".\"sot.Data::employeeDetails\" values (?,?,?,?,?,?,?,?,?,?,?,?,?)");
		st.setString(1, empID);
		st.setString(2, iNumber);
		st.setString(3, today);
		st.setString(4, empName);
		st.setString(5, stDate);
		st.setString(6, endDate);
		st.setString(7, empSex);
		st.setString(8, language);
		st.setString(9, extEmail);
		st.setString(10, trStDate);
		st.setString(11, group);
		st.setString(12, mentorName);
		st.setString(13, empStat);
		/* var Val = st.executeQuery(); */

		/*
		 * while (Val.next()) { list.push(createFilterEntry(Val,"object")); }
		 * 
		 * Val.close(); st.close();
		 */

		st.execute();
		conn.commit();
		conn.close();

		/*
		 * body = JSON.stringify(list); $.trace.debug(body);
		 * $.response.contentType = 'application/json';
		 * $.response.setBody(body);
		 * $.response.headers.set('access-control-allow-origin', '*');
		 * $.response.status = $.net.http.OK;
		 */
	}

} catch (e) {
	$.response.setBody("Error caught in the catch block is:" + e);
}