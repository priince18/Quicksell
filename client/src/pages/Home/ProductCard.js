import moment from "moment";
import { useNavigate } from "react-router-dom";


const ProductCard = ({ products }) => {
  const navigate = useNavigate();
  return (
    <>
      {products.map((product) => (
        <div
          className="cursor-pointer border border-solid rounded-lg"
          key={product._id}
          onClick={() => navigate(`/product/${product._id}`)}
        >
          <div className="w-full rounded-lg shadow overflow-hidden" style={{backgroundColor:"#203A43" }}>
             
             <div className="h-64 w-full overflow-hidden" style={{height: '256px'}}>
              <img
                className="w-full h-full object-cover object-center"
                src={(product?.images && product.images[0]) || '/olx3.png'}
                alt="productimg"
                onError={(e)=>{ e.currentTarget.src='/olx3.png'; }}
                style={{height: '256px', width: '100%'}}
              />
             </div>
            <div className="p-2">
               <div className="h-5 overflow-hidden mb-1">
                <h5 className="text-base font-semibold tracking-tight text-gray-700 dark:text-white">
                  {product.name.charAt(0).toUpperCase()+product.name.slice(1)}
                </h5>
               </div>
               
               {/* Status Badge */}
               <div className="mb-1">
                 <span className={`inline-block px-2 py-0.5 text-[11px] font-semibold rounded-full ${
                   product.status === 'approved' ? 'bg-green-100 text-green-800' :
                   product.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                   product.status === 'rejected' ? 'bg-red-100 text-red-800' :
                   'bg-gray-100 text-gray-800'
                 }`}>
                   {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                 </span>
               </div>
              <div className="h-12 overflow-hidden mb-2">
                <p className="text-xs leading-4 font-normal text-gray-400">
                  {product.description}
                </p>
              </div>
              <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-medium text-green-400">
              &#8377; {product.price}
                </p>
                <p className="text-white text-xs">
                 <span className=" text-gray-400">Year</span> {moment().subtract(product.age,"years").format('YYYY')}
                </p>
              </div>
              <span
                onClick={() => navigate(`/product/${product._id}`)}
                href="#@"
                className="inline-flex items-center px-2 py-1 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-2 focus:outline-none"
              style={{backgroundColor:"#bdc3c7",color:"#203A43"}} >
                Read more
                <svg
                  aria-hidden="true"
                  className="w-3 h-3 ml-1 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductCard;
