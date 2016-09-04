window.$=HTMLElement.prototype.$=function(selector){
    var selector=selector+"";
	var elems=(this===window?document:this).querySelectorAll(selector);
	return elems.length==0?null:
				elems.length==1?elems[0]:elems;
}
HTMLElement.prototype.css=function(prop,value){
	if (value==undefined)
	{
		return getComputedStyle(this)[prop];
	}else{
	   this.style[prop]=value
	}
}
HTMLElement.prototype.bind=function(eName,fn,capture){
	this.addEventListener(eName,fn,capture);
}
//��ҳ��������100��div���Ҿ�������
	var color=[1,2,3,4,5];
	var frag=document.createDocumentFragment();
	var fragbg=document.createDocumentFragment();
	for (var i=0; i<10;i++ )
	{
		for (var j=0;j<10 ;j++)
		{
			var div=document.createElement("div");		
			//var bgIdx=Math.floor(Math.random()*5+1);
            var rd=Math.random();
            var bgIdx=(rd<0.3?color[0]:
                     rd<0.4?color[1]:
                      rd<0.5?color[2]:
                     rd<0.6?color[3]:color[4]);
			div.id="p"+i+j;
			div.css("top",10+42*i+"px");
			div.css("left",10+42*j+"px");
			div.className="n"+bgIdx;
			frag.appendChild(div);
			var divbg=document.createElement("div");
			divbg.id="b"+i+j;
			divbg.innerHTML=i;
			divbg.css("top",10+42*i+"px");
			divbg.css("left",10+42*j+"px");
			divbg.css("display","none");
			fragbg.appendChild(divbg);
		}	
	}
  $("#container").appendChild(fragbg);
  $("#container").appendChild(frag);
  var game={
		COUNT:0,//��¼������һ���ͬһ����ɫ�ĸ���
		color:null,//��ǰ�������λ�õ�Ԫ�صĸ���
        score:0,
		init:function(){
		//����������ڵ�ǰ���div��λ�ã�Ϊ��ǰ�������굥���¼�
		$("#container").bind("click",this.eventFn.bind(this));
		},
		eventFn:function(e){
			var target=e.target;
			if (target!=$("#container"))
			{
                var a=+target.id.slice(1,2);
				var b=+target.id.slice(2);
				var c=""+a+b;
				var targetClass=$("#p"+a+b).className;
			    
				for (var i=0,arr=[];i<10 ;i++ )
				{
					for (var j=1;j<9 ;j++ )
					{
						if ($("#p"+i+j).className===targetClass)
						{
								arr.push(""+i+j);//���������ͬ��ɫ�����飬����ȥ������ɫ�е�jλ0��jΪ9����
						}
					}
				}
				for (var i=0,arrtar=[];i<10 ;i++ )
				{
					for (var j=0;j<10 ;j++ )
					{
						if ($("#p"+i+j).className===targetClass)
						{
								arrtar.push(""+i+j);//���������ͬ��ɫ������
						}
					}
				}
				var i=arr.indexOf(c);//�����Ԫ�ص��±�
				var qneue1=[c];//����Ҫ���ҵĸ���ֵ���в���
				var qneue=search(qneue1);//���ú��������ҳ���ͬ�Ĳ���
				var cIdx=qneue.indexOf(c);//�ҵ����е����Ԫ���������е��±�
				//ѭ���ų��������һ����ǰһ�д�����Ӱ��
				for (var i=0,end89=[],start10=[];i<qneue.length ;i++ )
				{
					   //qneue[]
						if (qneue[i].slice(1)=="8")
						{	
							var h=+qneue[i]+1;
							h<10?(h="0"+h):h=h+"";
							console.log(qneue[i],h);
							while(arrtar.indexOf(h)!=-1)
							{		
									end89.push(h);
									h=h-10+"";
									h<10?(h="0"+h):h=h+"";
							}
							h=+qneue[i]+1+"";
							while(arrtar.indexOf(h)!=-1)
							{
									end89.push(h);
									h=+h+10+"";			
							}
						}
						if (qneue[i].slice(1)=="1")//�����ҵ�Ԫ���еĵ�һ��Ԫ����ǰһ�н��бȽ�
						{
							
							var h=qneue[i]-1;
							h<10?(h="0"+h):h=h+"";
							console.log(qneue[i],h);
							while(arrtar.indexOf(h)!=-1)
							{		
									start10.push(h);
									h=h-10+"";
									h<10?(h="0"+h):h=h+"";
							}
							h=+qneue[i]-1+"";
							h<10?(h="0"+h):h=h+"";
							while(arrtar.indexOf(h)!=-1)
							{
									start10.push(h);
									h=+h+10+"";			
							}
						}
				}
				if (c.slice(1)=="9")//�ҵ�β��Ϊ9��Ԫ�������һ�н��в���
				{
						  var cc=c;
						  while(arrtar.indexOf(cc)!=-1)
							{		
									end89.push(cc);
									cc=cc-10+"";
									cc<10?(cc="0"+cc):cc=cc+"";
							}
							while(arrtar.indexOf(c)!=-1)
							{
									end89.push(c);
									c=+c+10+"";			
							}
				}
				derepeat(end89);
				search(end89);//���ú��������ҳ���ͬ�Ĳ���
				if (c.slice(1)=="0")//�ҵ�β��Ϊ0��Ԫ�������һ�н��в���
				{
						  var cc=c;
						  while(arrtar.indexOf(cc)!=-1)
							{		
									start10.push(cc);
									cc=cc-10+"";
									cc<10?(cc="0"+cc):cc=cc+"";
							}
							while(arrtar.indexOf(c)!=-1)
							{
									start10.push(c);
									c=+c+10+"";			
							}
				}
				derepeat(start10);
				search(start10);//���ú��������²���0�е�Ԫ�ص���ͬԪ�أ����ҳ���ͬ�Ĳ���
				qneue=qneue.concat(end89).concat(start10);//ƴ�ӵ����ղ��ҵ�������ȥ
				derepeat(qneue);
				if (qneue.length>=2)//��������в�����ʵ�ֽ������������
				{
						for (var i=0;i<qneue.length ;i++)
						{
								$("#p"+qneue[i]).className="";
						}
				}
				this.move();
				}
				function search(schArr){//������ͬ����ɫ������,����Ϊ��ͬ��
					var count=1;
					var len1=1;
					var len2=0;
					var qarr=[];//��ʱ�������
					while(len1!=len2)
						{
						rcalc(schArr);
						derepeat(schArr);

						lcalc(schArr);
						derepeat(schArr);
			
						lcalc(schArr);
						derepeat(schArr);

						rcalc(schArr);
						derepeat(schArr);
						
						qarr=schArr;

						count%2==1?len1=qarr.length:len2=qarr.length;
						count++;
					}//�㷨����
					return schArr;
				}
                function rcalc(Rarr){//���Ʋ�����ͬ��ɫ���±�
						var z=0;
						while(z<Rarr.length){
							for (var k=0;k<arr.length ;k++)
							{
								if (arr[k]-Rarr[z]==1||arr[k]-Rarr[z]==10)
								{
									Rarr.push(arr[k]);
								}
							}
							z++;			
						}
				}
				function lcalc(Larr){//���Ʋ�����ͬ��ɫ���±����
						var z=0;
						while(z<Larr.length){
							for (var k=arr.length-1;k>=0 ;k--)
							{
								if (Larr[z]-arr[k]==1||Larr[z]-arr[k]==10)
								{
									Larr.push(arr[k]);
								}
							}
							z++;			
						}
				}
				function derepeat(array)//ȥ�����ظ�Ԫ��
					{
						array=array.sort();
						for (var i=0;i<array.length ;i++)
						{
							if (array[i]==array[i+1])
							{
								array.splice(i,1);
								i--;
							}
						}
					}
                          
		},
        move:function(){
        //����ÿһ�У�����Ƿ���displayΪnone��Ԫ��
        //�жϣ����������displayΪnone��Ԫ�أ�
        //var i=3;//��
        var allArr=[];
        var allCount=0;
        for (var i=0;i<10;i++)
        {
        var clsCount=0;
                //���ÿ������Ԫ�ص�className,Ȼ�����ɾ�������е�classNameΪ�յ�Ԫ�أ�Ȼ�������Ԫ�ص����¸�className��ֵ
                allArr[i]=[];
                for (var j=9;j>=0;j--)
                {
                   allArr[i].push($("#p"+j+i).className);
                }
                if (allArr[i].join("")=="")
                {
                     allArr.splice(i,1);
                     allCount++;
                    // i--;
                }else{
                    for (var k=0;k<allArr[i].length;k++)
                    {
                        if (allArr[i][k]=="")
                        {
                            allArr[i].splice(k,1);
                            k--;
                            clsCount++;
                        } 
                    }
                    for (var j=10-clsCount;j<10 ;j++ )
                    {
                        allArr[i][j]="";
                    }
                }
            }//ɾ�������пո�ķ���
            var newAll=[];
            for (var i=0;i<10;i++ )
            {
               if (allArr[i]!=undefined)//��undefined
               {
                   newAll.push(allArr[i]);
               }
                
            }
           newAll=newAll.join("X").replace(/X{2,}/,"X").split("X");//ƴ���޸����飬�Ѻ���Ŀ��ַ�ȫ��������
           console.log(newAll);
           for (var i=0;i<newAll.length;i++ )
           {
                newAll[i]=newAll[i].split(",");
           }
            for (var i=10-allCount;i<10;i++)
            {
                newAll[i]=[];
                for (var j=0;j<10;j++)
                {
                    newAll[i][j]="";
                }
            } 
            console.log(newAll);
            for (var i=9;i>=0;i--)
           {
               for (var j=0;j<10;j++)
               {
                    $("#p"+(9-j)+(9-i)).className=newAll[9-i][j];
               }
          }
        },
  }
  game.init();