(function() {
  'use strict';
	
	const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const date = now.getDate();
  const hour = now.getHours();
  const min = now.getMinutes();
	
	
  var vm = new Vue({
    el: '#app',
    data: {
      newItem: '',
      todos: []
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
        var item = {
          title: this.newItem,
          isDone: false
        };
        this.todos.push(item);
        this.newItem = '';
      },
      deleteItem: function(index) {
        if (confirm('are you sure?')) {
          this.todos.splice(index, 1);
        }
      },
      purge: function() {
        if (!confirm('delete finished?')) {
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
      }
    }
  });
	console.log(vm.todos.length);
	
	const sakura = document.getElementById('sakura');
	const shuma = document.getElementById('shuma');
	const text = document.getElementById('chara-text');
	
	const sakuraMove = function() {
		if(vm.todos.length >= 14 && hour >= 6 && hour < 12) {
			sakura.innerHTML = '<img src="sakura-komari.GIF">';
			text.innerHTML = '<p>さくら「ちょっと出遅れてない？うう。。。このままだとアイツが。。」</p>'
		}else if(vm.todos.length >= 12 && hour >= 12 && hour < 15) {
			sakura.innerHTML = '<img src="sakura-heighkick.GIF">';
			shuma.innerHTML = '<img src="shuma-ayumiyori.GIF">';
			text.innerHTML = '<p>さくら「げっ！！ほらぁやっぱり〜！！いやぁ〜来ないでぇ！！」<br>シュマゴラス「美味しそうな匂いがしたと思ったら、やっぱりさくらちゃんでしゅ！グヒヒ♡</p>'
		}else if(vm.todos.length >= 8 && hour >= 15 && hour <= 17) {
			sakura.innerHTML = '<img src="sakura-dash.GIF">';
			shuma.innerHTML = '<img src="shuma-dash.GIF">';
			text.innerHTML = '<p>シュマゴラス「うひひ♡今日こそそのブルマを美味しく頂くでシュ！さっきからチラチラ見えてたまらんでシュね〜♡まさに絶品♡」<br>さくら「い、いやぁ〜！！こっち来ないでってばぁ！！」</p>'
		}else if(vm.todos.length >= 5 && hour >= 18 && hour < 21) {
			sakura.innerHTML = '<img src="sakura-kick2.GIF">';
			shuma.innerHTML = '<img src="shuma-shagami.GIF">';
			text.innerHTML = '<p>シュマゴラス「ムフフ♡いい眺めでシュ♡ブルマが丸見えでシュよぉ〜♡」<br>さくら「やぁ！はぁ！！とぉ〜！！コノ、、気持ち悪いやつ。。絶対負けない！！」</p>'
		}else if(vm.todos.length > 0 && hour >= 21 || hour < 6) {
			sakura.innerHTML = '<img src="sakura-loose.GIF">';
			shuma.innerHTML = '<img src="shuma-shagami.GIF">';
			text.innerHTML = '<p>シュマゴラス「さぁ、さくらちゃんの負けでシュ。。その美味しそうな身体を堪能するでシュ♡、、では、いっただきま〜す♡」<br>さくら「くぅ///こんなやつに。。い、いやぁ〜〜//だめぇ〜〜〜///」</p>'
		}else{
			sakura.innerHTML = '<img src="IMG_1935.GIF">'
			shuma.innerHTML = '<img src="IMG_2129.GIF">';
			text.innerHTML = '<p>さくら「えへへ！正義は勝つ！な〜んてね！！」<br>シュマゴラス「せっかくのご馳走が。。しかし、絶対に諦めないでシュ！　それにしても、やっぱり美味しそうなブルマでシュ♡」</p>'
		}
	}
	
　sakuraMove();
	
	const background = document.getElementById('character-area');
	
	const changeBackground = function() {
		if(hour >= 17 || hour <= 5) {
	    background.style.backgroundImage = 'url(haikei-yoru.png)';
		}
	}
	
	changeBackground();
	 /*
	const pena2 =function() {
	let i = 0;
	setInterval(function() {
		
		if(i === 0) {
			sakura.innerHTML = '<img src="sakura-modae1.gif">';
			}else{
			sakura.innerHTML = '<img src="sakura-modae2.gif">';
		  }
		i++;
		
	},1000);
		refresh2();
	}
	
	function refresh2() {
		setTimeout(pena2, 1200);
	}
	
	pena2();
	
	*/
	
	
	
	
		
})();