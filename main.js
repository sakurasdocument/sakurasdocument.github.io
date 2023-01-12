function initMap() {
	'use strict';
	{
		let target = document.getElementById('target');
		let map;
		
		
		let sakura = {lat: 36.5901355,lng: 140.1130873};
		
		let enemy1 = {lat: 36.5911111, lng: 140.1111111};
		let enemy2 = {lat: 36.5811111, lng: 140.1711111};
		let enemy3 = {lat: 36.5711111, lng: 140.1731111};
		//let enemys = [enemy1, enemy2, enemy3];
		let enemys = [];
		let marker = [];
		let center = {lat: 36.5901355,lng: 140.1130873};
		
		map = new google.maps.Map(target, {
			center: {lat: 36.5901355,lng: 140.1130873},
			zoom: 15
		});
		
		sakura = new google.maps.Marker({
		    position: sakura,
			  map: map,
			  icon: {
				  url: 'sakura-running.gif',
				  scaledSize: new google.maps.Size(120, 120)
			  },
		  });
		
		
		
		function createEnemy() {
		
		  let elat = [];
		  for(let i = 36.2172461; i <= 37.1298747; i = i + 0.0000001) {
			  elat.push(Math.floor(i * 10000000) / 10000000);
		  }
		
		  let elng = [];
		  for(let i = 139.3378163; i <= 140.2708163; i += 0.0000001) {
			  elng.push(Math.floor(i * 10000000) / 10000000);
		  }
			
			enemys.push({
				lat: elat.splice(Math.floor(Math.random() * elat.length), 1)[0],
				lng: elng.splice(Math.floor(Math.random() * elng.length), 1)[0]
			});
			
			
			
			elat = [];
			elng = [];
			
			
			setTimeout(() => {
			createEnemy();
		}, 1000);
		
			
		
			console.log(enemys);
			
		}
		
		//createEnemy();
		
		
		
		
		
		
		
		
		
		
		
		
		
		for(let i = 0; i <= enemys.length; i++) {
		
		marker[i] = new google.maps.Marker({
		    position: enemys[i],
			  map: map,
			  icon: {
				  url: 'shuma-stand.gif',
				  scaledSize: new google.maps.Size(120, 120)
			  },
		  });
		}
		
		
		
		
		
		
		/*
		marker = new google.maps.Marker({
		  position: area1,
			map: map,
			icon: {
				url: 'rockman.gif',
				scaledSize: new google.maps.Size(120, 120)
			},
		});
								
		
		marker = new google.maps.Marker({
		  position: area2,
			map: map,
			icon: {
				url: 'rockman.gif',
				scaledSize: new google.maps.Size(120, 120)
			},
		});
		
		marker = new google.maps.Marker({
		  position: area3,
			map: map,
			icon: {
				url: 'rockman.gif',
				scaledSize: new google.maps.Size(120, 120)
			},
		});
		*/
		
		
	}
	
	
}


	let vm = new Vue({
		el: '#todo',
		data: {
			newItem: '',
			todos: [],
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
				};
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
			},
		},
		computed: {
			remaining: function() {
				return this.todos.filter(function(todo) {
					return !todo.isDone;
				});
			}
		},
	});


console.log(vm.todos.length);
