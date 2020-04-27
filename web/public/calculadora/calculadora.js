
var ecuacion = '0';
var lastChar;
var num1 = {
	completed: false,
	decimal: false,
};
var num2 = {
	completed: false,
	decimal: false
}
var operacion;

function agregarDigito(digito) {
	if (operacion == null && !num1.completed) {
		if (ecuacion === '0' && digito !== '.') {
			ecuacion = digito.toString();
			lastChar = digito;
		} else if (digito === '.' && num1.decimal === false) {
			num1.decimal = true;
			ecuacion += '.';
			lastChar = digito;
		} else if (digito !== '.') {
			ecuacion += digito.toString();
			lastChar = digito;
		}
		cargarDisplay(parsearEcuacion(ecuacion));
	} else if(operacion != null) {
		if (digito !== '.') {
			ecuacion += digito.toString();
			lastChar = digito;
		} else if (digito === '.' && esOperacion(lastChar)){
			ecuacion += '0.';
			lastChar = digito;
			num2.decimal = true;
		} else if (digito === '.' && num2.decimal === false) {
			num2.decimal = true;
			ecuacion += '.';
			lastChar = digito;
		}
		cargarDisplay(parsearEcuacion(ecuacion));
	} else if (num1.completed === true) {
		if (digito === '.') {
			ecuacion = '0.';
			lastChar = digito;
			num1.decimal = true;
		} else {
			ecuacion = digito.toString();
			num1.decimal = false;
		}
		num1.completed = false;
		cargarDisplay(parsearEcuacion(ecuacion));
	}
}


function elegirOperador(op) {
	if (operacion == null) {
		operacion = op;
		ecuacion += (';'+op+';');
		lastChar = op;
		num1.completed = true;
	} else if (esOperacion(lastChar)) {
		operacion = op;
		ecuacion = ecuacion.slice(0, -2) + op +';';
	}
	cargarDisplay(parsearEcuacion(ecuacion));
}


function cargarDisplay(elemento) {
	document.getElementById("display").innerHTML = elemento;
}

function esOperacion(char) {
	switch (char) {
		case '+':
			return true;
		case '-':
			return true;
		case '*':
			return true;
		case '/':
			return true;
		default:
			return false;
	}
}

function reset() {
	ecuacion = '0';
	lastChar = null;
	num1 = {
		completed: false,
		decimal: false,
	};
	num2 = {
		completed: false,
		decimal: false
	}
	operacion = null;
	cargarDisplay(parsearEcuacion(ecuacion));
}


function operar() {
	if (operacion != null) {
		let terminos = ecuacion.split(';');

		if(terminos.length < 3) {
			ecuacion = '('+terminos[0]+')'+terminos[1]+'0';
		} else {
			ecuacion = '('+terminos[0]+')'+terminos[1]+'('+terminos[2]+')';
		}

		resultado = eval(ecuacion);
		reset();
		cargarDisplay(resultado);
		if (resultado != 'Infinity') {
			ecuacion = resultado.toString();
			num1.completed = true;
		} else {
			cargarDisplay('Math Error');
		}
	}
}

function parsearEcuacion(ec) {
	ec = ec.replace(/;/g, '');
	return ec;
}

function opuesto() {
	let temp;
	if (num1.completed === false || operacion == null) {
		if(ecuacion.startsWith('-')) {
			ecuacion = ecuacion.slice(1);
		} else {
			ecuacion = '-'+ ecuacion;
		}
	} else {
		temp = ecuacion.split(';');
		if(temp[2] !== '') {
			if(temp[2].startsWith('-')) {
				temp[2] = temp[2].slice(1);
			} else {
				temp[2] = '-'+ temp[2];
			}
			ecuacion = temp[0]+';'+temp[1]+';'+temp[2];u
		}
	}
	cargarDisplay(parsearEcuacion(ecuacion));
}

function porcentaje() {
	let temp;
	if (num1.completed === false || operacion == null) {
		ecuacion = (parseFloat(ecuacion)/100).toString();
	} else {
		temp = ecuacion.split(';');
		if(temp[2] !== '') {
			temp[2] = (parseFloat(temp[2])/100).toString();
			ecuacion = temp[0]+';'+temp[1]+';'+temp[2];
		}
	}
	cargarDisplay(parsearEcuacion(ecuacion));
}