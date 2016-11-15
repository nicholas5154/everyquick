'use strict';

/**
* @ngdoc function
* @name everyquickApp.controller:SignupCtrl
* @description
* # SignupCtrl
* Controller of the everyquickApp
*/
angular.module('everyquickApp')
.controller('SendNewCtrl', 
	['$scope', 'Delivery',
	function($scope, Delivery) {
		$scope.formData = {
			dep:{},
			dest:{},
			depList:[],
			destList:[],
			price:3000
		};

		var depMapContainer = document.getElementById('dep_map');
		var destMapContainer = document.getElementById('dest_map');
		var options = {
			center: new daum.maps.LatLng(33.450701, 126.570667),
			level: 3
		};

		var depMap, destMap, places;
		var depMarker, destMarker;

		daum.maps.load(function(){
			places = new daum.maps.services.Places();
			depMap = new daum.maps.Map(depMapContainer, options);
			destMap = new daum.maps.Map(destMapContainer, options);

			
			depMarker = new daum.maps.Marker({
				map: depMap
			});
			destMarker = new daum.maps.Marker({
				map: destMap
			});
		});

		$scope.depNameChanged = function(){
			if($scope.formData.dep.title.length === 0) {
				return;
			}
			places.keywordSearch($scope.formData.dep.title, depResult);
		};

		$scope.destNameChanged = function(){
			if($scope.formData.dest.title.length === 0) {
				return;
			}
			places.keywordSearch($scope.formData.dest.title, destResult);
		};

		function depResult (status, data, pagination) {
			if (status === daum.maps.services.Status.OK) {
				$scope.formData.depList = data.places;
			}
		}

		function destResult (status, data, pagination) {
			if (status === daum.maps.services.Status.OK) {
				$scope.formData.destList = data.places;
			}
		}

		$scope.selectDep = function(depObj){
			$scope.formData.dep = depObj;
			$scope.formData.depList = [];
			depMap.setCenter(
				new daum.maps.LatLng(
					depObj.latitude, 
					depObj.longitude
					)
				);
			displayMarker(depObj, depMarker);
		};

		$scope.selectDest = function(destObj){
			$scope.formData.dest = destObj;
			$scope.formData.destList = [];
			destMap.setCenter(
				new daum.maps.LatLng(
					destObj.latitude, 
					destObj.longitude
					)
				);
			displayMarker(destObj, destMarker);
		};

		function displayMarker(place, marker) {
			// 마커를 생성하고 지도에 표시합니다
			marker.setPosition(
				new daum.maps.LatLng(place.latitude, place.longitude)
			);
		}

		$scope.onPriceSliderChange = function(){
			$scope.formData.price = parseInt($scope.formData.price);
		};

		$scope.createDelivery = function(){
			var dep = {
				id: $scope.formData.dep.id,
				title: $scope.formData.dep.title,
				zipcode: $scope.formData.dep.zipcode,
				address: $scope.formData.dep.address,
				newAddress: $scope.formData.dep.newAddress,
				latitude: $scope.formData.dep.latitude,
				longitude: $scope.formData.dep.longitude
			};
			var dest = {
				id: $scope.formData.dest.id,
				title: $scope.formData.dest.title,
				zipcode: $scope.formData.dest.zipcode,
				address: $scope.formData.dest.address,
				newAddress: $scope.formData.dest.newAddress,
				latitude: $scope.formData.dest.latitude,
				longitude: $scope.formData.dest.longitude
			};
			Delivery.post(dep, dest, $scope.formData.price);
		};

	}]
);
