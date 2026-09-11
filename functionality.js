// LOGIN / ONBOARDING

const form = document.getElementById("loginForm");

const identity =
  document.getElementById("name");

const occupation =
  document.getElementById("occupation");


if (form) {

  form.addEventListener("submit", (event) => {

    event.preventDefault();


    const userName =
      identity.value;

    const userOccupation =
      occupation.value;


    const user = {

      username: userName,

      useroccupation: userOccupation

    };


    localStorage.setItem(
      "userInfo",
      JSON.stringify(user)
    );


    form.reset();


    window.location.href =
      "dashboard.html";

  });

}


// DISPLAY USER NAME

const nameDisplay =
  JSON.parse(
    localStorage.getItem("userInfo")
  );


const nameD =
  document.getElementById("userName");


if (nameDisplay && nameD) {

  nameD.textContent =
    nameDisplay.username;

}

// GET SAVED TASKS


let userTaskInfo =
  JSON.parse(
    localStorage.getItem("taskInfo")
  ) || [];


// STAT CARDS


const totalTask =
  document.getElementById("totalTasks");

const pendingTask =
  document.getElementById("pendingTasks");

const completedTask =
  document.getElementById("completedTasks");

// UPDATE STATISTICS


function updateStats() {


  const total =
    userTaskInfo.length;


  const completed =
    userTaskInfo.filter(
      (task) => task.completed === true
    ).length;


  const pending =
    userTaskInfo.filter(
      (task) => task.completed === false
    ).length;


  if (totalTask) {

    totalTask.textContent =
      total;

  }


  if (completedTask) {

    completedTask.textContent =
      completed;

  }


  if (pendingTask) {

    pendingTask.textContent =
      pending;

  }

}


updateStats();

<<<<<<< HEAD
// ADD TASK MODAL


=======


// ==============================
// ADD TASK MODAL
// ==============================

>>>>>>> c2a120f8c4551f071be3a85b941e5ebe3de6aac3
const addTaskBtn =
  document.getElementById("addTaskBtn");

const taskModal =
  document.getElementById("taskModal");

const closeModal =
  document.querySelector(".closeModal");

const cancelBtn =
  document.querySelector(".cancelBtn");

const taskForm =
  document.getElementById("taskForm");



if (addTaskBtn && taskModal) {

  addTaskBtn.addEventListener(
    "click",
    () => {

      taskModal.classList.add(
        "active"
      );

    }
  );

}



if (closeModal && taskModal) {

  closeModal.addEventListener(
    "click",
    () => {

      taskModal.classList.remove(
        "active"
      );

    }
  );

}



if (cancelBtn && taskModal) {

  cancelBtn.addEventListener(
    "click",
    () => {

      taskModal.classList.remove(
        "active"
      );

    }
  );

}

// SAVE NEW TASK


if (taskForm) {

  taskForm.addEventListener(
    "submit",
    (event) => {

      event.preventDefault();


      const title =
        document.getElementById(
          "tTitle"
        ).value;


      const description =
        document.getElementById(
          "describe"
        ).value;


      const dueDate =
        document.getElementById(
          "date"
        ).value;


      const priority =
        document.getElementById(
          "priority"
        ).value;


      const newTask = {

        taskTitle: title,

        taskDescription:
          description,

        taskDate: dueDate,

        taskPriority:
          priority,

        completed: false

      };


      userTaskInfo.push(
        newTask
      );


      localStorage.setItem(
        "taskInfo",
        JSON.stringify(
          userTaskInfo
        )
      );


      taskForm.reset();


      if (taskModal) {

        taskModal.classList.remove(
          "active"
        );

      }


      updateStats();


      // Refresh My Tasks page
      displayMyTasks(
        currentFilter
      );


      // Refresh Dashboard
      displayDashboardTasks();

    }
  );

}


// DASHBOARD TASKS

const list =
  document.querySelector(".list");



function displayDashboardTasks() {


  if (!list) {

    return;

  }


  list.innerHTML = "";


  userTaskInfo.forEach(
    (task) => {


      const listItems =
        document.createElement(
          "div"
        );


      const checkBox =
        document.createElement(
          "input"
        );


      const taskDescription =
        document.createElement(
          "p"
        );


      const taskTitle =
        document.createElement(
          "h4"
        );


      const namedDate =
        document.createElement(
          "p"
        );


      const taskPrio =
        document.createElement(
          "h5"
        );


      listItems.classList.add(
        "taskItem"
      );


      checkBox.type =
        "checkbox";


      checkBox.checked =
        task.completed;


      taskTitle.textContent =
        task.taskTitle;


      taskDescription.textContent =
        task.taskDescription;


      namedDate.textContent =
        task.taskDate;


      taskPrio.textContent =
        task.taskPriority;


      taskPrio.classList.add(
        task.taskPriority
      );


      listItems.append(

        checkBox,

        taskTitle,

        taskDescription,

        namedDate,

        taskPrio

      );


      if (task.completed) {

        listItems.classList.add(
          "completed"
        );

      }


      checkBox.addEventListener(
        "change",
        () => {


          task.completed =
            checkBox.checked;


          localStorage.setItem(
            "taskInfo",
            JSON.stringify(
              userTaskInfo
            )
          );


          updateStats();


          if (
            checkBox.checked
          ) {

            listItems.classList.add(
              "completed"
            );

          } else {

            listItems.classList.remove(
              "completed"
            );

          }


          displayMyTasks(
            currentFilter
          );

        }
      );


      list.append(
        listItems
      );

    }
  );

}


displayDashboardTasks();


// MY TASKS

const taskList =
  document.querySelector(
    ".taskList"
  );


const filterBtns =
  document.querySelectorAll(
    ".filterBtn"
  );


const taskCount =
  document.querySelector(
    "#tasksBg .taskCount h3"
  );


let currentFilter =
  "all";


// DISPLAY MY TASKS


function displayMyTasks(
  filter = "all"
) {


  if (!taskList) {

    return;

  }


  taskList.innerHTML =
    "";


  let filteredTasks =
    userTaskInfo;


  // PENDING


  if (
    filter === "pending"
  ) {

    filteredTasks =
      userTaskInfo.filter(
        (task) =>
          task.completed === false
      );

  }

  // COMPLETED
  

  if (
    filter === "completed"
  ) {

    filteredTasks =
      userTaskInfo.filter(
        (task) =>
          task.completed === true
      );

  }


  // UPDATE COUNT
  

  if (taskCount) {


    if (
      filter === "all"
    ) {

      taskCount.textContent =
        `All Tasks · ${filteredTasks.length}`;

    }


    if (
      filter === "pending"
    ) {

      taskCount.textContent =
        `Pending Tasks · ${filteredTasks.length}`;

    }


    if (
      filter === "completed"
    ) {

      taskCount.textContent =
        `Completed Tasks · ${filteredTasks.length}`;

    }

  }


  // NO TASKS MESSAGE
 

  if (
    filteredTasks.length === 0
  ) {


    const emptyMessage =
      document.createElement(
        "p"
      );


    emptyMessage.textContent =
      "No tasks found.";


    emptyMessage.style.textAlign =
      "center";


    emptyMessage.style.padding =
      "30px";


    emptyMessage.style.color =
      "#777";


    taskList.append(
      emptyMessage
    );


    return;

  }

  // CREATE TASK CARDS
  

  filteredTasks.forEach(
    (task) => {


      const taskCard =
        document.createElement(
          "div"
        );


      taskCard.classList.add(
        "taskCard"
      );



      // TASK MAIN

      const taskMain =
        document.createElement(
          "div"
        );


      taskMain.classList.add(
        "taskMain"
      );



      // CHECKBOX

      const checkBox =
        document.createElement(
          "input"
        );


      checkBox.type =
        "checkbox";


      checkBox.classList.add(
        "taskCheck"
      );


      checkBox.checked =
        task.completed;



      // TASK INFO

      const taskInfo =
        document.createElement(
          "div"
        );


      taskInfo.classList.add(
        "taskInfo"
      );



      // TITLE

      const taskTitle =
        document.createElement(
          "h4"
        );


      taskTitle.textContent =
        task.taskTitle;



      // DESCRIPTION

      const taskDescription =
        document.createElement(
          "p"
        );


      taskDescription.textContent =
        task.taskDescription;



      // DATE

      const taskDate =
        document.createElement(
          "span"
        );


      taskDate.textContent =
        `Due: ${task.taskDate}`;



      taskInfo.append(

        taskTitle,

        taskDescription,

        taskDate

      );



      taskMain.append(

        checkBox,

        taskInfo

      );



      // PRIORITY

      const taskPriority =
        document.createElement(
          "div"
        );


      taskPriority.classList.add(
        "taskPriority"
      );



      const priorityBadge =
        document.createElement(
          "span"
        );


      priorityBadge.textContent =
        task.taskPriority
          .toUpperCase();


      priorityBadge.classList.add(
        task.taskPriority
      );



      taskPriority.append(
        priorityBadge
      );



      // ADD TO CARD

      taskCard.append(

        taskMain,

        taskPriority

      );


      // COMPLETED STYLE

      if (
        task.completed
      ) {

        taskCard.classList.add(
          "completed"
        );

      }


      // CHECKBOX EVENT

      checkBox.addEventListener(
        "change",
        () => {


          task.completed =
            checkBox.checked;


          localStorage.setItem(
            "taskInfo",
            JSON.stringify(
              userTaskInfo
            )
          );


          updateStats();


          displayMyTasks(
            currentFilter
          );

        }
      );



      taskList.append(
        taskCard
      );

    }
  );

}


// FILTER BUTTONS

if (taskList) {


  filterBtns.forEach(
    (button) => {


      button.addEventListener(
        "click",
        () => {


          filterBtns.forEach(
            (btn) => {

              btn.classList.remove(
                "active"
              );

            }
          );


          button.classList.add(
            "active"
          );


          currentFilter =
            button.textContent
              .trim()
              .toLowerCase();


          displayMyTasks(
            currentFilter
          );

        }
      );

    }
  );

  // SHOW ALL TASKS FIRST

  displayMyTasks(
    "all"
  );

}



// ==============================
// CALENDAR
// ==============================

const monthYear =
  document.getElementById(
    "monthYear"
  );


const calendarDates =
  document.getElementById(
    "calendarDates"
  );


const prevMonth =
  document.getElementById(
    "prevMonth"
  );


const nextMonth =
  document.getElementById(
    "nextMonth"
  );


let currentDate =
  new Date();



function renderCalendar() {


  if (
    !calendarDates ||
    !monthYear
  ) {

    return;

  }


  const year =
    currentDate.getFullYear();


  const month =
    currentDate.getMonth();


  const firstDay =
    new Date(
      year,
      month,
      1
    ).getDay();


  const lastDate =
    new Date(
      year,
      month + 1,
      0
    ).getDate();


  const monthName =
    currentDate.toLocaleString(
      "default",
      {
        month: "long"
      }
    );


  monthYear.textContent =
    `${monthName} ${year}`;


  calendarDates.innerHTML =
    "";



  // EMPTY DAYS BEFORE FIRST DATE

  for (
    let i = 0;
    i < firstDay;
    i++
  ) {


    const emptyDate =
      document.createElement(
        "span"
      );


    calendarDates.append(
      emptyDate
    );

  }



  // CREATE DATES

  for (
    let date = 1;
    date <= lastDate;
    date++
  ) {


    const dateElement =
      document.createElement(
        "span"
      );


    dateElement.textContent =
      date;


    const today =
      new Date();


    if (

      date ===
      today.getDate()

      &&

      month ===
      today.getMonth()

      &&

      year ===
      today.getFullYear()

    ) {

      dateElement.classList.add(
        "today"
      );

    }


    calendarDates.append(
      dateElement
    );

  }



  // EMPTY DAYS AFTER LAST DATE

  const lastDay =
    new Date(
      year,
      month,
      lastDate
    ).getDay();


  const remainingDays =
    6 - lastDay;


  for (
    let i = 0;
    i < remainingDays;
    i++
  ) {


    const emptyDate =
      document.createElement(
        "span"
      );


    calendarDates.append(
      emptyDate
    );

  }

}


// PREVIOUS MONTH

if (prevMonth) {

  prevMonth.addEventListener(
    "click",
    () => {


      currentDate.setMonth(
        currentDate.getMonth() - 1
      );


      renderCalendar();

    }
  );

}

// NEXT MONTH

if (nextMonth) {

  nextMonth.addEventListener(
    "click",
    () => {


      currentDate.setMonth(
        currentDate.getMonth() + 1
      );


      renderCalendar();

    }
  );

}


// INITIALIZE CALENDAR

if (calendarDates) {

  renderCalendar();

}