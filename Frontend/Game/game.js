const headerName = document.querySelector(".header_name")
const headerEmail = document.querySelector(".header_email")
const headerAvatar = document.querySelector(".header_avatar")
const headerScore = document.querySelector(".score")
const headerBall = document.querySelector(".ball")
const localId = localStorage.getItem("localId")
const token = localStorage.getItem("token")

const categorySelect = document.querySelector("#category")
const levelSelect = document.querySelector("#level")
const gameWraper = document.querySelector(".game__wraper")
const searchForm = document.querySelector(".search__form")

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
        const res = await fetch("https://skillrush-3adaf-default-rtdb.firebaseio.com/game.json")
        const data = await res.json()
        const dataArray = await Object.entries(data).map(([key, value]) => ({...value, firebaseKey: key}))
        renderGame(Object.values(dataArray))
    }catch(err){
        console.log(err.message)
    }
}

function renderGame(data){
    gameWraper.innerHTML = "" 

    data.forEach((el, index) => {
        gameWraper.innerHTML += `<a href="http://127.0.0.1:5500/Frontend/Game/gameDetail.html?gameId=${el.firebaseKey}"><div key="${index}" class="game__content">
            <span class="game_span">${el.level}</span>
            <h3 class="game_subtitle ${el.category === "IT"? "it": el.category === "IELTS"? "ielts" : "sat" }">${el.category}</h3>
        </div></a>`
    })
}

searchForm.addEventListener("submit", async(evt) => {
    evt.preventDefault()

    try{
        const res = await fetch("https://skillrush-3adaf-default-rtdb.firebaseio.com/game.json")
        const data = await res.json()
        const addFirebaseKey = await Object.entries(data).map(([key, value]) => ({...value, firebaseKey: key}))
        const searchArray = await Object.values(addFirebaseKey).filter((el) => categorySelect.value === "dontHaveCategory" || levelSelect.value === "dontHaveLevel"? categorySelect.value.toUpperCase() == el.category || levelSelect.value == el.level :  categorySelect.value.toUpperCase() == el.category && levelSelect.value == el.level)
        
        if(categorySelect.value === "dontHaveCategory" || levelSelect.value === "dontHaveLevel"){
            const dataArray = await Object.entries(data).map(([key, value]) => ({...value, firebaseKey: key}))
            renderGame(dataArray)
        }

        renderGame(searchArray) 
    }catch(err){
        console.log(err.message)
    } 
})

getProfile()
getGame()