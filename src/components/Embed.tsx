import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';

export type EmbedDetails = {
  author: string;
  authorIcon: string;
  authorUrl: string;
  title: string;
  titleUrl: string;
  description: string;
  thumbnail: string;
};
interface EmbedProps {
  details: EmbedDetails;
}

export default function Embed({ details }: EmbedProps) {
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
            src={details.authorIcon}
            boxSizing={'border-box'}
            fallbackSrc={
              'https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg'
            }
          />
          <Text fontSize={'0.875rem'} fontWeight={'600'}>
            {details.author}
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
          {details.title}
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
        {details.description}
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
    </Box>
  );
}
