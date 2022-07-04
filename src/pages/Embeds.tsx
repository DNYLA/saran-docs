import { Box, Container, Flex, Icon, Image, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import Embed from '../components/Embed';

export default function Embeds() {
  const [details, setDetails] = useState({
    author: 'Jungaal',
    authorIcon:
      'https://images-ext-1.discordapp.net/external/Vjfy91yCG_Dgguk7VJkbk8mGz3B6WnR3a4Gi6Yh1eh0/https/lastfm.freetls.fastly.net/i/u/avatar170s/a7ff67ef791aaba0c0c97e9c8a97bf04.png',
    authorUrl: 'https://www.last.fm/user/Jungaal',
    title: '',
    titleUrl: '',
    description: `Prayers To The Trap God x739
    by Roddy Ricch x12265
    on Please Excuse Me for Being Antisocial x2447
    `,
    thumbnail:
      'https://lastfm.freetls.fastly.net/i/u/300x300/b99fa4b5cf3a2cd7974ffd139c7250fc.jpg',
  });
  return (
    <Container>
      Embeds
      <Embed details={details} />
    </Container>
  );
}
