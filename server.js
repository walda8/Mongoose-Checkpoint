// connect DB
const mongoose=require('mongoose')

require('dotenv').config({ path: './.env' })

const Person= require('./model')

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true } )
.then(()=>console.log('server is connected to BD'))
.catch((err)=>console.log(err))

//Create a person having this prototype:

const newPerson= new Person({
    name: 'Walid',
    age:30,
    favoriteFoods :['Spaguetti', 'Pizza', 'Chicken']

})
newPerson.save((err, data) => {
    err ? console.log(err) : console.log(`${data}  is saved`)
})

// Create Many record in a Person Model

Person.create([
    {
        name: 'Mohamed',
        age: 33,
        favoriteFoods: ['chakchouka', 'couscous']
    },

    {
        name: 'Amine',
        age: 26,
        favoriteFoods: ['tajine', 'Banane']
    },

    {
        name: 'Cyrine',
        age: 20,
        favoriteFoods: ['Apple', 'Kiwi']
    }
], err => {
    err ? console.log(err) : console.log('Records are Added Successfuly')
}
)


// Find all the people having a given name

Person.find({ name: 'Cyrine' }, (err, data) => {
    err ? console.log(err) : console.log('You find the person with name Cyrine')
})

//FindOne operation by favorite food

Person.findOne({ favoriteFoods: 'couscous' }, (err, data) => {
    err ? console.log(err) : console.log(`${data.name} like couscous`)
})

// Find a Model by ID

Person.findById("600c6f3a037e152664e19741", (err, data) => {
    err ? console.log(err) : console.log("we find the person :" + data.name)
})

// Find and update a Model
Person.findByIdAndUpdate("600c6f3a037e152664e19741", { $push: { favoriteFoods: "hamburger" } }, (err, data) => {
    if (err) { console.log(err); }
    else {
        data.save((err, doc) => {
            err ? console.log(err) : console.log('Data was Updated' + doc.favoriteFoods);
        })
    }
})

// Find One and Update 

Person.findOneAndUpdate({ name: "Amine" }, { age: '20' }, { new: true }, (err, data) => {
    err ? console.log(err) : console.log('The age of ' + data.name + ' is updated to ' + data.age + ' years')
})

Person.find()


// Find by Id and Delete the document

Person.findByIdAndRemove("600c6f3a037e152664e19741", (err, data) => {
    err ? console.log(err) : console.log(data._id + ' Document was deleted')
})

//Delete Many Documents with model.remove()

Person.remove({ name: "Cyrine" }, (err) => {
    err ? console.log(err) : console.log('All document with name Cyrine are removed')
})

//Find people who like Banane

Person.find({ favoriteFoods: "Manga" }).sort({ name: 1 }).limit(2).select({ age: 0 }).exec((err, data) => {
    err ? console.log(err) : console.log(data)
});