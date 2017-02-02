// (url: String, callback: Function) -> undefined

  var handlebars = require('handlebars');
  var $ = require('jquery');

  var source = $('#etsy-template').html();
  var template = handlebars.compile(source);


  // Execute a callback function with the JSON results from the url specified.


      var url = "https://api.etsy.com/v2/listings/active.js?api_key=cdwxq4soa7q4zuavbtynj8wx&keywords=fox%20racing&includes=Images,Shop";

      fetchJSONP(url, function(data) {
        // console.log(data);
        data.results.forEach(function(item){
          // console.log(item);
          var context = {
            title: item.title,
            price: item.price,
            image: item.Images[0].url_170x135,
            description: item.Shop.login_name
          };
          $('.my-images').append(template(context));
        })

      });

function fetchJSONP(url, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    var script = document.createElement('script');

    window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };

    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
}
