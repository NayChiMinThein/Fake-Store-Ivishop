import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { getAllProducts } from "../redux/features/productSlice"
import { Navbar } from "../components/Navbar"
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FaStar } from "react-icons/fa6";
import BackButton from "../components/BackButton"
import CartButton from "../components/CartButton"
import { addToCart } from "../redux/features/cartSlice"

function ProductDetail() {
  const {productId} = useParams()
  const [productDetail, setProductDetail] = useState([])
  const [quantity, setQuantity] = useState(1)
  const {products} = useSelector(state => state.products)
  const dispatch = useDispatch()

  useEffect(() => {
    if(products.length === 0){
      dispatch(getAllProducts())
    }
    const currentProduct = products.find(product => product.id === +productId)
    setProductDetail(currentProduct)
  }, [dispatch, productId, products])

  const handleCart = () => {
    let item = {
      id: +productId,
      image: productDetail.image,
      price: productDetail.price,
      quantity: quantity
    }
    dispatch(addToCart(item))
  }

  const increaseQuantity = () => {
    setQuantity(prevQty => prevQty + 1)
  }

  const decreaseQuantity = () => {
    setQuantity(prevQty => prevQty > 1 ? prevQty - 1 : prevQty)
  }

  return (
    <>
      <Navbar/>
      <div className="my-5 lg:my-8 mx-5 md:mx-14 lg:mx-32 text-slate-800">
        <BackButton/>
        <h2 className="md:text-xl lg:text-2xl">{productDetail?.title}</h2>
        <hr className="mt-2 mb-6 md:mt-3 lg:mt-5 md:mb-10 lg:mb-12"/>

        <div className="block md:grid md:grid-cols-2">
          <img src={productDetail?.image} className="w-32 mx-auto md:w-52 md:ms-8 md:me-0 lg:w-72 lg:ms-10" />

          <div className="text-sm mt-8 mx-1 md:mx-0 md:mt-0 md:me-8 md:text-base lg:me-10 lg:text-lg">
            <p className="mb-2 md:mb-5 font-semibold">Category : {productDetail?.category}</p>
            <p className="mb-2 md:mb-3">{productDetail?.description}</p>
            <div className="flex items-center mb-1 md:mb-2">
              <i className="text-base md:text-lg lg:text-xl me-2 md:me-2 text-amber-400"><FaStar/></i>
              <p className="font-medium">{productDetail?.rating?.rate}</p>
            </div> 
            <div className="flex items-center mb-3 md:mb-4 lg:mb-5 text-green-800">
              <i className="text-lg md:text-xl lg:text-2xl me-1"><RiMoneyDollarCircleLine/></i>
              <p className="font-semibold">{productDetail?.price}</p>
            </div>

            <div className="flex items-center justify-between mb-3 lg:mb-4">
              <button onClick={decreaseQuantity}
                className="border border-slate-900 px-3 py-1 rounded lg:hover:bg-slate-800 lg:hover:text-white">
                -
              </button>
              <p className="w-full border border-slate-700 px-3 py-1 rounded mx-2 text-center">
                {quantity}
              </p>
              <button onClick={increaseQuantity}
                className="border border-slate-800 px-3 py-1 rounded lg:hover:bg-slate-800 lg:hover:text-white">
                +
              </button>
            </div>

            <Link to='/cart' onClick={handleCart}
              className="bg-slate-800 text-white px-4 py-2 rounded inline-block w-full text-center hover:bg-slate-700">
              Add To Cart
            </Link>
          </div>
        </div>
      </div>
      <CartButton />
    </>
  )
}

export default ProductDetail