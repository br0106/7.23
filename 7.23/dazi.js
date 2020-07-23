var cl = document.documentElement.clientHeight;
var nums = 5;
var speed = 5;
var main = document.querySelector(".main");
var letter = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var score = 0;
var scoreNum = document.querySelector(".score-num");
scoreNum.innerText = score;
var playTips = document.querySelector(".play-tips");
var reloadBtn = document.querySelector(".reload-btn");
//生成26个字母图片
function getLetter(num)
{
	for(let i=0;i<num;i++)
	{
		var number = Math.floor(Math.random()*26);
		var lett = letter[number];
		//创建一个img标签，最后放到main里面
		var img = document.createElement("img");
		img.src = `img/${lett}.png`;
		//y轴方向偏移量，top
		var t = -80 - Math.random()*100; 
		//x轴方向偏移量，left
		var l = Math.random()*970;
		img.style.cssText = `width:50px;position:absolute;left:${l}px;top:${t}px;`
		img.className = lett;
		main.appendChild(img);
	}
}
getLetter(nums);
var t = null;
//下落，字母消失。血条减1
function play()
{
	t = setInterval(function()
		{
			var letters = document.querySelectorAll(".main img");
			if(letters.length < nums)
			{
				console.log("获取");
				getLetter(nums - letters.length);
			}
			for(let i=0;i<letters.length;i++)
			{
				var ltop = letters[i].offsetTop;
				letters[i].style.top = ltop + speed + "px";
				if(ltop>cl-80)
				{
					main.removeChild(letters[i]);
					blood--;
					bloods.innerText = blood;
					if(blood <= 0)
					{
						clearInterval(t);
						main.innerHTML = "";
						playTips.style.display = "block";
					}
				}
			}
		},50)
	document.onkeydown = function(e)
	{
		var keyCode = e.key;
		var all = document.querySelectorAll(".main img");
		for(let i=0;i<all.length;i++)
		{
			if(all[i].className == keyCode)
			{
				main.removeChild(all[i]);
				score ++;
				scoreNum.innerText = score;
				break;
			}
		}
	}
}
play();
reloadBtn.onclick = function()
{
	blood = 10;
	score = 0;
	bloods.innerText = blood;
	scoreNum.innerText = score;
	playTips.style.display = "none";
	play();
}
