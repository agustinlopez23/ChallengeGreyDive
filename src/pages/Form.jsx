import {
  Flex,
  Box,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Select,
  Checkbox,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { collection, addDoc, getCountFromServer } from "firebase/firestore";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/config";
import { formItems } from "../items/formItems";
export const Form = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  //Modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [count, setCount] = useState("");
  const toast = useToast();
  //Get items from form
  const { items } = formItems;
  //Form submit
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data, e) => {
    try {
      setIsLoading(true);
      e.preventDefault();
      //Firebase Db pushing data
      const docRef = await addDoc(collection(db, "registrations"), data);
      if (!docRef.id) return;
      const countRegistrations = async () => {
        const coll = collection(db, "registrations");
        const snapshot = await getCountFromServer(coll);
        await setCount(snapshot.data().count);
      };
      countRegistrations();
      onOpen();
      setIsLoading(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something is wrong",
        status: "error",
        duration: 9000,
        isClosable: true,
      });

      console.log(error);
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Completa la encuenta GreyDive
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Para registrarte en nuestra lista de Clientes ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4} alignItems="center">
            <form onSubmit={handleSubmit(onSubmit)}>
              {items.map((it, i) => (
                <Box key={i}>
                  {it.type === "checkbox" ? (
                    <>
                      <FormLabel>{it.label}</FormLabel>
                      <Checkbox
                        isRequired
                        name={it.name}
                        placeholder={it.placeholder}
                        {...register(it.name)}
                      ></Checkbox>
                    </>
                  ) : it.type === "select" ? (
                    <>
                      <FormLabel>{it.label}</FormLabel>
                      <Select
                        id="country"
                        name="country"
                        autoComplete="country"
                        placeholder="Selecciona un pais"
                        focusBorderColor="brand.400"
                        shadow="sm"
                        w="full"
                        rounded="md"
                        {...register(it.name)}
                      >
                        {it.options.map((opt) => (
                          <option value={opt.value} key={opt.value}>{opt.label}</option>
                        ))}
                      </Select>
                    </>
                  ) : it.label === "Enviar" ? (
                    <Button
                      type={it.type}
                      colorScheme="pink"
                      variant="outline"
                      isLoading={isLoading}
                    >
                      {it.label}
                    </Button>
                  ) : (
                    <>
                      <FormLabel>{it.label}</FormLabel>
                      <Input
                        placeholder={it.placeholder}
                        size="md"
                        type={it.type}
                        isRequired={it.required}
                        name={it.name}
                        {...register(it.name)}
                      />
                    </>
                  )}
                </Box>
              ))}
            </form>
          </Stack>
        </Box>
      </Stack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Gracias por Enviar el Formulario</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            "Sos el usuario numero {count} gracias por formar parte de GreyDive"
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="pink" mr={3} onClick={onClose}>
              Cerrar
            </Button>
            <Button variant="ghost" onClick={() => navigate("/responses")}>
              Ver todos los usuarios registrados
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
