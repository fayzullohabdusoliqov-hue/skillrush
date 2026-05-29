const elSubmitBtn = document.querySelector(".login_btn")
const elSmallLogin = document.querySelector(".login_small")
const elEmailLogin = document.querySelector("#login-email")
const elPasswordLogin = document.querySelector("#login-password")

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
    
    if(!res.ok){
        throw new Error("We don't have this accaunt: " + data.error.message)
    }
  }catch(err){
    alert(err.message)
  }
}

async function userRegistor(email, password){
  try{
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

    if(!res.ok){
        throw new Error("We have this accaunt: " + data.error.message)
    }
  }catch(err){
    alert("We have this accaunt: " + err.message)
  }
}

// https://test-1206d-default-rtdb.firebaseio.com/users/${data.localId}.json?auth=${data.idToken} shu url bilan olingan token va localId yordamida foydalanuvchi ma'lumotlari ajratib olinadi