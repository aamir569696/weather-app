let dateE1 = document.querySelector(".date");
let dayE1 = document.querySelector(".day");
let timeE1 = document.querySelector(".time-day");
let cityE1 = document.querySelector(".city");

// weather api

let temperatureE1 = document.querySelector(".temperature");
let weatherE1 = document.querySelector(".weather");
let huminityE1 = document.querySelector(".huminity");
let windE1 = document.querySelector(".wind");

async function getWeather() {
  // for current city
  navigator.geolocation.getCurrentPosition(async (position) => {
    let lon = position.coords.longitude;
    let lat = position.coords.latitude;

    let apiKey = "44ba01e175afc74cbe95430b787f6490";
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    let response = await fetch(api);

    let data = await response.json();

 //   console.log(data);

    huminityE1.innerHTML = "Humidity : " + data.main.humidity + "%";
    temperatureE1.innerHTML = Math.floor(data.main.temp) + "°C";
    windE1.innerHTML = "Wind Speed : " + data.wind.speed + " " + "km/h";
    weatherE1.innerHTML = data.weather[0].main;
    cityE1.innerHTML = data.name;
  });
}

getWeather();

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function upDateTime() {
  let now = new Date();

  let ampm;

  let currentDay = now.getDay();
  let currentYear = now.getFullYear();
  let currentDate = now.getDate();
  let currentMonth = now.getMonth();
  let currentHour = now.getHours();
  let currentMinutes = now.getMinutes();
  let currentSecend = now.getSeconds();

  if (currentHour >= 12) {
    ampm = "PM";
  } else {
    ampm = "AM";
  }

  currentHour = currentHour % 12;

  if (currentHour === 0) {
    currentHour = "12";
  }
  if (currentMinutes < 10) {
    currentMinutes = "0" + currentMinutes;
  }
  if (currentSecend < 10) {
    currentSecend = "0" + currentSecend;
  }

  dateE1.innerHTML = `${currentDate} ${months[currentMonth]} ${currentYear}`;
  timeE1.innerHTML = `${currentHour}:${currentMinutes}:${currentSecend} ${ampm}`;
  dayE1.innerHTML = days[currentDay];
}

upDateTime();
setInterval(upDateTime, 1000);

////////////////////

let allCards = document.querySelectorAll(".box-main");
let todoApp = document.getElementById("todoApp");
let closeBtn = document.getElementById("closeBtn");
let appContainer = document.getElementById("appContainer");

// ALL CARDS
allCards.forEach((card) => {
  card.addEventListener("click", () => {
    // image
    let cardImage = card.querySelector("img").src;
    todoApp.style.backgroundImage = `url("${cardImage}")`;
    // app type
    let appType = card.dataset.app;
    // TODO APP

    if (appType === "todo") {
      appContainer.innerHTML = `
              <div class="todo-ui">
        <div class="todo-title">To-Do</div>
        <div class="todo-input">
            <input class="input" type="text" placeholder="What you want to do?">
            <input class="checkbox" type="checkbox">
            <label class="label"> Mark as Important</label>
            <button class="addbtn">+</button>
        </div>
        <div class="todo-task">
        </div>
    </div>
            `;

      let input = document.querySelector(".todo-input .input");
      let checkBox = document.querySelector(".checkbox");
      let todoTask = document.querySelector(".todo-task");

      ///1111
      todoTask.innerHTML = localStorage.getItem("tasks") || "";
      todoTask.addEventListener("click", (e) => {
        // DELETE
        if (e.target.classList.contains("delete")) {
          let task = e.target.closest(".task-create");
          task.remove();
          saveTasks(todoTask);
        }

        // UPDATE
        if (e.target.classList.contains("update")) {
          let task = e.target.closest(".task-create");
          let taskText = task.querySelector(".task-text");
          let newValue = prompt("Update your task", taskText.innerText);
          if (newValue !== "") {
            taskText.innerText = newValue;
            saveTasks(todoTask);
          }
        }
      });

      let addBtn = document.querySelector(".addbtn");
      addBtn.addEventListener("click", () => {
        let inputValue = input.value;
        if (inputValue === "") {
          alert("please enter some text to create task");
          return;
        }

        //create new task
        let taskcreate = document.createElement("div");
        taskcreate.classList.add("task-create");

        if (checkBox.checked) {
          taskcreate.classList.add("important");
        }

        taskcreate.innerHTML = `
      <span class="task-text"> ${inputValue} </span>
      <div class="btns">
      <button class="update">✎</button>
      <button class="delete">✓</button>
                </div>
  `;

        todoTask.appendChild(taskcreate);
        /////111111
        saveTasks(todoTask);

        //input empty after add
        input.value = "";

        checkBox.checked = false;

        //delete function
      });
    }

    ///// Todo javascript part

    // taking input value

    // DAILY PLANNER
    if (appType === "planner") {
      appContainer.innerHTML = `
              
    <div class="planner-ui">
        <div class="planner-title">Plan Your Day To be more Productive</div>
        <div class="planner-tasks">

            <div class="planner-task">
                <label>6:00 - 7:00</label>
                <input class="palnner-task-input" placeholder="...." type="text">
            </div>
            <div class="planner-task"> <label>7:00 - 8:00</label>
                <input class="palnner-task-input" placeholder="...." type="text">
            </div>
            <div class="planner-task"> <label>8:00 - 9:00</label>
                <input class="palnner-task-input" placeholder="...." type="text">
            </div>
            <div class="planner-task"> <label>9:00 - 10:00</label>
                <input class="palnner-task-input" placeholder="...." type="text">
            </div>
            <div class="planner-task"> <label>10:00 - 11:00</label>
                <input class="palnner-task-input" placeholder="...." type="text">
            </div>
            <div class="planner-task"> <label>11:00 - 12:00</label>
                <input class="palnner-task-input" placeholder="...." type="text">
            </div>
            <div class="planner-task"> <label>12:00 - 13:00</label>
                <input class="palnner-task-input" placeholder="...." type="text">
            </div>
            <div class="planner-task"> <label>13:00 - 14:00</label>
                <input class="palnner-task-input" placeholder="...." type="text">
            </div>
            <div class="planner-task"> <label>14:00 - 15:00</label>
                <input class="palnner-task-input" placeholder="...." type="text">
            </div>
            <div class="planner-task"> <label>15:00 - 16:00</label>
                <input class="palnner-task-input" placeholder="...." type="text">
            </div>
            <div class="planner-task"> <label>16:00 - 17:00</label>
                <input class="palnner-task-input" placeholder="...." type="text">
            </div>
            <div class="planner-task"> <label>17:00 - 18:00</label>
                <input class="palnner-task-input" placeholder="...." type="text">
            </div>
            <div class="planner-task"> <label>18:00 - 19:00</label>
                <input class="palnner-task-input" placeholder="...." type="text">
            </div>
            <div class="planner-task"> <label>19:00 - 20:00</label>
                <input class="palnner-task-input" placeholder="...." type="text">
            </div>
            <div class="planner-task"> <label>20:00 - 21:00</label>
                <input class="palnner-task-input" placeholder="...." type="text">
            </div>
            <div class="planner-task"> <label>21:00 - 22:00</label>
                <input class="palnner-task-input" placeholder="...." type="text">
            </div>
            <div class="planner-task"> <label>22:00 - 23:00</label>
                <input class="palnner-task-input" placeholder="...." type="text">
            </div>
            <div class="planner-task"> <label>23:00 - 24:00</label>
                <input class="palnner-task-input" placeholder="...." type="text">
            </div>
        </div>

    </div>
            `;
    }
    // MOTIVATION
    if (appType === "motivation") {
      appContainer.innerHTML = `
               <div class="motivation-ui">
                   <h1>Motivation</h1>
                 <div class="quote">
                   <p>"Success comes from hard work, consistency, patience, learning from failures, and believing in yourself even during difficult moments."</p>
                 </div>
               </div>
            `;
    }
    // POMODOR
    if (appType === "pomodoro") {
      appContainer.innerHTML = `
               <div class="pomodoro-ui">
                   <h1>Pomodoro</h1>
                 <div class="pomodoro-timmer">
                 <div class="timeer">
                 25:00
                 </div>
                 <div class="timmer-btns">
                 <button class="start-btn">start</button>
                 <button class="pause-btn">pause</button>
                 <button class="reset-btn">Reset</button>
                 </div>
                 </div>
               </div>
            `;
    }

    //pomodoro javascript functionality

    let timeer = document.querySelector(".timeer");
    let startBtn = document.querySelector(".start-btn");
    let pauseBtn = document.querySelector(".pause-btn");
    let resetBtn = document.querySelector(".reset-btn");

    if (startBtn) {
      let totalSecend = 25 * 60;
      let interval;

      startBtn.addEventListener("click", () => {
        if (interval) {
          return;
        }

        interval = setInterval(() => {
          totalSecend--;

          let minutes = Math.floor(totalSecend / 60);
          let secend = totalSecend % 60;

          if (secend < 10) {
            secend = "0" + secend;
          }

          timeer.innerHTML = `${minutes}:${secend}`;

          if (totalSecend <= 0) {
            clearInterval(interval);
            alert("Pomodoro Complete");
          }
        }, 1000);
      });

      pauseBtn.addEventListener("click", () => {
        clearInterval(interval);
        interval = null;
      });

      resetBtn.addEventListener("click", () => {
        clearInterval(interval);
        interval = null;

        totalSecend = 25 * 60;

        timeer.innerHTML = "25:00";
      });
    }

    // KANBAN
    if (appType === "kanban") {
      appContainer.innerHTML = `
<div class="kanban-ui">

  <div class="kanban-top">
    <h1>Kanban Board</h1>

    <div class="kanban-input">
      <input type="text" placeholder="Enter your task...">
      <button>Add Task</button>
    </div>
  </div>

  <div class="kanban-board">

    <!-- TODO -->

    <div class="kanban-column todo">
      <h2>TODO</h2>

      <div class="kanban-tasks">

        <div class="kanban-task">
          <span>Learn JavaScript</span>

          <div class="task-btns">
            <button>➡</button>
            <button>✖</button>
          </div>
        </div>

      </div>
    </div>

    <!-- IN PROGRESS -->

    <div class="kanban-column progress">
      <h2>IN PROGRESS</h2>

      <div class="kanban-tasks">

      </div>
    </div>

    <!-- DONE -->

    <div class="kanban-column done">
      <h2>DONE</h2>

      <div class="kanban-tasks">

      </div>
    </div>

  </div>

</div>
        `;

      // ELEMENTS

      let kanbanInput = document.querySelector(".kanban-input input");
      let kanbanAddBtn = document.querySelector(".kanban-input button");
      let todoTasks = document.querySelector(".todo .kanban-tasks");
      let progressTasks = document.querySelector(".progress .kanban-tasks");
      let doneTasks = document.querySelector(".done .kanban-tasks");

      // LOAD DATA

      todoTasks.innerHTML = localStorage.getItem("todo-kanban") || "";
      progressTasks.innerHTML = localStorage.getItem("progress-kanban") || "";
      doneTasks.innerHTML = localStorage.getItem("done-kanban") || "";

      // SAVE FUNCTION

      function saveKanban() {
        localStorage.setItem("todo-kanban", todoTasks.innerHTML);
        localStorage.setItem("progress-kanban", progressTasks.innerHTML);
        localStorage.setItem("done-kanban", doneTasks.innerHTML);
      }

      // ADD TASK

      kanbanAddBtn.addEventListener("click", () => {
        let inputValue = kanbanInput.value;
        if (inputValue === "") {
          alert("Please Enter Task");
          return;
        }

        let task = document.createElement("div");
        task.classList.add("kanban-task");
        task.innerHTML = `
      <span>${inputValue}</span>
      <div class="task-btns">
        <button class="move-btn">➡</button>
        <button class="delete-btn">✖</button>
      </div>

    `;

        todoTasks.appendChild(task);
        kanbanInput.value = "";
        saveKanban();
      });

      // TODO EVENTS

      todoTasks.addEventListener("click", (e) => {
        // DELETE
        if (e.target.classList.contains("delete-btn")) {
          e.target.closest(".kanban-task").remove();
          saveKanban();
        }

        // MOVE

        if (e.target.classList.contains("move-btn")) {
          let task = e.target.closest(".kanban-task");
          progressTasks.appendChild(task);
          saveKanban();
        }
      });

      // PROGRESS EVENTS

      progressTasks.addEventListener("click", (e) => {
        // DELETE

        if (e.target.classList.contains("delete-btn")) {
          e.target.closest(".kanban-task").remove();
          saveKanban();
        }

        // MOVE

        if (e.target.classList.contains("move-btn")) {
          let task = e.target.closest(".kanban-task");
          doneTasks.appendChild(task);
          saveKanban();
        }
      });

      // DONE EVENTS

      doneTasks.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
          e.target.closest(".kanban-task").remove();
          saveKanban();
        }
      });
    }
    // OPEN
    todoApp.classList.add("active");
  });
});
// CLOSE
closeBtn.addEventListener("click", () => {
  todoApp.classList.remove("active");
});

function saveTasks(todoTask) {
  localStorage.setItem("tasks", todoTask.innerHTML);
}

//console.log(allCards);
