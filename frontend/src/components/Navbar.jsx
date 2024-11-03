// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { pageData } from './pageData';
import "../App.css";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"


export default function Navbar() {

  let navigate = useNavigate()

  function handleLogout(){
    sessionStorage.removeItem("User")
    navigate("/")
  }

  return (
    <NavigationMenu role="navigation" aria-label="Main Navigation" className="bg-primary h-20 p-2 fixed w-screen">
      <NavigationMenuList>
      {pageData.map((page) => (
        <Link to={page.path} key={page.path} className="navbar__link">
          <NavigationMenuLink aria-label={`Navigate to ${page.name}`}  className={navigationMenuTriggerStyle()}>
            {page.name}
          </NavigationMenuLink>
        </Link>
      ))}
      </NavigationMenuList>
      <button onClick={handleLogout} className='text-primary-foreground ml-11'>Logout</button>
    </NavigationMenu>
  );
}
