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
  this.greet = function(...preambles) {
    return `${preambles.join(" ")}, my name is ${this.name}`
  }
}
const jan = new Person({ name: "Jan" })
console.log(jan.greet("Hi"))
// Logs "Hi, my name is Jan" to the console

// Principle 4

// Fiendish
Function.prototype.contramap = function(fn) {
  return (...args) => this(...fn(args))
}

Function.prototype.map = function(fn) {
  return (...args) => fn(this(...args))
}

// code example for Explicit Binding
const saySomething = person => {
  return person.greet.bind(person)
}

const boundSaySomething = saySomething(jan)
const boundScreamSomething = boundSaySomething
  .contramap(xs => xs.map(_ => "hmmm...what?"))
  .map(str => str.toUpperCase() + "!!!")

console.log(boundScreamSomething("Hello", "again"))
// Logs "HI, MY NAME IS JAN!!!"
