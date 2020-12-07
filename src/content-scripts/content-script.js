console.log("content Script")

//MutationObserver
const config = {
    childList: true,
    subtree: true
}
const targeNode = document.getElementsByTagName('body')[0];
const observer = new MutationObserver(function () {
    chrome.runtime.sendMessage({
        from: 'content observer',
        data: fetchImgSrc()
    }, function (res) {
        console.log(res.from);
    });
});
observer.observe(targeNode, config);

function fetchImgSrc() {
    let images = []
    for (var i = 0; i < document.images.length; i++) {
        let s_r_c = document.images[i].src
        // console.log(s_r_c);
        images.push(s_r_c);
    }
    return images.concat(fetchBgImgSrc());
}

function fetchBgImgSrc() {
    let image = []
    let elm = document.getElementsByTagName("*")
    for (let el of elm) {
        console.log(el.style.backgroundImage.slice(4, -1).replace(/"/g, ""))
        image.push(el.style.backgroundImage.slice(4, -1).replace(/"/g, ""))
    }
    return image;
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    // Once we receive a message from the app vue 
    console.log("called for messages")
    if (request.msg === "getimages") {
        sendResponse({
            from: 'content onLoad',
            data: fetchImgSrc()
        });
    }
    return true;
});