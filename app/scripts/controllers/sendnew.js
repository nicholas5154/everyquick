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
	['$scope', '$firebaseArray',
	function($scope, $firebaseArray) {
		$scope.formData = {
			start_addr:"",
			end_addr:"",
			price:0,
		};

		var container = document.getElementById('map');
		var options = {
			center: new daum.maps.LatLng(33.450701, 126.570667),
			level: 3
		};

		var map, ps;

		daum.maps.load(function() {
			map = new daum.maps.Map(container, options);
			ps = new daum.maps.services.Places();
		});

		$scope.onSearchChange = function(){
			console.log("change");
			ps.keywordSearch($scope.formData.start_addr, placesSearchCB); 
		}


		// 키워드 검색 완료 시 호출되는 콜백함수 입니다
		function placesSearchCB (status, data, pagination) {
		    if (status === daum.maps.services.Status.OK) {

		        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
		        // LatLngBounds 객체에 좌표를 추가합니다
		        var bounds = new daum.maps.LatLngBounds();

		        for (var i=0; i<data.places.length; i++) {
		            displayMarker(data.places[i]);    
		            bounds.extend(new daum.maps.LatLng(data.places[i].latitude, data.places[i].longitude));
		        }       

		        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
		        map.setBounds(bounds);
		    } 
		}

		// 지도에 마커를 표시하는 함수입니다
		function displayMarker(place) {
		    
		    // 마커를 생성하고 지도에 표시합니다
		    var marker = new daum.maps.Marker({
		        map: map,
		        position: new daum.maps.LatLng(place.latitude, place.longitude) 
		    });

		    // 마커에 클릭이벤트를 등록합니다
		    daum.maps.event.addListener(marker, 'click', function() {
		        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
		        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.title + '</div>');
		        infowindow.open(map, marker);
		    });
		}

		$scope.createDelivery = function(){
		    var deliveriesRef = firebase.database().ref().child("deliveries");
		    // download the data from a Firebase reference into a (pseudo read-only) array
		    // all server changes are applied in realtime
		    $scope.deliveries = $firebaseArray(deliveriesRef);
		    // create a query for the most recent 25 deliveries on the server
		    // the $firebaseArray service properly handles database queries as well
		    $scope.deliveries.$add({
		    	dep: $scope.formData.start_addr,
		    	dest: $scope.formData.end_addr,
		    	price: $scope.formData.price,
		    });
		}
	}
]);
