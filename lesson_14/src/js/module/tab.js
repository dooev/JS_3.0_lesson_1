
function tab() {
	
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
};

module.exports = tab;