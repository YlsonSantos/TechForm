import { Instituicao } from "@/types/domain";
import { Box, Flex, Heading, Text, Link as ChakraLink, Button, Image } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

interface InstitutionCardProps {
  instituicao: Instituicao;
}

const InstitutionCard = ({ instituicao }: InstitutionCardProps) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p="6"
      _hover={{ boxShadow: "lg" }}
      transition="all 0.3s"
      h="full"
      display="flex"
      flexDirection="column"
    >
      <Flex alignItems="flex-start" gap="4" mb="4">
        <Image
          src={instituicao.logoUrl}
          alt={`Logo ${instituicao.nome}`}
          boxSize="16"
          objectFit="cover"
          borderRadius="lg"
        />
        <Box flex="1">
          <Heading size="md">{instituicao.nome}</Heading>
          <ChakraLink
            href={instituicao.site}
            isExternal
            color="blue.500"
            _hover={{ textDecoration: "underline" }}
            fontSize="sm"
            display="flex"
            alignItems="center"
            gap="1"
            mt="1"
          >
            {instituicao.site}
            <ExternalLinkIcon mx="2px" />
          </ChakraLink>
        </Box>
      </Flex>
      <Box flex="1">
        <Text fontSize="sm" color="gray.500">
          {instituicao.descricao}
        </Text>
      </Box>
      <Button
        as={ChakraLink}
        href={instituicao.site}
        isExternal
        variant="outline"
        w="full"
        mt="4"
        _hover={{ textDecoration: "none" }}
      >
        Visitar site
      </Button>
    </Box>
  );
};

export default InstitutionCard;