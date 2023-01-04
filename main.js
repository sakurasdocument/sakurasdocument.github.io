'use strict';
{
	//タイマー機能//
	function setTime() {
	  const d = new Date();
	  let year = d.getFullYear();
	  let month = d.getMonth();
	  let date = d.getDate();
	  let hour = String(d.getHours()).padStart(2, '0');
	  let min = String(d.getMinutes()).padStart(2, '0');
	  let sec = d.getSeconds();
	
	  const timer = document.getElementById('timer');
	
	  timer.textContent = `${year}/${month + 1}/${date} ${hour}:${min}`;
		
		setTimeout(() => {
			setTime();
		},10);
	}
	
	setTime();
	
	//TODO機能//
	let vm = new Vue({
		el: '#todo',
		data: {
			todos: [],
			newItem: '',
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
			this.todos = JSON.parse(localStorage.getItem('todos')) || [];
		},
		methods: {
			addItem: function(e) {
				e.preventDefault();
				let item = {
					title: this.newItem,
					isDone: false,
				}
				this.todos.push(item);
				this.newItem = '';
			},
			deleteItem: function(index) {
				this.todos.splice(index, 1);
			},
			purge: function() {
				if(!confirm('全部消すよ？')) {
					return;
				}
				this.todos = this.remaining;
			}
		},
		computed: {
			remaining: function() {
				return this.todos.filter(function(todo) {
					return !todo.isDone;
				});
			},
		},
	});
	
	//Map機能//
	
}

function initMap() {
	'use strict';
	
		function success(pos) {
			const lat = pos.coords.latitude;
			const lng = pos.coords.longitude;
			let target = document.getElementById('map');
			let map;
			let center = {lat: lat, lng: lng};
			let marker;
			
			map = new google.maps.Map(target, {
				center: center,
				zoom: 15,
			});
			
			marker = new google.maps.Marker({
				position: center,
				map: map,
				icon: {
					url: 'rockman.gif',
				  scaledSize: new google.maps.Size(120, 120)
				},
			});
		}function fail() {
				alert('位置情報取得に失敗');
			}
		navigator.geolocation.getCurrentPosition(success, fail);	
	}
