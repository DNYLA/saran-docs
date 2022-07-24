import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { ObjectType } from 'typescript';

export interface EmbedFieldData {
  name: string;
  value: string;
  inline?: boolean;
}

export type EmbedDetails = {
  author: { name?: string; url?: string; iconURL?: string };
  color?: string | number;
  fields?: EmbedFieldData[];
  footer: { text?: string; iconURL?: string };
  description?: string;
  image?: string;
  thumbnail?: string;
  timestamp?: number | Date;
  title?: string;
  url?: string;
};
interface EmbedProps {
  details: EmbedDetails;
}

export type VariableTypes = {
  username: string;
  fm_username: string;
  fm_avatar: string;
  fm_link: string;
  track_name: string;
  track_plays: string;
  track_image: string;
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

    return text;
  };

  const json: VariableTypes = {
    username: 'Lamar',
    fm_username: 'Jungaal',
    fm_link: 'https://www.last.fm/user/jungaal',
    fm_avatar:
      'https://images-ext-1.discordapp.net/external/Vjfy91yCG_Dgguk7VJkbk8mGz3B6WnR3a4Gi6Yh1eh0/https/lastfm.freetls.fastly.net/i/u/avatar170s/a7ff67ef791aaba0c0c97e9c8a97bf04.png',
    track_name: 'Prayers To The Trap God',
    track_plays: '739',
    track_image:
      'https://lastfm.freetls.fastly.net/i/u/300x300/b99fa4b5cf3a2cd7974ffd139c7250fc.jpg',
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

    console.log(text);

    return text;
  };

  const renderFields = () => {
    if (!details.fields || details.fields.length === 0) return;
    return details.fields.map((field, i) => {
      return (
        <Box lineHeight={'1.125rem'} fontSize={'0.875rem'} minW={0} key={i}>
          <Box fontWeight={600} mb={'2px'}>
            {field.name}
          </Box>
          <Box fontWeight={400} whiteSpace={'pre-line'}>
            {field.value}
          </Box>
        </Box>
      );
    });
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
      {details.author && details.author.name && (
        <Flex
          mt={'8px'}
          as="a"
          href={parseText(details.author.url ?? '')}
          target={'_blank'}
        >
          <Image
            width={'24px'}
            height={'24px'}
            mr={'8px'}
            borderRadius={'full'}
            src={
              details.author.iconURL === '{fm_avatar}'
                ? json.fm_avatar
                : details.author.iconURL
            }
            boxSizing={'border-box'}
            fallbackSrc={
              'https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg'
            }
          />
          <Text fontSize={'0.875rem'} fontWeight={'600'}>
            {parseVariables(details.author.name)}
          </Text>
        </Flex>
      )}
      {/* Title */}
      {details.title && (
        <Box mt={'8px'}>
          <Text
            as="a"
            color={'#00aff5'}
            cursor={'pointer'}
            fontSize={'1rem'}
            fontWeight={'600'}
            href={details.url}
            target={'_blank'}
          >
            {parseVariables(details.title)}
          </Text>
        </Box>
      )}

      {/* Description */}
      {details.description && (
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
      )}

      {details.fields && details.fields?.length > 0 && (
        <Box display={'grid'} gridGap={'8px'} mt={'8px'}>
          {renderFields()}
        </Box>
      )}

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
            src={parseVariables(details.thumbnail)}
            fallbackSrc={
              'https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg'
            }
          ></Image>
        </Box>
      )}

      {/* Description */}
      {details.footer.text && (
        <Box
          mt={'8px'}
          minW={0}
          fontSize={'0.75rem'}
          lineHeight={'1rem'}
          fontWeight={'500'}
          whiteSpace={'pre-line'}
          color={'#dcddde'}
        >
          <Text>{parseVariables(details.footer.text)}</Text>
          {/* {details.description.replace(' ', '&nbsp')} */}
          {/* <Text as="b">Prayers To The Trap God</Text> x739{'\n'}
    by <Text as="b">Roddy Ricch</Text> x12265{'\n'}
    on <Text as="b">Please Excuse Me for Being Antisocial</Text> x2447 */}
        </Box>
      )}
    </Box>
  );
}
