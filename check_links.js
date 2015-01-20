// alert(document.title);

// alert(location.host);

var pageTitle = document.title
var linkAnchors = document.getElementsByTagName('a');

var links = document.getElementsByTagName('a'); // get all links

var totalLinks = links.length
var totalLinksGood = 0
var totalLinksBad = 0
var totalLinksExternal = 0
var totalLinksExcluded = 0

var linkInfoGood = ''
var linkInfoBad = ''
var linkInfoExternal = ''
var linkInfoExcluded = ''
var linkInfoTotal = ''


var w = window.open();
w.document.open();
w.document.write('<h1></h1>');
w.document.title = 'Link Test for ' + pageTitle
// w.document.close();

var linksTested = 0;
// alert(isNaN(linksTested));

var testStatus = w.document.createElement('div');
var testProgressBadLinks = w.document.createElement('div');
var testProgressGoodLinks = w.document.createElement('div');
var testProgressExternalLinks = w.document.createElement('div');
var testProgressExcludedLinks = w.document.createElement('div');
var testProgressTotal = w.document.createElement('div');

function pause(){
  // begin pause function to allow for newly opened page to load completely
  setTimeout(continueExecution, 3000) //wait 3 seconds before continuing
}


// begin contintueExecution function here
function continueExecution(){

  w.document.body.appendChild(testStatus);
  w.document.body.appendChild(testProgressBadLinks);
  w.document.body.appendChild(testProgressGoodLinks);
  w.document.body.appendChild(testProgressExternalLinks);
  w.document.body.appendChild(testProgressExcludedLinks);  
  w.document.body.appendChild(testProgressTotal);
   
  testProgressGoodLinks.style.width = "100%";
  testProgressBadLinks.style.width = "100%";
  testProgressExternalLinks.style.width = "100%";  
  testProgressExcludedLinks.style.width = "100%";  
  testProgressTotal.style.width = "100%";
    
  testStatus.innerHTML = '<h1>Link Test Started for ' + pageTitle + '</h1>'

  // begin for loop over links here
  for (var i = 0 ; i < links.length; i++)
  {

    url = links[i].href;

    // begin switch statement to elimintate exclusions
  
    // begin enclosing function to test url to see if it contains some restricted locations, then open up a http request to the page and see if the page exists
    function test(url) {
      // begin switch statement to elimintate exclusions
      switch (true) {	
        // begin case statement to test for exclusions
        case links[i].host !== location.host:
          // console.log("Matched a url that is an external link");
          totalLinksExternal = totalLinksExternal + 1
          totalLinksExcluded = totalLinksExcluded + 1
          linkInfoExternal = linkInfoExternal + '<span class="external">' +  totalLinksExternal.toString() + ') <strong>External</strong> ' + links[i].href + ' = ' + linkAnchors[i].text + '</span><br />'
          linkInfoExcluded = linkInfoExcluded + '<span class="external">' +  totalLinksExcluded.toString() + ') <strong>External</strong> ' + links[i].href + ' = ' + linkAnchors[i].text + '</span><br />'
          linkInfoTotal = linkInfoTotal + '<span class="external" style="background-color:plum">' +  (i+1).toString() + ') <strong>External</strong> ' + links[i].href + ' = ' + linkAnchors[i].text + '</span><br />'
          break;
        case /layouts/gi.test(url):
          // console.log("Matched a url that contains 'layouts'");
          totalLinksExcluded = totalLinksExcluded + 1
          linkInfoExcluded = linkInfoExcluded + '<span class="excluded">' +  totalLinksExcluded.toString() + ') <strong>Excluded</strong> ' + links[i].href + ' = ' + linkAnchors[i].text + '</span><br />'
          linkInfoTotal = linkInfoTotal + '<span class="excluded" style="background-color:yellow">' +  (i+1).toString() + ') <strong>Excluded</strong> ' + links[i].href + ' = ' + linkAnchors[i].text + '</span><br />'
          break;
        case /file/gi.test(url):
          // console.log("Matched a url that contains 'file'");
          totalLinksExcluded = totalLinksExcluded + 1
          linkInfoExcluded = linkInfoExcluded + '<span class="excluded">' +  totalLinksExcluded.toString() + ') <strong>Excluded</strong> ' + links[i].href + ' = ' + linkAnchors[i].text + '</span><br />'
          linkInfoTotal = linkInfoTotal + '<span class="excluded" style="background-color:yellow">' +  (i+1).toString() + ') <strong>Excluded</strong> ' + links[i].href + ' = ' + linkAnchors[i].text + '</span><br />'
          break;
        default:
          // console.log("this link is okay to test");
          // console.log(url);
  
          //  the next line opens the link and gets the status of the http request. Comment out when testing or working on visual design
          var http = new XMLHttpRequest();
          http.open('HEAD', url, false);
  
          // begin try catch block to test for error on send
          try {
            http.send();
            var response = http.status;
            console.log(response);
  
            if (http.status == 200){
              // console.log("found a good link");
              // console.log(response);
              totalLinksGood = totalLinksGood + 1
              linkInfoGood = linkInfoGood + '<span class="good">' +  totalLinksGood.toString() + ') <strong>Good</strong> ' + links[i].href + ' = ' + linkAnchors[i].text + '</span><br />'
              linkInfoTotal = linkInfoTotal + '<span class="good" style="background-color:LightGreen">' +  (i+1).toString() + ') <strong>Good</strong> ' + links[i].href + ' = ' + linkAnchors[i].text + '</span><br />'
              var linksTested = parseInt(linksTested);
              var linksTested = linksTested++;
  
            } else if (http.status == 404) {
              // console.log("found a broken link");
              // console.log(response);
              totalLinksBad = totalLinksBad + 1
              linkInfoBad = linkInfoBad + '<span class="broken">' + totalLinksBad.toString() + ') <strong>Broken</strong> ' + links[i].href + ' = ' + linkAnchors[i].text + '</span><br />'
              linkInfoTotal = linkInfoTotal + '<span class="broken" style="background-color:LightCoral">' + (i+1).toString() + ') <strong>Broken</strong> ' + links[i].href + ' = ' + linkAnchors[i].text + '</span><br />'
              var linksTested = parseInt(linksTested);
              var linksTested = linksTested++;
  
            } else {
  
              // console.log("something else is happening here");
              // console.log(response);
              linkInfoTotal = linkInfoTotal + '<span class="something else" style="background-color:LightBlue">' +  (i+1).toString() + ') <strong>Something Else</strong> ' + links[i].href + ' = ' + linkAnchors[i].text + '</span><br />'
              var linksTested = parseInt(linksTested);
              var linksTested = linksTested++;
              
            // end if statement to test http status
            }
  
          } catch (e) {
        
            console.log(e);
            // end try catch block to test for error on send
            // linkInfoTotal = linkInfoTotal + '<span class="something else">' +  i.toString() + ') ' + links[i].href + ' = ' + linkAnchors[i].text + '</span><br />'
            // var linksTested = parseInt(linksTested);
            // var linksTested = linksTested++;
                
          // end try catch block to test for error on send
          }
            
          break;
        // end case statement to test for exclusions
  
      // end switch statement to elimintate exclusions
      }
    // end enclosing function to test url to see if it contains some restricted locations, then open up a http request to the page and see if the page exists
    }
  
    // call enclosing function to test url to see if it contains some restricted locations, then open up a http request to the page and see if the page exists
    test(url);

  // end for loop over links here
  }


testStatus.innerHTML = '<h1>Link Test Finished for: ' + pageTitle + '</h1>'

// alert(linksTested);
// testProgressGoodLinks.innerHTML = 'Total Links: ' + totalLinks + '<br /> Links Tested: ' + linksTested.toString() + '<br />'
// testProgressGoodLinks.textContent = linkInfo

testProgressTotal.innerHTML = '<h2>Total Links: ' + totalLinks + '</h2>' + linkInfoTotal
testProgressBadLinks.innerHTML = '<h2>Total Bad Links: ' + totalLinksBad + '</h2>' + linkInfoBad
testProgressExternalLinks.innerHTML = '<h2>Total External Links: ' + totalLinksExternal + '</h2>' + linkInfoExternal
testProgressExcludedLinks.innerHTML = '<h2>Total Excluded Links: ' + totalLinksExcluded + '</h2>' + linkInfoExcluded
testProgressGoodLinks.innerHTML = '<h2>Total Good Links: ' + totalLinksGood + '</h2>' + linkInfoGood

// end contintueExecution function here
}

pause();

/*
// bookmarklet code
javascript:(function (){document.getElementsByTagName('head')[0].appendChild(document.createElement('script')).src='http://YOURDOMAINHERE.COM/check_links.js?'+Math.random();}());
*/

