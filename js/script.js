//! ============ DARK MODE ============
// const darkMode = document.getElementById('darkMode');
// darkMode.addEventListener('change', (event) => {
//     if (event.target.checked) {
//         document.body.classList.add('dark')
//     } else {
//         document.body.classList.remove('dark')
//     }
// })

const darkModeBtn = document.getElementById('theme-switcher'),
      logoImg = document.querySelector('.nav__logo-img'),
      timerBlocks = document.querySelectorAll('.promo__timer-block');
darkModeBtn.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        logoImg.src="icons/logo-white.png";
        timerBlocks.forEach((block) => {
            block.style.background = "#333";
        })
    } else {
        logoImg.src="icons/logo-black.png";
        timerBlocks.forEach((block) => {
            block.style.background = "#F2F5F5";
        })
    }

})

//! ============ NAV HEADER SHADOW ============
window.addEventListener('scroll', function() {
    var scrollPosition = window.scrollY || window.pageYOffset;
    const headerBar = document.querySelector('.nav');
    
    if (scrollPosition > 10) {
        headerBar.classList.add('floatingNav');
    } else {
        headerBar.classList.remove('floatingNav');
    }
});

//! ============ TIMER ============
const deadline = '2023-09-29'; //  конечная дата

function getTimeRemaining(endtime) { //функция по расчету промежутков
    const t = Date.parse(endtime) - Date.parse(new Date()), // создаем локальную переменную в которую методом Date.parse разбираем строковое значение и переводим его в милисекунды. от этих милисекунд отнимаем также переведенное в милисекунды ВРЕМЯ ДАТЫ ИЗ СИСТЕМЫ. получаем разницу которую и будет отщитывать таймер.
        days = Math.floor( (t / (1000 * 60 * 60 * 24)) ), //  вычисляем дни. выводим разультат без остатся через math.floor. РАЗНИЦУ делим на произведение (тысяча милисекунд  умноженые на 60(так получаем количество милисекунд в одной минуте) умноженые ещё раз на 60(получаем сколько в одном часе) и умножаем еще раз на 24 часа(и получаем сколько в сутках будет милисекунд) ). арифметика в скобках - получение милисекунд в одних сутках.  разницу в милисекундах делим на милисекунды в одних сутках и получаем СКОЛЬКО СУТОК ОСТАЛОСЬ ДО ОКОНЧАНИЕ НАШЕЙ ДАТЫ.
        hours = Math.floor( (t / (1000 * 60 * 60) %  24) ), // (нашу разницу милисекунд делим на количество милисекунд в одном часе) делим это % на 24 и % возвращает нам остаток от деления. (пример%: 5 % 2 = 1.  5/2=4 и 1 в остатке)
        minutes = Math.floor( (t / 1000 / 60) % 60), // (разницу делим на 1000 и получаем количество секунд которые у нас есть, потом делим на 60 и получаем количество минут) % 60 т.к. в одной минуте шестьдесят секунд. и получаем остаток деления минут. (примечание: он не должен быть больше чем 60).
        seconds = Math.floor( (t / 1000) % 60); // (остаток делем на 100 и получаем колиество секунд внутри милисекунд) и % остаток от 60. 

    return { //функция возвращает обьект в котором на основе расчетов получены отдельные данные.
        'total': t, // разница
        'days': days, // дни
        'hours': hours , //часы
        'minutes': minutes, //минуты
        'seconds': seconds //секунды
    };
}

function getZero(num) { // добавления нуля к числам до 10. если было 2 останет 02. было 6 станет 06. 10 и дальше не изменяется т.к. двухзначное. аргументом передается какое-то число.
    if (num >= 0 && num < 10) { // сработает если число больше или равно нули И меньше десяти.
        return `0${num}`; //возвращаем добавочный ноль и то число которое было передано в аргумент.
    } else { // если число больше 10
        return num; // просто возвращаем его и ничего не делаем т.к. не надо.
    }
}

function setClock(selector, endtime) { // функция установки таймера на страничке. принимает 2 аргумента.

            //элементы со страницы:
const timer = document.querySelector(selector), // переменная таймер - получаем в нее таймер. если их на странице будет несколько, то их селектор передается сюда первым аргументом.
        days = timer.querySelector('#days'), // получаем айди #days обращаясь не к документу а сразу к таймеру
        hours = timer.querySelector('#hours'), // получаем айди #hours обращаясь не к документу а сразу к таймеру
        minutes = timer.querySelector('#minutes'), // получаем айди #minutes обращаясь не к документу а сразу к таймеру
        seconds = timer.querySelector('#seconds'), // получаем айди #seconds обращаясь не к документу а сразу к таймеру
        timeInterval = setInterval(updateClock, 1000); // устанавливаем, что с интервалом в секунду будем запускать функцию updateClock. имитация стрелки часов. тик-так :)
        
        updateClock(); // запускается тут, для того, что бы не было скачков и она начинала действовать с момента загрузки страницы.

function updateClock() { // помещаем таймер на страницу. теперь об будет виден глазу.
    const t = getTimeRemaining(endtime); // в локальную переменную  засовываем "функция по расчету промежутков" написаную первой(которая вычисляет всё и переносит итоги в обьект). теперь в t хранится этот обьект с уже полученными данными.

        // закидываем всё это дело в верстку
    days.innerHTML = getZero(t.days);  // в полученный выше (days = timer.querySelector('#days')) #days закидывает значение из обьета, проверяя, надо ли подставлять ноль или нет.
    hours.innerHTML = getZero(t.hours);// в полученный выше (hours = timer.querySelector('#hours')) #hours закидывает значение из обьета, проверяя, надо ли подставлять ноль или нет.
    minutes.innerHTML = getZero(t.minutes);// в полученный выше (minutes = timer.querySelector('#minutes')) #minutes закидывает значение из обьета, проверяя, надо ли подставлять ноль или нет.
    seconds.innerHTML = getZero(t.seconds);// в полученный выше (seconds = timer.querySelector('#seconds')) #seconds закидывает значение из обьета, проверяя, надо ли подставлять ноль или нет.

    if (t.total <= 0) { // проверяем у обьекта созданного первой функцией getTimeRemaining() свойство total, и если оно равняется нулю, значит таймер истек, интервал останавливается и таймер больше не идет.
        clearInterval(timeInterval); // собственно сама отмена таймера.
    }

}

} 

setClock('.promo__timer-wrapper', deadline); // запускаем функцию установки времени для определенного таймера. передаем первым аргументом тот таймер на сайте на который нужно установить отсчет. а вторым аргументом сам дедлайн в формате строчки 
