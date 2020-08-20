import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'



const initialState = {
    title: '',
    director: '',
    metascore: '',
    stars: [],
}

const AddMovie = (props) => {

    const [newMovie, setNewMovie] = useState(initialState)
    const history = useHistory()



        // console.log(newArray)


    const handleChanges = (e) => {
        setNewMovie({
            ...newMovie,
            [e.target.name]: e.target.value,  
        })
    }




    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(newMovie)

        const newArray = newMovie.stars.split(',')
        console.log(newArray)

        //   setNewMovie({
        //      ...newMovie,
        //      stars: newArray
        //  })
         const newMovieObj = {
            ...newMovie,
            stars: newArray
         }

        axios.post('http://localhost:5000/api/movies', newMovieObj)
        .then(res => {
            console.log(res)
            props.setMovieList(...props.movieList.push(newMovieObj))
        })
        .catch(err => console.log(err))
        history.push('/')
    }


    return (
        <div className='form-container'>
            <form className='form-inputs'onSubmit={handleSubmit}>
                <h2>Add Movie</h2>
                <input 
                type='text'
                name='title'
                placeholder='Movie Title'
                onChange={handleChanges}
                value={newMovie.title}
                />
                <input 
                type='text'
                name='director'
                placeholder='Director'
                onChange={handleChanges}
                value={newMovie.director}
                />
                <input 
                type='text'
                name='metascore'
                placeholder='Metascore'
                onChange={handleChanges}
                value={newMovie.metascore}
                />
                <input 
                type='text'
                name='stars'
                placeholder='stars'
                onChange={handleChanges}
                value={newMovie.stars}
                />        
                <button>Add Movie</button>                                       
            </form>
        </div>
    )

}

export default AddMovie