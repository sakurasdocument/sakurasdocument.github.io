'use strict';
{
	let vm = new Vue({
		el: '#todo',
		data: {
			newItem: '',
			todos: [
				
			]
		},
		watch: {
			todos: {
				handler: function() {
					localStorage.setItem('todos', JSON.stringify(this.todos));
				},
				deep: true
			}
		},
		mounted: function() {
			this.todos = JSON.parse(localStorage.getItem('todos')) || []
		},
		methods: {
			addItem: function(e) {
				e.preventDefault();
				let item = {
					title: this.newItem,
					isDone: false
				}
				this.todos.push(item);
				this.newItem = '';
			},
			deleteItem: function(index) {
				this.todos.splice(index, 1);
			},
			purge: function() {
				this.todos = this.remaining;
			}
		},
		computed: {
			remaining: function() {
				return this.todos.filter(function(todo) {
					return !todo.isDone;
				});
			}
		}
	});
	
	
	
	
	const sakuraImage = document.getElementById('main');
	let currentIndex = 0;
	
	function stand() {
		const sakuraStand = [
		  'frame_00_delay-0.06s.gif',
			'frame_01_delay-0.06s.gif',
			'frame_02_delay-0.06s.gif',
			'frame_03_delay-0.06s.gif',
			'frame_04_delay-0.06s.gif',
			'frame_05_delay-0.06s.gif',
			'frame_06_delay-0.06s.gif',
			'frame_07_delay-0.06s.gif',
			'frame_08_delay-0.06s.gif',
			'frame_09_delay-0.06s.gif',
			'frame_10_delay-0.06s.gif',
			'frame_11_delay-0.06s.gif',
			'frame_12_delay-0.06s.gif',
			'frame_13_delay-0.06s.gif',
			'frame_14_delay-0.06s.gif',
			'frame_15_delay-0.06s.gif',
			'frame_16_delay-0.06s.gif',
			'frame_17_delay-0.06s.gif',
			'frame_18_delay-0.06s.gif',
			'frame_19_delay-0.06s.gif',
			'frame_20_delay-0.06s.gif',
			'frame_21_delay-0.06s.gif',
			'frame_22_delay-0.06s.gif',
			'frame_23_delay-0.06s.gif',
	  ];
		sakuraImage.src = sakuraStand[currentIndex];
		currentIndex++;
		if(currentIndex === sakuraStand.length) {
			currentIndex = 0;
		}
		setTimeout(() => {
			stand();
		},100);
	}
	
	
	function win() {
		const sakuraWin = [
		'1.png',
		'2.png',
		'3.png',
		'4.png',
		'5.png',
		'6.png',
	  ];
		sakuraImage.src = sakuraWin[currentIndex];
		currentIndex++;
		if(currentIndex === sakuraWin.length) {
			currentIndex = 0;
		}
		setTimeout(() => {
			win();
		},100);
	}
	
	function action(e) {
		if(vm.todos.length < 3) {
			win();
		}else{
			stand();
		}
	}
	
	action();
	
	function initMap() {
		let target = document.getElementById('target');
		if(!navigator.geolocation) {
			alert('Geolocation not supported');
			return;
		}
		
		navigator.geolocation.getCurrentPosition(function(position) {
			new google.maps.Map(target, {
				center: {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				},
				zoom: 15
			});
		}, function() {
			alert('Geolocation failed');
			return;
		});
		
		/*map.addListener('click', function(e) {
			console.log(e.latLng.lat());
			console.log(e.latLng.lng());
			this.panTo(e.latLng);
		});*/
		
	
	}
	initMap();
}
