import NavLinks from "./NavLinks";

const Header = () => {
    return (
        <div className='nav-bar'>
            <div style={{padding:'5px'}}><h1>CampusHub</h1></div>
            <NavLinks/>
        </div>
    )
}

export default Header;