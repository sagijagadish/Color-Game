var reset = document.querySelector('#reset');
var easy = document.querySelector('#easy');
var hard = document.querySelector('#hard');
var squares = document.querySelectorAll('.square');
var below = document.getElementById('hide');
var title = document.getElementById('title');
var ColorDisplay = document.getElementById('color-display');
var msg = document.getElementById('msg');
var num_colors = 6 , colors , pickedColor , gameOver;

newGame();

easy.addEventListener('click',function() {
	easy.classList.add('selected');
	hard.classList.remove('selected');
	num_colors = 3;
	below.style.display = "none";
	newGame();
});

hard.addEventListener('click',function() {
	hard.classList.add('selected');
	easy.classList.remove('selected');
	num_colors = 6;
	below.style.display = "block";
	newGame();
});

function pickColor() {
	return colors[Math.floor(Math.random()*colors.length)];
}

function generate_colors(num) {
	ans = [];
	for(var i=0;i<num;++i) {
		var r = Math.floor(Math.random()*256);
		var g = Math.floor(Math.random()*256);
		var b = Math.floor(Math.random()*256);
		// console.log(r,g,b);
		ans.push("rgb("+r+", "+g+", "+b+")");
	}
	// console.log(ans);
	return ans;
}

function setColors(squares,colors) {
	for(var i =0;i<colors.length;++i) {
		squares[i].style.backgroundColor = colors[i];
	}
}

reset.addEventListener('click',function() {
	if(this.innerHTML == 'Play Again!') {
		title.style.backgroundColor = '#steelblue';
	}
	newGame();
});

function addEvents(squares,num_colors) {
	for(var i=0;i<num_colors;++i) {
		squares[i].addEventListener('click',function() {
			if(this.style.backgroundColor === pickedColor && !gameOver) {
				for(var j=0;j<6;++j) {
					squares[j].style.backgroundColor = pickedColor;
					title.style.backgroundColor = pickedColor;
				}
				msg.textContent = "Correct";
				gameOver = true;
				reset.textContent = "Play Again!";
			}
			else {
				if(!gameOver) {
					this.style.backgroundColor = "#232323";
					msg.textContent = "Try Again";
				}
			}
		});
	}
}

function newGame() {
	gameOver = false;
	colors = generate_colors(num_colors);
	pickedColor = pickColor();
	setColors(squares,colors);
	addEvents(squares,num_colors);
	msg.textContent = "";
	ColorDisplay.innerHTML = pickedColor;
	title.style.backgroundColor = 'steelblue ';
}