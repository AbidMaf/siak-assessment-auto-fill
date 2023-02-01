const changeBg = () => {
    document.body.style.backgroundColor = "orange";
}

chrome.runtime.onMessage.addListener((request) => {
    // console.log("here2")
    if(request.from === "popup") {
        // console.log("here3")
        chrome.windows.getAll((currentWindows) => {
            // console.log("window ", currentWindows)
            chrome.tabs.query({
                active: true, 
                windowId: currentWindows.id,
                // url: "http://sino2.upi.edu/evaluasi-pbm/kuisioner.php"
            }, (currentTabs) => {
                currentTabs.map((tab) => {
                    // console.log("tab ", tab)
                    chrome.scripting.executeScript({
                        target: {tabId: tab.id},
                        files: ['content.js'],
                    });
                })
            })
        })
        // console.log("done")
    }
});
