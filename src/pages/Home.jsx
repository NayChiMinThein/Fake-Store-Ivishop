/* eslint-disable react/prop-types */
import { Navbar } from "../components/Navbar"
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getAllProducts } from "../redux/features/productSlice"
import CartButton from "../components/CartButton";

function Home() {
  const {products} = useSelector(state => state.products)
  const dispatch = useDispatch()

  useEffect(() => {
  dispatch(getAllProducts())
  }, [dispatch])

  return (
    <>
      <Navbar/>
      <div className="my-5 md:my-10 mx-4 md:mx-8 lg:mx-20">
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-10">
          {products.map(product => {
            return (
              <NavLink to={`/products/${product.id}`} key={product.id}
                className="border border-slate-300 p-4 hover:border-slate-800 hover:shadow-lg">
                <img src={product.image} className="w-32 h-40 block mx-auto mt-2 mb-6" />
                <hr />
                <p className="mt-3">{product.title}</p>
                <div className="flex items-center mt-1 text-green-800">
                  <i className="text-xl me-1"><RiMoneyDollarCircleLine/></i>
                  <p className="font-semibold">{product.price}</p>
                </div>
              </NavLink>
            )
          })}
        </div>
      </div>
      <CartButton/>
    </>
  )
}

export default Home