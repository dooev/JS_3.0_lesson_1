window.addEventListener('DOMContentLoaded', ()=> {

	let info = document.getElementsByClassName('info-header')[0],
			tab = document.getElementsByClassName('info-header-tab'),
			tabContent = document.getElementsByClassName('info-tabcontent');

	function hideTabContent(a) {
		for (let i = a; i < tabContent.length; i++) {
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

	info.addEventListener('click', event => {
		let target = event.target;
		if (target.className == 'info-header-tab') {
			for (let i = 0; i < tab.length; i++) {
				if (target == tab[i]) {
					showTabContent(i);
					break;
				};
			};
		};
	});

// Timer

	let deadLine = '2018-08-30';

	function getTimeRemaining(endTime){
		let t = Date.parse(endTime) - Date.parse(new Date()),
			 sec = Math.floor( (t/1000) % 60 ), 
			 min = Math.floor( (t/1000/60) % 60 ), 
			 hou = Math.floor( (t/(1000*60*60)) ); 
		
		return {
			'total': t,
			'hou': hou,
			'min': min,
			'sec': sec
		};
	};

	function setClock(id, endTime){
		let timeInterval = setInterval(updateClock, 1000);
		let timer = document.getElementById(id),
			 h = timer.querySelector('.hours')
			 m = timer.querySelector('.minutes')
			 s = timer.querySelector('.seconds')
	
		function updateClock() {
			let t = getTimeRemaining(endTime);
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

	function addZero(num){
		if (num < 10 ) {
			return '0' + num; 
		}	else {
			return num;
		}
	};

	//Modal
	let more = document.querySelector('.more'),
		 overlay = document.querySelector('.overlay'),
		 close = document.querySelector('.popup-close'),
		 moreTab = document.querySelectorAll('.description-btn');
	
	more.addEventListener('click', () => {
		this.classList.add('more-splash');
		overlay.style.display = 'block';
		document.body.style.overflow = 'hidden';
	});

	for (let i = 0; i < moreTab.length; i++) {
		moreTab[i].addEventListener('click', function(){
			if (this.classList == 'description-btn') {
				// this.classList.add('more-splash');
				overlay.style.display = 'block';
				document.body.style.overflow = 'hidden';
			}

		});
	}


	close.addEventListener('click', () => {
		overlay.style.display = 'none';
		more.classList.remove('more-splash');
		document.body.style.overflow = '';
	});

// Оправка формы
/* Алгоритм 
				1.переменные 
					а) кнопки 
					б) вывода статуса отправки запроса

				2.обработчики событий на кнопки
				3.отменить стандартное действие нажатия кнопки (event.prevent)

				4.отправка запроса
					а) создание
					б) настройка
					в) отправка
					г) колировка....
				5.вывод сообщения о статусе запроса 
				6. очистка input после отправки формы
*/
	let formPopup = document.getElementsByClassName('main-form')[0],
		 btnPopup = document.getElementsByClassName('popup-form__btn')[0],
		 inputPopup = formPopup.getElementsByTagName('input'),
		 formFooter = document.getElementById('form'),
		 btnFooter = formFooter.getElementsByTagName('button')[0],
		 inputFooter = formFooter.getElementsByTagName('input'),
		 inputS = [inputPopup, inputFooter[0], inputFooter[1]],
		 statusMessage = document.createElement('div');
		 statusMessage.classList.add('status');

	let status = new Object();
		 status.ok = "Заявка получена, мы перезвоним Вам в течении 10 минут";
		 status.load = "Загрузка...";
		 status.fail = "Что то пошло не так... Отправьте форму еще раз, пожалуйста";

	formPopup.addEventListener('submit', function(event) {
		event = event.preventDefault();
		formPopup.appendChild(statusMessage);


	let request1 = new XMLHttpRequest();
	request1.open('POST', 'server.php');

	request1.setRequestHeader('Content-Type', 'application/x-www-form-unlencoded');
	
	let FormData1 = new FormData(formFooter);

	request1.send(FormData1);
	

	request1.onreadystatechange = function() {
		if (request1.readyState < 4) {
			statusMessage.innerHTML = status.load;
		} else if (request1.readyState === 4) {
			if (request1.status == 200 && request1.status < 300) {// коды ошибок
				statusMessage.innerHTML = status.ok;
			} else {
				statusMessage.innerHTML = status.fail;
				}
		};
	};	
			console.log("request1.readyState", request1.readyState);
		




	for (var i = 0; i < inputS.length; i++) {
		inputS[i].value = ''; // очищаем поля ввода
	}
	});

		formFooter.addEventListener('submit', function(event) {
		event = event.preventDefault();
		formFooter.appendChild(statusMessage);
	


	let request2 = new XMLHttpRequest();

	request2.open('POST', 'server.php');

	request2.setRequestHeader('Content-Type', 'application/x-www-form-unlencoded');

	let FormData2 = new FormData(formPopup);

	request2.send(FormData2);

	request2.onreadystatechange = function() {
		if (request2.readyState < 4) {
			statusMessage.innerHTML = status.load;
		} else if (request2.readyState === 4) {
			if (request2.status == 200 && request2.status < 300) {// коды ошибок
				statusMessage.innerHTML = status.ok;
			} else {
				statusMessage.innerHTML = status.fail;
				}
		};
	};


	for (var i = 0; i < inputS.length; i++) {
		inputS[i].value = ''; // очищаем поля ввода
	}


	});


});

