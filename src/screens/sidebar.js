import React , {useState} from 'react'
import logo from '../ui/image1.jpg'
import Footer from '../Footer';
function Sidebar(){
    const [nav, setNav] = useState([
        {label: "My Courses", slug:"/", icon: 'icon-facebook'},
        {label: "Learners", slug:"/", icon: 'icon-home1'},
        {label: "Friends", slug:"/", icon: 'icon-home'},
        {label: "My Growth", slug:"/", icon: 'icon-user-add'}
        
    ])
    const [currentPage, setCurrentPage] = useState("/")
    var navigation = [];
    for (let i=0; i<nav.length; i++){
        navigation.push(
            <li key = {"nav- " + i + "-" + nav[i].slug}>
            <a href={nav[i].slug} className= {'link label noul flex c333' + (currentPage == nav[i].slug ? "on" : "" )}>
                <div className={ "ico s24" + nav[i].icon}/>
                <h2 className= "label s24">{ nav[i].label}</h2>
            </a>
        </li>
        )
    }
    return (
        <div className='sidebar fixed'>
            <a href = "#" className='logo label'>
                <img src =  {logo} className='logo label'></img></a>

        <ul className='nav'>
            {navigation}
           
        </ul>
       <ol>

       <li><a href = "#" className= "label s15 noul flex" >About</a></li>
        <li> <a href = "youtube.com">Admin is fucking</a></li>
        <li><a href = "">User</a> - does nothing</li>
        <li><a href = "#">Contact</a> </li>
        <ol>    <Footer/></ol>
      </ol>

        </div>
    )
}
export default Sidebar;