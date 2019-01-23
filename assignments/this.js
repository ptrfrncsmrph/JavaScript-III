/* The for principles of "this";
* in your own words. explain the four principle for the "this" keyword below.
*
* 1.
* 2.
* 3. 
* 4. 
*
* write out a code example of each explanation above
*/

// Principle 1

// code example for Window Binding
console.log(this)
// In the browser, this will be `window`, in Node this is an empty object not sure why (???)
// > Apparently this is to be "populated" by module-related objects
// > and in the REPL, it is a reference to `this.module`
// https://stackoverflow.com/questions/12682514/nodejs-this-empty-object

// Principle 2

// code example for Implicit Binding
const obj = {
  name: "exampleObject",
  speak: function() {
    return `${this.name} is my name`
  }
}
console.log(obj.speak())
// Logs "exampleObject is my name"

// Principle 3

// code example for New Binding
function Person(props) {
  Object.entries(props).forEach(([k, v]) => {
    this[k] = v
  })
  this.greet = function() {
    return `Hi, my name is ${this.name}`
  }
}
const jan = new Person({ name: "Jan" })
console.log(jan.greet())
// Logs "Hi, my name is Jan" to the console

// Principle 4

// Fiendish
Function.prototype.map = function(fn) {
  return (...args) => {
    return fn(this(...args))
  }
}

// code example for Explicit Binding
const saySomething = person => fn => {
  return person.greet.map(fn).bind(person)
}

const boundSaySomething = saySomething(jan)

console.log(boundSaySomething(x => x.toUpperCase() + "!!!")())
// Logs "HI, MY NAME IS JAN!!!"
