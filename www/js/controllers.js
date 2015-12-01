var loginUserType;

angular.module('your_app_name.controllers', [])

.controller('AuthCtrl', function($scope, $ionicConfig) {

})

// APP
.controller('AppCtrl', function($scope, $ionicConfig) {

})

//LOGIN
.controller('LoginCtrl', function($scope, $http, $state, $templateCache, $location) {
	$scope.submit = function() {
    	var email = this.login_form.user_email.$viewValue;
        var psw = this.login_form.user_password.$viewValue;
       
        $http({
	    url: 'http://ec2-52-32-92-71.us-west-2.compute.amazonaws.com/ci/index.php/api/Login', 
	    method: "POST",
	    data:  {mail:email,
	    	    password:psw}, 
	    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
	    
	}).then(function(resp) {
		if(resp.data == "false") {
			$scope.msg = "The Email or Password incorrect";
		}
		else {
			localStorage.setItem("loginUserType", resp.data["Type"]);
			if(resp.data["Type"] == "user") {
				loginUserType = "user";
				localStorage.setItem("id", resp.data["UserId"]);
				localStorage.setItem("isAdmin", resp.data["IsAdmin"]);
				localStorage.setItem("branch", resp.data["BranchId"]);
			}
			else {
				loginUserType = "client";
				localStorage.setItem("id", resp.data["ClientId"]);
			}
			$location.path( "/app/properties" );
		}
	
	}, function(err) {
	    console.error('ERR', err);
	})
    };
})

.controller('RateApp', function($scope) {
	$scope.rateApp = function(){
		if(ionic.Platform.isIOS()){
			//you need to set your own ios app id
			AppRate.preferences.storeAppURL.ios = '1234555553>';
			AppRate.promptForRating(true);
		}else if(ionic.Platform.isAndroid()){
			//you need to set your own android app id
			AppRate.preferences.storeAppURL.android = 'market://details?id=ionFB';
			AppRate.promptForRating(true);
		}
	};
})

//properties Ctrl
.controller('PropertiesCtrl', function($scope, $http, $ionicLoading, $ionicSideMenuDelegate)  {
	
	$scope.toggleLeftSideMenu = function() {
		$ionicSideMenuDelegate.toggleLeft();
    };

    var url;
    var id;
    if(loginUserType == "client") {    	
    	url = 'http://ec2-52-32-92-71.us-west-2.compute.amazonaws.com/ci/index.php/api/PropertyImage';
    	id = localStorage.getItem('id');
    }
    else {
    	if(localStorage.getItem('isAdmin') == 1) {    		
    		url = 'http://ec2-52-32-92-71.us-west-2.compute.amazonaws.com/ci/index.php/api/PropertyImage/getAdminPropertyImage';
    		id = 0;
    	}
    	else {
    		url = 'http://ec2-52-32-92-71.us-west-2.compute.amazonaws.com/ci/index.php/api/PropertyImage/getUserPropertyImage';
    		id = localStorage.getItem('branch');
    	}
    }
    
	$http({
	    url: url, 
	    method: "GET",
	    params:  {index:id}, 
	    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
	}).then(function(resp) {

		$scope.propertyImage = [];

		$scope.propertyImage = resp.data;
	
	}, function(err) {
	    console.error('ERR', err);
	})
})

// PurchaseAndSaleCtrl
.controller('PurchaseAndSaleCtrl', function($scope, $http, $ionicLoading, $stateParams) {

console.log("on ckick" + $stateParams.propertyId );	
	$http({
	    url: 'http://ec2-52-32-92-71.us-west-2.compute.amazonaws.com/ci/index.php/api/PurchaseAndSale', 
	    method: "GET",
	    params:  {index: $stateParams.propertyId}, 
	    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
	}).then(function(resp) {
		if (resp.data.length != 0) {
			$scope.isHasData = true;
	
			$scope.purchaseAndSale = resp.data[0];
			
			$scope.isHasFile = $scope.purchaseAndSale['IsHasFile'] == 1 ? true : false;
			$scope.IsBuyerFile = $scope.purchaseAndSale['IsBuyerFile'] == 1 ? true : false;
			$scope.IsSignedDocsFile = $scope.purchaseAndSale['IsSignedDocsFile'] == 1 ? true : false;
			$scope.IsBalanceFile = $scope.purchaseAndSale['IsBalanceFile'] == 1 ? true : false;
			$scope.IsFilesToS‌ign = $scope.purchaseAndSale['IsFilesToS‌ignFile'] == 1 ? true : false;
			$scope.showNote = $scope.purchaseAndSale['ShowNote'] == 1 ? true : false;
		} else {
			$scope.msg = "No data to display";		
			$scope.isHasData = false;
		}
		
	}, function(err) {
	    console.error('ERR', err);
	})
})

//ClosingCtrl
.controller('ClosingCtrl', function($scope, $http, $ionicLoading) {	
	$http({
	    url: 'http://ec2-52-32-92-71.us-west-2.compute.amazonaws.com/ci/index.php/api/Closing', 
	    method: "GET",
	    params:  {index:24}, 
	    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
	}).then(function(resp) {
		if (resp.data.length != 0) {
			$scope.isHasData = true;
		
			$scope.closing = resp.data[0];

			$scope.IsHasFile = $scope.closing['IsHasFile'] == 1 ? true : false;
			$scope.IsWalkThroghFile = $scope.closing['IsWalkThroghFile'] == 1 ? true : false;
			$scope.IsInsuranceFile = $scope.closing['IsInsuranceFile'] == 1 ? true : false;
			$scope.IsClosingDocsFile = $scope.closing['IsClosingDocsFile'] == 1 ? true : false;
			$scope.showNote = $scope.closing['ShowNote'] == 1 ? true : false;
		} else {
			$scope.msg = "No data to display";			
			$scope.isHasData = false;
		}
		
	}, function(err) {
	    console.error('ERR', err);
	})
})

//RenovationCtrl
.controller('RenovationCtrl', function($scope, $http, $ionicLoading) {	
	$http({
	    url: 'http://ec2-52-32-92-71.us-west-2.compute.amazonaws.com/ci/index.php/api/Renovation', 
	    method: "GET",
	    params:  {index:3}, 
	    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
	}).then(function(resp) {
		if (resp.data.length != 0) {
			$scope.isHasData = true;
		
			$scope.renovation = resp.data[0];
		
			$scope.IsHasFile = $scope.renovation['IsHasFile'] == 1 ? true : false;
			$scope.IsFundsSentFile = $scope.renovation['IsFundsSentFile'] == 1 ? true : false;
			$scope.IsWorkEstimateFile = $scope.renovation['IsWorkEstimateFile'] == 1 ? true : false;
			$scope.IsPayment1File = $scope.renovation['IsPayment1File'] == 1 ? true : false;
			$scope.IsPayment2File = $scope.renovation['IsPayment2File'] == 1 ? true : false;
			$scope.IsPayment3File = $scope.renovation['IsPayment3File'] == 1 ? true : false;
			$scope.IsCOFOFile = $scope.renovation['IsCOFOFile'] == 1 ? true : false;
			$scope.showNote = $scope.renovation['ShowNote'] == 1 ? true : false;
		} else {
			$scope.msg = "No data to display";			
			$scope.isHasData = false;
		}
		
	}, function(err) {
	    console.error('ERR', err);
	})
})

//LeasingCtrl
.controller('LeasingCtrl', function($scope, $http, $ionicLoading) {	
	$http({
	    url: 'http://ec2-52-32-92-71.us-west-2.compute.amazonaws.com/ci/index.php/api/Leasing', 
	    method: "GET",
	    params:  {index:1}, 
	    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
	}).then(function(resp) {
		if (resp.data.length != 0) {
			$scope.isHasData = true;
		
			$scope.leasing = resp.data[0];
		
			$scope.IsHasFile = $scope.leasing['IsHasFile'] == 1 ? true : false;
			$scope.IsApplicationFile = $scope.leasing['IsApplicationFile'] == 1 ? true : false;
			$scope.IsLeaseFile = $scope.leasing['IsLeaseFile'] == 1 ? true : false;
			$scope.showNote = $scope.leasing['ShowNote'] == 1 ? true : false;
		} else {
			$scope.msg = "No data to display";			
			$scope.isHasData = false;
		}
		
	}, function(err) {
	    console.error('ERR', err);
	})
})

//OccupiedCtrl
.controller('OccupiedCtrl', function($scope, $http, $ionicLoading) {	
	$http({
	    url: 'http://ec2-52-32-92-71.us-west-2.compute.amazonaws.com/ci/index.php/api/Occupied', 
	    method: "GET",
	    params:  {index:1}, 
	    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
	}).then(function(resp) {
		if (resp.data.length != 0) {
			$scope.isHasData = true;
		
			$scope.occupied = resp.data[0];
		
			$scope.IsHasFile = $scope.occupied['IsHasFile'] == 1 ? true : false;
			$scope.IsMaintanenceFile = $scope.occupied['IsMaintanenceFile'] == 1 ? true : false;
			$scope.showNote = $scope.occupied['ShowNote'] == 1 ? true : false;
		} else {
			$scope.msg = "No data to display";			
			$scope.isHasData = false;
		}
		
	}, function(err) {
	    console.error('ERR', err);
	})
})

//EvictionCtrl
.controller('EvictionCtrl', function($scope, $timeout, $http, $ionicLoading) {
	$http({
	    url: 'http://ec2-52-32-92-71.us-west-2.compute.amazonaws.com/ci/index.php/api/Eviction', 
	    method: "GET",
	    params:  {index:1}, 
	    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
	}).then(function(resp) {
		if (resp.data.length != 0) {
			$scope.isHasData = true;
		
			$scope.eviction = resp.data[0];

			$scope.IsHasFile = $scope.eviction['IsHasFile'] == 1 ? true : false;
			$scope.showNote = $scope.eviction['ShowNote'] == 1 ? true : false;
		} else {
			$scope.msg = "No data to display";			
			$scope.isHasData = false;
		}

	}, function(err) {
	    console.error('ERR', err);
	})
})


