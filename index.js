$('[lang]').hide();
$('[lang="jp"]').show();
$('#lang-switch').change(function () {
     var request = new XMLHttpRequest();
     request.open("GET", "../lang/ja.json", false);
     request.send(null)
     var jsonJP = JSON.parse(request.responseText);

     var request = new XMLHttpRequest();
     request.open("GET", "../lang/en.json", false);
     request.send(null)
     var jsonEN = JSON.parse(request.responseText);

     var lang = $(this).val();
     switch (lang) {
          case 'jp':
               // window.location = "./"
               for (let key in jsonJP) {
                    document.getElementById(key).innerHTML = jsonJP[key]
               }
               break;
          case 'en':
               // window.location = "../en"
               for (let key in jsonEN) {
                    document.getElementById(key).innerHTML = jsonEN[key]
               }
               break;
          default:
               window.location = "./"
     }
});