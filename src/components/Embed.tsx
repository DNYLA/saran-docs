import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { ObjectType } from 'typescript';

export type EmbedDetails = {
  author: string;
  authorIcon: string;
  authorUrl: string;
  title: string;
  titleUrl: string;
  description: string;
  thumbnail: string;
  footer: string;
};
interface EmbedProps {
  details: EmbedDetails;
}

export type VariableTypes = {
  username: string;
  fm_avatar: string;
  track_name: string;
  track_plays: string;
  artist_name: string;
  artist_plays: string;
  album_name: string;
  album_plays: string;
  total_scrobbles: string;
  global_scrobbles: string;
};

export default function Embed({ details }: EmbedProps) {
  const parseText = (text: string) => {
    // const reg = '/(?<=*)(.*?)(?=*)/';
    // const results = Array.from(
    //   text.matchAll(/(?<=\*)(.*?)(?=\*)/g),
    //   (x) => x[1]
    // );
    const results = Array.from(text.matchAll(/(?<=\*)(.*?)(?=\*)/g), (x) => {
      return { value: x[1], index: x['index'] };
    });

    for (let i = 0; i < results.length; i++) {
      const item = results[i];
    }

    console.log(results);
    return text;
  };

  const json: VariableTypes = {
    username: 'Jungaal',
    fm_avatar:
      'https://images-ext-1.discordapp.net/external/Vjfy91yCG_Dgguk7VJkbk8mGz3B6WnR3a4Gi6Yh1eh0/https/lastfm.freetls.fastly.net/i/u/avatar170s/a7ff67ef791aaba0c0c97e9c8a97bf04.png',
    track_name: 'Prayers To The Trap God',
    track_plays: '739',
    artist_name: 'Roddy Ricch',
    artist_plays: '12265',
    album_name: 'Please Excuse Me for Being Antisocial',
    album_plays: '2447',
    total_scrobbles: '81434',
    global_scrobbles: '55,421',
  };

  const parseVariables = (text: string) => {
    for (const key of Object.keys(json)) {
      text = text.replace('{' + key + '}', json[key as keyof VariableTypes]);
    }

    return (text = text.replace('{username}', json.username));
  };

  return (
    <Box
      mt="25"
      padding={'.5rem 1rem 1rem .75rem'}
      borderRadius={'4px'}
      borderLeft={'4px solid red'}
      bgColor={'#2f3136'}
      position={'relative'}
      display={'grid'}
      maxW={520}
    >
      {/* Author */}
      {(details.author || details.authorIcon) && (
        <Flex mt={'8px'} as="a" href={details.authorUrl} target={'_blank'}>
          <Image
            width={'24px'}
            height={'24px'}
            mr={'8px'}
            borderRadius={'full'}
            src={
              details.authorIcon === '{fm_avatar}'
                ? json.fm_avatar
                : details.authorIcon
            }
            boxSizing={'border-box'}
            fallbackSrc={
              'https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg'
            }
          />
          <Text fontSize={'0.875rem'} fontWeight={'600'}>
            {parseVariables(details.author)}
          </Text>
        </Flex>
      )}
      {/* Title */}
      <Box mt={'8px'}>
        <Text
          as="a"
          color={'#00aff5'}
          cursor={'pointer'}
          fontSize={'1rem'}
          fontWeight={'600'}
          href={details.titleUrl}
          target={'_blank'}
        >
          {parseVariables(details.title)}
        </Text>
      </Box>

      {/* Description */}
      <Box
        mt={'8px'}
        minW={0}
        fontSize={'0.875rem'}
        lineHeight={'1.125rem'}
        fontWeight={'400'}
        whiteSpace={'pre-line'}
      >
        {/* {parseText(details.description)} */}
        {parseVariables(details.description)}

        {/* <Text whiteSpace={'break-spaces'}>{details.description}</Text> */}
        {/* {details.description.replace(' ', '&nbsp')} */}
        {/* <Text as="b">Prayers To The Trap God</Text> x739{'\n'}
    by <Text as="b">Roddy Ricch</Text> x12265{'\n'}
    on <Text as="b">Please Excuse Me for Being Antisocial</Text> x2447 */}
      </Box>

      {/* Fields */}
      {/* <Box>Fields</Box> */}

      {/* Thumbnails */}
      {details.thumbnail && (
        <Box cursor={'pointer'} maxW={'80px'} maxH={'80px'}>
          <Image
            width={'80px'}
            height={'80px'}
            position={'absolute'}
            top={15}
            right={5}
            borderRadius={'3px'}
            src={details.thumbnail}
            fallbackSrc={
              'https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg'
            }
          ></Image>
        </Box>
      )}

      {/* Description */}
      <Box
        mt={'8px'}
        minW={0}
        fontSize={'0.75rem'}
        lineHeight={'1rem'}
        fontWeight={'500'}
        whiteSpace={'pre-line'}
        color={'#dcddde'}
      >
        <Text>{parseVariables(details.footer)}</Text>
        {/* {details.description.replace(' ', '&nbsp')} */}
        {/* <Text as="b">Prayers To The Trap God</Text> x739{'\n'}
    by <Text as="b">Roddy Ricch</Text> x12265{'\n'}
    on <Text as="b">Please Excuse Me for Being Antisocial</Text> x2447 */}
      </Box>
    </Box>
  );
}
