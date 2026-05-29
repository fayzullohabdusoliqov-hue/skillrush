const headerName = document.querySelector(".header_name")
const headerEmail = document.querySelector(".header_email")
const localId = localStorage.getItem("localId")
const token = localStorage.getItem("token")

async function getProfile(){
    try{
        const res = await fetch(`https://skillrush-3adaf-default-rtdb.firebaseio.com/profile/${localId}.json?auth=${token}`)
        const data = await res.json()
        console.log(data)

        headerName.textContent = `${data?.name}`
        headerEmail.textContent = `${data?.email}`
    }catch(err){
        console.log(err.message)
    }
}
getProfile()