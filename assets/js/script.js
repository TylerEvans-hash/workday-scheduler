// Displays current date to top of application
var dateEl = document.getElementById('currentDay');
dateEl.textContent = moment().format("dddd, MMMM Do YYYY");
console.log(moment().format("dddd, MMMM Do YYYY"));


appointments = [];


var createTask = function (appointmentHour, appointmentTask) {
    //debugger;
    var taskDiv = $("<div>").attr("id","appointment").addClass("row time-block");
    var taskP = $("<p>").addClass("col hour").text(appointmentHour);
    var taskDesc = $("<textarea>").addClass("col-8 textarea description").text(appointmentTask);
    var saveBtn = $("<button>").addClass("col save-btn").text("Save");
    taskDiv.append(taskP, taskDesc, saveBtn);
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
        //debugger;
        console.log(list, arr);
        //createTask(appointments.hour, appointments.task);

        arr.forEach(function (appointments) {
            //debugger;
            createTask(appointments.hour, appointments.task);
        });
    });
};



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
})


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
    localStorage.setItem("appointments", JSON.stringify(appointments));
    console.log("text");
});


// localStorage.setItem("schedule", JSON.stringify(schedule));

// console.log(schedule);

// for (var i = 0; i < schedule.hour.length; i++) {
//     var taskDiv = $("<div>").addClass("row time-block");
//     var taskP = $("<p>").addClass("col hour").text(schedule.hour[i] + " am");
//     var taskDesc = $("<textarea>").addClass("col-8 textarea description").text(schedule.task[i]);
//     var saveBtn = $("<button>").addClass("col save-btn").text("Save");
//     taskDiv.append(taskP, taskDesc, saveBtn);
//     $("#container").append(taskDiv);
// };

// $(".description").on("click", "textarea", function () {
//     var text = $(this)
//         .text()
//         .trim();
//     var textInput = $("<textarea>")
//         .addClass("col-8 textarea description")
//         .val(text);
//     $(this).replaceWith(textInput);
//     textInput.trigger("focus");
// });

// $(".description").on("blur", "textarea", function(){
//     var text = $(this)
//         .val()
//         .trim();

//     var status = $(this)
//         .closest(".time-block")
//         .attr("id")

//     var index = $(this)
//         .closest(".time-block")
//         .index()

//     console.log(text, status, index);

//     schedule[status][index].text = text;

//     localStorage.setItem("schedule", JSON.stringify(schedule));

//     var taskDesc = $("<textarea>").addClass("col-8 textarea description").text(text);

//     $(this).replaceWith(taskDesc);

//     console.log(schedule);
// });
