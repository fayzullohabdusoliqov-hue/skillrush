const headerName = document.querySelector(".header_name")
const headerEmail = document.querySelector(".header_email")
const headerAvatar = document.querySelector(".header_avatar")
const headerScore = document.querySelector(".score")
const headerBall = document.querySelector(".ball")
const localId = localStorage.getItem("localId")
const token = localStorage.getItem("token")

const GAME_ID = new URLSearchParams(window.location.search).get("gameId")
const testWraper = document.querySelector(".test__wraper")
const kahotWraper = document.querySelector(".kahot__wraper")
const timeSpan = document.querySelector("#time")
const input = document.createElement("input")
const submitBtn = document.querySelector(".game_btn")
let time = 60

async function getProfile(){
    try{
        const res = await fetch(`https://skillrush-3adaf-default-rtdb.firebaseio.com/profile/${localId}.json?auth=${token}`)
        const data = await res.json()

        headerName.textContent = `${data?.name}`
        headerEmail.textContent = `${data?.email}`
        headerAvatar.src = `${data?.avatar}`
        headerScore.textContent = `${data?.score}`
        headerBall.textContent = `${data?.ball}`
    }catch(err){
        console.log(err.message)
    }
}
async function getGame(){
    try{
        const res = await fetch(`https://skillrush-3adaf-default-rtdb.firebaseio.com/game/${GAME_ID}.json`)
        const data = await res.json()
        
        switch(data.level){
            case "hard":
                time = 180
                timeSpan.textContent = `${time} secund`
                break
            case "medium":
                time = 120
                timeSpan.textContent = `${time} secund`
                break
            case "easy":
                time = 60
                timeSpan.textContent = `${time} secund`
                break
        }

        if(data.type === "test"){
            renderTest(data?.questions)
        }else{
            renderKahot(data?.questions)
        }

    }catch(err){
        console.log(err.message)
    }
}
function renderKahot(data){
    kahotWraper.innerHTML = ""

    for(let i = 0; i < data.length; i++){
        kahotWraper.innerHTML += `${data[i].question}`
    }
}
function renderTest(data){
    for(let i = 0; i < data.length; i++){
        testWraper.innerHTML += `
          <div class="test__content">
            <p class="test_text"><strong class="test_strong">Question ${i + 1}:</strong> ${data[i].question}</p>
          </div>`
          input.type = "text"
          input.placeholder = `question ${i + 1}`
          input.classList.add("test_input")
          testWraper.appendChild(input)
    }

}

const timer = setInterval(() => {
    time--
    timeSpan.textContent = `${time} secund`

    if(time === 0){
        clearInterval(timer)
        getValus()
    }
},1000)
function getValus(){
    const inputs = document.querySelectorAll(".test_input")
    const inputsValue = [...inputs].map((el) => el.value)
    return inputs
}
submitBtn.addEventListener("click", (evt) => {
    evt.preventDefault()
    getValus()
})

getGame()
getProfile()