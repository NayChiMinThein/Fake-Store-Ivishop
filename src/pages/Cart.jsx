/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux"
import BackButton from "../components/BackButton"
import { Navbar } from "../components/Navbar"
import { addCartQty, reduceCartQty, removeCartProduct, orderSuccess } from "../redux/features/cartSlice"
import { Link, useNavigate } from "react-router-dom"
import { MdOutlineShoppingBag } from "react-icons/md";
import { IoTrashBin } from "react-icons/io5";

function Cart() {
  const {cart} = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const multiply = cart ? cart.map(c => c.price * c.quantity) : [];
  const totalPrice = multiply.reduce((total, initialVal) => total + initialVal, 0)

  const handleIncrease = (itemId) => {
    dispatch(addCartQty({id: itemId}))
  }

  const handleDecrease = (itemId) => {
    dispatch(reduceCartQty({id: itemId}))
  }

  const handleRemove = (itemId) => {
    dispatch(removeCartProduct({id: itemId}))
  }

  const successOrder = () => {
    dispatch(orderSuccess())
    alert('Purchase Success. Thanks for buying from IVISHOP.')
    navigate('/')
  }

  return (
    <>
      <Navbar/>
      {cart?.length > 0 && 
        <div className="mt-4 md:mt-8 mx-5 md:mx-20">
          <BackButton/>
          <h2 className="text-lg md:text-2xl lg:text-3xl text-center">Cart History</h2>
          <hr className="my-2 md:my-4 lg:my-5"/>
  
          <div className="mt-4 lg:mt-6">
            {cart.map(c => {
              return (
                <div key={c.id}
                  className="flex items-center justify-between border border-transparent border-b-slate-200
                  mb-3 md:mb-6 pb-5">
                  <img src={c.image} className="w-12 md:w-14 ms-1 md:ms-4" />
  
                  <div className="text-center">
                    <p className="text-sm md:text-base lg:text-lg mb-2 md:mb-3 font-medium text-slate-800">
                      ${c.price}
                    </p>
                    <div className="flex items-center">
                      <button onClick={() => handleDecrease(c.id)}
                        className="border border-slate-900 px-1 md:px-2 lg:px-3 lg:py-1 rounded 
                        lg:hover:bg-slate-800 lg:hover:text-white">
                        -
                      </button>
                      <p className="mx-2 md:mx-3 lg:mx-4 text-sm md:text-base">{c.quantity}</p>
                      <button onClick={() => handleIncrease(c.id)}
                        className="border border-slate-900 px-1 md:px-2 lg:px-3 lg:py-1 rounded 
                        lg:hover:bg-slate-800 lg:hover:text-white">
                        +
                      </button>
                    </div>
                  </div>
  
                  <p className="text-sm lg:text-lg font-medium text-slate-800">
                    ${(c.price * c.quantity).toFixed(2)}
                  </p>
                  <button onClick={() => handleRemove(c.id)}
                    className="hidden md:inline bg-red-700 hover:bg-red-800 text-white md:text-sm px-2 py-1 
                    rounded-md">
                    Remove
                  </button>
                  <button onClick={() => handleRemove(c.id)} className="inline md:hidden text-red-700 me-1">
                    <IoTrashBin/>
                  </button>
                </div>
              )
            })}          
          </div>
  
          <div className="absolute right-6 md:right-20 mt-1 md:mt-2">
            <p className="text-sm md:text-base lg:text-lg text-center border border-transparent border-b-slate-600 pb-1">
              Total Price : ${totalPrice.toFixed(2)}
            </p>
            <button onClick={successOrder}
              className="bg-slate-800 hover:bg-slate-900 text-white text-xs md:text-sm lg:text-base 
              py-2 mt-3 mb-8 rounded-md w-36 md:w-40 lg:w-44 tracking-wide">
              Purchase
            </button>
          </div>
        </div>
      }
      
      {!cart?.length && 
        <div className="mt-20 md:mt-32 flex flex-col md:flex-row items-center justify-center md:text-2xl lg:text-3xl 
          font-medium text-slate-800">
          <h2 className="text-red-700">
            You don't have any product in carts.
          </h2>
          <Link to="/" className="md:ms-2 underline">
              Go for shopping
              <MdOutlineShoppingBag className="inline-block text-lg md:hidden"/>
          </Link>
          <MdOutlineShoppingBag className="hidden md:block"/>
        </div>
      }
    </>
  )
}

export default Cart