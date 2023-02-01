const btn = document.getElementById('runScript');
const min = document.getElementById('minRange');
const max = document.getElementById('maxRange');

chrome.storage.local.get(['minRange', 'maxRange'], (result) => {
    if (result.minRange != null && result.maxRange != null) {
        min.value = '1'
        max.value = '9'
        min.value = 1
        max.value = result.maxRange
    }
})

const valueRange = {
    min: min.value,
    max: max.value
}

min.addEventListener('keydown', (e) => {
    if (parseInt(min.value + e.key) > 9 || min.value + e.key === max.value || parseInt(min.value + e.key) < 1) {
        e.preventDefault()
    }
})

btn.onclick = () => {
    console.log("min ", min.value)
    // if (min.value == null || max.value == null) {
    //     alert("Please fill the range")
    //     return
    // }
    chrome.storage.local.set({
        "minRange": min.value, 
        "maxRange": max.value
    }).then(() => {
        chrome.runtime.sendMessage({
            from: "popup", 
            subject: "check all button"
        })
    })
    // chrome.runtime.sendMessage("popup")
}