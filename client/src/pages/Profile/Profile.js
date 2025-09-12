import { Tabs } from "antd";
import React from "react";
import Products from "./Products/Products";
import UserBids from "./UserBids";
import { useSelector } from "react-redux";
import moment from "moment";

const Profile = () => {
  const { user } = useSelector((state) => state.users);
  const userInitial = (user?.name || 'U').charAt(0).toUpperCase();
  return (
    <div>
      <Tabs>
        <Tabs.TabPane tab="Products" key="1">
          <Products />
        </Tabs.TabPane>
        <Tabs.TabPane tab="My Bids" key="2">
          <UserBids />
        </Tabs.TabPane>
        <Tabs.TabPane tab="General" key="3">
          <div className="max-w-3xl">
            <div className="bg-white rounded-lg shadow p-5 border border-gray-100">
              {/* Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-semibold" style={{backgroundColor:'#203A43'}}>
                  {userInitial}
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-semibold" style={{color:'#203A43'}}>{user.name}</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200 text-gray-700 uppercase">
                      {user.role}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {user.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border rounded-lg p-3">
                  <div className="text-xs text-gray-500">Email</div>
                  <div className="text-sm break-all">{user.email}</div>
                </div>

                <div className="border rounded-lg p-3">
                  <div className="text-xs text-gray-500">Joined</div>
                  <div className="text-sm">{moment(user.createdAt).format('MMM D, YYYY hh:mm A')}</div>
                </div>

                <div className="border rounded-lg p-3">
                  <div className="text-xs text-gray-500">Account</div>
                  <div className="text-sm">{user.status === 'active' ? 'In Good Standing' : 'Restricted'}</div>
                </div>
              </div>
            </div>
          </div>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Profile;
