chrome.runtime.onMessage.addListener(function (req, sender, sendResponse) {
    // First, validate the message's structure.
    if (req.from == 'content') {
        // Enable the page-action for the requesting tab.
        // chrome.pageAction.show(sender.tab.id);
        console.log("new data", sender.tab.id);
        sendResponse({
            from: 'background',
            msg: req.imgsrc
        })
    }
});