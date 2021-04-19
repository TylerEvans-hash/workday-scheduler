// Displays current date to top of application
var dateEl = document.getElementById('currentDay');
dateEl.textContent = moment().format("dddd, MMMM Do YYYY");
console.log(moment().format("dddd, MMMM Do YYYY"));


appointments = [];


var createTasks = function (appointmentHour, appointmentTask) {
    var taskDiv = $("<div>").attr("id","appointment").addClass("row time-block");
    var taskP = $("<p>").attr("id", "hour").addClass("col hour").text(appointmentHour);
    var taskDesc = $("<textarea>").attr("id","task").addClass("col-8 textarea description future").text(appointmentTask);
    var saveBtn = $("<button>").addClass("col saveBtn").text("Save");
    taskDiv.append(taskP, taskDesc, saveBtn);

    // auditTasks(taskDiv);

    $("#container").append(taskDiv);
};


var loadTasks = function () {
    appointments = JSON.parse(localStorage.getItem("appointments"));

    if (!appointments) {
        appointments = {
            appointment: [
            { hour: '9 am', task: '' },
            { hour: '10 am', task: '' },
            { hour: '11 am', task: '' },
            { hour: '12 pm', task: '' },
            { hour: '1 pm', task: '' },
            { hour: '2 pm', task: '' },
            { hour: '3 pm', task: '' },
            { hour: '4 pm', task: '' },
            { hour: '5 pm', task: '' }
        ]};
    }
    console.log(appointments);

    $.each(appointments, function (list, arr) {
        console.log(list, arr);

        arr.forEach(function (appointments) {
            createTasks(appointments.hour, appointments.task);
        });
    });
};

var saveTasks = function(){
    localStorage.setItem("appointments", JSON.stringify(appointments));
};

// var auditTasks = function(taskEl) {
//     var time = $(taskEl).find("p").text().trim();
//     var schedTime = moment(time, "LT");

//     console.log(shedTime);

// //     $(taskEl).find("textarea").removeClass("future");

// //     if (moment().isAfter())

// //     console.log(currentTime);
// };



loadTasks();


$("#container").on("click", "textarea", function(){
    var text = $(this)
        .text()
        .trim();
    var textInput = $(this)
        .addClass("col-8 textarea description")
        .val(text);
    $(this).replaceWith(textInput);
    textInput.trigger("focus");
    console.log(text, textInput);
});


$("#container").on("blur", "textarea", function(){
    //debugger;
    var task = $(this)
        .val()
        .trim();
    var status = $(this)
        .closest(".time-block")
        .attr("id")
        //.replace("list-", "");
    var index = $(this)
        .closest(".time-block")
        .index();

    appointments[status][index].task = task;
    var taskDesc = $("<textarea>").addClass("col-8 textarea description").text(task);
    $(this).replaceWith(taskDesc);
});

$(".time-block").on("click", "button", function(){
    saveTasks();
});

// setInterval(function(){
//     $(".time-block").each(function(index, el) {
//       auditTask(el);
//     });
//   }, (1000 * 60) * 20);