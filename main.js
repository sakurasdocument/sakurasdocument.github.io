(function() {
	'use strict';
	
	let vm = new Vue({
		el: '#app',
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
			addItem: function() {
				let item = {
					title: this.newItem,
					isDone: false
				};
				this.todos.push(item);
				this.newItem = '';
			},
			deleteItem: function(index) {
				if(confirm('ホントに終わった?')) {
					
				  this.todos.splice(index, 1);
				}
			},
			purge: function(index) {
				if(!confirm('まっ☆こ〜んなトコだね！')) {
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
		}
	});	
	console.log(vm.todos.length);
})();