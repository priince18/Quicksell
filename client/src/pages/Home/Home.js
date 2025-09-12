import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { SetLoader } from "../../redux/LoadersSlice";
import { GetProducts, GetProductsBysearch } from "../../Apicalls/products";
import Divider from "../../components/Divider";
import {useNavigate, useLocation} from 'react-router-dom'
import Filters from "./Filters";
import {IoFilterSharp} from 'react-icons/io5';
import moment from "moment";
// import Search from "./Search";
import ProductCard from "./ProductCard";
import ErrorComponent from "../../components/Error";
import Pagination from "../../components/Pagination";




const Home = () => {
  const [showFilters, setshowFilters] = useState(true)
  const { user } = useSelector((state) => state.users);
  const [error, setError]=useState(false);
  const [products, setproducts] = useState([]);
  const [filters, setfilters] = useState({
    status: user?.role === 'admin' ? "" : "approved", // Non-admin users only see approved products
    category: [],
    age:[],
  });
  const [currentPage, setcurrentPage] = useState(1);
  const [postPerPage, setpostPerPage] = useState(12); // Increased from 8 to 12
  const dispatch = useDispatch();
  const location = useLocation();
  const getData = async () => { 
    try {
      dispatch(SetLoader(true));
      const response = await GetProducts(filters, user?.role);
      dispatch(SetLoader(false));
      if (response.success) {
        setproducts(response.data);
      } else {
        throw new Error("Product not fiilters");
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };


  useEffect(() => {
    setcurrentPage(1);
    getData();
  }, [filters]);

  useEffect(() => {
    // Update filters when user role changes
    if (user?.role) {
      setfilters(prev => ({
        ...prev,
        status: user.role === 'admin' ? "" : "approved"
      }));
    }
  }, [user?.role]);
 
  // Listen to navbar search (?q=) and fetch results
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q') || "";
    const run = async () => {
      if (q && q.trim() !== "") {
        try {
          // silent search fetch without global loader to avoid flicker
          const response = await GetProductsBysearch(q.trim());
          if (response.success) {
            setcurrentPage(1);
            setproducts(response.data);
          } else {
            message.error(response.message);
          }
        } catch (err) {
          message.error(err.message);
        }
      } else {
        // No search query → load by filters (with loader)
        setcurrentPage(1);
        getData();
      }
    };
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const lastPostIndex = currentPage* postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = products.slice(firstPostIndex,lastPostIndex);

  return (
    <div className="flex gap-3 ">
     {showFilters && <Filters 
      showFilters={showFilters}
      setshowFilters={setshowFilters}
      filters={filters}
      setfilters={setfilters}
      userRole={user?.role}
     /> }
     <div className="flex flex-col gap-5 w-full" >
        <div className="flex gap-5 items-center">
         {!showFilters &&  <IoFilterSharp size={30} className=" cursor-pointer" onClick={()=>setshowFilters(!showFilters)}/>}
         {/* Search removed - now in navbar */}
        </div>

        {/* Product Count and Status Info */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Found {products.length} products
          </div>
          <div className="text-xs text-gray-500">
            {user?.role === 'admin' ? '💡 Use filters to view products by status, category, or age' : '💡 Use filters to view products by category or age'}
          </div>
        </div>

      <div className={"grid gap-4 grid-cols-3"}>

       <ProductCard products={currentPosts}/>
       </div> 
       <div className="flex items-center justify-center mt-3">
        <Pagination totalPosts={products.length} postsPerPage={postPerPage} setcurrentPage={setcurrentPage}/>
       </div>
     </div>
    </div>
  );
};

export default Home;
