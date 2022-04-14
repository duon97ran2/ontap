import { Button, Form, message } from 'antd';
import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { ProductType } from './ProductType';
import { StyledFormGroup } from './styleComponent';


type Props = {}
type Inputs = {
  name: string,
  desc: string,
  img: string,
  price: number,
}



const Add = (props: Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const navigate = useNavigate();
  const onSubmit = (post: ProductType) => {
    const addProduct = async () => {
      const { data } = await axios.post("http://localhost:3001/products", post);
      message.success("add product success", 2, () => { navigate("/products") });
    }
    addProduct();
  }

  return (
    <div>

      <form style={{ width: "50%", margin: "auto" }} onSubmit={handleSubmit(onSubmit)}><h1>Add Product</h1>
        <StyledFormGroup >
          <label>Name</label>
          <input type="text" {...register("name", { required: true, minLength: 5 })} />
          {errors.name && <span>This field is required</span>}
        </StyledFormGroup>
        <StyledFormGroup >
          <label>Price</label>
          <input type="number" {...register("price", { required: true, valueAsNumber: true })} />
          {errors.price && <span>This field is required</span>}</StyledFormGroup>
        <StyledFormGroup >
          <label>Image</label>
          <input type="text" {...register("img", { required: true })} />
          {errors.img && <span>This field is required</span>}</StyledFormGroup>
        <StyledFormGroup >
          <label>Desc</label>
          <input type="text" {...register("desc")} /></StyledFormGroup>
        <Button htmlType='submit' type='primary'>Add</Button>
      </form>
    </div>
  )
}

export default Add