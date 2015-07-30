    // Service Call Logic
    var gFilterTerms = "";
    var gFilterAttribute = "";
    var gLastOrdersChangedTime = "";
    var gSearchParam;   
    var oPieModel = new sap.ui.model.json.JSONModel();
    
	/*************** Language Resource Loader *************/
    jQuery.sap.require("jquery.sap.resources");
    var sLocale = sap.ui.getCore().getConfiguration().getLanguage();
    var oBundle = jQuery.sap.resources({url : "./i18n/messagebundle.hdbtextbundle", locale: sLocale});
    
    
	