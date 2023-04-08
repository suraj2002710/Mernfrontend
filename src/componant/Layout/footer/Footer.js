import React from 'react'
import playstore from '../../../images/playstore.jpg'
import appstore from '../../../images/appstore.png'
import './Footer.css'

const Footer = () => {
  return (
    <>
        <footer>
            <div className="top-footer">
                <h3>DownLoad Our App</h3>
                <img src={playstore}alt="" />
                <img src={appstore}alt="" />
            </div>
            
            <div className="mid-footer">
                <h1>Developed By Mr.S</h1>
            </div>
            
            <div className="left-footer">
                <h3>Follow Me</h3>
                <a href="/">youtube</a>
                <a href="/">instagram</a>
                <a href="/">facebook</a>
            </div>
        </footer>
    </>
    )
}

export default Footer