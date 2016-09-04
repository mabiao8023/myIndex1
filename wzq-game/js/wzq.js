var cBoard=[];
var me=true;
var e = e||window.event;
//win 数组 嬴法数组 统计每条线上的嬴的总数
var wins=[];
//嬴法统计
var myWin=[];
var computerWin=[];
var over=false;

for (var i=0;i<15 ;i++ )
{
    cBoard[i]=[];
    for (var j=0;j<15 ;j++ )
    {
        cBoard[i][j]=0;
    }
}
for (var i=0;i<15 ;i++ )
{
    wins[i]=[];
    for (var j=0;j<15 ;j++ )
    {
        wins[i][j]=[];
    }
}
var  count=0;
for ( var i=0;i<15 ;i++ )
{
    for (var  j=0;j<11 ;j++ )
    {
        for (var  k=0;k<5 ;k++ )
        {
            wins[i][j+k][count]=true;
        }
        count++;
    }
}
for ( var i=0;i<15 ;i++ )
{
    for (var  j=0;j<11 ;j++ )
    {
        for (var  k=0;k<5 ;k++ )
        {
            wins[j+k][i][count]=true;
        }
        count++;
    }
}
for ( var i=0;i<11 ;i++ )
{
    for (var  j=0;j<11 ;j++ )
    {
        for (var  k=0;k<5 ;k++ )
        {
            wins[i+k][j+k][count]=true;
        }
        count++;
    }
}
for ( var i=0;i<11 ;i++ )
{
    for (var  j=14;j>3 ;j-- )
    {
        for (var k=0;k<5;k++ )
        {
            wins[i+k][j-k][count]=true;
        }
        count++;
    }
}
for (var i=0;i<count ;i++ )
{
    myWin[i]=0;
    computerWin[i]=0;
}
console.log(count);
var c=document.getElementById("myCanvas");
var cxt=c.getContext("2d");
cxt.strokeStyle="#bfbfbf";
for (var i=0;i<15;i++)
{
		cxt.moveTo(15,15+i*30);
		cxt.lineTo(435,15+i*30);
		cxt.stroke();
	    cxt.moveTo(15+i*30,15);
		cxt.lineTo(15+i*30,435);
		cxt.stroke();
}

var oneStep=function(i,j,me){
    cxt.beginPath();
    cxt.arc(15+i*30,15+j*30,13,0,2*Math.PI);
    cxt.closePath();
    var gradient=cxt.createRadialGradient(15+i*30+2,15+j*30-2,13,15+i*30+2,15+j*30-2,0);
    if (me)
    {
       gradient.addColorStop(0,"#0a0a0a");
        gradient.addColorStop(1,"#636766");
    }else
    {
      gradient.addColorStop(0,"#d1d1d1");
      gradient.addColorStop(1,"#f9f9f9");  
    }
    cxt.fillStyle=gradient;
    cxt.fill();
}
c.onclick=function(e){
    if (over)//游戏结束判断
    {
        return;
    }
	if (!me)
	{
		return;
	}
	var broswerName = window.navigator.userAgent;
	var x,y;
	//浏览器坐标兼容火狐中坐标兼容性的处理，没有直接处理当前元素的坐标
	if(broswerName.indexOf("Chrome")!=-1){
		x = e.offsetX;
		y = e.offsetY;
	}else{
		x=e.layerX-c.offsetLeft;
		y=e.layerY-c.offsetTop;
	}
    var i=Math.floor(x/30);
    var j=Math.floor(y/30);
    if (cBoard[i][j]==0)
    {
        oneStep(i,j,me); 
         cBoard[i][j]=1; 
       
        for (var k=0;k<count ;k++ )
        {
            if (wins[i][j][k])
            {
                myWin[k]++;
                computerWin[k]=6;
                if (myWin[k]==5)//k种赢法被实现
                {
                    window.alert("you win");
                    over=true;
                }
            }
        }
		if (!over)
		{
			 me=!me;
			computerAI();
		}
    }
   // oneStep(i,j,me); 
}
var computerAI=function(){
	var myScore=[];
	var computerScore=[];
	var max=0;
	var u=0,v=0;
	for (var i=0;i<15 ;i++ )
	{
		myScore[i]=[];
		computerScore[i]=[];
		for (var j=0;j<15 ;j++ )
		{
				myScore[i][j]=0;
				computerScore[i][j]=0;
		}
	}
	for (var i=0;i<15 ;i++ )
	{
		for (var j=0;j<15 ;j++ )
		{
			if (cBoard[i][j]==0)
			{
				for (var k=0; k<count;k++ )
				{
					if (wins[i][j][k]==1)
					{
						if (myWin[k]==1)
						{
							myScore[i][j]+=200;
						}else if (myWin[k]==2)
						{
							myScore[i][j]+=400;
						}else if (myWin[k]==3)
						{
							myScore[i][j]+=2000;
						}else if (myWin[k]==4)
						{
							myScore[i][j]+=10000;
						}
						if (computerWin[k]==1)
						{
							computerScore[i][j]+=220;
						}else if(computerWin[k]==2)
						{
							computerWin[i][j]+=420;
						}else if (computerWin[k]==3)
						{
							computerScore[i][j]+=2100;
						}else if (computerWin[k]==4)
						{
							computerScore[i][j]+=20000;
						}

					}
				}
				if (myScore[i][j]>max)
				{
					max=myScore[i][j];
					u=i;
					v=j;
				}else if (myScore[i][j]==max)
				{
					if (computerScore[i][j]>computerScore[u][v])
					{
						u=i;
						v=j;
					}
				}
				if (computerScore[i][j]>max)
				{
					max=computerScore[i][j];
					u=i;
					v=j;
				}else if (computerScore[i][j]==max)
				{
					if (myScore[i][j]>myScore[u][v])
					{
						u=i;
						v=j;
					}
				}
			}
		}
	}
	oneStep(u,v,false);
	cBoard[u][v]=2;
	for (var k=0;k<count ;k++ )
	{
		if (wins[u][v][k])
		{
			computerWin[k]++;
			myWin[k]=6;
			if (computerWin[k]==5)
			{
				window.alert("computer win!");
				over=true;
			}
		}
	}
	if (!over)
	{
		me=!me;
	}
}