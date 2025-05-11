import {useState} from 'react'
import logo from '../ui/image1.jpg'
import Ranking from './ranking';
import Footer from '../Footer';

function Sidebar( ){
    const [nav, setNav] = useState([
        {label: "My Courses",slug:"https://www.youtube.com/watch?v=hV55tlzDvDw", icon: ' icon-home'},
        {label: "Learnings", slug:"https://www.youtube.com/channel/UCtFRv9O2AHqOZjjynzrv-xg", icon: ' icon-books'},
        {label: "My Growth", slug:"/", icon: ' icon-arrow-up-right1'},
        {label: "Ranking", slug:"/", icon: ' icon-globe'},
        {label: "Friends", slug:"https://www.reddit.com/r/nofriends/", icon: ' icon-user-add'},
        {label: "Posts", slug:"/", icon: ' icon-envelope'}
        
    ])
    
    const [currentPage, setCurrentPage] = useState("/")
    var navigation = [];
    for (let i=0; i<nav.length; i++){
        navigation.push(
            <li key = {"nav- " + i + "-" + nav[i].slug}>
            <a href={nav[i].slug} className= {'link noul flex c333' + (currentPage == nav[i].slug ? "on" : "" )}>
                <div className={ "icon s15" + nav[i].icon}/>
                <h2 className= "label s15">{ nav[i].label}</h2>
            </a>
        </li>
        )
    }
    return (
        <div className='sidebar fixed'>
            <a href = "http://localhost:3001/" className='logo label'>
                <img src =  {logo} className='logo label'></img></a>
                <div className='user flex alic jic'>
                    <div className='flex photo'>
                        <img src = "https://upload.wikimedia.org/wikipedia/commons/6/61/Chief_Adviser_of_the_People%E2%80%99s_Republic_of_Bangladesh%2C_Mr._Muhammad_Yunus_at_Bangkok%2C_in_Thailand_on_April_04%2C_2025_%282%29_%28cropped%29.jpg"></img></div>
            <div className='label s15 fontA icon c333'>Dr. Yunus</div>
        </div>
        
        <ul className='nav'>
            {navigation}
        </ul>
        <div classname = 'stats alic jic flex' >
            <div className='stats-box icon-colors flex iconn alic jic icon-stats-bars2'>
                <Ranking/>
                <h2 className= 'label sbold'/> Points
            </div>

            <div className='stats-box icon-colors flex iconn jic icon-pie-chart1'>
                <h2 className='val s15 sbold '/> 50%
                <h2 className= 'label sbold c334'/> Completed
            </div>
        </div>

        <div className='s15 position'>
       <li><a href = "/" >Admin Panel</a></li> 

        </div>
        </div>
    )
}
export default Sidebar;