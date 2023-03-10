let date = new Date();

let [currDay, currMonth, currYear] = [
  date.getDay(),
  date.getMonth(),
  date.getFullYear(),
];

const [tableDays, activeDays, prev, selectCurrDay, selectCurrMonth] = [
  document.querySelector(".table > .days"),
  document.querySelector(".table .days div"),
  document.querySelectorAll(".next span"),
  document.querySelector(".curr-day"),
  document.querySelector(".curr-Month"),
];

const months = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
];

const crrdays = [
    "Chủ nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
];

const arrDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let arrD= 31;

//Calculate leap year
const isLeapYear = (year)   => {
    if (year % 4 == 0) {
        if (year % 100 == 0) {
          if (year % 400 == 0) {
            return true;
          } else {
            return false;
          }
        } else {
         return true;
        }
      } else {
        return false;
      }
};

document.querySelector("#ngayduong").innerHTML = date.getDate(); // Todays

const renderCalendar = (day = new Date().getDate(), month = new Date().getMonth(), year = new Date().getFullYear()) => {
  document.querySelectorAll(".days div").forEach((item) => {
    item.remove();
  });
   
  console.log(day);
  console.log(month);
  console.log(year);

  // const firstDayIndex = date.getDay();
  // const lastDay = currMonth == 2 && isLeapYear(currMonth) ? 29 :arrDays[currMonth - 1];
  // const nextDay = new Date(currMonth, currMonth, 0).getDate();

  const [firstDayIndex, lastDay, nextDay] = [
    date.getDay(),
    currMonth == 2 && isLeapYear(currMonth) ? 29 :arrDays[currMonth - 1],
    new Date(currMonth, currMonth, 0).getDate(),
  ];

  let days = "";

  for (let i = firstDayIndex; i > 0; i--) {
      days += `<div class="inative">${nextDay - i + 1}</div>`; // Pay he date of the previous month
  };

  for (let i = 1; i <= lastDay; i++) {
      if (i == day*1) {
          days += `<div class="today" value=${i}>${i}</div>`;
      } else {
          days += `<div value=${i}>${i}</div>`;
      }
      tableDays.innerHTML = days;
  };

  const myActive = document.querySelectorAll(".days div")

  myActive.forEach((activeOfDay) => {
      activeOfDay.addEventListener("click", function () {
          myActive.forEach((btn) => btn.classList.remove("today"));
          this.classList.add("today");
      });
  });

  document.querySelector(".thangduong h2").innerHTML = `${
    months[currMonth]
    } năm ${currYear}`;

    document.getElementById("thuduong").innerHTML = `<u> ${
        crrdays[date.getDay()]}</u>`;

  renderDays();
  renderMonth();
};

const  renderMonth = () => {
  let list1 = selectCurrMonth;

  while (list1.hasChildNodes()) {
      list1.removeChild(list1.firstChild);
  }

  for(let i = 1; i <= 12; i++) {
      let option = document.createElement("option");
      option.value = i;
      option.text = i;
      option.onclick = onClMonth;
      selectCurrMonth.appendChild(option);
  };
}


const renderDays = (validDate) => {
  const getDate = document.querySelector(".curr-day").value;
  let list2 = selectCurrDay;
  while (list2.hasChildNodes()) {
      list2.removeChild(list2.firstChild);
  }

  for (let i = 1; i <= arrD; i++){
      let option = document.createElement("option");
      if(validDate && getDate == i ) option.selected = true;
      option.value = i;
      option.text = i;
      selectCurrDay.appendChild(option);
  };
}

const onClMonth = (op) => {
    var op = document.querySelector(".curr-Month");
    var value = op.value;
    var text = op.options[op.selectedIndex].text;
    return text
}

document.querySelector(".curr-Month").addEventListener('change', function (e) {
 
  arrD = onClMonth(e) == "2" && isLeapYear(date.getFullYear()) ? 29 : arrDays[this.value-1];
  renderDays(arrD >= arrDays[this.value-1])
  // console.log(arrD);
  
});

const thang = document.querySelector(".thangduong > h2");
// Click change
const myClick = () => {
  currDay = document.querySelector(".curr-day").value;
  currMonth = document.querySelector(".curr-Month").value;
  currYear = document.querySelector(".nam").value;
  document.querySelector(".ngay-duong").innerHTML = currDay;
  thang.innerHTML = `Tháng ${currMonth} năm ${currYear}`;
  renderCalendar(currDay, currMonth, currYear);
};

const activeDay = (event) => {
  let act = event.target.getAttribute("value");
  document.querySelector(".ngay-duong").innerHTML = act;
};

// Previous Month
document.querySelector(".previous").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

//Next Month
document.querySelector(".next-").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

// Previous Year
document.querySelector(".previousdouble").addEventListener("click", () => {
  date.setFullYear(date.getFullYear() - 1);
  renderCalendar();
});

// Next Year
document.querySelector(".nextdouble").addEventListener("click", () => {
  date.setFullYear(date.getFullYear() + 1);
  renderCalendar();
});

renderCalendar();