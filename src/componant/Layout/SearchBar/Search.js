import React, {useState } from 'react'
import { Link } from 'react-router-dom'
import "./Search.css"

const Search = (props) => {
    const [data, setdata] = useState("")
    // useEffect(() => {
    // }, [dispatch])   
    function submit(e){
        e.preventDefault()
    }
  return (
    <>
    <div className="search">
        <form onSubmit={submit} action="">
            <input type="text" className='txt' name="" onChange={(e)=>setdata(e.target.value)} value={data} id=""/>
                <Link to={`products/${data}`}>
            <button type='submit'>Search</button>
                </Link>
        </form>
    </div>
    </>
    )
}

export default Search