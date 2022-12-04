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
	win();
	
}