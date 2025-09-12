import { Col, Form, Input, Row, message, Upload, Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import Modal from "antd/es/modal/Modal";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../../redux/LoadersSlice";
import { AddProduct, EditProduct, UploadProductImage } from "../../../Apicalls/products";

const AddtionalThings = [
  {
    label: "Bill Available",
    name: "billAvailable",
  },
  {
    label: "Warranty Available",
    name: "warrantyAvailable",
  },
  {
    label: "Accessories Available",
    name: "accessoriesAvailable",
  },
  {
    label: "Box Available",
    name: "boxAvailable",
  },
  {
    label: "Product Damage",
    name: "productdamage",
  },
  {
    label: "First Owner",
    name: "firstowner",
  },
  {
    label: "Scratches on product",
    name: "scratches",
  },
];

const rules = [
  {
    required: true,
    message: "Required field",
  },
];

const ProductsForm = ({
  showProductForm,
  setshowProductForm,
  selectedProduct,
  getData,
}) => {
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const { user } = useSelector((state) => state.users);
  const [images, setimages] = useState(selectedProduct?.images || []);
  const [file, setfile] = useState(null);

  const onFinish = async (value) => {
    try {
      if (images.length === 0) {
        message.error("Please add at least one image");
        return;
      }
      
      dispatch(SetLoader(true));
      let response = null;
      
      if (selectedProduct) {
        value.images = images;
        response = await EditProduct(selectedProduct._id, value);
      } else {
        value.seller = user._id;
        value.status = "pending";
        value.images = images;
        response = await AddProduct(value);
      }
      
      if (response.success) {
        message.success(response.message);
        getData();
        dispatch(SetLoader(false));
        setshowProductForm(false);
        setimages([]);
        setfile(null);
      } else {
        dispatch(SetLoader(false));
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const handleImageUpload = async () => {
    try {
      if (!file) {
        message.error("Please select an image");
        return;
      }
      
      dispatch(SetLoader(true));
      const formData = new FormData();
      formData.append("file", file);
      
      const response = await UploadProductImage(formData);
      dispatch(SetLoader(false));
      
      if (response.success) {
        setimages([...images, response.data]);
        setfile(null);
        message.success("Image uploaded successfully");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const handleDeleteImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setimages(newImages);
  };

  useEffect(() => {
    if (selectedProduct) {
      formRef.current.setFieldsValue(selectedProduct);
      setimages(selectedProduct.images || []);
    } else {
      setimages([]);
      setfile(null);
    }
  }, [selectedProduct]);

  return (
    <Modal
      title=""
      open={showProductForm}
      onCancel={() => setshowProductForm(false)}
      centered={true}
      width={900}
      okText="Save"
      onOk={() => {
        formRef.current.submit();
      }}
    >
      <div>
        <h1 className="text-primary text-center uppercase text-2xl">
          {selectedProduct ? "Edit Product" : "Add Product"}
        </h1>
        
        <Form layout="vertical" ref={formRef} onFinish={onFinish}>
          <Form.Item label="Name" name="name" rules={rules}>
            <Input type="text"></Input>
          </Form.Item>

          <Form.Item label="Description" name="description" rules={rules}>
            <TextArea type="text"></TextArea>
          </Form.Item>

          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Form.Item label="Price" name="price" rules={rules}>
                <Input type="number"></Input>
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label="Category" name="category" rules={rules}>
                <select name="" id="" className="rounded-xl">
                  <option value="">Select</option>
                  <option value="electronic">Electronics</option>
                  <option value="fashion">Fashion</option>
                  <option value="home">Home</option>
                  <option value="sport">Sports</option>
                  <option value="book">Books</option>
                </select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Age" name="age" rules={rules}>
                <Input type="number"></Input>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="MM/YYYY" name="monYears" rules={rules}>
                <select name="" id="" className="rounded-xl">
                  <option value="">Select</option>
                  <option value="Months">Months</option>
                  <option value="years">Years</option>
                </select>
              </Form.Item>
            </Col>
          </Row>

          <div className="flex gap-5">
            {AddtionalThings.map((item, index) => {
              return (
                <Form.Item
                  label={item.label}
                  name={item.name}
                  valuePropName="checked"
                >
                  <Input
                    type="checkbox"
                    value={item.name}
                    onChange={(e) => {
                      formRef.current.setFieldsValue({
                        [item.name]: e.target.checked,
                      });
                    }}
                    checked={formRef.current?.getFieldValue(item.name)}
                  ></Input>
                </Form.Item>
              );
            })}
          </div>

          <Row>
            <Col span={8}>
              <Form.Item
                label="show Bids on product Page"
                name="showBidsProductPage"
                valuePropName="checked"
              >
                <Input
                  type="checkbox"
                  onChange={(e) => {
                    formRef.current.setFieldsValue({
                      showBidsProductPage: e.target.checked,
                    });
                  }}
                  checked={formRef.current?.getFieldValue(
                    "showBidsProductPage"
                  )}
                  style={{width: 50,marginLeft:15}}
                ></Input>
              </Form.Item>
            </Col>
          </Row>

          {/* Image Upload Section */}
          <Form.Item label="Product Images" required>
            <div className="mb-4">
              <Upload
                listType="picture"
                beforeUpload={() => false}
                showUploadList={false}
                onChange={(info) => {
                  setfile(info.file?.originFileObj || info.file);
                }}
              >
                <Button type="dashed">Select Image</Button>
              </Upload>
              {file && (
                <Button 
                  type="primary" 
                  onClick={handleImageUpload}
                  className="ml-2"
                >
                  Upload Image
                </Button>
              )}
            </div>
            
            {/* Display uploaded images */}
            <div className="flex gap-2 flex-wrap">
              {images.map((image, index) => (
                <div key={index} className="relative border border-solid border-gray-500 p-2">
                  <img 
                    className="h-20 w-20 object-cover" 
                    src={image} 
                    alt={`Product ${index + 1}`} 
                  />
                  <Button
                    type="text"
                    danger
                    size="small"
                    className="absolute -top-2 -right-2"
                    onClick={() => handleDeleteImage(index)}
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default ProductsForm;
