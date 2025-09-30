"use client";

import Link from "next/link";
import {
  Box,
  Heading,
  Text,
  Badge,
  Button,
  VStack,
  Flex,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Heart, MapPin, Calendar, ExternalLink } from "lucide-react";
import { Programa } from "@/app/types/domain";
import { useAppStore } from "@/app/store/useAppStore";

interface ProgramCardProps {
  programa: Programa;
}

const areaLabels: Record<string, string> = {
  frontend: "Frontend",
  backend: "Backend",
  dados: "Dados",
  cloud: "Cloud",
  ux: "UX/UI",
  mobile: "Mobile",
  seguranca: "Segurança",
};

const nivelLabels: Record<string, string> = {
  iniciante: "Iniciante",
  intermediario: "Intermediário",
  avancado: "Avançado",
};

const modalidadeLabels: Record<string, string> = {
  presencial: "Presencial",
  online: "Online",
  hibrido: "Híbrido",
};

const ProgramCard = ({ programa }: ProgramCardProps) => {
  const { favoritos, toggleFavorito } = useAppStore();
  const isFavorito = favoritos.includes(programa.id);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
    });
  };

  const cardBg = useColorModeValue("white", "gray.800");
  const cardShadow = useColorModeValue("lg", "dark-lg");

  return (
    <Box
      as="article"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="6"
      bg={cardBg}
      shadow={cardShadow}
      transition="all 0.3s"
      _hover={{ transform: "scale(1.02)" }}
      h="full"
      display="flex"
      flexDirection="column"
    >
      <VStack spacing={4} align="stretch" flexGrow={1}>
        <Flex justifyContent="space-between" alignItems="flex-start" gap="2">
          <Heading as="h3" size="md" noOfLines={2}>
            <Link href={`/programas/${programa.id}`}>
              <Box
                _hover={{ color: "primary.500" }}
                transition="colors"
                cursor="pointer"
              >
                {programa.titulo}
              </Box>
            </Link>
          </Heading>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleFavorito(programa.id)}
            aria-label="Adicionar aos favoritos"
          >
            <Heart
              size={20}
              color={isFavorito ? "red" : "gray"}
              fill={isFavorito ? "red" : "none"}
              transition="all 0.3s"
            />
          </Button>
        </Flex>

        <HStack wrap="wrap" mt="2" spacing={2}>
          <Badge colorScheme="purple">{areaLabels[programa.area]}</Badge>
          <Badge colorScheme="blue">{nivelLabels[programa.nivel]}</Badge>
        </HStack>

        <Text fontSize="sm" color="gray.500" noOfLines={3} flexGrow={1}>
          {programa.resumo}
        </Text>

        <VStack spacing={2} align="stretch" fontSize="sm" color="gray.500">
          <HStack alignItems="center">
            <MapPin size={16} />
            <Text>
              {programa.cidade}, {programa.estado} • {modalidadeLabels[programa.modalidade]}
            </Text>
          </HStack>
          <HStack alignItems="center">
            <Calendar size={16} />
            <Text>
              Inscrições: {formatDate(programa.periodoInscricao.inicio)} -{" "}
              {formatDate(programa.periodoInscricao.fim)}
            </Text>
          </HStack>
        </VStack>

        <HStack wrap="wrap" spacing={1} mt={2}>
          {programa.tags.slice(0, 4).map((tag) => (
            <Badge key={tag} variant="outline" colorScheme="gray">
              {tag}
            </Badge>
          ))}
          {programa.tags.length > 4 && (
            <Badge variant="outline" colorScheme="gray">
              +{programa.tags.length - 4}
            </Badge>
          )}
        </HStack>
      </VStack>

      <HStack mt="4" spacing={2}>
        <Link href={`/programas/${programa.id}`} passHref>
          <Button as="a" flex="1" variant="solid" colorScheme="blue">
            Ver detalhes
          </Button>
        </Link>
        <Link href={programa.editalUrl} target="_blank" rel="noopener noreferrer">
          <Button as="a" variant="outline" aria-label="Acessar edital">
            <ExternalLink size={16} />
          </Button>
        </Link>
      </HStack>
    </Box>
  );
};

export default ProgramCard;