import {
  Button,
  Spinner,
  Stack,
  StackDivider,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as rLink } from "react-router-dom";
import { SocialIcon } from "react-social-icons";
import { FetchingData } from "../hooks/Fetching";
export const DbResponse = () => {
  const [data, setData] = useState([]);

  FetchingData(data, setData, "registrations");
  return (
    <div>
      {data.length === 0 ? (
        <Stack
          h={"100vh"}
          alignItems={"center"}
          justifyContent="center"
          gap={5}
        >
          <Spinner />{" "}
          <Button as={rLink} to="/" colorScheme="pink">
            Atras
          </Button>
        </Stack>
      ) : (
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Clientes ya encuestados</TableCaption>
            <Thead>
              <Tr>
                <Th>Nombre Completo</Th>
                <Th>Email</Th>
                <Th>Fecha de Nacimiento</Th>
                <Th>Pais de Origen</Th>
              </Tr>
            </Thead>

            <Tbody>
              {data.map((d, i) => (
                <Tr key={i}>
                  <Td>{d.full_name}</Td>
                  <Td>{d.email}</Td>
                  <Td>{d.birth_date}</Td>
                  <Td>{d.country_of_origin}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
      <Stack alignItems="center">
        <Button as={rLink} to="/" colorScheme="pink">
          Atras
        </Button>
        <StackDivider />
      <Stack alignItems={"center"}>
        <SocialIcon
          style={{ width: "32px", height:"32px", margin: "5px" }}
          url="https://github.com/agustinlopez23/ChallengeGreyDive"
        />
      </Stack>
      </Stack>
    </div>
  );
};
