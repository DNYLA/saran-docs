import {
  Box,
  chakra,
  Code,
  Collapse,
  Flex,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
export type CommandInfo = {
  name: string;
  description: string;
  aliases: string[];
  arguments: string[];
  example: string[];
};

interface CommandCardProps {
  command: CommandInfo;
}

export default function CommandCard({ command }: CommandCardProps) {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box
      w="full"
      maxW="sm"
      mx="auto"
      px={4}
      py={3}
      bg="white"
      _dark={{
        bg: 'gray.900',
      }}
      shadow="md"
      rounded="md"
      margin={3}
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        // onClick={() => setIsOpen(!isOpen)}
        onClick={onToggle}
        cursor={'pointer'}
      >
        <chakra.span
          fontSize="sm"
          color="gray.800"
          _dark={{
            color: 'gray.400',
          }}
        >
          {command.name}
        </chakra.span>
        <chakra.span
          color="brand.800"
          _dark={{
            color: 'brand.800',
          }}
          px={3}
          py={1}
          rounded="full"
          textTransform="uppercase"
          fontSize="xs"
        >
          {command.description}
        </chakra.span>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Box borderTop={'1px solid'} borderColor={'gray.700'}>
          {/* <chakra.h1
          fontSize="lg"
          fontWeight="bold"
          mt={2}
          color="gray.800"
          _dark={{
            color: 'white',
          }}
        >
          Bind your lastfm name to the bot.
        </chakra.h1> */}
          <chakra.p
            fontSize="sm"
            mt={2}
            color="gray.600"
            _dark={{
              color: 'gray.300',
            }}
          >
            Aliases: {command.aliases.length === 0 && <Code>none</Code>}
            {command.aliases.map((alias, i) => (
              <>
                <Code>{alias}</Code>
                {i !== command.aliases.length - 1 && ', '}
              </>
            ))}
          </chakra.p>
          <chakra.p
            fontSize="sm"
            mt={2}
            color="gray.600"
            _dark={{
              color: 'gray.300',
            }}
          >
            Arguments: {command.arguments.length === 0 && <Code>none</Code>}
            {command.arguments.map((arg, i) => {
              console.log(command.arguments.length);

              return (
                <>
                  <Code>{arg}</Code>
                  {i !== command.arguments.length - 1 && ' | '}
                </>
              );
            })}
          </chakra.p>
          <chakra.p
            fontSize="sm"
            mt={2}
            color="gray.600"
            _dark={{
              color: 'gray.300',
            }}
          >
            Example:{' '}
            {command.example.length === 0 && <Code>{command.name}</Code>}
            {command.example.map((example, i) => (
              <>
                <chakra.p marginY={2}>
                  <Code>{example}</Code>
                  {i !== command.aliases.length - 1 && '\n'}
                </chakra.p>
              </>
            ))}
          </chakra.p>
        </Box>
      </Collapse>
    </Box>
  );
}
