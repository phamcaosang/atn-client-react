import styled from "styled-components";
import { mobile } from "../responsive";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import {  useState } from "react";
import { register } from "../redux/apiCalls";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  let navigate  = useNavigate();
  const [inputs, setInputs] = useState({});
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  function validation(){
    if (Object.keys(inputs).length < 5){
      NotificationManager.warning('Missing one or more fields', 'Fail Notification', 3000)
      return false 
    }
    if (inputs.password !== inputs.repassword){
      NotificationManager.warning('Password does not match', 'Fail Notification', 3000)
      return false
    }
    if (inputs.password.length < 6){
      NotificationManager.warning('Password must be at least 6 characters', 'Fail Notification', 3000)
      return false
    }
    return true
  }

  function handleClick(e){
    e.preventDefault();
    if (validation()){
      if (!register({ ...inputs })){
        NotificationManager.warning('Failed to register, invalid email or username', 'Fail Notification')
      } else{
        navigate('/login')
      }
    }
    
  }


  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input placeholder="full name" name="fullname"  onChange={handleChange}/>
          <Input placeholder="username" name="username"  onChange={handleChange}/>
          <Input placeholder="email" name="email" type= 'email'  onChange={handleChange}/>
          <Input placeholder="password" name="password" type = 'password' onChange={handleChange}/>
          <Input placeholder="confirm password" name="repassword" type = 'password' onChange={handleChange}/>
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick = {handleClick}>CREATE</Button>
        </Form>
      </Wrapper>
      <NotificationContainer />
    </Container>
  );
};

export default Register;