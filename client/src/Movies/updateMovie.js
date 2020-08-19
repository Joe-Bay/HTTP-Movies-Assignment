import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams } from 'react-router-dom'

const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: [],
}

const UpdateMovie = (props) => {

const [movieValues, setMovieValues] = useState(initialMovie)
const { id } = useParams()
const history = useHistory()
useEffect(() => {
    axios.get(`http://localhost:5000/api/movies/${id}`)
    .then(res => {
        console.log(res)
        setMovieValues(res.data)
    })
    .catch(err => console.log(err))
}, [id])



const handleChanges = (e) => {
    setMovieValues({
        ...movieValues,
        [e.target.name]: e.target.value
    })
}

const handleSubmit = (e) => {
    e.preventDefault()
    axios.put(`http://localhost:5000/api/movies/${id}`, movieValues)
    .then(res => {
        console.log(res)
        // const newArr = props.movieList.map(movie => {
        //     if(movie.id === res.data.id){
        //         // props.movieList.splice([id], 1, res.data)
        //         return res.data
        //     }
        //     else {
        //         return movie
        //     }
        // })
        const filterArray=props.movieList.filter(item => {
            return item.id !== res.data.id
        })
        filterArray.unshift(res.data)
        props.setMovieList(filterArray)
        history.push('/')
    })
    .catch(err => console.log(err))

}


    return (
        <div className='form-container'>
            <form className='form-inputs'onSubmit={handleSubmit}>
                <h2>Update Movie</h2>
                <input 
                type='text'
                name='title'
                placeholder='Movie Title'
                onChange={handleChanges}
                value={movieValues.title}
                />
                <input 
                type='text'
                name='director'
                placeholder='Director'
                onChange={handleChanges}
                value={movieValues.director}
                />
                <input 
                type='text'
                name='metascore'
                placeholder='Metascore'
                onChange={handleChanges}
                value={movieValues.metascore}
                />
                {/* <input 
                type='text'
                name='stars'
                placeholder='stars'
                onChange={handleChanges}
                value={movieValues.stars}
                />         */}
                <button>Submit Changes</button>                                       
            </form>
        </div>
    )
}
export default UpdateMovie