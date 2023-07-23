import { ReactNode } from 'react';
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
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  useToast,
  Input,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useEffect,useState } from 'react';
import {useThrottle} from "use-throttle"
import { searchData } from '../Redux/Product/action';
import { useDispatch, useSelector } from 'react-redux';

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
    {children}
  </Link>
);

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
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
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box>Home</Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              {/* <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button> */}
              <Input placeholder='Search Product' value={input}
            onChange={(e)=>setInput(e.target.value)}
            //   bg="#3f49c026"
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