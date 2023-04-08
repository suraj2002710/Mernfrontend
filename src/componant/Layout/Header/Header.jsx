import React from 'react'
import {  useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import Forms from '../../../Forms/Forms';
import Metadeta from '../Metadeta';
import Search from '../SearchBar/Search';
import Account from './Account';
import './style.css'
const Header = () => {
  const {isAuthenticate}=useSelector(state=>state.userDetails)
  const [click, setClick] = React.useState(false);
  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);
    return (
    <>
       <div>
     <div className={click ? "main-container" : ""}  onClick={()=>Close()} />
      <nav className="navbar" onClick={e => e.stopPropagation()}>
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
                Mycart
                       </NavLink>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                
                to="/products"
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                <Metadeta title={`Products-Mycart`}/>
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <Search />
            </li>
            
            <li className="nav-item"> 
               
               {isAuthenticate?<Account/>:<Forms />}
              
               
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
          </div>
        </div>
      </nav>
    </ div>
    </>
    )
}

export default Header