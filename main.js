function initMap() {
    function success(pos) {
        let target = document.getElementById('target');
        let map;
        let sakuraLat = pos.coords.latitude;
        let sakuraLng = pos.coords.longitude;
        let sakura = {lat: sakuraLat, lng: sakuraLng};

        map = new google.maps.Map(target, {
            center: sakura,
            zoom:15

        });

        sakura = new google.maps.Marker({
            position: sakura,
            map: map,
            icon: {
                url: 'sakura-dash.GIF',
                scaledSize: new google.maps.Size(120, 120)
            },

        });

        /*↓敵を出現させるメソッド*/
        class Enemy {
            constructor(p1, p2) {
                this.lat = p1;
                this.lng = p2;
                /*↓クラスの中でメソッドを発火させなければならない*/
                let enemy = this.createEnemy();
            }

            createEnemy() {
                new google.maps.Marker({
                    position: {lat: this.lat, lng: this.lng},
                    map: map,
                    icon: {
                        url: 'shuma-stand.GIF',
                        scaledSize: new google.maps.Size(120, 120)
                    },
    
                });
            }

        }

        let enemys = [];
        enemys = enemys.concat(JSON.parse(localStorage.getItem('enemys')) || []);
        
        for(i = 0; i < enemys.length; i++) {
            new Enemy(enemys[i].lat, enemys[i].lng);
        }
        
        function pushEnemy() {
            function enemyPush() {
                if(enemys.length > 4) {
                    return;
                }

                const source = [
                    {
                        name: '五千石球場',
                        lat: 36.41194,
                        lng: 139.89193
                    },
                    {
                        name: '清原南公園',
                        lat: 36.53694,
                        lng: 139.98688
                    },
                    {
                        name: '市貝町北運動場',
                        lat: 36.58048,
                        lng: 140.11979
                    },
                    {
                        name: '生きがいの森',
                        lat: 36.59720,
                        lng: 139.76889
                    },
                ];
                const n = Math.floor(Math.random() * source.length);
                enemys[enemys.length] = source.splice(n, 1)[0];
            }
            enemyPush();

            for(i = 0; i < enemys.length; i++) {
                if(enemys[i].lat < sakuraLat) {
                    enemys[i].lat = enemys[i].lat + 0.001;
                }
                if(enemys[i].lat > sakuraLat) {
                    enemys[i].lat = enemys[i].lat - 0.001;
                }
                if(enemys[i].lng < sakuraLng) {
                    enemys[i].lng = enemys[i].lng + 0.001;
                }
                if(enemys[i].lng > sakuraLng) {
                    enemys[i].lng = enemys[i].lng - 0.001;
                }
            }

            localStorage.setItem("enemys", JSON.stringify(enemys));

            setTimeout(() => {
                pushEnemy();
            },10000);
            console.log(enemys);
            console.log(enemys.length);
        }

        pushEnemy();

        /*↓TODO*/
        let vm = new Vue({
            el: '#todo',
            data: {
                newItem: '',
                todos: [
                    
                ]
            },
            //todosに何らかの処理が行われたかを監視しlocalStorageに保存
            watch: {
                todos: {
                    handler: function() {
                        localStorage.setItem('todos', JSON.stringify(this.todos));
                    },
                    deep: true
                }
            },
            //localStorageの読み込み
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
                    if(confirm('まっ☆こ〜んなとこだね！')) {
                      this.todos.splice(index, 1);
                    }
                    
                },
                purge: function() {
                    if(!confirm('滅殺！！')) {
                      return;
                    }
                    this.todos = this.todos.filter(function(todo) {
                        return !todo.isDone;
                    });
                    
                },
            },
            computed: {
                remaining: function() {
                    let items = this.todos.filter(function(todo) {
                        return !todo.isDone;
                    });
                    return items.length;
                }
            },
        });  
    }

    function fail(error) {
        window.alert('位置情報取得できず');
    }

    navigator.geolocation.getCurrentPosition(success, fail);
}

let sakuralife;

sakuralife = 500;

let hp = document.getElementById('hp');
hp.style.width = sakuralife + 'px';

const enemysImg = [
    'shuma-stand.GIF',
    'norimaro-stand.GIF'
];

enemysImg.forEach(image => {
    const img = document.createElement('img');
    img.src = image;

    const li = document.createElement('li');
    li.appendChild(img);

    document.querySelector('.enemyStock').appendChild(li);
});



