'use strict'; 
(function() {

  function registerUser (firstName, lastName) {


    //// LITERAL OBJECTS

    let person = {

      firstName: firstName, 
      lastName, // short syntax
      age: 19,
    
      // isAdult: function() { return this.age >= 18; }
      
      // Another valid sytax to literal objects and classes:
      isAdult() { return this.age >= 18; }

    };

    // dot notation
    person.age = 19; //  Valid to dinamically typed languages


    display(person);
    
    
    // display(person.isAdult());
    


    //// INSPECT OBJECT PROPERTIES
    /*    
    
      Inspect propertie without their values
      
      
      display(Object.keys(person));

      It same result with this loop:
      
        for(let propertyName in person)
          display(propertyName); 

    */



    ////  EQUALITY OPERATORS
    /*

        ==  Double Equals - Check that values are the same 
        Ex: 0 == false, null == undefined, "" == 0, [1,2] = "1,2"

        === Triple Equals - Check that values and types are the same

        Object.is(person1, person2) - It same behavior than Triple Equals except
        for a few mathmatical differences:
          NaN equals NaN
          +0 does not equal -0

    */

    let person1 = {
      firstName: "James",
      lastName: "Bond"
    };
    
    let person2 = {
      firstName: "James",
      lastName: "Bond"
    };
    
    /*
      O que é comparado nesse caso com Objetos é o
      endereço ocupado na memória
    */
    display(person1 == person2); //  false
    display(person1 === person2); //  false
    display(Object.is(person1, person2)); //  false
    
    /*
    Javascript compara objetos com base no
    endereço ocupado na memória
    */

    let person3 = person1;
    display(person1 === person3); // true
    
    /*
    Tipos primitivos como string o JS compara os valores
    */


    /// OBJECT ASSIGN AND IMMUTABILITY


    let healthStats = {
      height: 68,
      weight: 150
    }

    // Copying properties object to other object
    // Object.assign(person, healthStats);

    function mergeHealthStats(person, healthStats) {

      //  Mutates object person
      //  return Object.assign(person, healthStats);
      

      //  Does mutate object person
      //  Function shouldn't ever mutate the object that are passed into it 
      return Object.assign({}, person, healthStats);

    }

    const mergedPerson = mergeHealthStats(person, healthStats);
    
    display(mergedPerson);

    display(person);

  }


  registerUser('Jim', 'Cookie');


  // CONSTRUCTOR FUNCTION

  function Person (firstName, lastName, age) {

    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.isAdult = function () {
      return this.age > 21; 
    }

  }

  let jim = new Person('Jim','Cooper', 29);
  let sofia = new Person('Sofia','Cooper', 17);

  display(jim.isAdult());
  display(sofia.isAdult());


  // OBJECT CREATE - Object.create

  let person = Object.create(

    Object.prototype,
    {

      firstName: { value: 'Jim', enumerable:true , writable:true , configurable:true },
      lastName: { value: 'Cooper', enumerable:true , writable:true , configurable:true },
      age: { value: 29, enumerable:true , writable:true , configurable:true },

    }

  )

  display(person);


  display('End Class 1 and 2 <hr>');


  //  BRACKET NOTATION

  display(person['firstName']);

  person['hair color'] = 'brown';


  for(let propertyName in person) {
    display(propertyName + ': ' + person[propertyName]);
  }

  //  DEFINE PROPERTY

  // without let because already person declared with let in this scope
  person = {

    name: {
      firstName: "Jim", 
      lastName: "Cooper", 
    },
    age: 29,

  }


  // Object.defineProperty(person, "firstName", {writable:false});
  // With writable false, try to alter value returns an error
  // person.firstName = 'Joana';
  // display(Object.getOwnPropertyDescriptor(person, 'firstName'));


  Object.defineProperty(person, "name", {writable:false});


  person.name.firstName = 'Kris';
// name and firstName appoints to differents locals in memory.
// writable false it's only for name. 


// For another hand... freeze method
// dont be none value object has be your properties changed
//  Object.freeze(person.name);
//  person.name.firstName = 'Sofia';

  display(Object.getOwnPropertyDescriptor(person, 'name'));

  display(person.name);


  //  ENUMERABLE ATTRIBUTE


  // without let because already person declared with let in this scope
  person = {
    firstName: "Jim", 
    lastName: "Cooper", 
    age: 29,
  }

  // Properties in an object are enumerables.
  // Enumerable false turns a propertie do not reacheable
  // for "for in" loop, Obejct keys and JSON serialization

  Object.defineProperty(person, 'lastName', { enumerable: false })

 
  for (let propertyName in person) {
      display(propertyName + ': ' + person[propertyName]);
  }

  display(Object.keys(person));
  
  display(JSON.stringify(person));


  // still accessible
  display(person.lastName);


  // with configurable false a propertie:
  // dont be turn again configurable true
  // dont be change to enumerable
  // dont be deleted
  // Object.defineProperty(person, 'lastName', { configurable: false })
  // delete person.lastName;
  // display(person);

  // getter function
  Object.defineProperty(person, 'fullName', {

    get: function() {
      return this.firstName + ' ' + this.lastName;
    },
    set: function(value) {
      let nameParts = value.split(' ');
      this.firstName = nameParts[0];
      this.lastName = nameParts[1];
    }
  
  });

  person.fullName ='Homer Simpson';
  display(person.fullName);



  // PROTOTYPE

  // The prototype object that exist in every javascript function  

  let myFunction = function() { }

  display(myFunction.prototype);  //  returns myFunction { }
  
  
  person = { firstName: 'Jim '};

  
  display(person.prototype);// returns undefinied
      
  display(person.__proto__);// returns Object { }


  function Person2 (firstName, lastName) {

    this.firstName = firstName;
    this.lastName = lastName;

  }

  
  Person2.prototype.age = 29;


  display(Person2.prototype); // Person2 { age: 29 }

    
  jim = new Person2('Jim','Cooper');
  sofia = new Person2('Sofia','Cooper');
  
  
   // sofia.__proto__.age = 19;
   // Test === continues returning true 


  display(jim.__proto__);  // Person2 { age: 29 }
  display(sofia.__proto__);  // Person2 { age: 29 }
  

  display(Person2.prototype === jim.__proto__);  // true  -  same local in memory


  //Person2.prototype.age = 19;
  jim.age = 18;
 
  display(jim.age);  // 18   // if jim.age is undefinied, JS search in prototype object the same property
  display(jim.__proto__.age);  // 29
  display(sofia.age);  // 29

  display(jim.hasOwnProperty('gender'));


  display(jim.__proto__);
  display(jim.__proto__.__proto__);
  display(jim.__proto__.__proto__.__proto__);



  function createPerson(firstName, lastName, age) {

    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    Object.defineProperty(this,'fullName',{

      get: function(){
        return this.firstName + ' ' + this.lastName;
      },
      enumerable: true

    });

  }


  function Student(firstName, lastName, age) {


    createPerson.call(this, firstName, lastName, age);


    this._enrolledCourses = [];
    
    this.enroll = function(courseId) {
      this._enrolledCourses.push(courseId);
    };

    this.getCourses = function() {
    
      return this.fullName + "'s enrolled courses are: " + 
      this._enrolledCourses.join(', ');


    };

  }

  display(Student.prototype.constructor);



  Student.prototype = Object.create(createPerson.prototype);
  //  new keyword executes createPerson
  //  Object.create create a new object com createPerson as its prototype
  
  Student.prototype.constructor = Student;
  // All prototypes has a constructor property 

  jim = new Student('Jim', 'Cooper', 29);

  jim.enroll('CS205');
  jim.enroll('MA101');
  jim.enroll('PS101');

  display(jim);
  display(jim.__proto__);
  display(jim.__proto__.__proto__);
  

  display(jim.getCourses());


  // CLASSES


  // Classes play same role as constructor functions.

  


})();