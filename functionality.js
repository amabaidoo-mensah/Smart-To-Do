const form = document.getElementById("loginForm");
const identity = document.getElementById("name");
const occupation = document.getElementById("occupation");


form.addEventListener("submit",(event)=>{
    event.preventDefault();

    // Getting the user input values
   let userName = identity.value;
   let userOccupation = occupation.value;

 // Save the information as an object
  const user = {
    username: userName,
    useroccupation: userOccupation
 };

localStorage.setItem("userInfo", JSON.stringify(user));

 form.reset();

 //Switch to the To-Do page
 window.location.href = "to-do.html"

})