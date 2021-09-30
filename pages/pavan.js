const Mongoose = require('mongoose')


Mongoose.connect('mongodb://localhost:27017/Note' ,{ useNewUrlParser: true } )

const NoteSchema = new Mongoose.Schema({
    name : {
        type : String
    },
    description : {
        type : String
    }
})

const Note = Mongoose.model('Note' , NoteSchema)

// // Creation of database(if not exits) and connecting it
// mongoose.connect('mongodb://localhost:27017/fruitsDB',{ useNewUrlParser: true });


// // creation of basic schema (Basic fields of document)
// const fruitSchema = new mongoose.Schema ({
//   name: {
//     type : String,
//     // required : [true , "Please Enter name"] 
//   },
//   rating : {
//     type : Number,
//     min : 0,
//     max : 10 
//   },
//   review : String 
// });

// // creating a model
// const Fruit = mongoose.model('Fruit',fruitSchema);



import React , {useEffect} from 'react'
import link from 'next/link'
import { useRouter } from 'next/router'

// import Note from '../models/Note';

export default function pavan() {
    const router =   useRouter();
    console.log(Note)
    return (
        <div>
            Pavan
        </div>
    )
    
}
