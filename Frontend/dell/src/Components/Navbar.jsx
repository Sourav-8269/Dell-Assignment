import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  Center,
  useToast,
  Input,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useEffect,useState } from 'react';
import {useThrottle} from "use-throttle"
import { searchData } from '../Redux/Product/action';
import { useDispatch, useSelector } from 'react-redux';

export default function Navbar() {
  const isAuth = useSelector((store) => store.UserReducer.token);
  const toast=useToast();
  const navigate=useNavigate();
  const [input,setInput]=useState("");
  const throttleText=useThrottle(input,1000);
  const dispatch=useDispatch();


  useEffect(() => {
    dispatch(searchData(isAuth,throttleText));
 }, [throttleText,]);

  const handleLogout=()=>{
    localStorage.removeItem("dellUser");
    toast({
        position: "top",
        title: "Come back Soon!",
        description: "Logout Success",
        status: "info",
        duration: 2000,
        isClosable: true,
      });
      window.location.reload()
  }
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} width="100%" position="fixed" overflow="visible" top="0" zIndex="1" >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box onClick={()=>navigate("/home")} cursor="pointer" fontSize={["20px","30px"]} >Home</Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Input placeholder='Search Product' value={input}
            onChange={(e)=>setInput(e.target.value)}
            boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
            />

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>User</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem onClick={()=>handleLogout()}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}