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

export default Programas;