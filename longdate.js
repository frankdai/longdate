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
    function setTable(table,html){
        var temp=document.createElement('div');
        var children,replaced;
        temp.innerHTML='<table class="longdate-month">'+html+'</table>';
        table.appendChild(temp);
        replaced=table.replaceChild(temp.firstChild,temp);
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
        var renderer=function(element,monthNum,yearNum){
            var i,div,days,today,start,firstDay,index,monthDays,divhtml=" ",weekhtml=" ",trhtml=" ",tdhtml=" ";
            divhtml='<thead><tr><td colspan="7" class="longdate-month-name">'+options.monthName[monthNum]+' '+yearNum+'</td></tr></thead>';
            for (i=0;i<7;i++) {
                weekhtml+='<th>'+options.weekName[i]+'</th>';
            }
            weekhtml='<tr class="longdate-week">'+weekhtml+'</tr>'
            for (i=1;i<=42;i++) {
                tdhtml+='<td class="longdate-day"></td>'
                if ((i%7==0)) {
                    trhtml+='<tr>'+tdhtml+'</tr>';
                    tdhtml="";
                }
            }
            setTable(element,divhtml+'<tbody>'+weekhtml+trhtml+'</tbody>');
            monthDays=calculateDays(monthNum,yearNum);
            days=element.getElementsByClassName('longdate-day');
            firstDay=new Date(yearNum,monthNum,1);
            today=new Date();
            for (i=firstDay.getDay(),index=1;index<=monthDays;i++,index++) {
                days[i].textContent=index;
                days[i].className+=" has-date"
                if (today.getDate()==index&&monthNum==today.getMonth()&&yearNum==today.getFullYear()) {
                    days[i].className+=' today';
                }
            }
        }
        var month=options.startMonth,year=options.startYear;
        this.render=function(startingMonth,startingYear,monthNumber){
            var isEndYear,month,currentM=startingMonth,currentY=startingYear;
            if (!monthNumber) {monthNumber=options.showMonth}
            element.innerHTML=" ";
            for (var index=0;index<monthNumber;index++,currentM++) {
                month=document.createElement('div');
                if (currentM>11) {currentY++;currentM=0}
                renderer(month,currentM,currentY);
                element.appendChild(month);
            }
            return this
        }
        this.next=function(){
            var step=options.showMonth;
            if (month+step>11) {
                year++;
                month=month-12;
            }
            this.render(month+step,year);
            month=month+step;
            return this
        }
        this.prev=function(){
            var step=options.showMonth;
            if (month-step<0) {
                year--;
                month=12+month;
            }
            this.render(month-step,year);
            month=month-step;
            return this
        }
        return this.render(options.startMonth,options.startYear);
    }        
    global.LongDate=LongDate;
})(this)