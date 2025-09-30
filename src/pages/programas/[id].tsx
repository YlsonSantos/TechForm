import { useEffect, useState } from "react";
import { Box, Heading, Text, VStack, Grid, Skeleton, Button, Flex } from "@chakra-ui/react";
import Navigation from "@/app/components/Navigation";
import FilterBar from "@/app/components/FilterBar";
import ProgramCard from "@/app/components/ProgramCard";
import { programasService } from "@/app/lib/programas.service";
import { useAppStore } from "@/app/store/useAppStore";
import { Programa } from "@/app/types/domain";

const Programas = () => {
  const [programas, setProgramas] = useState<Programa[]>([]);
  const [loading, setLoading] = useState(true);
  const { filtros } = useAppStore();

  useEffect(() => {
    const carregarProgramas = async () => {
      setLoading(true);
      try {
        const resultado = await programasService.listarProgramas(filtros);
        setProgramas(resultado);
      } catch (error) {
        console.error("Erro ao carregar programas:", error);
      } finally {
        setLoading(false);
      }
    };

    carregarProgramas();
  }, [filtros]);

  return (
    <Box minH="100vh">
      <Navigation />
      
      <Box maxW="container.xl" mx="auto" px="4" py="8">
        <VStack spacing={6} align="stretch">
          <Box>
            <Heading as="h1" fontSize="4xl" fontWeight="bold">
              Catálogo de Programas
            </Heading>
            <Text color="gray.500" mt="2">
              Encontre o programa ideal para sua carreira em tecnologia
            </Text>
          </Box>

          <FilterBar />

          {loading ? (
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
              {[...Array(9)].map((_, i) => (
                <Box key={i}>
                  <Skeleton h="256px" w="full" />
                </Box>
              ))}
            </Grid>
          ) : programas.length === 0 ? (
            <Box textAlign="center" py="12">
              <Text fontSize="xl" color="gray.500">
                Nenhum programa encontrado com os filtros aplicados
              </Text>
            </Box>
          ) : (
            <Box>
              <Text fontSize="sm" color="gray.500" mb="4">
                {programas.length} programa{programas.length !== 1 ? "s" : ""} encontrado{programas.length !== 1 ? "s" : ""}
              </Text>
              <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
                {programas.map((programa) => (
                  <ProgramCard key={programa.id} programa={programa} />
                ))}
              </Grid>
            </Box>
          )}
        </VStack>
      </Box>
    </Box>
  );
};

export default Programas;import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Box,
  Heading,
  Text,
  Badge,
  Button,
  VStack,
  HStack,
  Flex,
  Image,
  Spinner,
  useColorModeValue,
  Link as ChakraLink
} from "@chakra-ui/react";
import {
  MapPin,
  Calendar,
  ExternalLink,
  Heart,
  ArrowLeft,
  Users,
  GraduationCap,
  Monitor,
} from "lucide-react";
import Navigation from "@/app/components/Navigation";
import { programasService } from "@/app/lib/programas.service";
import { Programa, Instituicao } from "@/app/types/domain";
import { useAppStore } from "@/app/store/useAppStore";

const areaLabels: Record<string, string> = {
  frontend: "Frontend",
  backend: "Backend",
  dados: "Dados",
  cloud: "Cloud",
  ux: "UX/UI",
  mobile: "Mobile",
  seguranca: "Segurança",
};

const modalidadeLabels: Record<string, string> = {
  presencial: "Presencial",
  online: "Online",
  hibrido: "Híbrido",
};

const nivelLabels: Record<string, string> = {
  iniciante: "Iniciante",
  intermediario: "Intermediário",
  avancado: "Avançado",
};

const ProgramDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [programa, setPrograma] = useState<Programa | null>(null);
  const [instituicao, setInstituicao] = useState<Instituicao | null>(null);
  const [loading, setLoading] = useState(true);
  const { favoritos, toggleFavorito } = useAppStore();

  useEffect(() => {
    const carregarDados = async () => {
      if (!id || Array.isArray(id)) return;
      
      setLoading(true);
      try {
        const prog = await programasService.buscarPrograma(id);
        setPrograma(prog);
        
        if (prog) {
          const inst = await programasService.buscarInstituicao(prog.instituicaoId);
          setInstituicao(inst);
        }
      } catch (error) {
        console.error("Erro ao carregar programa:", error);
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, [id]);

  if (loading) {
    return (
      <Box minH="100vh">
        <Navigation />
        <Flex justify="center" align="center" h="calc(100vh - 64px)">
          <Spinner size="xl" />
        </Flex>
      </Box>
    );
  }

  if (!programa) {
    return (
      <Box minH="100vh" textAlign="center" py="8">
        <Navigation />
        <Heading as="h1" fontSize="2xl" fontWeight="bold" mb="4">
          Programa não encontrado
        </Heading>
        <Link href="/programas" passHref>
          <Button as="a" colorScheme="blue">
            Voltar para programas
          </Button>
        </Link>
      </Box>
    );
  }

  const isFavorito = favoritos.includes(programa.id);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <Box minH="100vh">
      <Navigation />
      
      <Box maxW="container.xl" mx="auto" px="4" py="8">
        <Link href="/programas" passHref>
          <Button as="a" variant="ghost" leftIcon={<ArrowLeft size={16} />} mb="6">
            Voltar para programas
          </Button>
        </Link>

        <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={8}>
          <Box className="lg:col-span-2" spacing={6}>
            <VStack align="flex-start" spacing={4}>
              <Flex alignItems="flex-start" justifyContent="space-between" w="full" gap={4}>
                <Heading as="h1" fontSize="4xl" fontWeight="bold">
                  {programa.titulo}
                </Heading>
                <Button
                  variant="outline"
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

              <HStack wrap="wrap" spacing={2}>
                <Badge colorScheme="purple" fontSize="md">
                  {areaLabels[programa.area]}
                </Badge>
                <Badge colorScheme="blue" fontSize="md">
                  {nivelLabels[programa.nivel]}
                </Badge>
                <Badge colorScheme="gray" fontSize="md">
                  {modalidadeLabels[programa.modalidade]}
                </Badge>
              </HStack>
            </VStack>

            <Box mt={6}>
              <Heading as="h2" fontSize="2xl" fontWeight="semibold">
                Sobre o programa
              </Heading>
              <Text color="gray.500" fontSize="lg" mt={2}>
                {programa.resumo}
              </Text>
              {programa.descricaoCompleta && (
                <Text color="gray.500" mt={2}>
                  {programa.descricaoCompleta}
                </Text>
              )}
            </Box>

            <Box mt={6}>
              <Heading as="h2" fontSize="2xl" fontWeight="semibold" mb={3}>
                Tecnologias e habilidades
              </Heading>
              <HStack wrap="wrap" spacing={2}>
                {programa.tags.map((tag) => (
                  <Badge key={tag} variant="outline" colorScheme="gray">
                    {tag}
                  </Badge>
                ))}
              </HStack>
            </Box>
          </Box>

          <VStack spacing={6} align="stretch">
            <Box bg="gray.100" p={6} rounded="lg" shadow="md">
              <VStack spacing={4} align="flex-start">
                <HStack alignItems="center" gap={3}>
                  <MapPin size={20} color="gray" />
                  <VStack align="flex-start" spacing={0}>
                    <Text fontSize="sm" fontWeight="medium">Localização</Text>
                    <Text fontSize="sm" color="gray.500">
                      {programa.cidade}, {programa.estado}
                    </Text>
                  </VStack>
                </HStack>

                <HStack alignItems="center" gap={3}>
                  <Monitor size={20} color="gray" />
                  <VStack align="flex-start" spacing={0}>
                    <Text fontSize="sm" fontWeight="medium">Modalidade</Text>
                    <Text fontSize="sm" color="gray.500">
                      {modalidadeLabels[programa.modalidade]}
                    </Text>
                  </VStack>
                </HStack>

                <HStack alignItems="center" gap={3}>
                  <GraduationCap size={20} color="gray" />
                  <VStack align="flex-start" spacing={0}>
                    <Text fontSize="sm" fontWeight="medium">Nível</Text>
                    <Text fontSize="sm" color="gray.500">
                      {nivelLabels[programa.nivel]}
                    </Text>
                  </VStack>
                </HStack>

                <HStack alignItems="center" gap={3}>
                  <Users size={20} color="gray" />
                  <VStack align="flex-start" spacing={0}>
                    <Text fontSize="sm" fontWeight="medium">Público-alvo</Text>
                    <Text fontSize="sm" color="gray.500">
                      {programa.publicoAlvo}
                    </Text>
                  </VStack>
                </HStack>

                <HStack alignItems="flex-start" gap={3}>
                  <Calendar size={20} color="gray" />
                  <VStack align="flex-start" spacing={0}>
                    <Text fontSize="sm" fontWeight="medium">Período de inscrição</Text>
                    <Text fontSize="sm" color="gray.500">
                      {formatDate(programa.periodoInscricao.inicio)}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      até {formatDate(programa.periodoInscricao.fim)}
                    </Text>
                  </VStack>
                </HStack>
              </VStack>
            </Box>

            {instituicao && (
              <Box bg="gray.100" p={6} rounded="lg" shadow="md">
                <Heading as="h3" size="md" mb={3}>
                  Instituição
                </Heading>
                <Flex alignItems="center" gap={3} mb={3}>
                  <Image
                    src={instituicao.logoUrl}
                    alt={instituicao.nome}
                    boxSize="48px"
                    rounded="lg"
                    objectFit="cover"
                  />
                  <VStack align="flex-start" spacing={0}>
                    <Text fontWeight="medium">{instituicao.nome}</Text>
                    <ChakraLink
                      href={instituicao.site}
                      isExternal
                      color="blue.500"
                      _hover={{ textDecoration: "underline" }}
                      display="flex"
                      alignItems="center"
                      gap="1"
                      fontSize="sm"
                    >
                      {instituicao.site}
                      <ExternalLink size={12} />
                    </ChakraLink>
                  </VStack>
                </Flex>
                <Text fontSize="sm" color="gray.500">
                  {instituicao.descricao}
                </Text>
              </Box>
            )}

            <ChakraLink href={programa.editalUrl} isExternal w="full" style={{ textDecoration: 'none' }}>
              <Button size="lg" w="full" rightIcon={<ExternalLink size={16} />} colorScheme="blue">
                Acessar edital
              </Button>
            </ChakraLink>
          </VStack>
        </Grid>
      </Box>
    </Box>
  );
};

export default ProgramDetails;