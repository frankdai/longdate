# LongDate Javascript Calendar Plugin

Feature:

 * Depend no external library, native Javascript
 * Minimum markup and style
 * Customized number of months to be showed. Maximumly 12 months.
 * API for customized control
 * Support for IE9+/Chrome/Firefox/Opera
 * Customized name for month and week. Multi-lingual supported

[Checkout The Demo](http://magento.frankdai.com/longdate)

##Usage:

The HTML markup is like this:

```html
<div id="longdate">
</div>
```
The ID is irrelevant. Just name whatever you want. 

This is our suggested CSS rules to be applied. But you can remove all of them for your own style.
```CSS
	.longdate-week, .longdate-day {
		display:block;
    	float:left;
    	width:14.28%;
    	box-sizing:border-box;
	}
	.longdate-month {
    	box-sizing:border-box;
    	width:33.33333331%;
    	float:left
	}
	#longdate,.longdate-month {
    	overflow:hidden;
	}
```

Then call the function
```javascript
var longDate=new LongDate(document.getElementById('longdate'),options)
```

## Options

| Options | Type | Explaination | Default Value |
| ------- | :--: |------------ | :-------------: |
| startMonth|number|Number between 0-11, the month of the first month in the calendar |The last month|
| startYear |number|The year of the first month in the calendar  | The year of last month|
| showMonth|number|Number between 1-12. Choose how many month to be rendered|3|
| weekName|array|Name for each week, starting from Sunday|['Sun' , 'Mon' , 'Tue' , 'Wed' , 'Thu' , 'Fri' , 'Sat']|
| monthName|array|Name for each month|['Jan' , 'Feb' , 'Mar' , 'Apr' , 'May' , 'Jun' , 'Jul' , 'Aug' , 'Sep' , 'Oct' , 'Nov' , 'Dec']|


## API
```javascript
longdate.render(monthNumber,yearNumber);
longdate.render(0,2015); //starting rendering the calendar from Jan, 2015
```
## Others
If current browser day is matched, a 'today' class will be added to the element of current date for better styling. 
