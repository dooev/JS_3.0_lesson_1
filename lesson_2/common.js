let shopName = prompt("Название Вашего магазина?");
let budget = prompt("Ваш месячный бюджет?");
let time = 19; 

mainList = {
	shopName: shopName,
	budget: budget,
	shopGoods: [],
	employers: {},
	open: false
};

// Рабочие часы START
if (time > 8 && time < 20) {
	document.write('Мы открыты!<br>')
} else if(time < 24){
	document.write('Мы уже закрыты!<br>')
	} else if (time < 8) {
		document.write('Мы еще не открылись!<br>')
		} else {
			document.write('Это невозможно!<br>')
			};
// Рабочие часы END

// Вывод дневного бюджета START
let dayMoney = (mainList.budget / 30);
alert("Бюджет на один день около  " + Math.round(dayMoney) + "руб"); // добавил обнуление
document.write("Бюджет на один день около  " + Math.round(dayMoney) + 'руб<br/>')
// Вывод дневного бюджета END


// Решение из видеоурока START + задание Ивана

for(let i = 0; i<5; i++) {
	let a = prompt("Какой тип товаров будем продавать?");
	if ((typeof(a)) === 'string' && (typeof(a)) != null && a != "" && a.length < 50 ) {
		mainList.shopGoods.push(a);
		console.log('Все верно, "'+a+'" подходит');
		document.write('Все верно, "'+a+'" подходит<br/>');
	} else {
			a;
			i--;
			console.log('Нечего не получится, если вы не введете правельные данные.');
		}
};

// Решение из видеоурока END


// Мое решение 1 START

// let i = 0;
// while (i < 5) {
// 	let a = prompt("Какой тип товаров будем продавать?");

// 	if ((typeof(a)) === 'string' && (typeof(a)) != null && a != "" && a.length < 50 ) {
// 		mainList.shopGoods.push(a);
// 		console.log('Все верно, "'+a+'" подходит');
// 		document.write('Все верно, "'+a+'" подходит<br/>');
// 	} else {
// 		a;
// 		i--;
// 		console.log('Нечего не получится, если вы не введете правельные данные');
// 	};
// 		i++;

// 	console.log(a);
// };

// Мое решение 1 END


// Мое решение 2 START

// let i = 0;
// do {
// 	let a = prompt("Какой тип товаров будем продавать?");
// 	if ((typeof(a)) === 'string' && (typeof(a)) != null	&& a != "" && a.length < 50 ) {
// 		mainList.shopGoods.push(a);
// 		console.log('Все верно, "'+a+'" подходит');
// 		document.write('Все верно, "'+a+'" подходит<br/>');
// 	} else {
// 		console.log('Нечего не получится, если вы не введете правельные данные');
// 		a;
// 		i--;
// 	};
// 	i++;
// } while (i < 5) ;

// Мое решение 2 END


