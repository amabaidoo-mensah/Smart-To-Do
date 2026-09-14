// LOGIN / ONBOARDING

const form =
  document.getElementById("loginForm");

const identity =
  document.getElementById("name");

const occupation =
  document.getElementById("occupation");


if (form) {

  form.addEventListener(
    "submit",
    (event) => {

      event.preventDefault();

      const userName =
        identity.value;

      const userOccupation =
        occupation.value;

      const user = {

        username: userName,

        useroccupation:
          userOccupation

      };


      localStorage.setItem(
        "userInfo",
        JSON.stringify(user)
      );


      form.reset();


      window.location.href =
        "dashboard.html";

    }
  );

}


// DISPLAY USER NAME


const nameDisplay =
  JSON.parse(
    localStorage.getItem(
      "userInfo"
    )
  );


const nameD =
  document.getElementById(
    "userName"
  );


if (nameDisplay && nameD) {

  nameD.textContent =
    nameDisplay.username;

}



// TASK DATA


let userTaskInfo =
  JSON.parse(
    localStorage.getItem(
      "taskInfo"
    )
  ) || [];



// TASK STATISTICS


const totalTask =
  document.getElementById(
    "totalTasks"
  );

const pendingTask =
  document.getElementById(
    "pendingTasks"
  );

const completedTask =
  document.getElementById(
    "completedTasks"
  );


function updateStats() {

  const total =
    userTaskInfo.length;


  const completed =
    userTaskInfo.filter(
      (task) =>
        task.completed === true
    ).length;


  const pending =
    userTaskInfo.filter(
      (task) =>
        task.completed === false
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



// ADD TASK MODAL


const addTaskBtn =
  document.getElementById(
    "addTaskBtn"
  );


const taskModal =
  document.getElementById(
    "taskModal"
  );


const closeModal =
  document.querySelector(
    ".closeModal"
  );


const cancelBtn =
  document.querySelector(
    ".cancelBtn"
  );


const taskForm =
  document.getElementById(
    "taskForm"
  );


// OPEN MODAL

if (
  addTaskBtn &&
  taskModal
) {

  addTaskBtn.addEventListener(
    "click",
    () => {

      taskModal.classList.add(
        "active"
      );

    }
  );

}


// CLOSE MODAL

if (
  closeModal &&
  taskModal
) {

  closeModal.addEventListener(
    "click",
    () => {

      taskModal.classList.remove(
        "active"
      );

    }
  );

}


// CANCEL BUTTON

if (
  cancelBtn &&
  taskModal
) {

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

        taskTitle:
          title,

        taskDescription:
          description,

        taskDate:
          dueDate,

        taskPriority:
          priority,

        completed:
          false

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


      displayMyTasks(
        currentFilter
      );


      displayDashboardTasks();


      renderCalendar();

    }
  );

}



// DASHBOARD TASK DISPLAY


function displayDashboardTasks() {

  const taskList =
    document.querySelector(
      ".list"
    );


  if (!taskList) {

    return;

  }


  taskList.innerHTML = "";


  if (
    userTaskInfo.length === 0
  ) {

    taskList.innerHTML =
      `<p>No tasks yet.</p>`;

    return;

  }


  userTaskInfo.forEach(
    (task, index) => {

      const taskItem =
        document.createElement(
          "div"
        );


      taskItem.classList.add(
        "taskItem"
      );


      if (task.completed) {

        taskItem.classList.add(
          "completed"
        );

      }


      // Checkbox

      const checkbox =
        document.createElement(
          "input"
        );


      checkbox.type =
        "checkbox";


      checkbox.checked =
        task.completed;


      checkbox.addEventListener(
        "change",
        () => {

          userTaskInfo[index]
            .completed =
            checkbox.checked;


          localStorage.setItem(
            "taskInfo",
            JSON.stringify(
              userTaskInfo
            )
          );


          updateStats();

          displayDashboardTasks();

          displayMyTasks(
            currentFilter
          );

          renderCalendar();

        }
      );


      // Task information

      const taskInfo =
        document.createElement(
          "div"
        );


      const title =
        document.createElement(
          "h4"
        );


      title.textContent =
        task.taskTitle;


      const description =
        document.createElement(
          "p"
        );


      description.textContent =
        task.taskDescription;


      const date =
        document.createElement(
          "p"
        );


      date.textContent =
        task.taskDate;


      taskInfo.appendChild(
        title
      );


      taskInfo.appendChild(
        description
      );


      taskInfo.appendChild(
        date
      );


      // Priority

      const priority =
        document.createElement(
          "h5"
        );


      priority.textContent =
        task.taskPriority;


      priority.classList.add(
        task.taskPriority
      );


      taskItem.appendChild(
        checkbox
      );


      taskItem.appendChild(
        taskInfo
      );


      taskItem.appendChild(
        priority
      );


      taskList.appendChild(
        taskItem
      );

    }
  );

}


displayDashboardTasks();



// MY TASKS PAGE


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


// =========================
// DISPLAY MY TASKS
// =========================

function displayMyTasks(
  filter = "all"
) {

  if (!taskList) {

    return;

  }


  taskList.innerHTML = "";


  let filteredTasks =
    userTaskInfo;


  // Pending

  if (
    filter === "pending"
  ) {

    filteredTasks =
      userTaskInfo.filter(
        (task) =>
          task.completed === false
      );

  }


  // Completed

  if (
    filter === "completed"
  ) {

    filteredTasks =
      userTaskInfo.filter(
        (task) =>
          task.completed === true
      );

  }



  // TASK COUNT


  if (taskCount) {

    if (
      filter === "all"
    ) {

      taskCount.textContent =
        `All Tasks · ${filteredTasks.length}`;

    }


    else if (
      filter === "pending"
    ) {

      taskCount.textContent =
        `Pending Tasks · ${filteredTasks.length}`;

    }


    else if (
      filter === "completed"
    ) {

      taskCount.textContent =
        `Completed Tasks · ${filteredTasks.length}`;

    }

  }



  // NO TASKS


  if (
    filteredTasks.length === 0
  ) {

    taskList.innerHTML =
      `<p>No tasks found.</p>`;

    return;

  }



  // CREATE TASK CARDS


  filteredTasks.forEach(
    (task) => {

      // Main card

      const taskCard =
        document.createElement(
          "div"
        );


      taskCard.classList.add(
        "taskCard"
      );


      if (task.completed) {

        taskCard.classList.add(
          "completed"
        );

      }



      // TASK MAIN


      const taskMain =
        document.createElement(
          "div"
        );


      taskMain.classList.add(
        "taskMain"
      );



      // CHECKBOX


      const checkbox =
        document.createElement(
          "input"
        );


      checkbox.type =
        "checkbox";


      checkbox.classList.add(
        "taskCheck"
      );


      checkbox.checked =
        task.completed;


      // TASK INFORMATION


      const taskInfo =
        document.createElement(
          "div"
        );


      taskInfo.classList.add(
        "taskInfo"
      );


      const title =
        document.createElement(
          "h4"
        );


      title.textContent =
        task.taskTitle;


      const description =
        document.createElement(
          "p"
        );


      description.textContent =
        task.taskDescription;


      const date =
        document.createElement(
          "span"
        );


      date.textContent =
        `Due: ${task.taskDate}`;


      taskInfo.appendChild(
        title
      );


      taskInfo.appendChild(
        description
      );


      taskInfo.appendChild(
        date
      );


      // TASK MAIN CONTENT


      taskMain.appendChild(
        checkbox
      );


      taskMain.appendChild(
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


      const priority =
        document.createElement(
          "span"
        );


      priority.textContent =
        task.taskPriority;


      priority.classList.add(
        task.taskPriority
      );


      taskPriority.appendChild(
        priority
      );



      // COMPLETE TASK CARD


      taskCard.appendChild(
        taskMain
      );


      taskCard.appendChild(
        taskPriority
      );


      taskList.appendChild(
        taskCard
      );


      // CHECKBOX EVENT


      checkbox.addEventListener(
        "change",
        () => {

          const taskIndex =
            userTaskInfo.indexOf(
              task
            );


          userTaskInfo[
            taskIndex
          ].completed =
            checkbox.checked;


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


          displayDashboardTasks();


          renderCalendar();

        }
      );

    }
  );

}


// FILTER BUTTONS


if (
  filterBtns.length > 0
) {

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
            button.dataset.filter;


          displayMyTasks(
            currentFilter
          );

        }
      );

    }
  );

}


// Initial My Tasks display

displayMyTasks(
  currentFilter
);



// CALENDAR


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


const calendarTaskLists =
  document.querySelectorAll(
    ".calendarTaskList"
  );


let currentDate =
  new Date();



// GOOGLE CALENDAR


function addToGoogleCalendar(
  task
) {

  if (!task.taskDate) {

    return;

  }


  // Google Calendar uses
  // YYYYMMDD for all-day events

  const startDate =
    task.taskDate.replace(
      /-/g,
      ""
    );


  // End date must be
  // the following day

  const date =
    new Date(
      task.taskDate +
      "T00:00:00"
    );


  date.setDate(
    date.getDate() + 1
  );


  const endDate =
    `${date.getFullYear()}${String(
      date.getMonth() + 1
    ).padStart(2, "0")}${String(
      date.getDate()
    ).padStart(2, "0")}`;


  const title =
    encodeURIComponent(
      task.taskTitle
    );


  const details =
    encodeURIComponent(
      `${task.taskDescription}\n\nPriority: ${task.taskPriority}`
    );


  const googleCalendarUrl =
    `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}`;


  window.open(
    googleCalendarUrl,
    "_blank"
  );

}



// DISPLAY CALENDAR TASKS


function displayCalendarTasks(
  selectedDate
) {

  if (
    calendarTaskLists.length === 0
  ) {

    return;

  }


  calendarTaskLists.forEach(
    (list) => {

      list.innerHTML = "";

    }
  );


  const selectedTasks =
    userTaskInfo.filter(
      (task) =>
        task.taskDate ===
        selectedDate
    );


  if (
    selectedTasks.length === 0
  ) {

    calendarTaskLists.forEach(
      (list) => {

        list.innerHTML =
          `<p>No tasks for this date.</p>`;

      }
    );

    return;

  }


  const todayList =
    document.querySelector(
      ".todayTasks .calendarTaskList"
    );


  const upcomingList =
    document.querySelector(
      ".upcomingTasks .calendarTaskList"
    );


  selectedTasks.forEach(
    (task) => {

      // CALENDAR TASK


      const calendarTask =
        document.createElement(
          "div"
        );


      calendarTask.classList.add(
        "calendarTask"
      );


      // TASK INFO


      const taskInfo =
        document.createElement(
          "div"
        );


      const title =
        document.createElement(
          "h4"
        );


      title.textContent =
        task.taskTitle;


      const description =
        document.createElement(
          "p"
        );


      description.textContent =
        task.taskDescription;


      taskInfo.appendChild(
        title
      );


      taskInfo.appendChild(
        description
      );



      // PRIORITY


      const priority =
        document.createElement(
          "span"
        );


      priority.textContent =
        task.taskPriority;


      priority.classList.add(
        task.taskPriority
      );


      // GOOGLE CALENDAR BUTTON


      const googleButton =
        document.createElement(
          "button"
        );


      googleButton.type =
        "button";


      googleButton.classList.add(
        "googleCalendarBtn"
      );


      googleButton.innerHTML =
        `<i class="fa-solid fa-calendar-plus"></i> Add to Google Calendar`;


      googleButton.addEventListener(
        "click",
        () => {

          addToGoogleCalendar(
            task
          );

        }
      );



      // ADD CONTENT


      calendarTask.appendChild(
        taskInfo
      );


      calendarTask.appendChild(
        priority
      );


      calendarTask.appendChild(
        googleButton
      );



      // TODAY / UPCOMING


      const today =
        new Date();


      const todayString =
        `${today.getFullYear()}-${String(
          today.getMonth() + 1
        ).padStart(2, "0")}-${String(
          today.getDate()
        ).padStart(2, "0")}`;


      if (
        selectedDate ===
        todayString
      ) {

        if (todayList) {

          todayList.appendChild(
            calendarTask
          );

        }

      }


      else {

        if (upcomingList) {

          upcomingList.appendChild(
            calendarTask
          );

        }

      }

    }
  );

}



// RENDER CALENDAR


function renderCalendar() {

  if (
    !calendarDates ||
    !monthYear
  ) {

    return;

  }


  calendarDates.innerHTML =
    "";


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


  // EMPTY DAYS


  for (
    let i = 0;
    i < firstDay;
    i++
  ) {

    const emptyDate =
      document.createElement(
        "span"
      );


    calendarDates.appendChild(
      emptyDate
    );

  }


  // CALENDAR DAYS


  for (
    let day = 1;
    day <= lastDate;
    day++
  ) {

    const dateElement =
      document.createElement(
        "span"
      );


    dateElement.textContent =
      day;


    const calendarDate =
      `${year}-${String(
        month + 1
      ).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;



    // TASK INDICATOR


    const hasTask =
      userTaskInfo.some(
        (task) =>
          task.taskDate ===
          calendarDate
      );


    if (hasTask) {

      dateElement.classList.add(
        "hasTask"
      );

    }



    // TODAY


    const today =
      new Date();


    const todayString =
      `${today.getFullYear()}-${String(
        today.getMonth() + 1
      ).padStart(2, "0")}-${String(
        today.getDate()
      ).padStart(2, "0")}`;


    if (
      calendarDate ===
      todayString
    ) {

      dateElement.classList.add(
        "today"
      );

    }


    // SELECT DATE


    dateElement.addEventListener(
      "click",
      () => {

        document
          .querySelectorAll(
            ".calendarDates span"
          )
          .forEach(
            (date) => {

              date.classList.remove(
                "selected"
              );

            }
          );


        dateElement.classList.add(
          "selected"
        );


        displayCalendarTasks(
          calendarDate
        );

      }
    );


    calendarDates.appendChild(
      dateElement
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



// INITIAL CALENDAR

renderCalendar();



// THEME MODE


const themeToggle =
  document.getElementById(
    "themeToggle"
  );

const darkModeToggle =
  document.getElementById(
    "darkModeToggle"
  );


// APPLY SAVED THEME

const savedTheme =
  localStorage.getItem(
    "theme"
  );


if (savedTheme === "dark") {

  document.body.classList.add(
    "darkMode"
  );

}


// UPDATE SETTINGS TOGGLE

if (
  darkModeToggle &&
  savedTheme === "dark"
) {

  darkModeToggle.checked = true;

}


// HEADER THEME ICON

if (themeToggle) {

  themeToggle.addEventListener(
    "click",
    () => {

      document.body.classList.toggle(
        "darkMode"
      );


      const isDark =
        document.body.classList.contains(
          "darkMode"
        );


      localStorage.setItem(
        "theme",
        isDark
          ? "dark"
          : "light"
      );


      if (darkModeToggle) {

        darkModeToggle.checked =
          isDark;

      }

    }
  );

}


// SETTINGS TOGGLE

if (darkModeToggle) {

  darkModeToggle.addEventListener(
    "change",
    () => {

      document.body.classList.toggle(
        "darkMode",
        darkModeToggle.checked
      );


      localStorage.setItem(
        "theme",
        darkModeToggle.checked
          ? "dark"
          : "light"
      );

    }
  );

}




// SETTINGS PAGE


const settingsName =
    document.getElementById("settingsName");

const settingsOccupation =
    document.getElementById("settingsOccupation");

const saveProfile =
    document.getElementById("saveProfile");

const profileMessage =
    document.getElementById("profileMessage");

const notificationToggle =
    document.getElementById("notificationToggle");

const clearTasks =
    document.getElementById("clearTasks");

const resetProfile =
    document.getElementById("resetProfile");



// LOAD PROFILE


const savedUser =
    JSON.parse(
        localStorage.getItem("userInfo")
    );

if (savedUser) {

    if (settingsName) {
        settingsName.value =
            savedUser.username || "";
    }

    if (settingsOccupation) {
        settingsOccupation.value =
            savedUser.useroccupation || "student";
    }

}



// SAVE PROFILE


if (saveProfile) {

    saveProfile.addEventListener(
        "click",
        () => {

            const name =
                settingsName.value.trim();

            const occupation =
                settingsOccupation.value;

            if (name === "") {

                profileMessage.textContent =
                    "Please enter your name.";

                profileMessage.style.color =
                    "#d9534f";

                return;
            }


            const updatedUser = {

                username: name,

                useroccupation:
                    occupation

            };


            localStorage.setItem(
                "userInfo",
                JSON.stringify(updatedUser)
            );


            const nameDisplay =
                document.getElementById("userName");


            if (nameDisplay) {

                nameDisplay.textContent =
                    name;

            }


            profileMessage.textContent =
                "Profile updated successfully.";

            profileMessage.style.color =
                "#4caf50";

        }
    );

}


// NOTIFICATIONS


const savedNotifications =
    localStorage.getItem(
        "notifications"
    );


if (
    notificationToggle &&
    savedNotifications === "enabled"
) {

    notificationToggle.checked = true;

}


if (notificationToggle) {

    notificationToggle.addEventListener(
        "change",
        () => {

            localStorage.setItem(
                "notifications",
                notificationToggle.checked
                    ? "enabled"
                    : "disabled"
            );

        }
    );

}



// CLEAR ALL TASKS


if (clearTasks) {

    clearTasks.addEventListener(
        "click",
        () => {

            const confirmClear =
                confirm(
                    "Are you sure you want to delete all your tasks?"
                );


            if (!confirmClear) {
                return;
            }


            localStorage.removeItem(
                "taskInfo"
            );


            userTaskInfo = [];


            updateStats();


            if (
                typeof displayMyTasks ===
                "function"
            ) {

                displayMyTasks(
                    typeof currentFilter !== "undefined"
                        ? currentFilter
                        : "all"
                );

            }


            if (
                typeof displayDashboardTasks ===
                "function"
            ) {

                displayDashboardTasks();

            }


            if (
                typeof renderCalendar ===
                "function"
            ) {

                renderCalendar();

            }


            alert(
                "All tasks have been cleared."
            );

        }
    );

}



// RESET PROFILE


if (resetProfile) {

    resetProfile.addEventListener(
        "click",
        () => {

            const confirmReset =
                confirm(
                    "Are you sure you want to reset your profile?"
                );


            if (!confirmReset) {
                return;
            }


            localStorage.removeItem(
                "userInfo"
            );


            if (settingsName) {
                settingsName.value = "";
            }


            if (settingsOccupation) {
                settingsOccupation.value =
                    "student";
            }


            if (profileMessage) {

                profileMessage.textContent =
                    "Profile has been reset.";

                profileMessage.style.color =
                    "#4caf50";

            }

        }
    );

}