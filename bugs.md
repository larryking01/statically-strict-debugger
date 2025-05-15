# Bug 1
File: ts/basicSettings.ts
Location: Inside the lightComponent selectors method of class Light
Type Of Error: Logic Error
Description: The getComponent() method expected a string argument but "room" which is a string 
             was being passed to it as an array initially, like this "room[0]". 
Identification: Careful inspection. 
Fix: Passing "room" properly as a string to getComponent()


# Bug 2
File: ts/advanceSettings.ts
Location: Inside the customizeAutomaticOnPreset() method of the AdvancedSettings class
Type Of Error: Logic Error
Description:   The check, "if (!value) return;" was originally "if (!!value) return;" 
               This resulted in an opposite behaviour than what was expected to achieve and as a result,
               when the user selected the time for the bulb to turn on automatically, the selected time
               was not displayed.
Identification: Careful inspection
Fix: Removed one "!" from the conditional expression to achieve intended behaviour.


# Bug 3
Similar to bug 2 above in the "if" check of the "customizeAutomaticOffPreset()" method.
The same strategy as in Bug 2 above was used to identify and fix the error.


# Bug 4.
File: ts/advanceSettings.ts
Location: Inside the formatTimet() method of the AdvancedSettings class
Type Of Error: Logic Error
Description: The variables "parsedMin" and "parsedHour" both expected number values but they were being assigned
             strings. 
Identification: console.log the type of "parsedMin"
Fix: Parsed the string values being assigned to "parsedMin" and "parsedHour" to numbers.



# Bug 5
File: ts/main.ts
Location: Inside the event listener of "mainRoomsContainer".
Type Of Error: Logic Error
Description: The variable "value" was being assigned a string value instead of a value of type number.
Identification: console.log and browser developer tools
Fix: Parsed the string value being assigned to value to a number using "Number.parse()"



# Bug 6
File: ts/general.ts
Location: The declaration of the componentsData object. 
Type Of Error: Syntax Error.
Description: Some of the fields of the objects defined in componentsData had their "name" keys specified in 
             double arrays like [['walkway & corridor']]. Using square brackets ([]) in object literals means you're dynamically computing the property name. So, the outer array will call .toString() on the inner array, resulting in a strange string key.
Identification: Careful inspection
Fix: Simply removed the wrapping square brackets around the string quotes.



# Bug 7
File: ts/basicSettings.ts, ts/advanceSettings.ts, ts/main.ts
Location: Within the customizeAutomaticOnPreset() property of AdvanceSettings in ts/advanceSettings for example.
Type: Logic Error
Description: Many of the elements were given wrong types and so some specific properties that exist on
             particular types were not defined on them. For example in the customizeAutomaticOnPreset()
             method of AdvancedSettings, the "element", originally having type "Element" had to be "asserted" to "HTMLInputElement" in order to access the "value" property on it. 
             This particular erro was common in many lines multiple files.
Identification: console.log() in the browser developer tools
Fix: Simply used type assertion to assert elements to their appropriate or expected types.

