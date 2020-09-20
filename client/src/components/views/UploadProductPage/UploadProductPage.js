import React, { useState } from "react";
import { Typography, Form, Input, Button, Icon } from "antd";
import FileUpload from '../../utils/FileUpload';
import Axios from "axios";
// import { response } from "express";

const { Title } = Typography;
const { TextArea } = Input;

const Continents = [
  { key: 1, value: "India" },
  { key: 2, value: "Africa" },
  { key: 3, value: "Asia" },
  { key: 4, value: "North America" },
  { key: 5, value: "Australia" },
  { key: 6, value: "Europe" },
  { key: 7, value: "South America" },
];

function UploadProductPage(props) {
  const [TitleValue, setTitleValue] = useState("");
  const [DescriptionValue, setDescriptionValue] = useState("");
  const [PriceValue, setPriceValue] = useState(0);
  const [ContinentValue, setContinentValue] = useState(1);

  const [Images, setImages] = useState([])

  const onTitleChange = (event) => {
    setTitleValue(event.currentTarget.value);
  };

  const onDescriptionChange = (event) => {
    setDescriptionValue(event.currentTarget.value);
  };

  const onPriceChange = (event) => {
    setPriceValue(event.currentTarget.value);
  };

  const onContinentsSelectChange = (event) => {
    setContinentValue(event.currentTarget.value);
  };

  const updateImages = (newImages) => {
    setImages (newImages)
  }

  const onSubmit  = (event) => {
    event.preventDefault();

    if(!TitleValue || !DescriptionValue || !PriceValue || !Images ){
      return alert('Fill all the details of the form first');
    }

    const variables = {
      writer : props.user.userData._id,
      title : TitleValue,
      description : DescriptionValue,
      price : PriceValue,
      images : Images,
      continents : ContinentValue
    }

    Axios.post('/api/product/uploadProduct', variables)
    .then((response) => {
      if(response.data.success){
        alert('product successfully uploaded');
        props.history.push('/');
      }else{
        alert('failed to upload the product to server');
      }
    })
  }

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto" }} className = 'container'>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={1}>Upload Location</Title>
      </div>

      <Form onSubmit = {onSubmit}>
        {/* Dropzone */}
        <FileUpload refreshFunction = {updateImages} />



        <br />
        <br />
        <label>Title</label>
        <Input onChange={onTitleChange} value={TitleValue} />

        <br />
        <br />
        <label>Description</label>
        <TextArea onChange={onDescriptionChange} value={DescriptionValue} />
        <br />
        <br />
        <label>Price($)</label>
        <Input onChange={onPriceChange} value={PriceValue} type="number" />
        <br />
        <br />
        <select value = {ContinentValue} onChange={onContinentsSelectChange}>
          {Continents.map((item) => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>

        <br />
        <br />

        <Button type = 'primary' onClick = {onSubmit}> Submit</Button>
      </Form>
    </div>
  );
}

export default UploadProductPage;
