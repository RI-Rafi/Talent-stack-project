function Footer(){
    return(
        <footer >
            <p>&copy; {new Date().getMonth()}_{new Date().getUTCHours()}_{new Date().getFullYear()}</p>
        </footer>
    )

}
export default Footer