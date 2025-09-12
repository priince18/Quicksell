import { Button, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { SetLoader } from "../../redux/LoadersSlice";
import {GetProducts, updateProductStatus} from "../../Apicalls/products";
import moment  from "moment";

// dataIndex must match with aproprite mongoDb proprty

const ProductsInfo = () => {
  const [product, setproduct] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [statusFilter, setStatusFilter] = useState("all")
  const disptach = useDispatch();

  const getData= async()=>{
      try {
        disptach(SetLoader(true));
        // Get all products for admin view - pass userRole as 'admin' to bypass status filtering
        const response = await GetProducts({}, 'admin');
        if(response.success){
           disptach(SetLoader(false));
           setproduct(response.data);
        }else{
          message.error(response.message)
        }
      } catch (error) {
        disptach(SetLoader(false))
        message.error(error.message)
      }
  }
  
const onStatusUpdate=async(id,status)=>{
  try {
    disptach(SetLoader(true));
    const response = await updateProductStatus(id,status)
    disptach(SetLoader(false));
    if(response.success){
      message.success(response.message);
      getData()
    }else{
      throw new Error(response.message);
    }
  } catch (error){
    disptach(SetLoader(false))
    message.error(error.message)
  }
}

useEffect(() => {
     getData()
}, [])

useEffect(() => {
  if (statusFilter === "all") {
    setFilteredProducts(product);
  } else {
    setFilteredProducts(product.filter(p => p.status === statusFilter));
  }
}, [product, statusFilter]);


const statusCounts = {
  all: product.length,
  pending: product.filter(p => p.status === "pending").length,
  approved: product.filter(p => p.status === "approved").length,
  rejected: product.filter(p => p.status === "rejected").length,
};
  
  const columns = [
    {
      title: "Product Image",
      dataIndex: "images",
      render:(text,record)=>{
        return (
          <img src={record?.images?.length > 0 ? record.images[0]:""} alt="productimg" className="h-20 w-20 object-cover rounded-md"/>
        )
      }
    },
    {
      title: "Product",
      dataIndex: "name",
    },
    {
      title: "Seller",
      dataIndex: "name",
      render:(text,record)=>(
          record?.seller?.name
      )
      },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "MonYears",
      dataIndex: "monYears",
    },
    {
      title: "Status",
      dataIndex: "status",
      render:(text,record)=>{
        return record.status.toUpperCase();
      },
    },
    {
      title: "Added on",
      dataIndex: "createdAt",
      render:(text,record)=> moment(record.createdAt).format("DD-MM-YYYY hh:mm A")
    },
    {
      title:"Action",
      dataIndex: "action",
      render:(text,record)=>{
        const {status, _id} = record;
        return (
          <div className="flex gap-3 ">
              {status === "pending" &&( <span className=" cursor-pointer  text-green-400" onClick={()=>onStatusUpdate(_id,'approved')}>Approve</span>)}
              {status === "pending" &&( <span className=" cursor-pointer text-red-400" onClick={()=>onStatusUpdate(_id,'rejected')}>Reject</span>)}
          </div>
        )
      }
    }
  ];

  return (
    <div>
      {/* Status Filter and Counters */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Product Management Dashboard</h2>
        
        {/* Status Counters (4 columns, no blocked) */}
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="bg-blue-100 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">{statusCounts.all}</div>
            <div className="text-sm text-blue-800">Total Products</div>
          </div>
          <div className="bg-yellow-100 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-yellow-600">{statusCounts.pending}</div>
            <div className="text-sm text-yellow-800">Pending Review</div>
          </div>
          <div className="bg-green-100 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">{statusCounts.approved}</div>
            <div className="text-sm text-green-800">Approved</div>
          </div>
          <div className="bg-red-100 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-red-600">{statusCounts.rejected}</div>
            <div className="text-sm text-red-800">Rejected</div>
          </div>
        </div>

        {/* Status Filter */}
        <div className="flex gap-2 mb-4">
          <button 
            className={`px-4 py-2 rounded-lg ${statusFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setStatusFilter('all')}
          >
            All ({statusCounts.all})
          </button>
          <button 
            className={`px-4 py-2 rounded-lg ${statusFilter === 'pending' ? 'bg-yellow-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setStatusFilter('pending')}
          >
            Pending ({statusCounts.pending})
          </button>
          <button 
            className={`px-4 py-2 rounded-lg ${statusFilter === 'approved' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setStatusFilter('approved')}
          >
            Approved ({statusCounts.approved})
          </button>
          <button 
            className={`px-4 py-2 rounded-lg ${statusFilter === 'rejected' ? 'bg-red-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setStatusFilter('rejected')}
          >
            Rejected ({statusCounts.rejected})
          </button>
          
        </div>
      </div>

      {/* Products Table */}
      <Table columns={columns} dataSource={filteredProducts}></Table>
    </div>
  );
};

export default ProductsInfo;
