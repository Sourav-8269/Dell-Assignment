import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
//   import {store} from "../Redux/store"
  import axios from "axios"
//   import { useDispatch, useSelector } from 'react-redux';
// import { RegisterError, RegisterRequest, RegisterSuccess } from '../Redux/Auth/action';
import { useNavigate } from 'react-router-dom';
  
  export default function Register() {
    // const isAuth=useSelector((state)=>state.AuthReducer.token);
    // console.log(isAuth)
    // const dispatch=useDispatch();
    // console.log(store.getState())
    const [showPassword, setShowPassword] = useState(false);
    const [username,setuser]=useState("");
    const [email,setemail]=useState("");
    const [pass,setpass]=useState("");
    const navigate=useNavigate();
    
    const register=()=>{
        // console.log(username,email,pass)
        let payload={}
        if(username!=""){
            payload.username=username;
        }
        if(pass!=""){
            payload.password=pass;
        }
        if(email!=""){
            payload.email=email;
        }
        console.log(payload)
        // dispatch(RegisterRequest())
        axios.post(`https://mock-server-app-2-3le7.onrender.com/users`,payload)
        .then((res)=>{
            console.log(res)
            // dispatch(RegisterSuccess(res.data))
            alert("Register Success");
            navigate("/login")

        })
        // .catch((err)=>dispatch(RegisterError()))
        
    }
  
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
             Register for an account
            </Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>User Name</FormLabel>
                    <Input type="text" value={username} onChange={(e)=>setuser(e.target.value)} />
                  </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" value={email} onChange={(e)=>setemail(e.target.value)}/>
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} value={pass} onChange={(e)=>setpass(e.target.value)} />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                onClick={register}
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user? <Link color={'blue.400'}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }