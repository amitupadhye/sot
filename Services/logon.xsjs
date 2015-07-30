function createFilterEntry(rs,obj) {
              return {
                     "id" : rs.getNString(1),
               };
       }


try {
	var loginInfo = {};
	var body = '';
	var userName = $.request.parameters.get('iNumber');
	var password = $.request.parameters.get('password');
	
    var list = [];
    
	var conn = $.db.getConnection("sot.Services::anonuser");
	var st = conn
			.prepareStatement("Select count(*) from \"sot_schema\".\"sot.Data::employeeLogon\" where \"iNumber\" = ? And \"password\" = ?");
	st.setString(1, userName);
	st.setString(2, password);
	var Val = st.executeQuery();
	
    while (Val.next()) {
        
        list.push(createFilterEntry(Val,"object"));
     }

	
	/*if (!Val.next()) {
		$.response.setBody("Failed to access database.");
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	} else {
		// put all functionality code in here (ie. if Val = 0/1)
		if (Val >= 1) {
			logInfo = function() {
				loginInfo.userId = userName;
				loginInfo.password = password;

				return loginInfo;
			};
			sessionStorage.setItem("1", JSON.stringify(logInfo()));
			
			window.location = "http://dewdfglp00799.wdf.sap.corp:8001/sot/WebContent/sot_main.html";
		}
		else{
			alert("User Name or Password are incorrect, please try again.");
		}
	}*/
    Val.close();
    st.close();
    conn.close();
	
    body = JSON.stringify(list);
    $.trace.debug(body);
    $.response.contentType = 'application/json';
    $.response.setBody(body);
    $.response.headers.set('access-control-allow-origin', '*');
    $.response.status = $.net.http.OK;

	
} catch(e) {
	$.response.setBody("Error caught in the catch block is:" + e);
}