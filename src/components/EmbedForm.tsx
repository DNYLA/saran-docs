import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  chakra,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  GridItem,
  Input,
  SimpleGrid,
  Stack,
  Textarea,
  Tbody,
  Table,
  Td,
  Th,
  Thead,
  Tr,
  IconButton,
  Checkbox,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import Embed, { EmbedDetails, EmbedFieldData } from './Embed';

interface EmbedFormProps {
  details: EmbedDetails;
  setDetails: (value: EmbedDetails) => void;
}
function clean(object: object) {
  Object.entries(object).forEach(([key, v]) => {
    const k = key as keyof typeof object;
    if (v && typeof v === 'object') {
      clean(v);
    }

    if (
      (v && typeof v === 'object' && !Object.keys(v).length) ||
      v === null ||
      v === undefined ||
      v === '' ||
      (v instanceof Array && v.length === 0)
    ) {
      if (Array.isArray(object)) {
        object.splice(k, 1);
      } else {
        delete object[k];
      }
    }
  });
  return object;
}

export default function EmbedForm({ details, setDetails }: EmbedFormProps) {
  // const copyClipboard = () => {
  //   navigator.clipboard.writeText()
  // };

  const generateEmbed = () => {
    let _details: Partial<EmbedDetails> = { ...details };

    // let k: keyof typeof details;

    // const deleteKeys = (obj: object) => {
    //   Object.keys(obj).forEach((key) => {
    //     const k = key as keyof typeof obj;
    //     if (!obj[k]) {
    //       delete obj[k];
    //     } else if (typeof obj[k] === 'object') {
    //       deleteKeys(obj[k]);
    //     }
    //   });
    // };

    const deleteKeys = (obj: object) => {
      const newObject: object = { ...obj };
      Object.keys(newObject).forEach((key) => {
        const k = key as keyof typeof obj;
        if (!newObject[k]) {
          delete newObject[k];
        } else if (typeof newObject[k] === 'object') {
          Object.keys(newObject[k]).forEach((key2) => {
            const k2 = key2 as keyof typeof obj;
            if (!newObject[k][k2]) {
              delete newObject[k][k2];
            }
          });
        }
      });

      return newObject;
    };

    // _details = deleteKeys(_details) as Partial<EmbedDetails>;
    clean(_details);

    if (
      _details.author &&
      !_details.author?.name &&
      !_details.author.iconURL &&
      !_details.author.url
    ) {
      _details.author = undefined;
    }

    if (_details.footer && !_details.footer.text && !_details.footer.iconURL) {
      _details.footer = undefined;
    }

    const json = JSON.stringify(_details, null, 2);
    let errorMsg: string = '';

    if ((details.author.iconURL || details.author.url) && !details.author.name)
      errorMsg = 'Error: no author name provided\n';
    if (details.footer.iconURL && !details.footer.text) {
      errorMsg += 'Error: no footer text set\n';
    }

    if (details.fields && details.fields.length > 0) {
      details.fields.forEach((field, i) => {
        if (!field.name && !field.value) {
          errorMsg += `Error: Field ${i} can't have an empty name or value.\n`;
        } else if (!field.name) {
          errorMsg += `Error: Field ${i} can't have an empty name.\n`;
        } else if (!field.value) {
          errorMsg += `Error: Field ${i} can't have an value name.\n`;
        }
      });
    }

    // console.log(JSON.parse())
    return <pre>{!errorMsg ? json : errorMsg}</pre>;
  };

  const editFields = (value: string | boolean, key: string, index: number) => {
    const _details = { ...details };
    if (!_details.fields) return;
    if (index > _details.fields.length - 1) return;

    if (typeof value === 'boolean' && key === 'inline') {
      _details.fields[index].inline = value;
    }

    if (key === 'name' && typeof value === 'string') {
      _details.fields[index].name = value;
    } else if (key === 'value' && typeof value === 'string') {
      _details.fields[index].value = value;
    }

    setDetails(_details);
  };

  const toggleInline = (index: number) => {
    const _details = { ...details };
    if (!_details.fields) return;
    if (index > _details.fields.length - 1) return;
    _details.fields[index].inline = !_details.fields[index].inline;
    setDetails(_details);
  };

  const removeField = (index: number) => {
    const _details = { ...details };
    if (!_details.fields) return;
    if (index > _details.fields.length - 1) return;

    _details.fields.splice(index, 1);
    setDetails(_details);
  };

  const addField = () => {
    const _details = { ...details };
    const newField: EmbedFieldData = { name: '', value: '', inline: false };
    if (!_details.fields) {
      _details.fields = [newField];
    } else _details.fields.push(newField);

    setDetails(_details);
  };

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
                      value={details.author.name}
                      onChange={(e) => {
                        setDetails({
                          ...details,
                          author: {
                            ...details.author,
                            name: e.target.value,
                          },
                        });
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
                      value={details.author.iconURL}
                      onChange={(e) => {
                        setDetails({
                          ...details,
                          author: {
                            ...details.author,
                            iconURL: e.target.value,
                          },
                        });
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
                      value={details.author.url}
                      onChange={(e) => {
                        setDetails({
                          ...details,
                          author: { ...details.author, url: e.target.value },
                        });
                      }}
                    />
                  </FormControl>
                  <FormControl as={GridItem} colSpan={[6, 3]}>
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
                  <FormControl as={GridItem} colSpan={[6, 3]}>
                    <FormLabel
                      htmlFor="email_address"
                      fontSize="sm"
                      fontWeight="md"
                      color="gray.700"
                      _dark={{
                        color: 'gray.50',
                      }}
                    >
                      URL
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
                      value={details.url}
                      onChange={(e) => {
                        setDetails({ ...details, url: e.target.value });
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
                    <FormHelperText>
                      Discord markdown syntax is supported (
                      {'**Text** -> Bold\n, `Text` -> Code Block, etc'}) but
                      will not be show in the embed below.
                    </FormHelperText>
                  </FormControl>
                  <FormControl as={GridItem} colSpan={[6, 6]}>
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
                  </FormControl>
                  <FormControl as={GridItem} colSpan={[6, 6]}>
                    <FormLabel
                      htmlFor="street_address"
                      fontSize="sm"
                      fontWeight="md"
                      color="gray.700"
                      _dark={{
                        color: 'gray.50',
                      }}
                    >
                      Fields
                    </FormLabel>
                    <Button onClick={addField}>Add Field</Button>
                    {details.fields && details.fields.length > 0 && (
                      <FormHelperText>
                        Inlined fields won't be displayed on the embed below but
                        will be shown in discord.
                      </FormHelperText>
                    )}
                  </FormControl>
                  {details.fields &&
                    details.fields.map((field, i) => (
                      <>
                        <FormControl as={GridItem} colSpan={[6, 2]} key={i}>
                          <FormLabel
                            htmlFor="street_address"
                            fontSize="sm"
                            fontWeight="md"
                            color="gray.700"
                            _dark={{
                              color: 'gray.50',
                            }}
                          >
                            Name
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
                            value={field.name}
                            onChange={(e) =>
                              editFields(e.target.value, 'name', i)
                            }
                          />
                        </FormControl>
                        <FormControl as={GridItem} colSpan={[6, 2]}>
                          <FormLabel
                            htmlFor="street_address"
                            fontSize="sm"
                            fontWeight="md"
                            color="gray.700"
                            _dark={{
                              color: 'gray.50',
                            }}
                          >
                            Value
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
                            value={field.value}
                            onChange={(e) =>
                              editFields(e.target.value, 'value', i)
                            }
                          />
                        </FormControl>
                        <FormControl as={GridItem} colSpan={[6, 1]}>
                          <FormLabel
                            htmlFor="street_address"
                            fontSize="sm"
                            fontWeight="md"
                            color="gray.700"
                            _dark={{
                              color: 'gray.50',
                            }}
                          >
                            Inline
                          </FormLabel>
                          <Checkbox
                            isChecked={field.inline}
                            onChange={() => toggleInline(i)}
                          />
                        </FormControl>
                        <FormControl as={GridItem} colSpan={[6, 1]}>
                          <FormLabel
                            htmlFor="street_address"
                            fontSize="sm"
                            fontWeight="md"
                            color="gray.700"
                            _dark={{
                              color: 'gray.50',
                            }}
                          >
                            Remove
                          </FormLabel>
                          <IconButton
                            aria-label="Add to friends"
                            icon={<MinusIcon />}
                            onClick={() => removeField(i)}
                          />
                        </FormControl>
                      </>
                    ))}
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
                      value={details.footer.text}
                      onChange={(e) => {
                        setDetails({
                          ...details,
                          footer: { ...details.footer, text: e.target.value },
                        });
                      }}
                    />
                    {/* <FormHelperText>
                      Brief description for your profile. URLs are hyperlinked.
                    </FormHelperText> */}
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
                      Footer Icon
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
                      value={details.footer.iconURL}
                      onChange={(e) => {
                        setDetails({
                          ...details,
                          footer: {
                            ...details.footer,
                            iconURL: e.target.value,
                          },
                        });
                      }}
                    />
                    <FormHelperText>
                      Currently not displayed in the embed below.
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
                      Image URL
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
                      value={details.image}
                      onChange={(e) => {
                        setDetails({
                          ...details,
                          image: e.target.value,
                        });
                      }}
                    />
                    <FormHelperText>
                      Currently not displayed in the embed below.
                    </FormHelperText>
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
                  colorScheme={'whiteAlpha'}
                  _focus={{
                    shadow: '',
                  }}
                  color={'white'}
                  isDisabled={true}
                >
                  Copy
                </Button>
              </Box>
            </chakra.form>
          </GridItem>
        </SimpleGrid>
        {/* <SimpleGrid
          display={{
            base: 'initial',
            md: 'grid',
          }}
          columns={{
            md: 4,
          }}
          spacing={{
            md: 6,
          }}
        > */}
        <Box
          mt="25"
          padding={'.75rem 1rem'}
          borderRadius={'4px'}
          // borderLeft={'4px solid red'}
          bgColor={'#2f3136'}
          position={'relative'}
          display={'grid'}
          // maxW={520}
        >
          {generateEmbed()}
        </Box>
        {/* </SimpleGrid> */}
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
      description: 'Displays current discord users display name',
    },
    {
      name: 'fm_username',
      description: 'Displays the current users last.fm name',
    },
    {
      name: 'fm_link',
      description: 'Creates a link to the current users last.fm page.',
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
      name: 'track_image',
      description: 'Current tracks cover.',
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
  // const color1 = useColorModeValue('gray.400', 'gray.400');
  // const color2 = useColorModeValue('gray.400', 'gray.400');

  return (
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
  );
}
