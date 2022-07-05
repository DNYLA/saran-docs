import {
  Box,
  Center,
  Container,
  Flex,
  Icon,
  Image,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import Embed from '../components/Embed';
import EmbedForm from '../components/EmbedForm';

export default function Embeds() {
  const [details, setDetails] = useState({
    author: '{username}',
    authorIcon: '{fm_avatar}',
    authorUrl: 'https://www.last.fm/user/Jungaal',
    title: '',
    titleUrl: '',
    description: `{track_name} x{track_plays}
    by {artist_name} x{artist_plays}
    on {album_name} x{album_plays}`,
    thumbnail:
      'https://lastfm.freetls.fastly.net/i/u/300x300/b99fa4b5cf3a2cd7974ffd139c7250fc.jpg',
    footer:
      'Total Scrobbles: {total_scrobbles} ∙ Global Plays: {global_scrobbles}',
  });
  return (
    <>
      <Center m={5}>
        {/* <Container maxW={'md'}> */}
        {/* <Embed details={details} /> */}
        <EmbedForm details={details} setDetails={setDetails} />
        {/* </Container> */}
        {/* <EmbedForm details={details} setDetails={setDetails} /> */}
      </Center>
    </>
  );
}
