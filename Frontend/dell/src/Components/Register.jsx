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
  import { useEffect, useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  import {store} from "../Redux/store"
  import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userRegister } from '../Redux/User/action';
  
  export default function Register() {
    const toast=useToast();
    const isAuth=useSelector((store)=>store.UserReducer.token);
    const dispatch=useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [username,setuser]=useState("");
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
        if(username!=""){
            payload.name=username;
        }
        if(pass!=""){
            payload.pass=pass;
        }
        if(email!=""){
            payload.email=email;
        }
        if (payload.name&&payload.pass&&payload.email) {
          dispatch(userRegister(payload)).then((res) => {
            if(res){
              toast({
                title: "User Registered",
                status: "success",
                duration: 2000,
                isClosable: true,
                position: "top",
              });
              navigate("/login")
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
                <Text align={'center'} onClick={()=>navigate("/login")}>
                  Already a user? <Link color={'blue.400'}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }