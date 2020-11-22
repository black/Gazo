chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    // Once we receive a message from the popup
    if (request.msg) {
        // If message has the `action` key `print_in_console`
        var images = [];
        if (request.msg === "getimages") {
            for (var i = 0; i < document.images.length; i++) {
                let s_r_c = document.images[i].src
                images.push(s_r_c);
                console.log(s_r_c)
            }
        }
        sendResponse({
            msg: images
        })
    }
});