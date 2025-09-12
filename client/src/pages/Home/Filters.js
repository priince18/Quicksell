import React from "react";
import { RxCross2 } from "react-icons/rx";

const categories = [
  {
    name: "Electronics",
    value: "electronic",
  },
  {
    name: "Home",
    value: "home",
  },
  {
    name: "Fashion",
    value: "fashion",
  },
  {
    name: "Sports",
    value: "sport",
  },
  {
    name: "Books",
    value: "book",
  },
];

const ages = [
  {
    name: "0-2 Month/Year old",
    value: "0-2",
  },
  {
    name: "3-5 Month/Year old",
    value: "3-5",
  },
  {
    name: "6-8 Month/Year old",
    value: "6-8",
  },
  {
    name: "9-12 Month/Year old",
    value: "9-12",
  },
  {
    name: "13+ Month/Year old",
    value: "12-20",
  },
];

const statusOptions = [
  {
    name: "All Products",
    value: "",
    color: "text-gray-700",
    bgColor: "bg-gray-100"
  },
  {
    name: "Approved",
    value: "approved",
    color: "text-green-700",
    bgColor: "bg-green-100"
  },
  {
    name: "Pending",
    value: "pending",
    color: "text-yellow-700",
    bgColor: "bg-yellow-100"
  },
  {
    name: "Rejected",
    value: "rejected",
    color: "text-red-700",
    bgColor: "bg-red-100"
  },
];

const Filters = ({ showFilters, setshowFilters, filters, setfilters, userRole }) => {
  return (
    <div className="w-72 pt-3">
      <div className="flex justify-between p-3">
        <h1 className="text-xl " style={{color:"#203A43", letterSpacing:"1px"}}>Filters</h1>
        <h1 className="cursor-pointer">
          <RxCross2 size={21} onClick={() => setshowFilters(!showFilters)} />
        </h1>
      </div>

      {/* Show All Products Button */}
      <div className="px-3 mb-4">
        <button 
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => setfilters({
            status: userRole === 'admin' ? "" : "approved",
            category: [],
            age: [],
          })}
        >
          {userRole === 'admin' ? 'Show All Products' : 'Show Products'}
        </button>
      </div>

      <div className="flex flex-col gap-1 mt-5">
        {/* Status Filter - Only visible to admin users */}
        {userRole === 'admin' && (
          <>
            <h1 className="text-gray-600 text-sm">Status</h1>
            <div className="flex flex-col gap-1">
              {statusOptions.map((status) => {
                return (
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="status"
                      checked={filters.status === status.value}
                      onChange={(e) => {
                        setfilters({
                          ...filters,
                          status: status.value,
                        });
                      }}
                      style={{ width: 30 }}
                    />
                    <label 
                      htmlFor="status" 
                      className={`${status.color} font-medium`}
                    >
                      {status.name}
                    </label>
                  </div>
                );
              })}
            </div>
          </>
        )}

        <h1 className="text-gray-600 text-sm mt-4">Categories</h1>

        <div className="flex flex-col gap-1">
          {categories.map((category) => {
            return (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="max-width"
                  name="category"
                  checked={filters.category.includes(category.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setfilters({
                        ...filters,
                        category: [...filters.category, category.value],
                      });
                    } else {
                      setfilters({
                        ...filters,
                        category: filters.category.filter(
                          (item) => item !== category.value
                        ),
                      });
                    }
                  }}
                  style={{ width: 30 }}
                />
                <label htmlFor="category">{category.name}</label>
              </div>
            );
          })}
        </div>

        <h1 className="text-gray-600 text-sm">Ages</h1>
        <div className="flex flex-col gap-1">
          {ages.map((age) => {
            return (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="max-width"
                  name="age"
                  checked={filters.age.includes(age.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setfilters({
                        ...filters,
                        age: [...filters.age, age.value],
                      });
                    } else {
                      setfilters({
                        ...filters,
                        age: filters.age.filter((item) => item !== age.value),
                      });
                    }
                  }}
                />
                <label htmlFor="age" className="text-xs">{age.name}</label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Filters;
