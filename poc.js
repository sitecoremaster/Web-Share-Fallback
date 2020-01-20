var AddThisJSLoaded = false; //AddThis not loaded yet
var clickedOnShare = false; //share button is not clicked

var shareUrl = 'https://www.test.com/whatever';
var shareTitle = document.getElementsByTagName("title")[0].innerHtml;
var shareDescription = document.querySelector("meta[name=description]").getAttribute("content");;

// window.onload = function () {
//     window.history.pushState({}, shareTitle, shareUrl);
// }

//replace with your publisher ID
//it's in your profile setting
var AddThisPubID = "ra-5b056b31a239b6eb";
var AddThisJS =
    "//s7.addthis.com/js/300/addthis_widget.js#pubid=" + AddThisPubID;

function share(button) {

    if (navigator.share) {
        //check if Web Share API is supported by the browser

        navigator.share({
            title: shareTitle,
            text: shareDescription,
            url: shareUrl
        });
    } else {
        if (!AddThisJSLoaded && !clickedOnShare) {
            //when AddThis not loaded and share button isn't clicked
            clickedOnShare = true; //share button is clicked
            showLoading(button);
            shareByAddThis(button);
        } else {
            toggleAddThisButtons(button);
        }
    }
}

function shareByAddThis(button) {
    var script = document.createElement("script");
    script.async = true;
    script.src = AddThisJS;

    script.onload = function () {
        clickedOnShare = false; //AddThis JS is loaded
        addthis.user.ready(function (data) {
            AddThisJSLoaded = true; //AddThis loaded and ready to use
            hideLoading(button);
            showAddThisButtons(button);
        });
    };

    script.onerror = function () {
        clickedOnShare = false; //AddThis JS failed to load
        hideLoading(button);
    };

    document.body.appendChild(script);
}

function showLoading(button) {
    button.classList.add("loading");
}

function hideLoading(button) {
    button.classList.remove("loading");
}

function showAddThisButtons(button) {
    button.classList.add("showAddThisButtons");
}

function toggleAddThisButtons(button) {
    button.classList.toggle("showAddThisButtons");
}
