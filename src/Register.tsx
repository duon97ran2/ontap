import { Button, Card, message } from 'antd'
import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { StyledFormGroup } from './styleComponent'

type Props = {}
type Inputs = {
  email: string,
  password: string
}

const Register = (props: Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const navigate = useNavigate();
  const handleForm = (post) => {
    const asyncRegister = async () => {
      axios.post("http://localhost:3001/register", post).then(() => { message.success("Register success", 2, () => { navigate("/login") }) }).catch((error) => { console.log(error) })
    }
    asyncRegister();
  }
  return (
    <Card style={{ width: "30%", margin: "20px auto", padding: "20px" }}>
      <form onSubmit={handleSubmit(handleForm)} >
        <h1>Register</h1>
        <StyledFormGroup>
          <label htmlFor="email">Email</label>
          <input type="text" {...register("email", { required: true })} />
          {errors.email && <span>This field is required</span>}
        </StyledFormGroup>
        <StyledFormGroup>
          <label htmlFor="password">Password</label>
          <input type="password" {...register("password", { required: true, minLength: 5 })} />
          {errors.password && <span>This field is required</span>}
        </StyledFormGroup>
        <Button type='primary' htmlType='submit' >Register</Button>
      </form>
    </Card>
  )
}

export default Register