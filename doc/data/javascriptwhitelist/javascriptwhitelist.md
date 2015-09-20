In callback functions, developer can write code in JavaScript and test them in web browser. Clicpilot can convert the code into other runtime langauges such as Java when export as J2EE web application. While not all the JavaScript functions can be converted. Here is the white list.

#### Syntax
* if else

* switch case

* for

* while

* do while

* try catch


#### Operator

* +

* -

* *

* /

* %

* ++

* --

* +=

* -=

* *=

* /=




#### Functions 

* Array
	* length

	* join()

	* join(p)

	* concat(p) //	Joins two or more arrays, and returns a copy of the joined arrays

	* pop() //	Removes the last element of an array, and returns that element

	* push(p) //	Adds new elements to the end of an array, and returns the new length

	* reverse() //	Reverses the order of the elements in an array

	* shift() //	Selects a part of an array, and returns the new array

	* slice(p) //	Selects a part of an array, and returns the new array

	* slice(p1, p2)

	* sort() //	Sorts the elements of an array

	* splice(p1,p2) //	Adds/Removes elements from an array

	* splice(p1, p2, p3)

	* toString() //	Converts an array to a string, and returns the result

	* unshift(p1) //	Adds new elements to the beginning of an array, and returns the new length

	* valueOf() //	Returns the primitive value of an array

	* indexOf(p1) //	Search the array for an element and returns its position

	* indexOf(p1, p2)

	* lastIndexOf(p1) //Search the array for an element, starting at the end, and returns its position

* Date
	* new Date(p1) //"2012-04-19 08:15:00 UTC"
	* getDate()	//Returns the day of the month (from 1-31)
	* getDay()	//Returns the day of the week (from 0-6)
	* getFullYear()	//Returns the year (four digits)
	* getHours()	//Returns the hour (from 0-23)

	* getMilliseconds()	//Returns the milliseconds (from 0-999)
	* getMinutes()	//Returns the minutes (from 0-59)
	* getMonth()	//Returns the month (from 0-11)
	* getSeconds()	//Returns the seconds (from 0-59)
	* getTime()	//Returns the number of milliseconds since midnight Jan 1, 1970
	* getTimezoneOffset()	//Returns the time difference between UTC time and local time, in minutes
	* getUTCDate()	//Returns the day of the month, according to universal time (from 1-31)
	* getUTCDay()	//Returns the day of the week, according to universal time (from 0-6)
	* getUTCFullYear()	//Returns the year, according to universal time (four digits)
	* getUTCHours()	//Returns the hour, according to universal time (from 0-23)
	* getUTCMilliseconds()	//Returns the milliseconds, according to universal time (from 0-999)
	* getUTCMinutes()	//Returns the minutes, according to universal time (from 0-59)
	* getUTCMonth()	//Returns the month, according to universal time (from 0-11)
	* getUTCSeconds()	//Returns the seconds, according to universal time (from 0-59)
	* setDate(p)	//Sets the day of the month of a date object
	* setFullYear(p)	//Sets the year (four digits) of a date object
	* setHours(p)	//Sets the hour of a date object
	* setMinutes(p)	//Set the minutes of a date object
	* setMonth(p)	//Sets the month of a date object
	* setSeconds(p)	//Sets the seconds of a date object
	* etTime(p)	//Sets a date to a specified number of milliseconds after/before January 1, 1970 - new Date("2015-04-19 08:15:00 UTC")).getTime()
	* setUTCDate(p)	//Sets the day of the month of a date object, according to universal time
	* setUTCFullYear(p)	//Sets the year of a date object, according to universal time (four digits)
	* setUTCHours(p)	//Sets the hour of a date object, according to universal time
	* setUTCMilliseconds((new Date("2015-04-19 08:15:00 UTC")).getTime())	//Sets the milliseconds of a date object, according to universal time
	* setUTCMinutes(p)	//Set the minutes of a date object, according to universal time
	* setUTCMonth(p)	//Sets the month of a date object, according to universal time
	* setUTCSeconds(p)	//Set the seconds of a date object, according to universal time
	* setMilliseconds(p)	//Sets the milliseconds of a date object
	* toISOString()	//Returns the date as a string, using the ISO standard
	* toJSON()	//Returns the date as a string, formatted as a JSON date
	* toLocaleDateString()	//Returns the date portion of a Date object as a string, using locale conventions
	* toLocaleTimeString()	//Returns the time portion of a Date object as a string, using locale conventions
	* toLocaleString()	//Converts a Date object to a string, using locale conventions
	* valueOf()	//Returns the primitive value of a Date object
	
	
* Math

	* Math.abs(x)	//Returns the absolute value of x

	* Math.ceil(x)	//Returns x, rounded upwards to the nearest integer

	* Math.floor(x)	//Returns x, rounded downwards to the nearest integer

	* Math.max(x,y,z)	//Returns the number with the highest value

	* Math.min(x,y,z)	//Returns the number with the lowest value

	* Math.random()	//Returns a random number between 0 and 1

	* Math.round(x)	//Rounds x to the nearest integer	

	* Math.exp(x)	//Returns the value of Ex

	* Math.sqrt(x)	//Returns the square root of x

	* Math.log(x)	//Returns the natural logarithm (base E) of x

	* Math.pow(x,y)	//Returns the value of x to the power of y

	* Math.acos(x)	//Returns the arccosine of x, in radians

	* Math.asin(x)	//Returns the arcsine of x, in radians

	* Math.atan(x)	//Returns the arctangent of x as a numeric value between -PI/2 and PI/2 radians

	* Math.atan2(x, y)	//Returns the arctangent of the quotient of its arguments

	* Math.cos(x)	//Returns the cosine of x (x is in radians)

	* Math.sin(x)	//Returns the sine of x (x is in radians)

	* Math.tan(x)	//Returns the tangent of an angle
	
	
	
* String

	* charAt(p) //Returns the character at the specified index.

	* charCodeAt(p) //Returns a number indicating the Unicode value of the character at the given index.

	* concat(p) //Combines the text of two strings and returns a new string.

	* indexOf(p) //Returns the index within the calling String object of the first occurrence of the specified value, or -1 if not found.

	* indexOf(p1, p2)

	* lastIndexOf(p) 	//Used to match a regular expression against a string.

	* lastIndexOf(p1, p2)

	* replace(p1, p2) //Used to find a match between a regular expression and a string, and to replace the matched substring with a new substring.

	* search(p) //Executes the search for a match between a regular expression and a specified string.

	* slice(p) //Extracts a section of a string and returns a new string.

	* slice(p1, p2)

	* split(p) //Splits a String object into an array of strings by separating the string into substrings.

	* substr(p) //Returns the characters in a string beginning at the specified location through the specified number of characters.

	* substr(p1,p2)

	* substring(p) //Returns the characters in a string between two indexes into the string.

	* substring(p1,p2)

	* toLocaleLowerCase() //The characters within a string are converted to lower case while respecting the current locale.

	* toLocaleUpperCase() //The characters within a string are converted to upper case while respecting the current locale.

	* toLowerCase() //Returns the calling string value converted to lower case.

	* toString() //Returns a string representing the specified object.

	* toUpperCase() //Returns the calling string value converted to uppercase.

	* valueOf() //Returns the primitive value of the specified object.

	

	