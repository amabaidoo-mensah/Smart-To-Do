const form = document.getElementById("loginForm");
const identity = document.getElementById("name");
const occupation = document.getElementById("occupation");


if (form) {
  form.addEventListener("submit", (event) => {
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

    // Switch to the To-Do page
    window.location.href = "to-do.html";

  });
}


// Add Tasks functionality
const addTaskBtn = document.getElementById("addTaskBtn");
const taskModal = document.getElementById("taskModal");
const closeModal = document.querySelector(".closeModal");

const cancelBtn = document.querySelector(".cancelBtn");
const taskForm = document.getElementById("taskForm");
const saveBtn = document.querySelector(".saveBtn");

const title = document.getElementById("tTitle");
const description = document.getElementById("describe");
const dueDate = document.getElementById("date");

const prioRity = document.getElementById("priority");


addTaskBtn.addEventListener("click", () => {
  taskModal.classList.add("active");
});

closeModal.addEventListener("click", () => {
  taskModal.classList.remove("active");
});

cancelBtn.addEventListener("click", () => {
  taskModal.classList.remove("active");
});


saveBtn.addEventListener("click", () => {

  // Collecting input
  let userTiltle = title.value;
  let userDescription = description.value;
  let userDate = dueDate.value;
  let userPriority = prioRity.value;

  // Saving inputs as an Object
  const userTasks = {
    taskTitle: userTiltle,
    taskDescription: userDescription,
    taskDate: userDate,
    taskPriority: userPriority,
    completed: false
  };


  // GET EXISTING TASKS
  let existingTasks = JSON.parse(localStorage.getItem("taskInfo")) || [];


  // ADD NEW TASK TO THE ARRAY
  existingTasks.push(userTasks);


  // SAVE ALL TASKS
  localStorage.setItem(
    "taskInfo",
    JSON.stringify(existingTasks)
  );


  taskModal.classList.remove("active");
});


// DISPLAY TASK

const userTaskInfo = JSON.parse(localStorage.getItem("taskInfo"));

const list = document.querySelector(".list");


if (userTaskInfo) {

  userTaskInfo.forEach((task) => {

    const listItems = document.createElement("div");
    const checkBox = document.createElement("input");
    const TaskDescription = document.createElement("p");
    const taskTitle = document.createElement("h4");
    const namedDate = document.createElement("p");
    const taskPrio = document.createElement("h5");


    listItems.classList.add("taskItem");

    checkBox.type = "checkbox";
    checkBox.checked = task.completed;

    taskTitle.textContent = task.taskTitle;
    TaskDescription.textContent = task.taskDescription;
    namedDate.textContent = task.taskDate;
    taskPrio.textContent = task.taskPriority;


    listItems.append(
      checkBox,
      taskTitle,
      TaskDescription,
      namedDate,
      taskPrio
    );


    // SAVE CHECKBOX STATE
    checkBox.addEventListener("change", () => {

      task.completed = checkBox.checked;

      localStorage.setItem(
        "taskInfo",
        JSON.stringify(userTaskInfo)
      );


      // ADD/REMOVE COMPLETED CLASS
      if (checkBox.checked) {
        listItems.classList.add("completed");
      } else {
        listItems.classList.remove("completed");
      }

    });


    // KEEP COMPLETED STYLE AFTER REFRESH
    if (task.completed) {
      listItems.classList.add("completed");
    }


    list.append(listItems);

  });

}



// CALENDAR

const monthYear = document.getElementById("monthYear");
const calendarDates = document.getElementById("calendarDates");
const prevMonth = document.getElementById("prevMonth");
const nextMonth = document.getElementById("nextMonth");

let currentDate = new Date();


function renderCalendar() {

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  const monthName = currentDate.toLocaleString("default", {
    month: "long"
  });

  monthYear.textContent = `${monthName} ${year}`;

  calendarDates.innerHTML = "";


  // Empty spaces before the first day
  for (let i = 0; i < firstDay; i++) {

    const emptyDate = document.createElement("span");

    calendarDates.append(emptyDate);
  }


  // Create the dates
  for (let date = 1; date <= lastDate; date++) {

    const dateElement = document.createElement("span");

    dateElement.textContent = date;


    // Check if this is today's date
    const today = new Date();

    if (
      date === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      dateElement.classList.add("today");
    }


    calendarDates.append(dateElement);
  }


  // Empty spaces after the last day
  const lastDay = new Date(year, month, lastDate).getDay();

  const remainingDays = 6 - lastDay;

  for (let i = 0; i < remainingDays; i++) {

    const emptyDate = document.createElement("span");

    calendarDates.append(emptyDate);
  }

}


// Previous month
prevMonth.addEventListener("click", () => {

  currentDate.setMonth(currentDate.getMonth() - 1);

  renderCalendar();

});


// Next month
nextMonth.addEventListener("click", () => {

  currentDate.setMonth(currentDate.getMonth() + 1);

  renderCalendar();

});


// Display calendar
renderCalendar();