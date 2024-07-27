import Logo from "../ui/Logo";

const NavBar = ({ children }) => {
	return (
		<nav className="nav-bar">
      <Logo />
      {children}
    </nav>
	)
}

export default NavBar;