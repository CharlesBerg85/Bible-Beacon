import { FaLaptop, FaTabletAlt, FaMobileAlt } from 'react-icons/fa'
import useWindowSize from '../hooks/useWindowSize'

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  // Retrieve the width from the useWindowSize hook
  const { width } = useWindowSize();

  return (
    <header className="Header">
        {/* Display the title */}
        <h1>{title}</h1>
        
        {/* Conditionally render different icons based on the width */}
        {width < 768 ? <FaMobileAlt /> : width < 992  ? <FaTabletAlt /> : <FaLaptop />}
    </header>
  )
}

export default Header;
