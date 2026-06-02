const headerName = document.querySelector(".header_name")
const headerEmail = document.querySelector(".header_email")
const headerAvatar = document.querySelector(".header_avatar")
const headerScore = document.querySelector(".score")
const headerBall = document.querySelector(".ball")
const localId = localStorage.getItem("localId")
const token = localStorage.getItem("token")

const leaderList = document.querySelector(".leader__list")
const leaderTopOneName = document.querySelector("#top_one-name")
const leaderTopTwoName = document.querySelector("#top_two-name")
const leaderTopThreeName = document.querySelector("#top_three-name")
const leaderTopOneAvatar = document.querySelector("#top_one-avatar")
const leaderTopTwoAvatar = document.querySelector("#top_two-avatar")
const leaderTopThreeAvatar = document.querySelector("#top_three-avatar")

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
async function getLeaders(){
    try{
        const res = await fetch("https://skillrush-3adaf-default-rtdb.firebaseio.com/profile.json")
        const resData = await res.json()
        const arrayData = await Object.values(resData)
        const sortData = await [...arrayData].sort((a,b) => b.ball - a.ball)

        leaderTopOneAvatar.src = `${sortData[0].avatar}`
        leaderTopOneName.textContent = `${sortData[0].name}`
        leaderTopTwoAvatar.src = `${sortData[1].avatar}`
        leaderTopTwoName.textContent = `${sortData[1].name}`
        leaderTopThreeAvatar.src = `${sortData[2].avatar}`
        leaderTopThreeName.textContent = `${sortData[2].name}`

        renderLeader(sortData)
    }catch(err){
        console.log(err.message)
    }
}
function renderLeader(sortData){
    leaderList.innerHTML = ""
    for(let i = 0; i < sortData.length; i++){
        leaderList.innerHTML += `<li class="leader_item">
            <div class="leader__left">
                <span class="leader_reating">${i + 1}</span>
                <img src="${sortData[i].avatar}" alt="" class="leader_avatar">
                <h3 class="leader_subtitle">${sortData[i].name}</h3>
            </div>
            <div class="leader__right">
                <strong class="leader_ball">${sortData[i].ball} ball</strong>
                <strong class="leader_score">${sortData[i].score} score</strong>
            </div>
        </li>`
    }
}
getLeaders()
getProfile()