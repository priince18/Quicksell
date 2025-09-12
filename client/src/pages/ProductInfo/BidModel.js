import { Form, Input, Modal, message } from "antd";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../redux/LoadersSlice";
import { PlaceNewBids } from "../../Apicalls/products";
import { AddNotification } from "../../Apicalls/notification";

const BidModel = ({ product, reloadData, showBidModel, setshowBidModel }) => {
  const {user} = useSelector((state)=>state.users)
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const rules = [{ required: true, message: "fields required" }];

  const onFinish=async(values)=>{
      try {
         const minAllowed = Number(product.price);
         const offered = Number(values.bidAmount);
         if (Number.isNaN(offered) || offered < minAllowed){
           message.error(`Bid must be at least the offered price ₹${minAllowed}`);
           return;
         }

         dispatch(SetLoader(true));
         const response = await PlaceNewBids({
          ...values,
          product:product._id,
          seller:product.seller._id,
          buyer:user._id,
         })
         dispatch(SetLoader(false))
         if(response.success) {
          message.success("Bid added successfully");
          // send notification
          await AddNotification({
            title:"New Bid has been placed",
            message:`A new Bid has been placed on your product ${product.name} by ${user.name} for ${values.bidAmount}`,
            user:product.seller._id,
            onClick:'/profile',
            read:false
          })
          reloadData();
          setshowBidModel(false);
         }else{
          throw new Error(response.message);
         }
      } catch (error) {
         message.error(error.message);
         dispatch(SetLoader(false))
      }
  }

  return (
    <Modal
      onCancel={() => setshowBidModel(false)}
      open={showBidModel}
      centered
      width={600}
      onOk={()=> formRef.current.submit()}
    >
      <div className="flex flex-col gap-5 mb-5">
        <h1 className="text-2xl font-semibold text-red-800 text-center">
          New Bids
        </h1>

        <Form layout="vertical" ref={formRef} onFinish={onFinish}>
          <Form.Item label={`Bid Amount (≥ ₹${product.price})`} name="bidAmount" rules={rules}>
            <Input type="number" min={product.price} />
          </Form.Item>

          <Form.Item label="Message" name="message" rules={rules}>
            <Input.TextArea />
          </Form.Item>

          <Form.Item label="Mobile" name="mobile" rules={rules}>
            <Input type="number" max={10} min={10} />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default BidModel;
