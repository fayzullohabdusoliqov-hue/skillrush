const headerName = document.querySelector(".header_name")
const headerEmail = document.querySelector(".header_email")
const headerAvatar = document.querySelector(".header_avatar")
const headerScore = document.querySelector(".score")
const headerBall = document.querySelector(".ball")
const localId = localStorage.getItem("localId")
const token = localStorage.getItem("token")

const profileForm = document.querySelector(".profile__form")
const profileInput = document.querySelector("#name")
const profileLabel = document.querySelector(".profile_label")
const skinsList = document.querySelector(".skins__list")

async function getProfile(){
    try{
        const res = await fetch(`https://skillrush-3adaf-default-rtdb.firebaseio.com/profile/${localId}.json?auth=${token}`)
        const data = await res.json()

        headerName.textContent = `${data?.name}`
        headerEmail.textContent = `${data?.email}`
        headerAvatar.src = `${data?.avatar}`
        headerScore.textContent = `${data?.score}`
        headerBall.textContent = `${data?.ball}`
        const filterNull = data?.skins?.filter((el) => el != null)
        renderSkins(filterNull)
    }catch(err){
        console.log(err.message)
    }
}
getProfile()

profileInput.addEventListener("input", () => {
    let nameLength = profileInput.value
    profileLabel.textContent = `21/${nameLength.length}`

    if(nameLength.length > 21){
        profileLabel.style.color = "red"
        profileLabel.textContent = "Your name have to 21 worbs"
    }else{
        profileLabel.style.color = "#dfdffdcb"
        profileLabel.textContent = `21/${nameLength.length}`
    }
})

async function patchName(){
    try{
        const res = await fetch(`https://skillrush-3adaf-default-rtdb.firebaseio.com/profile/${localId}.json?auth=${token}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body:JSON.stringify({
                name: profileInput.value
            })
        })
        const data = await res.json()
        console.log(data)
    }catch(err){
        console.log("hatolik" + err.message)
    }finally{
        window.location.reload()
    }
}
profileForm.addEventListener("submit", (evt) => {
    evt.preventDefault()
    patchName()
})

function renderSkins(skins){
    for(let i = 0; i < skins.length; i++){
        skinsList.innerHTML += `<li data-url="${skins[i].img}" class="skins_item"><img width="80" src=${skins[i].img} alt="" class="skins_img"></li>`
    }
}
skinsList.addEventListener("click", async(evt) => {
    const clickItem = evt.target.closest(".skins_item")
    const clickItemUrl = clickItem.dataset.url
    
    try{
        const res = await fetch(`https://skillrush-3adaf-default-rtdb.firebaseio.com/profile/${localId}.json?auth=${token}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                avatar: clickItemUrl
            })
        })
        const data = await res.json
    }catch(err){
        console.log(err.message)
    }finally{
        window.location.reload()
    }
})
