import React from 'react'
// import  "./Loader.css"
import lottie from "lottie-web";
import loader from '../Lottieloader/Loadin.json'
const Loader = () => {
  React.useEffect(() => {
    lottie.loadAnimation({
      container: document.querySelector("#loader"),
      animationData: loader
    });
  }, []);
  return (
    <div className="loading">
      <div id="loader" style={{ width: 200, height: 200,margin:"auto" }} />
    </div>
  )
}

export default Loader