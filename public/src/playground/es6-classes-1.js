class Person {
    constructor(name = "Anonymous", age = 0) {
        this.name = name;
        this.age = age;
    }
    getGretting() {
        return `Hi, I am ${this.name}!`;
    }
    getDescription() {
        return `${this.name} is ${this.age} year(s) old.`;
    }
}

const me = new Person('Wenhan');
console.log(me);
const other = new Person();
console.log(other);

class Student extends Person {
    constructor(name, age, major) {
        super(name, age);
        this.major = major;
    }

}
const studentOne = new Student("Wenhan", 20, "CS");
console.log(studentOne);