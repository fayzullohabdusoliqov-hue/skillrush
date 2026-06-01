const headerName = document.querySelector(".header_name")
const headerEmail = document.querySelector(".header_email")
const headerAvatar = document.querySelector(".header_avatar")
const headerScore = document.querySelector(".score")
const headerBall = document.querySelector(".ball")
const localId = localStorage.getItem("localId")
const token = localStorage.getItem("token")

const shopList = document.querySelector(".shop__list")
const searchInput = document.querySelector(".search_input")
const searchForm = document.querySelector(".search__form")
const buySection = document.querySelector(".buy")
const buyYesBtn = document.querySelector(".buy_btn-yes")
const buyNoBtn = document.querySelector(".buy_btn-no")
const buyImg = document.querySelector(".buy_img")
let userScore = 0
let avatarScore = 0
let userSkins = []
let avatarImg = ""

async function getProfile(){
    try{
        const res = await fetch(`https://skillrush-3adaf-default-rtdb.firebaseio.com/profile/${localId}.json?auth=${token}`)
        const data = await res.json()

        headerName.textContent = `${data?.name}`
        headerEmail.textContent = `${data?.email}`
        headerAvatar.src = `${data?.avatar}`
        headerScore.textContent = `${data?.score}`
        headerBall.textContent = `${data?.ball}`
        userScore = data?.score
        userSkins = [...data?.skins]
    }catch(err){
        console.log(err.message)
    }
}
async function getShop(){
    try{
        const res = await fetch("https://skillrush-3adaf-default-rtdb.firebaseio.com/shop.json")
        const data = await res.json()
        renderSkin(data)
    }catch(err){
        console.log(err.message)
    }
}
function renderSkin(data){
    shopList.innerHTML = ""
    data.forEach((el, index) => {
        shopList.innerHTML += `
          <li data-id="${index}" class="shop_item">
            <img width="90" src=${el.img} alt="" class="shop_img">
            <h3 class="shop_subtitle">${el.point} scores</h3>
          </li>`
    })
}
function searchAvatar(data){
    if(searchInput.value == ""){
        return data
    }else{
        const searchAvatar = data.filter((el) => el.point == searchInput.value)
        return searchAvatar
    }
}
searchForm.addEventListener("submit", async(evt) => {
    evt.preventDefault()
    try{
        const res = await fetch("https://skillrush-3adaf-default-rtdb.firebaseio.com/shop.json")
        const data = await res.json()
        const searchArray = searchAvatar(data)
        renderSkin(searchArray)
    }catch(err){
        console.log(err.message)
    }
})
shopList.addEventListener("click", async(evt) => {
    const itemData = evt.target.closest(".shop_item")
    const itemIndex = itemData.dataset.id
    setTimeout(() => {
        buySection.style.display = "block"
    }, 500)
    
    try{
        const res = await fetch("https://skillrush-3adaf-default-rtdb.firebaseio.com/shop.json")
        const data = await res.json()
        const findAvatar = data[itemIndex]
        avatarScore = findAvatar.point
        avatarImg = findAvatar.img
        buyImg.setAttribute("src", `${findAvatar.img}`)
    }catch(err){
        console.log(err.message)
    }
})
buyNoBtn.addEventListener("click", (evt) => {
    evt.preventDefault()
    buySection.style.display = "none"
})
buyYesBtn.addEventListener("click", async(evt) => {
    evt.preventDefault()

    if(userScore >= avatarScore){
        try{
          const res = await fetch(`https://skillrush-3adaf-default-rtdb.firebaseio.com/profile/${localId}.json?auth=${token}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: {
                score: userScore - avatarScore,
                skins: [
                  ...userSkins,
                  {
                    img: avatarImg
                  }
                ]
            }
          })
          const data = await res.json()
        }catch(err){
            console.log(err.message)
        }
    }else{
        alert(`You dont have ${avatarScore} point`)
    }
})
getShop()
getProfile()