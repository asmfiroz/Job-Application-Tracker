1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
   
Answer:
   
getElementById(), getElementsByClassName(), querySelector(), and querySelectorAll() are all JavaScript methods used to find HTML elements, but they work in different ways.
getElementById(): This method finds an element by its id. Since an id should be unique, it returns only one element.
getElementsByClassName(): This method finds all elements that have the same class name. It returns a collection of elements, so you can access each one using its index.
querySelector(): This method uses a CSS selector to find an element. If multiple elements match the selector, it returns only the first matching element.
querySelectorAll(): This method also uses a CSS selector, but it returns all matching elements as a NodeList. You can loop through the list to work with each element.

2. How do you create and insert a new element into the DOM?

Answer:
 
A new element can be created in the DOM using the createElement() method. After creating the element, you can add text, attributes, or classes if needed. Finally, 
the element is inserted into the webpage using methods like appendChild() or append().

3. What is Event Bubbling? And how does it work?

Answer: 

Event Bubbling is a process in JavaScript where an event starts from the target element (the element that was clicked or triggered) and then moves upward through its parent elements until it reaches the document.
For example, if a <button> is inside a <div> and you click the button, the click event first happens on the button, then bubbles up to the div, then to the body, and finally to the document.

4. What is Event Delegation in JavaScript? Why is it useful?

Answer: 

Event Delegation is a technique in JavaScript where you attach one event listener to a parent element instead of adding separate event listeners to each child element. When a child element is clicked, 
the event bubbles up to the parent,and the parent handles the event.This works because of event bubbling.

5. What is the difference between preventDefault() and stopPropagation() methods?

Answer: 

preventDefault() and stopPropagation() are both used in JavaScript events, but they have different purposes.

preventDefault(): This method stops the browser's default action for an event. For example, it can stop a form from submitting or prevent a link from opening when it is clicked.
stopPropagation(): This method stops the event from bubbling up to parent elements. The event will only run on the current element and will not trigger event listeners on its parent elements.
