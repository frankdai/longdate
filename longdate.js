(function(global){
    var mergeOptions=function(obj1,obj2) {
        var obj3={};
        for (var key in obj1) {
            obj3[key]=obj1[key];
        }
        for (var key in obj2) {
            obj3[key]=obj2[key];
        }
        return obj3;
    };
    var calculateDays=function(num,year){
            var array1=[0,2,4,6,7,9,11];
            var array2=[3,5,8,10];
            if (array1.indexOf(num)>=0) {
                return 31
            }
            if (array2.indexOf(num)>=0) {
                return 30
            }
            if (num==1&&year%4!=0) {
                return 28
            }
            if (num==1&&year%4==0) {
                return 29
            }
        }
    var LongDate=function(element,options) {
        var today=new Date();
        var defaults={
            'startMonth':today.getMonth()==0?11:today.getMonth()-1,
            'startYear':today.getMonth()==0?today.getFullYear()-1:today.getFullYear(),
            'showMonth':3,
            'weekName':['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
            'monthName':['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
        }
        options=mergeOptions(defaults,options);
        var markingup=function(element,monthNum,yearNum){
            var i,div,days,today,start,firstDay,index,monthDays;
            div=document.createElement('div');
            div.className='longdate-month-name';
            div.textContent=options.monthName[monthNum]+' '+yearNum;
            element.appendChild(div);
            for (i=0;i<7;i++) {
                div=document.createElement('div');
                div.className='longdate-week';
                div.textContent=options.weekName[i];
                element.appendChild(div);
            }
            for (i=0;i<42;i++) {
                div=document.createElement('div');
                div.className='longdate-day';
                element.appendChild(div);
            }
            monthDays=calculateDays(monthNum,yearNum);
            days=element.getElementsByClassName('longdate-day');
            firstDay=new Date(yearNum,monthNum,1);
            today=new Date();
            for (i=firstDay.getDay(),index=1;index<=monthDays;i++,index++) {
                days[i].textContent=index;
                if (today.getDate()==index&&monthNum==today.getMonth()) {
                    days[i].className+=' today';
                }
            }
        }
        this.render=function(startingMonth,startingYear){
            var isEndYear,month;
            element.innerHTML=" ";
            for (var index=0;index<options.showMonth;index++) {
                month=document.createElement('div');
                month.className='longdate-month';
                element.appendChild(month);
                isEndYear=startingMonth>11;
                markingup(month,isEndYear?startingMonth-12:startingMonth,isEndYear?startingYear+1:startingYear);
                startingMonth++;
            }
        }
        this.render(options.startMonth,options.startYear)
    }        
    global.LongDate=LongDate;
})(this)