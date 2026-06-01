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
        userSkins = data?.skins
    }catch(err){
        console.log(err.message)
    }
}
async function getShop(){
    try{
        const res = await fetch("https://skillrush-3adaf-default-rtdb.firebaseio.com/shop.json")
        const data = await res.json()
        const filterArray = filterAvatar(data)
        renderSkin(filterArray)
    }catch(err){
        console.log(err.message)
    }
}
function filterAvatar(data) {
    return data.filter(shopSkin =>
        !userSkins.some(userSkin => userSkin.img === shopSkin.img)
    )
}
function renderSkin(data){
    shopList.innerHTML = ""
    data.forEach((el) => {
        shopList.innerHTML += `
          <li data-url="${el.img}" class="shop_item">
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
    const itemUrl = itemData.dataset.url
    
    try{
        const res = await fetch("https://skillrush-3adaf-default-rtdb.firebaseio.com/shop.json")
        const data = await res.json()
        const findAvatar = data?.find((el) => el.img === itemUrl)
        avatarScore = findAvatar.point
        avatarImg = findAvatar.img
        buyImg.setAttribute("src", `${findAvatar.img}`)
    }catch(err){
        console.log(err.message)
    }finally{
        buySection.style.display = "block"
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
            body:JSON.stringify({
                score: userScore - avatarScore,
                skins: [
                  ...userSkins,
                  {
                    img: avatarImg
                  }
                ]
            })
          })
          const data = await res.json()
        }catch(err){
            console.log(err.message)
        }finally{
            buySection.style.display = "none"
            window.location.reload()
        }
    }else{
        alert(`You dont have ${avatarScore} point`)
    }
})
getShop()
getProfile()