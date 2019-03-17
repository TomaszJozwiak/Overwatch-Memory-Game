var cards = ["genji.png", "bastion.png", "dva.png", "hanzo.png", "lucio.png", "ana.png", "genji.png", "bastion.png", "dva.png", "hanzo.png", "lucio.png", "ana.png"];

function shuffleArray(cards)
{
    for (var i = cards.length - 1; i > 0; i--)
	{
		var j = Math.floor(Math.random() * (i + 1));
		var temp = cards[i];
		cards[i] = cards[j];
		cards[j] = temp;
    }
}
 
shuffleArray(cards);

for(let i=0; i<12; i++)
{
	document.getElementById('c' + i).addEventListener("click", function() { revealCard(i); });
}

var oneVisible = false;
var turnCounter = 0;
var visible_nr = null;
var lock = false;
var pairsLeft = 6;

function revealCard(nr)
{
	var opacityValue = $('#c' + nr).css('opacity');
	
	
	if (opacityValue != 0 && lock == false && nr != visible_nr)
	{
		lock = true;
		
		var picture = "url(img/" + cards[nr] + ")";
		
		$('#c' + nr).css('background-image', picture);
		$('#c' + nr).addClass('cardA');
		$('#c' + nr).removeClass('card');
		
		if(oneVisible == false)
		{
			oneVisible = true;
			visible_nr = nr;
			lock = false;
		}	
		else
		{	
			if(cards[visible_nr] == cards[nr])
			{
				setTimeout(function() { hide2Cards(nr, visible_nr) }, 750);
			}
			else
			{
				setTimeout(function() { restore2Cards(nr, visible_nr) }, 1000);
			}
			
			turnCounter++;
			$('.notification').html('Turn counter: ' + turnCounter);
			oneVisible = false;
		}	
	}	
}

function hide2Cards(nr1, nr2)
{
	$('#c' + nr1).css('opacity', '0');
	$('#c' + nr2).css('opacity', '0');
	
	pairsLeft--;
	
	if (pairsLeft == 0)
	{
		$('.board').html( '<h1>You win!<br>Done in ' + turnCounter + ' turns<h1> <span class="reload" onclick="location.reload()">RELOAD</span></h1>');
	}
	lock = false;
}

function restore2Cards(nr1, nr2)
{
	$('#c' + nr1).css('background-image', 'url(img/karta.png)');
	$('#c' + nr1).addClass('card');
	$('#c' + nr1).removeClass('cardA');
	
	$('#c' + nr2).css('background-image', 'url(img/karta.png)');
	$('#c' + nr2).addClass('card');
	$('#c' + nr2).removeClass('cardA');
	
	lock = false;
}

function resetGame()
{
	oneVisible = false;
	turnCounter = 0;
	visible_nr = null;
	lock = false;
	pairsLeft = 6;
	
	for (i = 0; i < 12; i++)
	{
		$('#c' + i).css('background-image', 'url(img/karta.png)');
		$('#c' + i).addClass('card');
		$('#c' + i).removeClass('cardA');
		$('#c' + i).css('opacity', '100');
	}	
	
	$('.button').html('<input type="button" value="RETRY" onclick="confirmation()">');
	$('.notification').html('Turn counter: 0');
	
shuffleArray(cards);
}

function backToGame()
{
	$('.notification').html('Turn counter: ' + turnCounter);
	$('.button').html('<input type="button" value="RETRY" onclick="confirmation()">');
}

function confirmation()
{
	$('.notification').html('Turn counter: ' + turnCounter + '</br></br> Are you sure?');
	$('.button').html('<input type="button" value="YES" onclick="resetGame()"><input type="button" value="NO" onclick="backToGame()">');
}