import {
    Stack, HStack, Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Box,
    Button,
    VStack
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdDelete } from 'react-icons/md'
import { HiPencilAlt } from "react-icons/hi";
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from './Loader/Loader';
const Home = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [loader,setLoader] = useState(true);
    const navigate = useNavigate();
    const baseUrl = import.meta.env.VITE_NODE_ENV === 'production' ? import.meta.env.VITE_PROD_BASE_URL:import.meta.env.VITE_DEV_BASE_URL;
    useEffect(() => {
        const fetchUsers = async () => {
            const res = await axios.get(`${baseUrl}/api/getAll`);
            setLoader(false);
            setAllUsers(res.data.allUsers);
        }
        fetchUsers();
    }, []);

    const deleteUser = async(userId)=>{
        try {
            setLoader(true);
            await axios.delete(`${baseUrl}/api/delete/${userId}`);
            setLoader(false);
            toast.success("User deleted SuccessFully",{position:'top-right',autoClose:3000});
            setAllUsers((prevUser)=>prevUser.filter((user)=> user._id !== userId));
            navigate("/");
        } catch (error) {
            console.log(error);
            
        }
    }

    return (
        <VStack p={"10px"}h={"100vh"} justifyContent={"center"}>
            <Button colorScheme={"twitter"}>
                <Link to={"/create"} >Create A User</Link>
            </Button>
            {
                loader?<Loader/>:<Box cursor={"pointer"} w={{ base: "100%", md: "max-content" }}
                                        overflowX={"auto"} 
                                        p="4"
                                        borderRadius="md" 
                                        transform="translateY(-2px)" 
                                        transition="all 0.2s ease-in-out" 
                                        _hover={{ transform: "translateY(0) scale(1.02)",  boxShadow: "lg"  }} boxShadow="0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 6px rgba(0, 0, 0, 0.3)" >
                <TableContainer >
                    <Table variant='simple'>
                        <TableCaption>All users</TableCaption>
                        <Thead>
                            <Tr>
                                <Th isNumeric>No</Th>
                                <Th>Name</Th>
                                <Th>Lame</Th>
                                <Th>Email</Th>
                                <Th>Age</Th>
                                <Th>Delete</Th>
                                <Th>Update</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                allUsers.map((user, index) => {
                                    return (
                                        <Tr key={user._id}>
                                            <Td isNumeric>{index+1}</Td>
                                            <Td>{user.fname}</Td>
                                            <Td>{user.lname}</Td>
                                            <Td>{user.email}</Td>
                                            <Td>{user.age}</Td>
                                            <Td onClick={()=>deleteUser(user._id)} style={{ cursor: "pointer" }}><MdDelete color='red' size={"20px"} /></Td>
                                            <Td style={{ cursor: "pointer" }}><Link to={`/update/`+user._id}><HiPencilAlt color='green' size={"20px"} /></Link></Td>
                                        </Tr>
                                    )
                                })
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
            }
            

        </VStack>
    )
}

export default Home