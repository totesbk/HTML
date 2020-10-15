function delList(tag) {
  //todo 리스트의 리스트 삭제
  var node = tag.parentNode;
  // console.log(node);
  node.remove();
}

function line(tag) {
  //매개변수로 자신이 들어옴
  var node = tag.nextElementSibling;
  console.log(node);
  if (node.classList.contains("checked")) {
    //가지고있으면 true
    node.style.textDecoration = "line-through"; // 중간줄 췍
    node.classList.remove("checked"); //체크드 삭제.
  } else {
    node.style.textDecoration = "none"; //checked가 없으면 false
    node.classList.add("checked"); //다시 생성해서 줄없애줌
  }
}

function createList() {
  //투두리스트를 작성하는 기능
  var toDo = prompt("해야 할 일을 기록해 주세요.");

  if (toDo == null || toDo == "") {
    alert("할 일을 입력하지 않았습니다.");
  } else {
    var input = document.createElement("input");
    input.setAttribute("type", "checkbox"); //속성 부여하는거라
    input.setAttribute("name", "todo");
    input.classList.add("todo"); //클래스 이름을불러올땐 ?
    input.setAttribute("onclick", "line(this)");

    var span = document.createElement("span");
    span.classList.add("line", "checked");
    span.innerHTML = toDo; // 아까 입력한값을

    var img = document.createElement("img");
    img.setAttribute(
      "src",
      "../images/cancellation-clip-art-cancel-button-png-pic.jpg"
    );
    img.setAttribute("alt", "cancel");
    img.setAttribute("onclick", "delList(this)");
    img.classList.add("imgX"); //이미지 사이즈 지정해줄 .

    var li = document.createElement("li");
    li.classList.add("toDoItems");

    li.appendChild(input);
    li.appendChild(span);
    li.appendChild(img);

    var ul = document.getElementById("toDoList"); //대상을 가져와서
    ul.appendChild(li);
  }
}

window.onload = function () {
  //이벤트 페이지가 처음 열렸을 때.
  var now = new Date(); // 웹문서를 실행한 시점의 달력을 생성하자.
  var nowMonth = new Date(now.getFullYear(), now.getMonth()); //올해 , 이번 달

  changeHead(nowMonth); //제목에 현재 년월을 출력하기위함
  buildCalendar(nowMonth); // 달력을 그리기 위한 기능
};
function selMonth() {
  var selectYM = document.getElementById("selectMonth").value;
  var selectYearMonth = new Date(selectYM);
  changeHead(selectYearMonth); //제목에 선택 된  년월을 출력하기위함
  buildCalendar(selectYearMonth); // 선택된 달력을 그리기 위한 기능
}

function beforeMonth() {
  //////////////////////////////////////////////////////이전 달
  var pTime = document.getElementsByClassName("nowMonth")[0].innerHTML;

  var year = parseInt(pTime.slice(0, 4));
  var month = parseInt(pTime.slice(5, -1)) - 2;

  var beforeYearMonth = new Date(year, month);
  changeHead(beforeYearMonth); //제목에 현재 년월을 출력하기위함
  buildCalendar(beforeYearMonth); // 달력을 그리기 위한 기능
}

function forwardMonth() {
  //////////////////////////////////////////////////////////다음 달
  var pTime = document.getElementsByClassName("nowMonth")[0].innerHTML;

  var year = parseInt(pTime.slice(0, 4));
  var month = parseInt(pTime.slice(5, -1));

  var forwardYearMonth = new Date(year, month);

  changeHead(forwardYearMonth); //제목에 현재 년월을 출력하기위함
  buildCalendar(forwardYearMonth); // 달력을 그리기 위한 기능
}

function changeHead(selectDate) {
  //캘린더 제목을 표시하기 위한 함수
  document.getElementsByClassName("nowMonth")[0].innerHTML =
    selectDate.getFullYear() + "년" + (selectDate.getMonth() + 1) + "월";
}

function lastDate(selectDate) {
  var year = selectDate.getFullYear();
  var month = selectDate.getMonth();

  var monthArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
    //윤년 계산
    monthArr[1] = 29;
  }
  return monthArr[month]; //현재달
}

function buildCalendar(selectDate) {
  var calendar = document.getElementsByClassName("calendarBody")[0];
  calendar.innerHTML = ""; // 기존 작성된 달력 삭제.

  var MonthLastDay = lastDate(selectDate);
  var weekInfo = selectDate.getDay();
  var dateCnt = selectDate.getDate() - weekInfo;

  while (true) {
    var weekLine = document.createElement("div");
    weekLine.classList.add("weekLine");
    for (var i = 0; i < 7; i++) {
      var weekDay = document.createElement("div");
      weekDay.classList.add("weekDay");

      if (0 < dateCnt && dateCnt <= MonthLastDay) {
        weekDay.innerHTML = dateCnt; //
        weekDay.setAttribute("onclick", "toDoList(" + dateCnt + ")");
        // <div onclick="toDoList(13)">13</div>
        if (i == 0) {
          weekDay.classList.add("sun");
        } else if (i == 6) {
          weekDay.classList.add("sat");
        }
      }
      dateCnt++;
      weekLine.appendChild(weekDay);
    }
    calendar.appendChild(weekLine);
    if (dateCnt > MonthLastDay) {
      break;
    }
  }
}
function toDoList(num) {
  document.getElementsByClassName("selDate")[0].innerHTML = num + "일";
}
