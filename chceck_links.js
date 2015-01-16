// alert(document.title);

// alert(location.host);

var pageTitle = document.title
var links = document.getElementsByTagName('a'); // get all links
var totalLinks = links.length
var linkAnchors = document.getElementsByTagName('a');
var linkInfo = ''


var w = window.open();
w.document.open();
w.document.write('<h1></h1>');
w.document.title = 'Link Test for ' + pageTitle
// w.document.close();

var linksTested = 0;
// alert(isNaN(linksTested));

var testStatus = w.document.createElement('div');
var testProgress = w.document.createElement('div');

function pause(){
  //do some things
  setTimeout(continueExecution, 3000) //wait 3 seconds before continuing
}


// begin contintueExecution function here
function continueExecution(){

  w.document.body.appendChild(testStatus);
  w.document.body.appendChild(testProgress);

  testProgress.style.width = "100%";

  testStatus.innerHTML = '<h1>Link Test Started</h1>'

  testProgress.textContent = 'Total links: ' + totalLinks 

  // begin for loop over links here
  for (var i = 0 ; i < links.length; i++)
  {

    // alert(links[i].href);

    // begin for loop to test internal / external links here
    if (links[i].host !== location.host) {
      // external
    }
    else {
      // internal

      // alert(links[i].host);

      url = links[i].href;

      // alert(url);

        // begin switch statement to elimintate exclusions
        str = url;

        switch (str) {
          case str.match(/layouts/gi):
            console.log("Matched a url that contains 'layouts'");
            break;
          case str.match(/file/gi):
            console.log("Matched a url that contains 'file'");        
            break;
          default:
            console.log("this one is okay to test");
            // begin if loop to test http status
            // if (http.status != 200){
            //  the next line is some dummy code for testing purposes. Comment out in production
            if (i == i){

              // alert(url);
              // var http = new XMLHttpRequest();
              // http.open('HEAD', url, false);
              // http.send();

              linkInfo = linkInfo + i.toString() + ') ' + links[i].href + ' = ' + linkAnchors[i].text + '<br />'
              var linksTested = parseInt(linksTested);
              var linksTested = linksTested++;
            
            // end for loop to test http status
            }

            break;
        
        // end switch statement to elimintate exclusions
        }

    // end for loop to test internal / external links here
    }

  // end for loop over links here
  }


testStatus.innerHTML = '<h1>Link Test Finished for: ' + pageTitle + '</h1>'

// alert(linksTested);

// testProgress.innerHTML = 'Total Links: ' + totalLinks + '<br /> Links Tested: ' + linksTested.toString() + '<br />'

// testProgress.textContent = linkInfo

testProgress.innerHTML = linkInfo

}

pause();

/*
// bookmarklet code
javascript:(function (){document.getElementsByTagName('head')[0].appendChild(document.createElement

('script')).src='http://YOURDOMAINHERE.COM/check_links.js?'+Math.random();}());

*/
