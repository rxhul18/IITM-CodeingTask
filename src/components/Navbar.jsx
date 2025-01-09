import { Link } from "react-router-dom";

const Navbar = ({mail}) => {
  return (
    <nav className="flex justify-center bg-gray-800 p-4 absolute top-0 w-full">
      <div className="space-x-4 container">
        <Link to="/" className="text-white hover:text-gray-300">
          Home
        </Link>
        <Link to="/products" className="text-white hover:text-gray-300">
          Products
        </Link>
      </div>
      <div>
        <p className="text-white dark:text-white">{mail}</p>
      </div>
    </nav>
  );
};

export default Navbar