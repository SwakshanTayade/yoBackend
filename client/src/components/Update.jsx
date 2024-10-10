import { Box, Button, FormControl, FormHelperText, FormLabel, HStack, Input, Text, VStack } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
const Update = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const [loader,setLoader] = useState(true);
    const baseUrl = import.meta.env.VITE_NODE_ENV === 'production' ? import.meta.env.VITE_PROD_BASE_URL:import.meta.env.VITE_DEV_BASE_URL;
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
            const res = await axios.get(`${baseUrl}/api/getOne/${id}`);
            setLoader(false);
            setNewUsr(res.data.userOne);
        }
        findUser();
    },[id])

    const updateUser = async(e)=>{
        e.preventDefault();
        try {
            setLoader(true);
            const res = await axios.put(`${baseUrl}/api/update/${id}`, newUsr);
            setLoader(false);
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
        <Box border={"2px solid white"} cursor={"pointer"} w={{ base: "100%", md: "max-content" }}
                                        overflowX={"auto"} 
                                        p="4"
                                        borderRadius="md" 
                                        transform="translateY(-2px)" 
                                        transition="all 0.2s ease-in-out" 
                                        _hover={{ transform: "translateY(0) scale(1.02)",  boxShadow: "lg"  }} boxShadow="0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 6px rgba(0, 0, 0, 0.3)">
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