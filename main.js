function initMap() {
    function success(pos) {
        let target = document.getElementById('target');
        let map;
        let sakuraLat = pos.coords.latitude;
        let sakuraLng = pos.coords.longitude;
        let sakura = {lat: sakuraLat, lng: sakuraLng};


        map = new google.maps.Map(target, {
            center: sakura,
            zoom:15,
            draggable: true

        });



        sakura = new google.maps.Marker({
            position: sakura,
            map: map,
            icon: {
                url: 'sakura-dash.GIF',
                scaledSize: new google.maps.Size(120, 120)
            },

        });

        base1 = new google.maps.Marker({
            position: {lat: 36.41194, lng: 139.89193},
            map: map,
            icon: {
                url: 'house_5.gif',
                scaledSize: new google.maps.Size(40, 40)
            },

        });

        base2 = new google.maps.Marker({
            position: {lat: 36.53694, lng: 139.98688},
            map: map,
            icon: {
                url: 'house_5.gif',
                scaledSize: new google.maps.Size(40, 40)
            },

        });

        base3 = new google.maps.Marker({
            position: {lat: 36.58048, lng: 140.11979},
            map: map,
            icon: {
                url: 'house_5.gif',
                scaledSize: new google.maps.Size(40, 40)
            },

        });

        base4 = new google.maps.Marker({
            position: {lat: 36.59720, lng: 139.76889},
            map: map,
            icon: {
                url: 'house_5.gif',
                scaledSize: new google.maps.Size(40, 40)
            },

        });

        

        



        

        /*↓敵を出現させるメソッド*/
        class Enemy {
            constructor(p1, p2, p3) {
                this.lat = p1;
                this.lng = p2;
                this.img = p3;
                /*↓クラスの中でメソッドを発火させなければならない*/
                let enemy = this.createEnemy();
            }

            createEnemy() {
                new google.maps.Marker({
                    position: {lat: this.lat, lng: this.lng},
                    map: map,
                    icon: {
                        url: this.img,
                        scaledSize: new google.maps.Size(120, 120)
                    },
    
                });
            }

        }


        let enemys = [];
        let enemyStock = [];
        let sakuraLife = 500;
        sakuraLife = JSON.parse(localStorage.getItem('sakuraLife'));
        if(sakuraLife >= 500) {
            sakuraLife = 500;
        }
        enemyStock = enemyStock.concat(JSON.parse(localStorage.getItem('enemyStock')) || []);
        enemys = enemys.concat(JSON.parse(localStorage.getItem('enemys')) || []);
        
       /* for(i = 0; i < enemys.length; i++) {
            new Enemy(enemys[i].lat, enemys[i].lng);
        }
        */
        
        function pushEnemy() {
            function enemyPush() {
                if(enemys.length > 4) {
                    return;
                }
                

                const source = [
                    {
                        name: '五千石球場',
                        lat: 36.41194,
                        lng: 139.89193,
                        img: 'norimaro-stand.GIF',
                    },
                    {
                        name: '清原南公園',
                        lat: 36.53694,
                        lng: 139.98688,
                        img: 'norimaro-stand.GIF',
                    },
                    {
                        name: '市貝町北運動場',
                        lat: 36.58048,
                        lng: 140.11979,
                        img: 'shuma-stand.GIF',
                    },
                    {
                        name: '生きがいの森',
                        lat: 36.59720,
                        lng: 139.76889,
                        img: 'shuma-stand.GIF',
                    },
                ];
                const n = Math.floor(Math.random() * source.length);
                enemys[enemys.length] = source.splice(n, 1)[0];

                
                
            }
            enemyPush();

            /*↓カウンター*/    
        let elapsedTime = 0;
        elapsedTime = JSON.parse(localStorage.getItem('elapsedTime'));

        let d =Date.now();
        let startTime = d - elapsedTime;
        elapsedTime = Date.now();
        localStorage.setItem('elapsedTime', JSON.stringify(elapsedTime));
        let s = Math.floor(startTime/10000);



        console.log(s);
        console.log(startTime);
        console.log(elapsedTime);
        console.log(sakuraLat, sakuraLng);

        let time = 0.0000001;
        //let time = 0.01;



        for(let t = 0; t < s; t++) {
            for(i = 0; i < enemys.length; i++) {
                if(enemys[i].lat < sakuraLat && enemys[i].lng < sakuraLng) {
                    enemys[i].lat = enemys[i].lat + (time * s);
                    enemys[i].lng = enemys[i].lng + (time * s);
                    if(enemys[i].lat > sakuraLat && enemys[i].lng > sakuraLng){
                        enemyStock.push(enemys.splice(i, 1)[0]);
                    }
                }else
                if(enemys[i].lat < sakuraLat && enemys[i].lng > sakuraLng) {
                    enemys[i].lat = enemys[i].lat + (time * s);
                    enemys[i].lng = enemys[i].lng - (time * s); 
                    if(enemys[i].lat > sakuraLat && enemys[i].lng < sakuraLng){
                        enemyStock.push(enemys.splice(i, 1)[0]);
                    }  
                }else

                if(enemys[i].lat > sakuraLat && enemys[i].lng < sakuraLng) {
                    enemys[i].lat = enemys[i].lat - (time * s);
                    enemys[i].lng = enemys[i].lng + (time * s); 
                    if(enemys[i].lat < sakuraLat && enemys[i].lng > sakuraLng){
                        enemyStock.push(enemys.splice(i, 1)[0]);
                    }
                }else
                if(enemys[i].lat > sakuraLat && enemys[i].lng > sakuraLng) {
                    enemys[i].lat = enemys[i].lat - (time * s);
                    enemys[i].lng = enemys[i].lng - (time * s); 
                    if(enemys[i].lat < sakuraLat && enemys[i].lng < sakuraLng){
                        enemyStock.push(enemys.splice(i, 1)[0]);
                    }
                }

                



            }

            enemyPush();
        }

            console.log(enemyStock);
            console.log(enemyStock.length);



            localStorage.setItem("enemys", JSON.stringify(enemys));
            localStorage.setItem('enemyStock', JSON.stringify(enemyStock));
         
        /*   
        let elapsedTime = 0;
        elapsedTime = JSON.parse(localStorage.getItem('elapsedTime') || []);

        const d =Date.now();
        let startTime = d - elapsedTime;
        
        localStorage.setItem('elapsedTime', JSON.stringify(d));

        console.log(startTime);
        console.log(elapsedTime);
        */

        const sakuraArea = document.querySelector('.sakuraArea');
        const sakuraImg = document.createElement('img');
        sakuraImg.src = 'IMG_1935.GIF';
        while(sakuraArea.firstChild) {
            sakuraArea.removeChild(sakuraArea.firstChild);
        }
        sakuraArea.appendChild(sakuraImg);
        

        let hp = document.getElementById('hp');
        hp.style.width = sakuraLife + 'px';
        
        function sakuraDamege() {
            if(sakuraLife <= 0) {
                sakuraLife = 0;
                return;
            }
          sakuraLife = sakuraLife - enemyStock.length * s;
        }

        sakuraDamege();
        console.log(sakuraLife);
        localStorage.setItem("sakuraLife", JSON.stringify(sakuraLife));


        const waite = document.getElementById('waite');
        waite.textContent = '待機:' + enemyStock.length ;


        
        //敵のストックを右上に表示

       

        while(document.querySelector('.enemyStock').firstChild) {
            document.querySelector('.enemyStock').removeChild(document.querySelector('.enemyStock').firstChild);
        }

        enemyStock.forEach((chara, index) => {
            const img = document.createElement('img');
            img.src = chara.img;

            const li = document.createElement('li');
            li.appendChild(img);

            document.querySelector('.enemyStock').appendChild(li);
            li.addEventListener('click', () => {
                
                console.log(enemyStock[index]);

            });

        });
        
        /*
        for(let i = 0; i < enemyStock.length; i++) {
            const img = document.createElement('img');
            img.src = enemyStock[i].img;

            const li = document.createElement('li');
            li.appendChild(img);

            document.querySelector('.enemyStock').appendChild(li);
        }
        */





        

        


            setTimeout(() => {
                pushEnemy();
            },10000);
            console.log(enemys);
            console.log(enemys.length);
        }

        pushEnemy();

        for(i = 0; i < enemys.length; i++) {
            new Enemy(enemys[i].lat, enemys[i].lng, enemys[i].img);
        }
        

        

        
        


        

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
                    enemyStock.splice(0,1);
                    sakuraLife = sakuraLife + 50;
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

        const reset = document.getElementById('reset');
        reset.addEventListener('click', () => {
            enemyStock = [];

        });

    }

    

    function fail(error) {
        window.alert('位置情報取得できず');
    }

    navigator.geolocation.getCurrentPosition(success, fail);
}










