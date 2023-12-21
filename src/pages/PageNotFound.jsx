import { Link } from "react-router-dom"
import { Navbar } from "../components/Navbar"
import { IoIosArrowBack } from "react-icons/io";

function PageNotFound() {
  return (
    <>
      <Navbar/>
      <div className="text-center mt-20 md:mt-32 text-slate-800">
          <h2 className="text-2xl md:text-4xl lg:text-5xl mb-1 md:mb-2 lg:mb-3">
              Page Not Found !!!
          </h2>
          <Link to='/' className="flex items-center justify-center md:text-xl lg:text-2xl underline hover:text-slate-600">
              <IoIosArrowBack />
              Go back to Home Page 
          </Link>
      </div>
    </>
  )
}

export default PageNotFound