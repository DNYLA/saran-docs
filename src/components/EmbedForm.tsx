import {
  Avatar,
  Box,
  Button,
  chakra,
  Text,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  GridItem,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  Radio,
  RadioGroup,
  Select,
  SimpleGrid,
  Stack,
  Textarea,
  VisuallyHidden,
  Center,
  Tbody,
  ButtonGroup,
  IconButton,
  Table,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { FaUser } from 'react-icons/fa';
import Embed, { EmbedDetails } from './Embed';

interface EmbedFormProps {
  details: EmbedDetails;
  setDetails: (value: EmbedDetails) => void;
}

export default function EmbedForm({ details, setDetails }: EmbedFormProps) {
  return (
    <Box
      bg="#edf3f8"
      _dark={{
        bg: '#111',
      }}
      p={10}
    >
      <Box mt={[10, 0]}>
        <SimpleGrid
          display={{
            base: 'initial',
            md: 'grid',
          }}
          columns={{
            md: 5,
          }}
          spacing={{
            md: 6,
          }}
        >
          {/* <GridItem
            mt={[5, null, 0]}
            colSpan={{
              md: 2,
            }}
          >
            <Embed details={details} />
          </GridItem> */}

          <GridItem
            mt={[5, null, 0]}
            colSpan={{
              md: 3,
            }}
          >
            <chakra.form
              rounded={[null, 'md']}
              overflow={{
                sm: 'hidden',
              }}
            >
              <Stack
                px={4}
                py={5}
                p={[null, 6]}
                bg="white"
                _dark={{
                  bg: '#141517',
                }}
                spacing={6}
              >
                <SimpleGrid columns={6} spacing={6}>
                  <FormControl as={GridItem} colSpan={[6, 2]}>
                    <FormLabel
                      htmlFor="first_name"
                      fontSize="sm"
                      fontWeight="md"
                      color="gray.700"
                      _dark={{
                        color: 'gray.50',
                      }}
                    >
                      Author Name
                    </FormLabel>
                    <Input
                      type="text"
                      name="first_name"
                      id="first_name"
                      autoComplete="given-name"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      value={details.author}
                      onChange={(e) => {
                        setDetails({ ...details, author: e.target.value });
                      }}
                    />
                  </FormControl>
                  <FormControl as={GridItem} colSpan={[6, 2]}>
                    <FormLabel
                      htmlFor="last_name"
                      fontSize="sm"
                      fontWeight="md"
                      color="gray.700"
                      _dark={{
                        color: 'gray.50',
                      }}
                    >
                      Author Icon
                    </FormLabel>
                    <Input
                      type="text"
                      name="last_name"
                      id="last_name"
                      autoComplete="family-name"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      value={details.authorIcon}
                      onChange={(e) => {
                        setDetails({ ...details, authorIcon: e.target.value });
                      }}
                    />
                  </FormControl>
                  <FormControl as={GridItem} colSpan={[6, 2]}>
                    <FormLabel
                      htmlFor="last_name"
                      fontSize="sm"
                      fontWeight="md"
                      color="gray.700"
                      _dark={{
                        color: 'gray.50',
                      }}
                    >
                      Author URL
                    </FormLabel>
                    <Input
                      type="text"
                      name="last_name"
                      id="last_name"
                      autoComplete="family-name"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      value={details.authorUrl}
                      onChange={(e) => {
                        setDetails({ ...details, authorUrl: e.target.value });
                      }}
                    />
                  </FormControl>
                  <FormControl as={GridItem} colSpan={[6, 4]}>
                    <FormLabel
                      htmlFor="email_address"
                      fontSize="sm"
                      fontWeight="md"
                      color="gray.700"
                      _dark={{
                        color: 'gray.50',
                      }}
                    >
                      Title
                    </FormLabel>
                    <Input
                      type="text"
                      name="email_address"
                      id="email_address"
                      autoComplete="email"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      value={details.title}
                      onChange={(e) => {
                        setDetails({ ...details, title: e.target.value });
                      }}
                    />
                  </FormControl>
                  <FormControl as={GridItem} colSpan={[6, 6]}>
                    <FormLabel
                      htmlFor="country"
                      fontSize="sm"
                      fontWeight="md"
                      color="gray.700"
                      _dark={{
                        color: 'gray.50',
                      }}
                    >
                      Description
                    </FormLabel>
                    <Textarea
                      placeholder=""
                      mt={1}
                      rows={3}
                      shadow="sm"
                      focusBorderColor="brand.400"
                      fontSize={{
                        sm: 'sm',
                      }}
                      value={details.description}
                      onChange={(e) => {
                        setDetails({ ...details, description: e.target.value });
                      }}
                    />
                    {/* <FormHelperText>
                      Brief description for your profile. URLs are hyperlinked.
                    </FormHelperText> */}
                  </FormControl>
                  <FormControl as={GridItem} colSpan={6}>
                    <FormLabel
                      htmlFor="street_address"
                      fontSize="sm"
                      fontWeight="md"
                      color="gray.700"
                      _dark={{
                        color: 'gray.50',
                      }}
                    >
                      Thumbnail
                    </FormLabel>
                    <Input
                      type="text"
                      name="street_address"
                      id="street_address"
                      autoComplete="street-address"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      value={details.thumbnail}
                      onChange={(e) => {
                        setDetails({ ...details, thumbnail: e.target.value });
                      }}
                    />
                    <FormHelperText>
                      Currently only URLS are accepted
                    </FormHelperText>
                  </FormControl>
                  <FormControl as={GridItem} colSpan={[6, 6]}>
                    <FormLabel
                      htmlFor="country"
                      fontSize="sm"
                      fontWeight="md"
                      color="gray.700"
                      _dark={{
                        color: 'gray.50',
                      }}
                    >
                      Footer
                    </FormLabel>
                    <Input
                      type="text"
                      name="street_address"
                      id="street_address"
                      autoComplete="street-address"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      value={details.footer}
                      onChange={(e) => {
                        setDetails({ ...details, footer: e.target.value });
                      }}
                    />
                    {/* <FormHelperText>
                      Brief description for your profile. URLs are hyperlinked.
                    </FormHelperText> */}
                  </FormControl>
                  <GridItem colSpan={[3, 6]}>
                    <Embed details={details} />
                  </GridItem>
                </SimpleGrid>
              </Stack>
              {/* <GridItem colSpan={[3, 6]}>
                <Embed details={details} />
              </GridItem> */}
              <Box
                px={{
                  base: 4,
                  sm: 6,
                }}
                py={3}
                bg="gray.50"
                _dark={{
                  bg: '#121212',
                }}
                textAlign="right"
              >
                <Button
                  type="submit"
                  colorScheme="brand"
                  _focus={{
                    shadow: '',
                  }}
                  fontWeight="md"
                >
                  Save
                </Button>
              </Box>
            </chakra.form>
          </GridItem>
        </SimpleGrid>
      </Box>

      <Divider
        my="5"
        borderColor="gray.300"
        _dark={{
          borderColor: 'whiteAlpha.300',
        }}
        visibility={{
          base: 'hidden',
          sm: 'visible',
        }}
      />

      <VariableTable />
    </Box>
  );
}

type VariableRow = {
  name: string;
  description: string;
};

function VariableTable() {
  const header = ['Variable Name', 'Description'];
  const data: VariableRow[] = [
    {
      name: 'username',
      description: 'Displays the current users last.fm name',
    },
    {
      name: 'fm_avatar',
      description: 'Last.fm users avatar url',
    },
    {
      name: 'track_name',
      description: 'Current track name',
    },
    {
      name: 'track_plays',
      description: 'Users total plays for current track playing.',
    },
    {
      name: 'artist_name',
      description: 'Current tracks primary artist name',
    },
    {
      name: 'artist_plays',
      description: 'Users total plays for current artist playing.',
    },
    {
      name: 'album_name',
      description: 'Current playing album name',
    },
    {
      name: 'album_plays',
      description: 'Users total plays for current album playing.',
    },
    {
      name: 'total_scrobbles',
      description: 'Total scrobbles for current user.',
    },
    {
      name: 'global_scrobbles',
      description: 'Global scrobbles for current track playing.',
    },
  ];
  const color1 = useColorModeValue('gray.400', 'gray.400');
  const color2 = useColorModeValue('gray.400', 'gray.400');

  return (
    <Flex
      w="full"
      bg="#edf3f8"
      _dark={{
        bg: '#3e3e3e',
      }}
      p={50}
      alignItems="center"
      justifyContent="center"
    >
      <Table
        w="full"
        bg="white"
        _dark={{
          bg: 'gray.800',
        }}
        display={{
          base: 'block',
          md: 'table',
        }}
        sx={{
          '@media print': {
            display: 'table',
          },
        }}
      >
        <Thead
          display={{
            base: 'none',
            md: 'table-header-group',
          }}
          sx={{
            '@media print': {
              display: 'table-header-group',
            },
          }}
        >
          <Tr>
            {header.map((x) => (
              <Th key={x}>{x}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody
          display={{
            base: 'block',
            lg: 'table-row-group',
          }}
          sx={{
            '@media print': {
              display: 'table-row-group',
            },
          }}
        >
          {data.map((curItem: VariableRow, index) => {
            return (
              <Tr
                bgColor={index % 2 === 0 ? 'gray.800' : 'gray.700'}
                key={curItem.name}
                display={{
                  base: 'grid',
                  md: 'table-row',
                }}
                sx={{
                  '@media print': {
                    display: 'table-row',
                  },
                  gridTemplateColumns: 'minmax(0px, 35%) minmax(0px, 65%)',
                  gridGap: '10px',
                }}
              >
                {Object.keys(curItem).map((x, i) => {
                  console.log(x);
                  return (
                    <React.Fragment key={`${i}${x}`}>
                      <Td
                        fontSize="md"
                        fontWeight="hairline"
                        color={i % 2 === 0 ? 'gray.200' : 'gray.400'}
                      >
                        {x === 'name' && '{'}
                        {curItem[x as keyof VariableRow]}
                        {x === 'name' && '}'}
                      </Td>
                    </React.Fragment>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Flex>
  );
}
