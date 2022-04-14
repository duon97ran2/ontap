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

const Login = (props: Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const navigate = useNavigate();
  const handleForm = (post) => {
    const asyncLogin = async () => {
      axios.post("http://localhost:3001/login", post).then(({ data }) => {
        console.log(data)
        localStorage.setItem("user", JSON.stringify(data));
        message.success("Login success", 2, () => { navigate("/") })
      }).catch((error) => { console.log(error) })
    }
    asyncLogin();
  }
  return (
    <Card style={{ width: "30%", margin: "20px auto", padding: "20px" }}>
      <form onSubmit={handleSubmit(handleForm)} >
        <h1>Login</h1>
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
        <Button type='primary' htmlType='submit' >Login</Button>
      </form>
    </Card>
  )
}

export default Login