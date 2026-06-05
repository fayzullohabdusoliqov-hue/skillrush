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
const giveSection = document.querySelector(".give")
const giveBtn = document.querySelector(".close_btn")
const giveCorects = document.querySelector(".give_yes")
const giveNotCorects = document.querySelector(".give_no")
const giveSecund = document.querySelector("#secund")
const giveBall = document.querySelector("#ball")
const givePoint = document.querySelector("#point")
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
                time = 10
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
getGame()
getProfile()

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

const timer = setInterval(async() => {
    time--
    timeSpan.textContent = `${time} secund`

    if(time === 0){
        clearInterval(timer)
        giveSection.style.display = "block"
        const values = getValus()
        let corects = []

        try{
            const res = await fetch(`https://skillrush-3adaf-default-rtdb.firebaseio.com/game/${GAME_ID}.json`)
            const data = res.json()
            switch(data?.level){
                case "hard":
                    giveSecund.textContent = `180 secund`
                    break
                case "medium":
                    giveSecund.textContent = `120 secund`
                    break
                case "easy":
                    giveSecund.textContent = `60 secund`
                    break
            }

            for(let i = 0; i < data?.questions?.length; i++){
                if(data[i]?.questions?.answer === values[i]){
                    corects = [...corects, values[i]]
                }
            }
            
            giveCorects.textContent = `${corects.length} corects`
            giveNotCorects.textContent = `${data?.questions?.length - corects} not corects`
            
        }catch(err){
            console.log(err.message)
        }
    }
},1000)
function getValus(){
    const inputs = document.querySelectorAll(".test_input")
    const inputsValue = [...inputs].map((el) => el.value)
    return inputsValue
}
submitBtn.addEventListener("click", async(evt) => {
    evt.preventDefault()
    giveSection.style.display = "block"
    const values = getValus()
    let corects = []
    
    try{
        const res = await fetch(`https://skillrush-3adaf-default-rtdb.firebaseio.com/game/${GAME_ID}.json`)
        const data = await res.json()
        switch(data?.level){
                case "hard":
                    giveSecund.textContent = `180 secund`
                    break
                case "medium":
                    giveSecund.textContent = `120 secund`
                    break
                case "easy":
                    giveSecund.textContent = `60 secund`
                    break
            }

            for(let i = 0; i < data?.questions?.length; i++){
                if(data[i]?.questions?.answer === values[i]){
                    corects = [...corects, values[i]]
                }
            }
            
            giveCorects.textContent = `${corects.length} corects`
            giveNotCorects.textContent = `${data?.questions?.length - corects} not corects`
    }catch(err){
        console.log(err.message)
    }
})
giveBtn.addEventListener("click", (evt) => {
    evt.preventDefault()
    giveSection.style.display = "none"
    window.location.href = "http://127.0.0.1:5500/Frontend/Game/game.html"
})