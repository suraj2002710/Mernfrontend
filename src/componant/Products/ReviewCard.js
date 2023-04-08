import React from 'react'
import ReactStars from 'react-rating-stars-component'

const ReviewCard = ({reviews}) => {
    let options={
        edit:false,
        color:"rgba(23,25,25,0.4)",
        isHalf:true,
        size:window.innerWidth<600? 25:20,
        value:reviews.rating
    }
    console.log(reviews);
  return (
    <>
    <div className='reviewcard'>
    <div id='review_img'>
        <img src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAI0AAACNCAMAAAC9gAmXAAAAMFBMVEXk5ueutLfn6eq0uLursbTEyMqorrK3vL/f4eLb3t/Jzc/P0tTT1ti6v8LY29zq7OyvbaflAAADX0lEQVR4nO2a2XbjIAxAjRCLw+L//9vBcdqkbRKQbOGcM9w+tU+3QiyWNE2DwWAwGAwGg8FgMBgMakDhbIeVYuHnHEMIcZ5OdlqmYJxCaxHRonImlj+dA0w5FQv1QPnNzKfEZ8nup8qXkPHdfcA7+1dl87Fm6usDQT2Jy7eP7rlcAOZVYG7Y0FEnvQnMLTymlw64qkyJTiedJplVp8fRs9SX6bZYHXIHLo0yJTriOwtys4xSWlimJE27TNlYsqlDWKdtrURtJpKMwiSZOWBoNgqzoI6nuRQbJ5c5ECrX0xMdL2ejqTKS99VMzJoVLWVD3N4bYpscWm+oR+RuK7pLQerI8eQdtSJ0WUFk2SiZPc5K4oJMGpOvhQ3MQjas0GCUsUk8m/A/2DBXSub4+7C8+aw9RX/dXBG6NjPPRkaG+kS/4YRuTcbTT/Dxx0pjG6VsIic2Mi4r9NgIft81F0sekFqoAqVAcUPMpUCpUKyIVinoj1G5T83CQg2NbHWLmDnCpTbSCYiCG+qm8znrtNo0lwZQrCDwqBNa68Wi++mLpVFHssj2qNPy0YndmkJL9RBE1bGBB/lds2y9ubupXHV8ehMee+nd2Vzii8YmYvL929AwBfW36Yvo5nN69ADZoL0bobXqMp/Vnr/OT8yX5NZvCa2TCf7scYr77MS5UxTbYImfc445xpzz7P0p0yZQfny+mOsiYUld3AYqtHbJRN8zTLD4aJKy9vkBuE6cOBPmRT6dy/8cjcZn4xy/NjqqFGWTumzppKsmdyPlgtQ8TtnM5XRpNLkvW8oCAycwZff+pnwZIR0O9gGImldKWikn9JE+xYVX1P8O0HE+y8zpS/320fGIfIapNvnTiHX736aQdy7SnbJce3UuxwRmw6Y9r2XwbYM/zeCO4lLtLc7BXpjJ3PxRSQITS4dbyK/qGI7Mofn7Q4deJpWKzFWHWkmBKJEzX1CH7zjzGwSQdA7CYQfwCyjDd6zxDRq6udQkmzQb7RuLUGjkYxtLX8xuKpXG2RPy4BqPtj45p+3D44NC0xYc7pQNw0bXT+QuG2qjYdxtlrstf1O/Hzpt7w1XXShqr3AXteuh245aqfavGF3dHTaVZ5fMy/ylTeXF3u+02ajYGN2VSt5AX97LDAaDwWDwUfwDEognHPNhTAAAAAAASUVORK5CYII="} alt="img"/>
    </div>
    <div className='review_ratings'>
        <ReactStars {...options}/>        
    </div>
    <p>{reviews.comment}</p>
    </div>
    </>
    )
}

export default ReviewCard