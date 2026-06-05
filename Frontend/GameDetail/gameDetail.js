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
    testWraper.innerHTML = ""

    for(let i = 0; i < data.length; i++){
        testWraper.innerHTML += `
            <div class="test__content">
             <p class="test_text"><strong class="test_strong">Question ${i + 1}:</strong> ${data[i].question}</p>
             <input type="text" placeholder="question ${i + 1}"/>
            </div>`
    }
}

// const timer = setInterval(() => {
//     time--
//     timeSpan.textContent = `${time} secund`

//     if(time === 0){
//         clearInterval(timer)
//         alert("your time finally")
//     }
// },1000)

getGame()
getProfile()