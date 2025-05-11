import React from 'react'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Headerr from './screens/header'
import Sidebar from './screens/sidebar'
import "./CSS/fonts.css"
import "./CSS/props.css"
import Courses from './screens/courses'
function App() {
  return (
    <div className='App flex'>     
    <Sidebar/>
    <Courses/>
    {/* <Footer className='s15 position'/> */}
     </div>




  );
}

export default App;
