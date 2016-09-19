const API_KEY = '';
const ABS_TMP_DIFF = 273;

$(function() {
  var d = new $.Deferred();
  var formSpinner = $('#form-spinner');
  var formError = $('#form-error');
  var formResult = $('#form-result');
  $('#weather-form').on('submit', function(e) {
    formSpinner.css('display', 'inline');
    var cityName = $(this).find('#weather-form-city').prop('value');
    var requestUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
    requestUrl += cityName + '&APPID=' + API_KEY;
    $.ajax(requestUrl)
      .done(function(data) {
        if (data.cod == 200) {
          formSpinner.css('display', 'none');
          formError.css('display', 'none');
          $('#result-city-name').text(data.name);
          $('#result-temp').text(Math.round(data.main.temp - ABS_TMP_DIFF));
          $('#result-weather').text(data.weather[0].main);
          $('#result-datetime').text(Date(data.dt));
          formResult.css('display', 'block');
        } else {
          formSpinner.css('display', 'none');
          formError.css('display', 'block');
          formResult.css('display', 'none');
        }
      })
      .fail(function() {
        formSpinner.css('display', 'inline');
        alert('Something wrong occured.');
      });
    e.preventDefault();
  });
});