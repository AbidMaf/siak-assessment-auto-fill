const getEvaluationComment = (inputValue) => {
    const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'X-API-KEY': 'bfe46922-5afb-4f84-907c-af5c6a7fb138'
        },
        body: JSON.stringify({
          enable_google_results: false,
          enable_memory: false,
          input_text: inputValue
        })
      };
      
      fetch('https://api.writesonic.com/v2/business/content/chatsonic?engine=premium', options)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            return response.message
        })
        .catch(err => console.error(err));
}

console.log("assasdas ", document.querySelectorAll('input[name="K01"]'))

if(document.querySelectorAll('input[name="K01"]').length == 0) {
    alert("Please open the evaluation form")
    console.log("Please open the evaluation form")
}

chrome.storage.local.get(['minRange', 'maxRange']).then((result) => {
    const rad = document.querySelectorAll('input[value="9"]')
    let nilaiPertanyaan = []
    rad.forEach((val, i) => {
        const pertanyaan = document.querySelectorAll(".norm>b")[i].innerHTML.replace(/[0-9]|\./g, '').toLowerCase().trim()
        // console.log("pertanyaan", pertanyaan)
        const nilaiMin = parseInt(result.minRange, 10)
        const nilaiMax = parseInt(result.maxRange, 10)
        // console.log({
        //     "nilaiMin": nilaiMin,
        //     "nilaiMax": nilaiMax
        // })

        const randomValue = Math.floor(Math.random() * (nilaiMax - nilaiMin + 1)) + nilaiMin
        // alert(`random value on ${i} is ${randomValue} \nMax: ${nilaiMax} \nMin: ${nilaiMin}`)
        console.log("random value ", randomValue)
        let indexOfQuestion = i < 9 ? '0'+(i+1) : i+1
        const getRadioVal = document.querySelectorAll(`input[value="${randomValue == 0 ? 1 : randomValue}"][name="K${indexOfQuestion}"]`)
        nilaiPertanyaan.push({
            pertanyaan: pertanyaan,
            nilai: randomValue == 0 ? 1 : randomValue
        })
        getRadioVal[0].checked = true
    })
    // console.log(nilaiPertanyaan)
    const nilaiToList = nilaiPertanyaan.map((val, i) => {
        // const temp = `${val.pertanyaan} dengan nilai ${val.nilai} ${i < nilaiPertanyaan.length - 1 ? ', ' : ''}`
        return `\n- ${val.pertanyaan}: ${val.nilai} dari 9`
    })
    console.log(`Buatlah komentar penilaian dosen yang memiliki bentuk penilaian sebagai berikut: ${nilaiToList}\n`)
    // document.getElementsByName("saran")[0].value = getEvaluationComment(`Buatlah komentar penilaian dosen yang memiliki bentuk penilaian sebagai berikut: ${nilaiToList}\n`)
})

// chrome.runtime.onMessage.addListener((request) => {
//     console.log("content.js", request.min, request.max)
//     if(request.from === "background") {
//         const rad = document.querySelectorAll('input[value="9"]')
//         rad.forEach((val, i) => {
//             const nilaiMin = request.min
//             const nilaiMax = request.max

//             const randomValue = Math.floor(Math.random() * (nilaiMax - nilaiMin) + nilaiMin)
//             let indexOfQuestion = i < 9 ? '0'+(i+1) : i+1
//             const getRadioVal = document.querySelectorAll(`input[value="${randomValue}"][name="K${indexOfQuestion}"]`)
//             getRadioVal[0].checked = true
//         })
//         document.getElementsByName("saran")[0].value = "Saya mengikuti MBKM"
//     }
// })