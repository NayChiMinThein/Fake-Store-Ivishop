import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function CartButton() {
  const {cart} = useSelector(state => state.cart)
  const totalQty = cart ? cart.reduce((total, item) => total + item.quantity, 0) : 0;

  return (
    <div className="fixed top-1/2 right-0 z-10">
        <button className="bg-slate-800 text-white p-2 md:py-3 lg:py-4 md:px-2 hover:bg-slate-700
          rounded-l-md">
            <Link to="/cart">
                <AiOutlineShoppingCart className="text-lg md:text-xl lg:text-2xl md:mb-1"/>
                <p>{totalQty}</p>
            </Link>
        </button>
    </div>
  )
}

export default CartButton