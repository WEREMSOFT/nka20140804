var isApp = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;



function prompt(strMessage, fnctCallBaclFunction, strTitle, strButtonLabel) {
    if (isApp) {
        if (!strTitle) {
            strTitle = "Información";
        }

        if (!strButtonLabel) {
            strButtonLabel = "Ok";
        }
        navigator.notification.alert(strMessage, fnctCallBaclFunction, strTitle, strButtonLabel);
    } else {
        alert(strMessage);
        if (fnctCallBaclFunction)
            fnctCallBaclFunction();
    }
}

function promptError(strMessage, fnctCallBaclFunction, strTitle, strButtonLabel) {
    if(gaPlugin)
    {
        gaPlugin.trackEvent(googleAnalyticsTrackEventSuccess, googleAnalyticsTrakEventError, "Application", "Error", "Aplicación iniciada", 1);
    }
    if (isApp) {
        if (!strTitle) {
            strTitle = "Error";
        }

        if (!strButtonLabel) {
            strButtonLabel = "Ok";
        }
        navigator.notification.alert(strMessage, fnctCallBaclFunction, strTitle, strButtonLabel);
    } else {
        alert(strMessage);
        if (fnctCallBaclFunction)
            fnctCallBaclFunction();
    }
    if(console.logError)
    {
        console.logError(strMessage);
    }
}


function androidCloseApp()
{
    navigator.app.exitApp();
}

function goBackOnePage()
{
    ons.navigator.popPage();
}

console.logError = console.error;
console.error = promptError;

var deviceType = (navigator.userAgent.match(/iPad/i))  == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i))  == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "browser";

