import {
    Box,
    chakra,
    Container,
    Stack,
    Text,
    Image,
    Flex,
    VStack,
    Button,
    Heading,
    SimpleGrid,
    StackDivider,
    useColorModeValue,
    VisuallyHidden,
    List,
    ListItem,
  } from '@chakra-ui/react';
  import { MdLocalShipping } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {store} from "./../Redux/store"
import { useEffect } from 'react';
import { getSingleData } from '../Redux/Product/action';
  
  function SingleProduct() {
    const params = useParams();
    const dispatch=useDispatch();
    // console.log(params.id)
    const isAuth = useSelector((store) => store.UserReducer.token);
    const data = useSelector((store) => store.ProductReducer.data);
    console.log(data)

    useEffect(() => {
      dispatch(getSingleData(isAuth,params.id));
    }, []);

    return (
      <Container maxW={'7xl'}>
        {data&&<SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 24 }}>
          <Flex>
            <Image
              rounded={'md'}
              alt={'product image'}
              src={data.image}
              fit={'cover'}
              align={'center'}
              w={'100%'}
              h={{ base: '100%', sm: '400px', lg: '500px' }}
            />
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={'header'}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                {data.title}
              </Heading>
              <Text
                color={'gray.900'}
                fontWeight={300}
                fontSize={'2xl'}>
                ₹ {data.price}
              </Text>
            </Box>
  
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={'column'}
              divider={
                <StackDivider
                  borderColor={'gray.200'}
                />
              }>
              <VStack spacing={{ base: 4, sm: 6 }}>
                <Text
                  color={'gray.500'}
                  fontSize={'2xl'}
                  fontWeight={'300'}>
                  Category: {data.category}
                </Text>
                <Text fontSize={'lg'}>
                  {data.description}
                </Text>
              </VStack>
              <Box>
                <Text
                  fontSize={{ base: '16px', lg: '18px' }}
                  color={'yellow.500'}
                  fontWeight={'500'}
                  textTransform={'uppercase'}
                  mb={'4'}>
                  Product Details
                </Text>
  
                <List spacing={2}>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      Processor:
                    </Text>{' '}
                    {data.processor}
                  </ListItem>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      Display:
                    </Text>{' '}
                      {data.display}
                  </ListItem>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      Memory:
                    </Text>{' '}
                      {data.memory}
                  </ListItem>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      Storage:
                    </Text>{' '}
                      {data.storage}
                  </ListItem>
                </List>
              </Box>
            </Stack>
  
            <Button
              rounded={'none'}
              w={'full'}
              mt={8}
              size={'lg'}
              py={'7'}
              bg={'gray.900'}
              color={"white"}
              textTransform={'uppercase'}
              _hover={{
                transform: 'translateY(2px)',
                boxShadow: 'lg',
              }}>
              Go to Home
            </Button>
  
            <Stack direction="row" alignItems="center" justifyContent={'center'}>
              <MdLocalShipping />
              <Text>2-3 business days delivery</Text>
            </Stack>
          </Stack>
        </SimpleGrid>}
      </Container>
    );
  }
  export default SingleProduct;