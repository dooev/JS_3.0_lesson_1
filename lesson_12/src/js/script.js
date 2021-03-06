'use strict';

window.addEventListener('DOMContentLoaded', function () {

	var info = document.getElementsByClassName('info-header')[0],
	    tab = document.getElementsByClassName('info-header-tab'),
	    tabContent = document.getElementsByClassName('info-tabcontent');

	function hideTabContent(a) {
		for (var i = a; i < tabContent.length; i++) {
			tabContent[i].classList.remove('show');
			tabContent[i].classList.add('hide');
		};
	};
	hideTabContent(1);

	function showTabContent(b) {
		if (tabContent[b].classList.contains('hide')) {
			hideTabContent(0);
			tabContent[b].classList.remove('hide');
			tabContent[b].classList.add('show');
		};
	};

	info.addEventListener('click', function (event) {
		var target = event.target;
		if (target.className == 'info-header-tab') {
			for (var i = 0; i < tab.length; i++) {
				if (target == tab[i]) {
					showTabContent(i);
					break;
				};
			};
		};
	});

	// Timer

	var deadLine = '2018-08-30';

	function getTimeRemaining(endTime) {
		var t = Date.parse(endTime) - Date.parse(new Date()),
		    sec = Math.floor(t / 1000 % 60),
		    min = Math.floor(t / 1000 / 60 % 60),
		    hou = Math.floor(t / (1000 * 60 * 60));

		return {
			'total': t,
			'hou': hou,
			'min': min,
			'sec': sec
		};
	};

	function setClock(id, endTime) {
		var timeInterval = setInterval(updateClock, 1000);
		var timer = document.getElementById(id),
		    h = timer.querySelector('.hours'),
		m = timer.querySelector('.minutes'),
		s = timer.querySelector('.seconds');

		function updateClock() {
			var t = getTimeRemaining(endTime);
			h.innerHTML = addZero(t.hou);
			m.innerHTML = addZero(t.min);
			s.innerHTML = addZero(t.sec);

			if (t.total <= 0) {
				h.innerHTML = '00';
				m.innerHTML = '00';
				s.innerHTML = '00';
				clearInterval(timeInterval);
			}
		};

		updateClock();
	};

	setClock('timer', deadLine);

	function addZero(num) {
		if (num < 10) {
			return '0' + num;
		} else {
			return num;
		}
	};

	//Modal
	var more = document.querySelector('.more'),
	    overlay = document.querySelector('.overlay'),
	    close = document.querySelector('.popup-close'),
	    moreTab = document.querySelectorAll('.description-btn');

	more.addEventListener('click', function () {
		undefined.classList.add('more-splash');
		overlay.style.display = 'block';
		document.body.style.overflow = 'hidden';
	});

	for (var i = 0; i < moreTab.length; i++) {
		moreTab[i].addEventListener('click', function () {
			if (this.classList == 'description-btn') {
				// this.classList.add('more-splash');
				overlay.style.display = 'block';
				document.body.style.overflow = 'hidden';
			}
		});
	}

	close.addEventListener('click', function () {
		overlay.style.display = 'none';
		more.classList.remove('more-splash');
		document.body.style.overflow = '';
	});

	// Оправка формы

	var formPopup = document.getElementsByClassName('main-form')[0],
	    btnPopup = document.getElementsByClassName('popup-form__btn')[0],
	    inputPopup = formPopup.getElementsByTagName('input'),
	    formFooter = document.getElementById('form'),
	    btnFooter = formFooter.getElementsByTagName('button')[0],
	    inputFooter = formFooter.getElementsByTagName('input'),
	    inputS = [inputPopup, inputFooter[0], inputFooter[1]],
	    statusMessage = document.createElement('div'),
	    statusMessageLoad = document.createElement('IMG'),
	    statusMessageOk = document.createElement('IMG');
	statusMessageLoad.classList.add('status-img');
	statusMessageOk.classList.add('status-img');
	statusMessageLoad.src = "img/ajax-loader.GIF";
	statusMessageOk.src = "img/success.SVG";
	statusMessage.classList.add('status');

	var status = new Object();
	status.ok = ' \u0417\u0430\u044F\u0432\u043A\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0430, \u043C\u044B \u043F\u0435\u0440\u0435\u0437\u0432\u043E\u043D\u0438\u043C \u0412\u0430\u043C \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0438 10 \u043C\u0438\u043D\u0443\u0442';
	status.load = ' \u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430...';
	status.fail = "Что то пошло не так... Отправьте форму еще раз, пожалуйста";

	var toServer = {
		// Создаем объект с методом отправки данных на сервер
		Go: function Go(event) {
			var _this = this;

			// В качестве аргумента передаем контекст вызова

			event = event.preventDefault();
			var formData = new FormData(this);

			function postData(data) {
				return new Promise(function (resolve, reject) {
					var request = new XMLHttpRequest();

					request.open('POST', 'server.php');

					request.setRequestHeader('Content-Type', 'application/x-www-form-unlencoded');

					request.onreadystatechange = function () {
						if (request.readyState < 4) {
							resolve();
						} else if (request.readyState === 4) {
							if (request.status == 200 && request.status < 300) {
								// коды ошибок
								resolve();
							} else {
								reject();
							}
						};
					};

					request.send(formData);
				});
			} // END postData

			function clearInput() {
				for (var i = 0; i < inputS.length; i++) {
					inputS[i].value = ''; // очищаем поля ввода
				}
			};

			postData(formData).then(function () {
				_this.appendChild(statusMessageLoad);
				_this.appendChild(statusMessage);
				statusMessage.innerHTML = status.load;
			}).then(function () {
				_this.removeChild(statusMessageLoad);
				_this.removeChild(statusMessage);
				_this.appendChild(statusMessageOk);
				_this.appendChild(statusMessage);
				statusMessage.innerHTML = status.ok;
			}).catch(function () {
				_this.removeChild(statusMessageLoad);
				_this.removeChild(statusMessageOk);
				statusMessage.innerHTML = status.fail;
			}).then(clearInput);
		} // END Go метод объекта

	}; // END toServer object

	formPopup.addEventListener('submit', toServer.Go);
	formFooter.addEventListener('submit', toServer.Go);

	//Slider
	var slideIndex = 1,
	    slideS = document.querySelectorAll('.slider-item'),
	    prev = document.querySelector('.prev'),
	    next = document.querySelector('.next'),
	    dotsWrap = document.querySelector('.slider-dots'),
	    dots = document.querySelectorAll('.dot');

	ShowSlides(slideIndex);

	function ShowSlides(n) {
		if (n > slideS.length) {
			slideIndex = 1;
		}
		if (n < 1) {
			slideIndex = slideS.length;
		}
		for (var i = 0; i < slideS.length; i++) {
			slideS[i].style.display = 'none';
		}
		for (var i = 0; i < dots.length; i++) {
			dots[i].classList.remove('dot-active');
		}
		slideS[slideIndex - 1].style.display = 'block';
		dots[slideIndex - 1].classList.add('dot-active');
	};

	function plusSlide(n) {
		ShowSlides(slideIndex += n);
	}
	function currentSlide(n) {
		ShowSlides(slideIndex = n);
	}

	prev.addEventListener('click', function () {
		plusSlide(-1);
	});

	next.addEventListener('click', function () {
		plusSlide(1);
	});

	dotsWrap.addEventListener('click', function (event) {
		for (var i = 0; i < dots.length + 1; i++) {
			if (event.target.classList.contains('dot') && event.target == dots[i - 1]) {
				currentSlide(i);
			}
		}
	});

	// Calc
	var persons = document.getElementsByClassName("counter-block-input")[0],
	    restDays = document.getElementsByClassName("counter-block-input")[1],
	    place = document.querySelector("#select"),
	    totalValue = document.querySelector("#total"),
	    personsSum = 0,
	    daysSum = 0,
	    total = 0,
	    zero = '';
	persons.setAttribute('type', 'text');
	restDays.setAttribute('type', 'text');

	totalValue.innerHTML = 0;

	persons.addEventListener('change', function () {
		// почему обработчик не срабатывает если input type=number и я первым ввожу "е" или "+" ?
		var a = persons.value.replace(/[\>\<\[\]\{\}\/\|\\':;`~"e+A-Za-zА-Яа-я!@#$%^&*()_=.,?-]/gi, '' );
		persons.value = a; 
		personsSum = +this.value;
		total = (daysSum + personsSum) * 4000;

		if (restDays.value == "") {
			totalValue.innerHTML = 0;
		} else {
			totalValue.innerHTML = total;
		}
	});

	restDays.addEventListener('change', function () {
		// почему обработчик не срабатывает если input type=number и я первым ввожу "е" или "+" ?
		console.log("restDays.value", restDays.value);
		var a = restDays.value.replace(/[\>\<\[\]\{\}\/\|\\':;`~"e+A-Za-zА-Яа-я!@#$%^&*()_=.,?-]/gi, '' );
		restDays.value = a; 

		daysSum = +this.value;
		total = (daysSum + personsSum) * 4000;
		if (persons.value == "") {
			totalValue.innerHTML = 0;
		} else {
			totalValue.innerHTML = total;
		}
	});

	place.addEventListener('change', function () {
		if (restDays.value == "" || persons.value == "") {
			totalValue.innerHTML = 0;
		} else {
			var a = total;
			totalValue.innerHTML = a * this.options[this.selectedIndex].value;
		}
	});

	// function isInteger(n) { return n === +n && n === (n|0) }
	// console.log(Number.isInteger(persons));
	// console.log(persons);
});