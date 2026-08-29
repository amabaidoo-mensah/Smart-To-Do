const form = document.getElementById("loginForm");
const identity = document.getElementById("name");
const occupation = document.getElementById("occupation");


form.addEventListener("submit",(event)=>{
    event.preventDefault();

    // Getting the user input values
   let userName = identity.value;
   let userOccupation = occupation.value;

 // Saving the information
  const user = {
    username: userName,
    useroccupation: userOccupation
 };

localStorage.setItem("userInfo", JSON.stringify(user));

 form.reset();

})