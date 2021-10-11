'use strict';
// geolocation
navigator.geolocation.getCurrentPosition(success, fail);

function success(pos) {
    ajaxRequest(pos.coords.latitude, pos.coords.longitude);
}

function fail(error) {
    alert('位置情報の取得に失敗しました。エラーコード：' + error.code);
}

// UTCをミリ秒に
function utcToJSTime(utcTime) {
    return utcTime * 1000;
}

// データ取得
function ajaxRequest(lat, long) {
    const url = 'https://api.openweathermap.org/data/2.5/forecast';
    const appId = '9da30a5363ca8e95d6cf51358373fbf7';

    $.ajax({
        url: url,
        data: {
            appid: appId,
            lat: lat,
            lon: long,
            units: 'metric',
            lang: 'ja'
        }
    })
    .done(function(data) {
        // 都市名、国名
        $('#place').text(data.city.name + ', ' + data.city.country);

        // 天気予報データ
        data.list.forEach(function(forecast, index) {
            const dateTime = new Date(utcToJSTime(forecast.dt));
            const month = dateTime.getMonth() + 1;
            const date = dateTime.getDate();
            const hours = dateTime.getHours();
            const min = String(dateTime.getMinutes()).padStart(2, '0');
            const temperature = Math.round(forecast.main.temp);
            const description = forecast.weather[0].description;
            const iconPath = `${forecast.weather[0].icon}.svg`;

            // 現在の天気とそれ以外で出力を変える
            if(index === 0) {
                const currentWeather = `
                <div class="icon"><img src="${iconPath}"></div>
                <div class="info">
                    <p>
                        <span class="description">現在の天気：${description}</span>
                        <span class="temp">${temperature}</span>°C
                    </p>
                </div>`;
                $('#weather').html(currentWeather);
							  
							function sakuracomme () {
	              const sakuraText = document.getElementById('textArea');
	
	              if(temperature <= 20 && temperature > 15) {
		              sakuraText.innerHTML = `<P>今の気温は${temperature}°C<br>ちょっとひんやりかな？</p>`;
	              }else if(temperature <= 15 && temperature >= 10) {
									sakuraText.innerHTML = `<P>今の気温は${temperature}°C<br>うぅぅ。。。寒ぅ〜〜！　身体動かさないとね！！</p>`;
								}else if(temperature < 10) {
									sakuraText.innerHTML = `<P>今の気温は${temperature}°C<br>む〜りぃ〜！！上着ちょうだいよ〜！！</p>`;
								}else if(temperature >= 21) {
									sakuraText.innerHTML = `<P>今の気温は${temperature}°C<br>うんっ！！丁度いい気温で動きやすいね！！</p>`;
								}
	            }
	            sakuracomme();
            } else {
                const tableRow = `
                <tr>
                    <td class="info">
                        ${month}/${date} ${hours}:${min}
                    </td>
                    <td class="icon"><img src="${iconPath}"></td>
                    <td><span class="description">${description}</span></td>
                    <td><span class="temp">${temperature}°C</span></td>
                </tr>`;
                $('#forecast').append(tableRow);
            }
        });
    })
    .fail(function() {
        console.log('$.ajax failed!');
    })
}
