(function(global){
    /*getElementsByClassName shim*/
    if (!document.getElementsByClassName) {
    Element.prototype.getElementsByClassName = function(search) {
        var d = document, elements, pattern, i, results = [];
        if (d.querySelectorAll) { // IE8
            return d.querySelectorAll("." + search);
        }
            if (d.evaluate) { // IE6, IE7
            pattern = ".//*[contains(concat(' ', @class, ' '), ' " + search + " ')]";
            elements = d.evaluate(pattern, d, null, 0, null);
            while ((i = elements.iterateNext())) {
            results.push(i);
        }
    }   else {
            elements = d.getElementsByTagName("*");
            pattern = new RegExp("(^|\\s)" + search + "(\\s|$)");
            for (i = 0; i < elements.length; i++) {
                if ( pattern.test(elements[i].className) ) {
                    results.push(elements[i]);
                }
            }
        }
        return results;
        }
    }
    //var forEach=Array.prototype.forEach;
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
    var LongDate=function(element,options) {
        var today=new Date();
        var defaults={
            'startMonth':today.getMonth()==0?11:today.getMonth()-1,
            'startYear':today.getMonth()==0?today.getFullYear()-1:today.getFullYear(),
            'showMonth':3,
            'dayCallback':function(){},
            'dayEvent':'click',
            'deliveryMethods':[3,7,15],
            'weekName':['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
            'monthName':['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        }
        options=mergeOptions(defaults,options);
        var isEndYear;
        var frame=function(element,monthNum,yearNum){
            var i,div,days,today,start,firstDay,index,monthDays;
            var isSingle=function(num){
                var array1=[0,2,4,6,7,9,11];
                var array2=[3,5,8,10];
                if (array1.indexOf(num)>=0) {
                    return 31
                }
                if (array2.indexOf(num)>=0) {
                    return 30
                }
            }
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
            
            monthDays=isSingle(monthNum);
            if (monthNum==1&&yearNum%4!=0) {
                monthDays=28;
            }
            if (monthNum==1&&yearNum%4==0) {
                monthDays=29;
            }
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
                frame(month,isEndYear?startingMonth-12:startingMonth,isEndYear?startingYear+1:startingYear);
                startingMonth++;
            }
        }
        this.render(options.startMonth,options.startYear)

    }        
    global.LongDate=LongDate;
})(this)