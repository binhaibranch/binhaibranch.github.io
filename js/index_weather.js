/**
 * Created by zsq on 2016/11/13.
 */
//调用jsonp函数请求当前所在城市
jsonp('https://api.map.baidu.com/api?v=2.0&ak=Dv1NMU23dh1sGS9n2tUouDEYY96Dfzh3&s=1&callback=getCity');

function getCity() {
    function city(result) {
        //去掉城市名后的"市"
        var city = result.name.substring(0, result.name.length - 1);
        //请求当前城市的天气数据
        jsonp(createUrl(city)[0]);
        jsonp(createUrl(city)[1]);
    }
    var cityName = new BMap.LocalCity();
    cityName.get(city);
}

// 数据请求函数
function jsonp(url) {
    var script = document.createElement('script');
    script.src = url;
    document.body.insertBefore(script, document.body.firstChild);
    document.body.removeChild(script);
}

//数据请求成功回调函数，用于将获取到的数据放入页面相应位置
function getWeather(response) {
    var oSpan = document.getElementsByClassName('info');
    var data = response.result;
    oSpan[0].innerHTML = data[0].citynm;
    oSpan[1].innerHTML = data[0].days;
    oSpan[2].innerHTML = data[0].week;
    oSpan[3].innerHTML = data[0].weather;
    oSpan[4].innerHTML = data[0].temperature;
    oSpan[5].innerHTML = data[0].winp;
    oSpan[6].innerHTML = data[0].wind;

    //根据返回数据，替换不同天气图片
    changeImg(response);
}

function getTodayWeather(response) {
    var oSpan = document.getElementsByClassName('info');
    var data = response.results;
    oSpan[7].innerHTML = data[0].pm25;
}

//根据获取到的数据更改页面中相应的图片
function changeImg(data) {
    var firstImg = document.getElementsByTagName("img")[1];
    var firstWeatherId = data.result[0].weatid;
    chooseImg(firstWeatherId, firstImg);
}

//选择图片
function chooseImg(id, index) {
    switch (id) {
        case '1':
            index.src = 'images/weather_icon/1.png';
            break;
        case '2':
            index.src = 'images/weather_icon/2.png';
            break;
        case '3':
            index.src = 'images/weather_icon/3.png';
            break;
        case '26':
            index.src = 'images/weather_icon/4.png';
            break;
        case '7':
            index.src = 'images/weather_icon/6.png';
            break;
        case '29':
            index.src = 'images/weather_icon/5.png';
            break;
        case '33':
            index.src = 'images/weather_icon/7.png';
            break;
        default:
            index.src = 'images/weather_icon/8.png';
    }
}

//根据城市名创建请求数据及url
function createUrl() {
    var cityName = '';
    if (arguments.length == 0) {
        cityName = document.getElementById('text').value;
    } else {
        cityName = arguments[0];
    }
    var urls = [];
    urls[0] = 'https://sapi.k780.com/?app=weather.future&appkey=10003&sign=b59bc3ef6191eb9f747dd4e83c99f2a4&format=json&jsoncallback=getWeather&weaid=' + encodeURI(cityName);
    urls[1] = 'https://api.map.baidu.com/telematics/v3/weather?output=json&ak=FK9mkfdQsloEngodbFl4FeY3&callback=getTodayWeather&location=' + encodeURI(cityName);
    return urls;
}