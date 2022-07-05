import { Grid, VStack, Code, Text, Box } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { Logo } from '../Logo';

export default function Home() {
  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
          <Logo h="40vmin" pointerEvents="none" />
          <Text>
            <Code fontSize="xl">Saran Bot</Code> home page. (Work In Progress)
          </Text>
          <Link color="teal.500" to="/commands">
            Commands
          </Link>
          <Link color="teal.500" to="/">
            Docs
          </Link>
          <Link color="teal.500" to="/embeds">
            Embeds
          </Link>
          <a
            color="teal.500"
            target={'_blank'}
            rel={'noreferrer'}
            href="https://discord.com/api/oauth2/authorize?client_id=987090969038061608&permissions=8&scope=bot"
          >
            Invite
          </a>
          <Link color="teal.500" to="/">
            Discord
          </Link>
        </VStack>
      </Grid>
    </Box>
  );
}
