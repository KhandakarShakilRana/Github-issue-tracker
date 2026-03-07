const signInBtn = document.getElementById("sign-In-Btn");


const signinbtn = () => {
    const userName = document.getElementById("username").value;
const password = document.getElementById("password").value;
    if(userName === "admin" && password === "admin123"){
        window.location.assign("home.html")
    }else{
        alert("Couldn't find any Account Under these Username and Password")
    }
        

//    window.location.assign("home.html")

}