const $ = document
let inputElem = $.querySelector('input')
let btnElem = $.querySelector('button')
let result = $.querySelector('.result')
const sound = document.getElementById("sound");

btnElem.addEventListener('click', () => {
    if (inputElem.value) {
        showMeaning(inputElem.value)
    }

})

async function showMeaning(word) {
    await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            result.innerHTML =
                `<div class="word">
            <h3>${data[0].word}</h3>
            <button onclick="playSound()"><i class="fas fa-volume-up"></i></button>
        </div>
        <span>${data[0].phonetic}</span>
        <p>${data[0].meanings[0].definitions[0].definition}</p>`
            sound.setAttribute("src", `${data[0].phonetics[0].audio}`);

        })
        .catch(() => {
            result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`
        })
}
function playSound() {
    sound.play();
}