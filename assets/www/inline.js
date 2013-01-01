function regLinkClickHandlersInline() {
    var $j = jQuery.noConflict();
    var logToConsole = cordova.require("salesforce/util/logger").logToConsole;
    
    
    $j('#link_create_contact').click(function() {
    	resetDisplay();
	                                     //logToConsole("link_fetch_sfdc_contacts clicked");
	                                     //forcetkClient.query("SELECT Name FROM Contact", onSuccessSfdcContacts, onErrorSfdc); 
		
		var formstring = '<form action="form.php" method="post"> \
			<label for="firstName">First Name</label>\
			<input type="text" name="firstName" id="firstName" data-mini="true" />\
			<label for="lastName">Last Name</label>\
			<input type="text" name="lastName" id="lastName" data-mini="true" />\
			<label for="email">Email</label>\
			<input type="text" name="email" id="email" data-mini="true" />\
            <p><a href="#" id="createContact" data-role="button" data-inline="true">Create Contact !</a></p>	\
			\
						</form>';
		$j("#div_output").html(formstring);
		
	});
    
    $j('#createContact').live('click',function(){
    	//function(objtype, id, fields, callback, error) 
    	var valObj = {};
    	//{""+$j('#fieldId').val()+"" : $j('#fieldValue').val()}
    	valObj['firstName'] = $j('#firstName').val();
    	valObj['lastName'] = $j('#lastName').val();
    	valObj['email'] = $j('#email').val();
    	
    	forcetkClient.create(
    			'Contact',
    			valObj, 
    			function(data){
    				$j("#div_output").html('Contact Created with Id: '+data['id']);	
    			}, 
    			function(){} 
    			);
    });
    
    $j('.editField').live('click', function(){
    	$j('#fieldId').val($j(this).attr('id'));
    	
    });
    
    $j('#link_fetch_device_accounts').click(function() {
        logToConsole("link_fetch_device_accounts clicked");
        var options = cordova.require("cordova/plugin/ContactFindOptions");
        options.filter = ""; // empty search string returns all contacts
        options.multiple = true;
        var fields = ["name"];
        var contactsObj = cordova.require("cordova/plugin/contacts");
        contactsObj.find(fields, onSuccessDevice, onErrorDevice, options);
    });
    
    function onSuccessDevice(contacts) {
    	resetDisplay();
        var $j = jQuery.noConflict();
        cordova.require("salesforce/util/logger").logToConsole("onSuccessDevice: received " + contacts.length + " contacts");
        $j("#div_device_account_list").html("")
        var ul = $j('<ul data-role="listview" data-inset="true" data-theme="a" data-dividertheme="a"></ul>');
        $j("#div_device_account_list").append(ul);
        
        ul.append($j('<li data-role="list-divider">Device Contacts: ' + contacts.length + '</li>'));
        $j.each(contacts, function(i, contact) {
               var formattedName = contact.name.formatted;
               if (formattedName) {
               var newLi = $j("<li><a href='#'>" + (i+1) + " - " + formattedName + "</a></li>");
               ul.append(newLi);
               }
               });
        
        $j("#div_device_account_list").trigger( "create" )
    }

    function onErrorDevice(error) {
        cordova.require("salesforce/util/logger").logToConsole("onErrorDevice: " + JSON.stringify(error) );
        alert('Error getting device contacts!');
    }
}

    