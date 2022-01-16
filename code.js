const words = ["dators","māja","ābols","otrdiena","plūme", "kefīrs"];
var random_word = Math.floor(Math.random() * words.length);
var movable = [];
var win_condition = 0;

var p = document.getElementById("about")
p.innerText = "Realizēta 1 raunda spēle (spēlēt vēlreiz -> Reload). Burti automātiski pielīp pareizā pozīcijā. Pagaidām nevar izmantot vārdus ar vienādiem burtiem. Špikeris vārdam: "+ words[random_word];

function Move(id)
{
	letter = 'l'+id;
	lposition = 'p'+id;
	//window.alert(lposition);
	var div = document.getElementById(letter);
	div.style.position = "absolute";
	var offsets = document.getElementById('game_field').getBoundingClientRect();
	var top = offsets.top+60;
	var left = offsets.left+40;
	var top_end = top+390;
	var left_end = left+1140;
	
	
	
	var listener = function(e) {
		
		for(let i=0; i<words[random_word].length; i++)
		{
			if (movable[i])
			{	
				var correct_letter = document.getElementById('l'+i).getBoundingClientRect();
				var cl_top = correct_letter.top;
				var cl_left = correct_letter.left;
				var correct_position = document.getElementById('p'+i).getBoundingClientRect();
				var cp_top = correct_position.top;
				var cp_left = correct_position.left;
			}
			
			//match
			if (Math.abs(cl_top - cp_top)<15 && Math.abs(cl_left - cp_left)<15 && movable[id])
			{
				div.style.left = cp_left-5 + "px";
				div.style.top = cp_top-5 + "px";
				movable[id] = false;
				var p = document.getElementById('pts');
				p.innerHTML = p.innerHTML*1+1;
				win_condition = win_condition+1;
				if (win_condition == words[random_word].length)
				{
					RemoveFakeLetters();
					RemoveWord();
					for(let i=0; i<words[random_word].length; i++)
					{
						PlaceFakeLetter("word");
					}
					PlaceWin();
				}
			}
			
			if (e.pageX>left && e.pageX<left_end && e.pageY>top && e.pageY<top_end && movable[id])
			{
			  div.style.left = e.pageX - 50 + "px";
			  div.style.top = e.pageY - 50 + "px";
			}
		}
	};

	div.addEventListener('mousedown', e => {
		document.addEventListener('mousemove', listener);
	});

	div.addEventListener('mouseup', e => {
		document.removeEventListener('mousemove', listener);
	});
	
}

function PlaceLetter(id, shuffled_id, letter)
{
	var div = document.createElement("div");
	div.setAttribute('class', 'letter');
	div.setAttribute('id', 'l'+id);
	div.innerHTML = letter;
	var offsets = document.getElementById("for_letters").getBoundingClientRect();
	var x = offsets.left;
	div.style.left = (x+shuffled_id*80)+'px';
	document.getElementById("for_letters").appendChild(div);	
}

function PlaceFakeLetter(s)
{
	var div = document.createElement("div");
	div.setAttribute('class', 'fakeletter');
	div.setAttribute('id', 'fake');
	document.getElementById(s).appendChild(div);	
}

function RemoveFakeLetters()
{
	for(let i=0; i<words[random_word].length; i++)
	{
		var elem = document.getElementById("fake");
		elem.parentNode.removeChild(elem);	
	}
}

function PlaceWord(id)
{
	var div = document.createElement("div");
	div.setAttribute('class', 'letter');
	div.setAttribute('id', 'p'+id);
	document.getElementById("word").appendChild(div);	
}

function RemoveWord()
{
	for(let i=0; i<words[random_word].length; i++)
	{
		var elem = document.getElementById('p'+i);
		elem.parentNode.removeChild(elem);	
	}
}

function PlaceWin()
{
	var div1 = document.createElement("div");
	div1.setAttribute('class', 'letter');
	div1.innerHTML = 'W';
	document.getElementById("for_letters").appendChild(div1);
	
	var div2 = document.createElement("div");
	div2.setAttribute('class', 'letter');
	div2.innerHTML = 'I';
	document.getElementById("for_letters").appendChild(div2);
	
	var div3 = document.createElement("div");
	div3.setAttribute('class', 'letter');
	div3.innerHTML = 'N';
	document.getElementById("for_letters").appendChild(div3);
}

for(let i=0; i<words[random_word].length; i++)
{
	movable[i]=true;
}

for(let i=0; i<words[random_word].length; i++)
{
	PlaceFakeLetter("for_letters");
}

//letters generated
var shuffled_id = [];
for(let i=0; i<words[random_word].length; i++)
{
	shuffled_id[i]=i;
}
const shuffle = str => [...str].sort(()=>Math.random()-.5).join(''); 
var shuffled_id = shuffle(shuffled_id);
for(let i=0; i<words[random_word].length; i++)
{
	PlaceLetter(i, shuffled_id[i], words[random_word].charAt(i));
}


for(let i=0; i<words[random_word].length; i++)
{
	PlaceWord(i);
}

for(let i=0; i<words[random_word].length; i++)
{
	Move(i);
}

