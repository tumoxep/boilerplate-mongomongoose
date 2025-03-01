require('dotenv').config();
const mongoose = require('mongoose');
const { Schema } = mongoose;

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let Person;
Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  const person = new Person({ name: 'Johnn Doe', age: 54, favoriteFoods: ['cola', 'pizza', 'BURGIR'] });
  person.save(function(err, data) {
    done(err, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, null, function(err, data) {
    done(err, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function(err, data) {
    done(err, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: [food] }, function(err, data) {
    done(err, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, data) {
    done(err, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function(err, person) {
    if (err) {
      done(err, person);
      return;
    }
    person.favoriteFoods.push(foodToAdd);
    person.save(function(err, data) {
      done(err, data);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, function(err, person) {
    done(err, person);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function(err, person) {
    done(err, person);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, function(err, result) {
    done(err, result);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: { $in: [foodToSearch] } })
    .sort('name')
    .limit(2)
    .select('-age')
    .exec(done);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
