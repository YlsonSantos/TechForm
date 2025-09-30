"use client";

import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  Flex,
  Image,
  Link as ChakraLink,
  useColorModeValue,
} from "@chakra-ui/react";
import { ExternalLink } from "lucide-react";
import { Instituicao } from "@/app/types/domain";
import NextLink from "next/link";

interface InstitutionCardProps {
  instituicao: Instituicao;
}

const InstitutionCard = ({ instituicao }: InstitutionCardProps) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const cardShadow = useColorModeValue("lg", "dark-lg");

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="6"
      bg={cardBg}
      shadow={cardShadow}
      transition="all 0.3s"
      _hover={{ transform: "scale(1.02)" }}
    >
      <VStack spacing={4} align="stretch">
        <Flex alignItems="flex-start" gap="4">
          <Image
            src={instituicao.logoUrl}
            alt={`Logo ${instituicao.nome}`}
            boxSize="64px"
            rounded="lg"
            objectFit="cover"
          />
          <Box flex="1">
            <Heading as="h3" size="md">
              {instituicao.nome}
            </Heading>
            <ChakraLink
              as={NextLink}
              href={instituicao.site}
              isExternal
              color="primary.500"
              _hover={{ textDecoration: "underline" }}
              display="flex"
              alignItems="center"
              gap="1"
              mt="1"
              fontSize="sm"
            >
              {instituicao.site}
              <ExternalLink size={12} />
            </ChakraLink>
          </Box>
        </Flex>

        <Text fontSize="sm" color="gray.500">
          {instituicao.descricao}
        </Text>
      </VStack>

      <NextLink href={instituicao.site} passHref>
        <Button as="a" variant="outline" w="full" mt="4" isExternal>
          Visitar site
        </Button>
      </NextLink>
    </Box>
  );
};

export default InstitutionCard;