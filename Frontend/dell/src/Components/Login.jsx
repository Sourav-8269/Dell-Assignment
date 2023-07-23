import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {store} from "../Redux/store"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../Redux/User/action';
import { useEffect } from 'react';

export default function Login() {
  const toast=useToast();
  const isAuth=useSelector((store)=>store.UserReducer.token);
  const dispatch=useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [email,setemail]=useState("");
  const [pass,setpass]=useState("");
  const navigate=useNavigate();

 useEffect(()=>{
  if(isAuth){
    navigate("/home")
  }
 },[])

  
  const register=()=>{
      // console.log(username,email,pass)
      let payload={}
      if(pass!=""){
          payload.pass=pass;
      }
      if(email!=""){
          payload.email=email;
      }
      if (payload.pass&&payload.email) {
        dispatch(userLogin(payload)).then((res) => {
          if(res){
            toast({
              title: "Login Success",
              status: "success",
              duration: 2000,
              isClosable: true,
              position: "top",
            });
            navigate("/home")
          }else{
            toast({
              title: "Something went wrong!",
              status: "warning",
              duration: 2000,
              isClosable: true,
              position: "top",
            });
          }
        });
      }else {
      toast({
        position: "top",
        title: "Empty field",
        description: "Please fill all the details.",
        status: "info",
        duration: 2000,
        isClosable: true,
      });
    } 
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
      mt={["50px","60px"]}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
           Sign in to your account
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
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
            <Stack spacing={10}>
              <Button
              onClick={register}
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}