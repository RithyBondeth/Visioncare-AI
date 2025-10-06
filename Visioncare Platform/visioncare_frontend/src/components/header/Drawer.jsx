import { Link } from "react-router-dom"
import { motionButton, navbarData } from "../../constants/constant"
import { motion } from "framer-motion"

export default function Drawer() {
    return (
        <div className="drawer drawer-end ml-5 z-10 hidden tablet-xl:block">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page Content Section */}
          <label htmlFor="my-drawer-4" className="drawer-button btn btn-sm border-2 border-primary text-primaryborder-primary bg-white material-icons">menu</label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="relative menu bg-base-200 text-base-content min-h-full w-80 p-2">
            {/* Sidebar Content Section */}
            {navbarData.map((item, index) => (
                <li key={index} className="mb-1 p-4 cursor-pointer hover:bg-grey dark:hover:bg-transparent">
                  <Link to={item.link}>{item.label}</Link>
                </li>
            ))}
            <motion.label  
              htmlFor="my-drawer-4" 
              aria-label="close sidebar" 
              className="absolute top-2 right-2 p-2 h-10 w-10 rounded-full bg-primary border-primary text-white cursor-pointer drawer-overlay material-icons"
              whileHover={motionButton.whileHover}
              whileTap={motionButton.whileTap}
            >
              close
            </motion.label>
          </ul>
        </div>
      </div>
    )
}