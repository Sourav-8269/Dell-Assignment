import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../Redux/Product/action";
import { store } from "../Redux/store";
import { Flex, Box, Image, SimpleGrid } from "@chakra-ui/react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { Link } from "react-router-dom";

function Rating({ rating, numReviews }) {
  return (
    <Box display="flex" alignItems="center">
      {Array(5)
        .fill("")
        .map((_, i) => {
          const roundedRating = Math.round(rating * 2) / 2;
          if (roundedRating - i >= 1) {
            return (
              <BsStarFill
                key={i}
                style={{ marginLeft: "1" }}
                color={i < rating ? "teal.500" : "gray.300"}
              />
            );
          }
          if (roundedRating - i === 0.5) {
            return <BsStarHalf key={i} style={{ marginLeft: "1" }} />;
          }
          return <BsStar key={i} style={{ marginLeft: "1" }} />;
        })}
      <Box as="span" ml="2" color="gray.600" fontSize="sm">
        {numReviews} review{numReviews > 1 && "s"}
      </Box>
    </Box>
  );
}

const Products = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((store) => store.UserReducer.token);
  const data = useSelector((store) => store.ProductReducer.data);
  console.log(store.getState());

  useEffect(() => {
    dispatch(getData(isAuth));
  }, []);

  return (
    <Box mt={["20%", "15%", "8%"]}>
      {/* Previous width={["60%","80%"]} for below Box */}
      <Box width="100%" m="auto" border={"1px solid red"}>
        <SimpleGrid
          minChildWidth="400px"
          spacing="20px"
          marginTop="30px"
          textAlign="center"
        >
          {data.length > 0 &&
            data.map((el) => (
              <Flex p={50} w="full" alignItems="center" justifyContent="center" key={el._id}>
                <Link to={`/products/${el._id}`}>
                  <Box
                    bg={"white"}
                    maxW="sm"
                    borderWidth="1px"
                    rounded="lg"
                    shadow="lg"
                    position="relative"
                  >
                    <Box
                      w="400px"
                      height="300px"
                      maxWidth="100%"
                      maxHeight="100%"
                    >
                      <Image
                        src={el.image}
                        alt={`Picture of ${data.name}`}
                        roundedTop="lg"
                      />
                    </Box>

                    <Box p="6">
                      <Flex
                        mt="1"
                        justifyContent="space-between"
                        alignContent="center"
                      >
                        <Box
                          fontSize="2xl"
                          fontWeight="semibold"
                          as="h4"
                          lineHeight="tight"
                          isTruncated
                        >
                          {el.title}
                        </Box>
                      </Flex>

                      <Flex
                        justifyContent="space-between"
                        alignContent="center"
                      >
                        <Rating rating={el.rating} numReviews={34} />
                        <Box fontSize="2xl" color="gray.800">
                          <Box as="span" color={"gray.600"} fontSize="lg">
                            ₹
                          </Box>
                            {" "+el.price}
                        </Box>
                      </Flex>
                    </Box>
                  </Box>
                </Link>
              </Flex>
            ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Products;
