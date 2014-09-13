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
}


console.error = promptError;
