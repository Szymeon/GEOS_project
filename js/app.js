$(document).ready(function () {

//CLOCK--------------------------------------------------------------------
function renderTime() {

      //DATE
  var myDate = new Date();
  var year = myDate.getYear();
    if (year < 1000){
      year +=1900;
    }
  var month = myDate.getMonth();
  var day = myDate.getDay();
  var dayOfMonth = myDate.getUTCDate();
  const daysArray = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat');
  const monthsArray = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');

      //TIME
  var currentTime = new Date();
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  var seconds = currentTime.getSeconds();
    if (hours == 24){
      hours = 0;
    } else if (hours > 12){
      hours = hours - 0;
    }

    if (hours < 10){
      hours = '0' + hours;
    }

    if (minutes < 10){
      minutes = '0' + minutes;
    }

    if (seconds < 10){
      seconds = '0' + seconds;
    }

    let myClock = $('.calendar').text(daysArray[day] + ' ' + dayOfMonth + '/' + monthsArray[month] + '/' + year + ' | ' + hours + ':' + minutes);

    setTimeout(function() {
      renderTime()
    }, 1000);
}

//DROPDOWN MENU------------------------------------------------------------

function dropdownMenu() {
  const geosMenuElements = $('.functions');

  geosMenuElements.on('mouseover', function(event) {
    $(this).children('ul li').removeClass('hidden').addClass('highest_top');
      })
  geosMenuElements.on('mouseleave', function(event) {
     $(this).children('ul li').addClass('hidden').removeClass('highest_top');
       })
}

//DRAGGABLE WINDOWS & ICONS--------------------------------------------------------

$('.draggable').draggable({
    grid: [ 20, 20 ], stack: 'div', containment: $(this).parent()
});

$('.draggable').on('click', function(event) {
    $(this).addClass('top').removeClass('bottom');
    $(this).siblings().removeClass('top').addClass('bottom');
});

$('.ico').draggable({
    grid: [ 40, 40 ], stack: 'div', containment: $(this).parent()
});

      //DRAGGABLE POSITION
$('.draggable').position({
  my: 'center',
  at: 'center',
  of: '#workspace',
  collision: 'flipfit'
});


//SHOWING WINDOWS----------------------------------------------------------

const buttonGeosInfo = $('.geos_info');
const butonDesktopInfo = $('.desktop_info');
const buttonNotepad = $('.notepad');
const buttonCalculator = $('.calculator');
const buttonSnake = $('.snake');

function showWindowA() {
  buttonGeosInfo.on('click', function(event){
    $('.geos_info_container').removeClass('hidden');
  })
}

function showWindowB() {
  butonDesktopInfo.on('click', function(event){
    $('.desktop_info_container').removeClass('hidden');
  })
}

function showWindowC() {
  buttonCalculator.on('click', function(event){
    $('.calculator_container').removeClass('hidden');
  })
}

function showWindowD() {
  buttonNotepad.on('click', function(event){
    $('.notepad_container').removeClass('hidden');
  })
}

function showWindowE() {
  buttonSnake.on('click', function(event){
    $('.snake_container').removeClass('hidden');
  })
}

//CLOSE BY BUTTON----------------------------------------------------------

$('.bar_close').on('click', function(event) {
      $(this.closest('.draggable')).addClass('hidden');
    })

$('.geos_welcome_container_button').on('click', function(event) {
      $(this.closest('.draggable')).addClass('hidden');
    })

$('.geos_info_container_button').on('click', function(event) {
      $(this.closest('.draggable')).addClass('hidden');
    })

$('.desktop_info_container_button').on('click', function(event) {
      $(this.closest('.draggable')).addClass('hidden');
    })


        //RESET SITE BY RESET BUTTON

$('.reset').on('click', function(event) {
  location.reload();
})

//CALCULATOR---------------------------------------------------------------

var key = null;

$(".clean").click(function () {
    $('.input').val("");
});

$(".show").click(function () {
    var eText = $('#result').val();
    if (eText != "0") {
        var val1 = eText;
        var buttonVal = $(this);
        var val2 = buttonVal.text();
        var res = val1 + val2;
        $('#result').val(res);
    } else {
        $('#result').val();
    }
});

$(function (e) {
    var interRes = null;
    var operator;
    $('.operators').click(function (e) {
        var value1 = $('#result').val();
        if (interRes != null) {
            var result = ApplyOperation(interRes, value1, operator);
            interRes = result;
        } else {
            interRes = value1;
        }
        operator = $(this).text();
        $('input').val("");
    });
    $('#result').keypress(function (e) {
        if ((e.keyCode == 61)) {
            var op = operator;
            var res;
            var value2 = $('#result').val();
            if ((value2 != "")) {
                var data = value2.split("+");
                if (data.length > 2) res = ApplyOperation(interRes, data[data.length - 1], op);
                else res = ApplyOperation(interRes, data[1], op);
            } else {
                res = interRes;
            }
            $('#result').val(res);
            interRes = null;
        } else if ((e.keyCode == 43) || (e.keyCode == 45) || (e.keyCode == 42) || (e.keyCode == 47)) {
            var value1 = $('#result').val();
            var inter = (interRes != null);
            if (inter) {
                var op = operator;
                var data = value1.split("+");
                if (data.length > 2) {
                    operator = String.fromCharCode(e.keyCode);
                    result = ApplyOperation(interRes, data[data.length - 1], op);
                    interRes = result;
                } else {
                    operator = String.fromCharCode(e.keyCode);
                    result = ApplyOperation(interRes, data[1], op);
                    interRes = result;
                }
            } else {
                interRes = value1;
            }
            operator = String.fromCharCode(e.keyCode);
            $('.input').text("");
        }
    });
    $('#calculate').click(function (e) {
        var op = operator;
        var res;
        var value2 = $('#result').val();
        if ((value2 != "")) {
            res = ApplyOperation(interRes, value2, op);
        } else {
            res = interRes;
        }
        $('#result').val(res);
        interRes = null;
    });
});

function ApplyOperation(value1, value2, operator) {
    var res;
    switch (operator) {
        case "+":
            res = addition(value1, value2);
            break;
        case "-":
            res = subtraction(value1, value2);
            break;
        case "*":
            res = multiplication(value1, value2);
            break;
        case "/":
            res = division(value1, value2);
            break;
    }
    return res;
}

function addition(first, second) {
    var a = parseFloat(first);
    var b = parseFloat(second);
    var total = a + b;
    return total;
}

function subtraction(first, second) {
    var a = parseFloat(first);
    var b = parseFloat(second);
    var sub = a - b;

    return sub;
}

function multiplication(first, second) {
    var a = parseFloat(first);
    var b = parseFloat(second);
    var product = a * b;

    return product;
}

function division(first, second) {
    var a = parseFloat(first);
    var b = parseFloat(second);
    var divi = a / b;
    return divi;
}

//OTHER--------------------------------------------------------------------

      //DISABLE SCROLL FOR WINDOW/DOCUMENT
$('html, body').css({
    overflow: 'hidden',
    height: '100%'
});

//RENDER FUNCTIONS HERE----------------------------------------------------
renderTime();
dropdownMenu();
showWindowA();
showWindowB();
showWindowC()
showWindowD();
showWindowE();

});
