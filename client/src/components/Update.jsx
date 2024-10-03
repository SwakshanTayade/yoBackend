import { Box, Button, FormControl, FormHelperText, FormLabel, HStack, Input, Text, VStack } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
const Update = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const newUser = {
        fname:"",
        lname:"",
        age:0,
    }
    const [newUsr,setNewUsr] = useState(newUser);

    const handleInput = (e)=>{
        const {name,value} = e.target;
        setNewUsr({...newUsr,[name]:value});
        console.log(newUsr);
        
    }

    useEffect(()=>{
        const findUser = async()=>{
            const res = await axios.get(`http://localhost:8000/api/getOne/${id}`);
            setNewUsr(res.data.userOne);
        }
        findUser();
    },[id])

    const updateUser = async(e)=>{
        e.preventDefault();
        try {
            const res = await axios.put(`http://localhost:8000/api/update/${id}`, newUsr);
            console.log(res);
            toast.success(res.data.msg,{position:'top-right',autoClose:3000});
            navigate("/");
        } catch (error) {
            console.log(error);    
        }
    }

  return (
    <VStack justifyContent={"center"} h={"100vh"}>
        <Button pos={"absolute"} left={"20px"} top={"20px"} colorScheme={"twitter"}>
            <Link to={"/"}>Show All Users</Link>
        </Button>
        <Box w={"50%"} borderRadius={"10px"} boxShadow={"1px 1px 20px gray"} p={"20px"}>
        <form onSubmit={updateUser}>        
        <FormControl >
            <FormLabel>First Name</FormLabel>
            <Input type='text' onChange={handleInput} value={newUsr.fname} placeholder='First Name' name='fname' id='fname'/>
            <FormLabel>Last Name</FormLabel>
            <Input type='text' onChange={handleInput} value={newUsr.lname} placeholder='Last Name' name='lname' id='lname'/>
            <FormLabel>Age</FormLabel>
            <Input type='number' onChange={handleInput} value={newUsr.age} name='age' id='age'placeholder='Your Age'/>
            <Button type='submit' mt={"10px"} alignSelf={"center"} w={"100%"} bgColor={"green.500"} >Update</Button>
        </FormControl>
        </form>
        </Box>
    </VStack>
  )
}

export default Update