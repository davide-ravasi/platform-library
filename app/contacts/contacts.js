'use strict';

angular.module('myContacts.contacts', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'ContactsCtrl'
  }).when('/contacts_detail/:id', {
    templateUrl: 'contacts/contacts_detail.html',
    controller: 'ContactsDetailCtrl'
  });
}])

// Contacts controller
.controller('ContactsCtrl', ['$scope','$firebaseArray',function($scope,$firebaseArray) {
	// Init firebase
	var ref = new Firebase('https://mycontacts-appdave.firebaseio.com/contacts');

	// get Contacts
	$scope.contacts = $firebaseArray(ref);


	// Show/Add Form
	$scope.addFormShow = false;

	$scope.showAddForm = function() {
		$scope.addFormShow = true;
	}

	// hide form
	$scope.hideAddForm = function() {
		$scope.addFormShow = false;
		$scope.contactShow = false;
	}

	$scope.showEditForm = function(contact) {
		$scope.editFormShow = true;
		console.log(contact.$id);
		$scope.id = contact.$id;
		$scope.name = contact.name;
		$scope.email = contact.email;
		$scope.work_phone = contact.phones[0].work || "";
		$scope.home_phone = contact.phones[0].home || "";
		$scope.mobile_phone = contact.phones[0].mobile || "";
		$scope.street_address = contact.address[0].street_address || "";
		$scope.city = contact.address[0].city || "";
		$scope.state = contact.address[0].state || "";
		$scope.zipcode = contact.address[0].zipcode || "";

	}

	$scope.editFormSubmit = function() {

		console.log('updating contact');

		// get id
		var id = $scope.id;
		console.log(id);

		// get record
		var record = $scope.contacts.$getRecord(id);

		// Assign values
		record.name = $scope.name;



		// save contact
		$scope.contacts.$save(record).then(function(ref) {
			console.log(ref.key);
		});	

		clearFields();

		$scope.editFormShow = false;

		$scope.msg = "Contact update";



	}	

	$scope.showContact = function(contact) {
		console.log("view detail");

		$scope.contactShow = true;

		$scope.name = contact.name;
		$scope.email = contact.email;
		$scope.work_phone = contact.phones[0].work;
		$scope.home_phone = contact.phones[0].home;
		$scope.mobile_phone = contact.phones[0].mobile;
		$scope.street_address = contact.address[0].street_address;
		$scope.city = contact.address[0].city;
		$scope.state = contact.address[0].state;
		$scope.zipcode = contact.address[0].zipcode;

	}


	$scope.addFormSubmit = function() {
		console.log('Adding contact');

		// Assing values
		if($scope.name){ var name = $scope.name } else { var name = null }
		if($scope.email){ var email = $scope.email } else { var email = null }
		if($scope.company){ var company = $scope.company } else { var company = null }
		if($scope.mobile_phone){ var mobile_phone = $scope.mobile_phone } else { var mobile_phone = null }
		if($scope.home_phone){ var home_phone = $scope.home_phone } else { var home_phone = null }
		if($scope.work_phone){ var work_phone = $scope.work_phone } else { var work_phone = null }
		if($scope.street_address){ var street_address = $scope.street_address } else { var street_address = null }
		if($scope.city){ var city = $scope.city } else { var city = null }
		if($scope.state){ var state = $scope.state } else { var state = null }
		if($scope.zipcode){ var zipcode = $scope.zipcode } else { var zipcode = null }	


		$scope.contacts.$add({
			name: name,
			email: email,
			company: company,
			phones:[
				{
					mobile: mobile_phone,
					home: home_phone,
					work: work_phone
				}
			],
			address:[
				{
					street_address: street_address,
					city: city,
					state: state,
					zipcode: zipcode
				}
			]
		}).then(function(ref){
			var id = ref.key();
			console.log('Added contact with ID: ' + id);

			// Clear Form
			clearFields();

			// hide form
			$scope.addFormShow = false;

			// Send message
			$scope.msg = "Contact Added";
		});

	}


	$scope.removeContact = function(contact) {
		$scope.contacts.$remove(contact);

		// Send message
		$scope.msg = "Contact Removed";
	}


	// Clear $scope fields
	function clearFields() {
		$scope.name = '';
		$scope.email = '';
		$scope.company = '';
		$scope.mobile_phone = '';
		$scope.home_phone = '';
		$scope.work_phone = '';
		$scope.street_address = '';
		$scope.city = '';
		$scope.state = '';
		$scope.zipcode = '';
	}

}])
.controller('ContactsDetailCtrl', ['$scope','$firebaseArray','$routeParams',function($scope,$firebaseArray,$routeParams) {
	// Init firebase
	//console.log('https://mycontacts-appdave.firebaseio.com/contacts/'+ $routeParams.id);
	var ref = new Firebase('https://mycontacts-appdave.firebaseio.com/contacts');
	// get Contacts
	$scope.contacts = $firebaseArray(ref);
	$scope.param = $routeParams.id;
}])
;