// ここにAPIのキーを入れてね
const API_KEY = '';

$(function(){
  $('#weather-form').on('submit',function(e){
    var cityName = $(this).find('#weather-form-city').prop('value');
    $.ajax('http://api.openweathermap.org/data/2.5/weather?APPID=' + API_KEY + '&q=' + cityName)
      .done(function(data) {
      if (data.cod == 200){
        $('#form-error').css('display','none');
        $("#result-city-name").text(data.name);
        $("#result-temp").text(Math.round(data.main.temp - 273));
        $("#result-weather").text(data.weather[0].main);
        $("#result-datetime").text(Date(data.dt));
        $("#form-result").css('display','block');
      }else{
        $("#form-error").css('display','block');
        $("#form-result").css('display','none');
      }
      //成功時の処理
    })
    .fail(function(date){
      //失敗時の処理
        $('#form-spinner').css('display','none');
        alert('something wrong occurred.');
    });
    e.preventDefault();
  });
});