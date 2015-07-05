# LongDate Javascript Calendar Plugin

Feature:

 * Depend no external library, native Javascript
 * Zero markup and style
 * Choose how many month to be showed at the same time
 * API for control the calender to move forward and backward, or completely re-render the calendar.
 * Support for IE9+/Chrome/Firefox/Opera
 * Customized name for month and week. Multi-lingual supported

[Checkout The Demo](http://magento.frankdai.com/longdate)

##Usage:

The HTML markup is like this:

```html
<div id="longdate">
</div>
```
The ID is irrelevant. Just name whatever you want. Then call the function
```javascript
var longDate=new LongDate(document.getElementById('longdate'),options) 
```
Options are plain JSON object which are explained below.

## Options

| Options | Type | Explaination | Default Value |
| ------- | :--: |------------ | :-------------: |
| startMonth|number|Number between 0-11. The month number of the first month in the calendar |The last month|
| startYear |number|The year of the first month in the calendar  | The year of last month|
| showMonth|number|Choose how many month to be showed|3|
| weekName|array|Name for each week, starting from Sunday|['Sun' , 'Mon' , 'Tue' , 'Wed' , 'Thu' , 'Fri' , 'Sat']|
| monthName|array|Name for each month|['Jan' , 'Feb' , 'Mar' , 'Apr' , 'May' , 'Jun' , 'Jul' , 'Aug' , 'Sep' , 'Oct' , 'Nov' , 'Dec']|
| onpick|function|callback to be fired when clicked on the date|first three arguments of the callback will be year,month,date,e.g.2015,1,15|

## API
```javascript
longdate.render(monthNumber,yearNumber,[monthNumber]);
longdate.render(0,2015); //starting rendering the calendar from Jan, 2015
longdate.render(0,2015,12) //starting rendering 12 month calendar starting from Jan, 2015
longdate.prev() //change the calendar to previous sets of month
longdate.next() //change the calendar to next sets of month
```
## Others
If current browser day is matched, a 'today' class will be added to the element of current date for better styling. Non-empty day cell will have a 'has-date' class name added. 
