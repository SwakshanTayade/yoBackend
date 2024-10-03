import { Box, Button, FormControl, FormHelperText, FormLabel, HStack, Input, position, Text, VStack } from '@chakra-ui/react'
import {React, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const Add = () => {
    const userEntries = {
        fname:"",
        lname:"",
        email:"",
        age:0,
        password:""
    }

    const [user,setUser] = useState(userEntries);
    const navigate = useNavigate();
    const inputHandle = (e)=>{
        const {name,value} = e.target;
        setUser({...user,[name]:value});
    }
    const Create = async(e)=>{
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8000/api/create",user)
            toast.success(res.data.msg,{
                position:'top-right',
                autoClose:3000})
            navigate("/")
            
        } catch (error) {
            console.log("error in creating :",error);
            
        }
    }
  return (
    <VStack justifyContent={"center"} h={"100vh"}>
        <Button pos={"absolute"} left={"20px"} top={"20px"} colorScheme={"twitter"}>
            <Link to={"/"}>Show All Users</Link>
        </Button>
        <Box w={"50%"} borderRadius={"10px"} boxShadow={"1px 1px 20px gray"} p={"20px"}>
        <form onSubmit={Create}>
        <FormControl>
            <FormLabel>First Name</FormLabel>
            <Input type='text' name='fname' id='fname' onChange={
                inputHandle
            } placeholder='First Name'/>
            <FormLabel>Last Name</FormLabel>
            <Input type='text' name='lname' id='lname' onChange={
                inputHandle
            } placeholder='Last Name'/>
            <FormLabel>email</FormLabel>
            <Input type='email' name='email' id='email' onChange={
                inputHandle
            } placeholder='email address'/>
            <FormLabel>Age</FormLabel>
            <Input type='number' name='age' id='number' onChange={
                inputHandle
            } placeholder='Your Age'/>
            <FormLabel>Password</FormLabel>
            <Input type='password' name='password' id='password' onChange={
                inputHandle
            } placeholder='Password'/>
            <Button type='submit' mt={"10px"} alignSelf={"center"} w={"100%"} bgColor={"teal.500"} >Create</Button>
        </FormControl>
        </form>
        </Box>
    </VStack>
  )
}

/*
<FormLabel>Password</FormLabel>
      <InputGroup>
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password"
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {showPassword ? 'Hide' : 'Show'}
          </Button>
        </InputRightElement>
      </InputGroup>
*/ 

export default Add