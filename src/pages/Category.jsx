import { useParams } from "react-router-dom"
import { Navbar } from "../components/Navbar"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import BackButton from "../components/BackButton"
import { getAllProducts } from "../redux/features/productSlice"
import CartButton from "../components/CartButton"

function Category() {
    const {categoryName} = useParams()
    const [filteredProducts, setFilteredProducts] = useState([])
    const {products} = useSelector(state => state.products)
    const dispatch = useDispatch()

    useEffect(() => {
        if(products.length ===0){
            dispatch(getAllProducts())
        }
        let filterProducts = products.filter(product => product.category === categoryName)
        setFilteredProducts(filterProducts)
    }, [categoryName, dispatch, products])

  return (
    <>
        <Navbar/>
        <div className="my-3 md:my-4 lg:my-8 mx-4 md:mx-8 lg:mx-20">
            <BackButton/>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-10">
                {filteredProducts.map(product => {
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

export default Category