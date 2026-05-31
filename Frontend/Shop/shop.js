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
getProfile()

async function getShop(){
    try{
        const res = await fetch("https://skillrush-3adaf-default-rtdb.firebaseio.com/shop.json")
        const data = await res.json()
        renderSkin(data)
    }catch(err){
        console.log(err.message)
    }
}
getShop()

function renderSkin(data){
    data.forEach(el => {
        shopList.innerHTML += `
          <li data-url="${el.img}" class="shop_item">
            <img width="90" src=${el.img} alt="" class="shop_img">
            <h3 class="shop_subtitle">${el.point} scores</h3>
          </li>`
    })
}

function searchAvatar(data){
    const searchAvatar = data.filter((el) => el.point == searchInput.value)
    renderSkin(searchAvatar)
}
searchForm.addEventListener("submit", async(evt) => {
    evt.preventDefault()
    try{
        const res = await fetch("https://skillrush-3adaf-default-rtdb.firebaseio.com/shop.json")
        const data = await res.json()
        searchAvatar(data)
    }catch(err){
        console.log(err.message)
    }
})