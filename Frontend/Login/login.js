const elLogin = document.querySelector(".login")
const elSubmitBtn = document.querySelector(".login_btn")
const elSmallLogin = document.querySelector(".login_small")
const elEmailLogin = document.querySelector("#login-email")
const elPasswordLogin = document.querySelector("#login-password")
const loading = document.querySelector(".section-loading")

elSubmitBtn.addEventListener("click", (evt) => {
  evt.preventDefault()
  if(elSmallLogin.textContent == "If you don't have accaunt will you need registor"){
    userLogin(elEmailLogin.value, elPasswordLogin.value)
  }else{
    userRegistor(elEmailLogin.value, elPasswordLogin.value)
  }
})
elSmallLogin.addEventListener("click", (evt) => {
    evt.preventDefault()
    if(elSmallLogin.textContent == "If you don't have accaunt will you need registor"){
        elSubmitBtn.textContent = "registor"
        elSmallLogin.textContent = "If you have accaunt will you need login"
    }else{
        elSubmitBtn.textContent = "login"
        elSmallLogin.textContent = "If you don't have accaunt will you need registor"
    }
})


async function userLogin(email, password){
  try{
    loading.style.display = "flex"
    elLogin.style.display = "none"
    const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBOZxD61FFMXBscDzQihhxexMvD-cHhabw`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }, 
        body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true
        })
    })
    const data = await res.json()
    localStorage.setItem("token", data?.idToken)
    localStorage.setItem("localId", data?.localId)
    window.location.href = "http://127.0.0.1:5500/Frontend/Home/home.html"
  }catch(err){
    alert(err.message)
  }finally{
    loading.style.display = "none"
    elLogin.style.display = "flex"
  }
}

async function userRegistor(email, password){
  try{
    loading.style.display = "flex"
    elLogin.style.display = "none"
    const res = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBOZxD61FFMXBscDzQihhxexMvD-cHhabw",{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }, 
        body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true
        })
    })
    const data = await res.json()
    const resProfile = await fetch(`https://skillrush-3adaf-default-rtdb.firebaseio.com/profile/${data?.localId}.json?auth=${data?.idToken}`,{
        method: "PUT",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            name: "User skill rush",
            email: email,
            avatar: "../../photo/icon/userIcon.png",
            score: 50,
            ball: 0,
            skins: [
              {
                img: "../../photo/icon/logo.png"
              },
              {
                img: "../../photo/icon/userIcon.png"
              }
            ]
        })
    })
    const dataProfile = await resProfile.json()

    alert("you are creating new accaunt!")
    localStorage.setItem("token", data?.idToken)
    localStorage.setItem("localId", data?.localId)
    window.location.href = "http://127.0.0.1:5500/Frontend/Home/home.html"
  }catch(err){
    alert("We have this accaunt: " + err.message)
  }finally{
    loading.style.display = "none"
    elLogin.style.display = "flex"
  }
}