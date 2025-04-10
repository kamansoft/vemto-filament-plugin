const person = {
    name: "John Doe",
    ,
    sayHi: function() { console.log("My name is ", this.name); },
    greet: () => { console.log("My name is ", this.name); },
};