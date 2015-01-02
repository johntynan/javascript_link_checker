// alert(document.title);

// alert(location.host);


var newDiv = document.createElement('div');
document.body.appendChild(newDiv);
newDiv.id = 'link_test'
newDiv.style.width = "500px"; 
newDiv.style.height = "500px"; 
newDiv.style.background = "#77a4d4"; 
newDiv.style.borderStyle = "solid"; 
newDiv.style.borderWidth = "1px";

var links = document.getElementsByTagName('a'); // get all links

alert('Link Test Started');

for (var i = 0 ; i < links.length; i++)
{

  // alert(links[i].href);

  if (links[i].host !== location.host) {
  // external
  }
  else {
  // internal

    // alert(links[i].host);

    url = links[i].href;

    // alert(url);

    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();

    if (http.status != 200){
      // alert(url);
    }

  newDiv.textContent = i;

  }

}

alert('Link Test Finished');


/*
// bookmarklet code
javascript:(function (){document.getElementsByTagName('head')[0].appendChild(document.createElement

('script')).src='http://YOURDOMAINHERE.COM/check_links.js?'+Math.random();}());

*/
