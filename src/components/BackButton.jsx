import { Link } from "react-router-dom"
import { IoChevronBack } from "react-icons/io5";

function BackButton() {
  return (
    <button>
        <Link to='/' className="flex items-center mb-3 lg:mb-6 text-slate-800 md:text-slate-600 hover:text-slate-900 text-xs md:text-sm lg:text-base">
            <IoChevronBack className="lg:text-xl"/> Back
        </Link>
    </button>
  )
}

export default BackButton