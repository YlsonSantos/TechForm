import { GetStaticProps } from "next";
import { Box, Heading, Text, SimpleGrid, Flex } from "@chakra-ui/react";
import { Skeleton } from "@chakra-ui/react";
import Navigation from "@/components/Navigation";
import ProgramCard from "@/components/ProgramCard";
import { programasService } from "@/lib/programas.service";
import { Programa } from "@/types/domain";

interface ProgramasPageProps {
  programas: Programa[];
}

export const getStaticProps: GetStaticProps<ProgramasPageProps> = async () => {
  const programas = await programasService.listarProgramas();
  return {
    props: { programas },
  };
};

const ProgramasPage = ({ programas }: ProgramasPageProps) => {
  const [loading, setLoading] = useState(true);
  const [programas, setProgramas] = useState<Programa[]>([]);

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
    <Box minH="100vh" bg="background">
      <Navigation />
      
      <Box className="container" mx="auto" px="4" py="8">
        <Box className="space-y-6">
          <Box>
            <Heading as="h1" size="2xl" fontWeight="bold">
              Catálogo de Programas
            </Heading>
            <Text color="muted-foreground" mt="2">
              Encontre o programa ideal para sua carreira em tecnologia
            </Text>
          </Box>

          {loading ? (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="6">
              {[...Array(9)].map((_, i) => (
                <Box key={i} className="space-y-4">
                  <Skeleton height="64" w="full" />
                </Box>
              ))}
            </SimpleGrid>
          ) : programas.length === 0 ? (
            <Box textAlign="center" py="12">
              <Text fontSize="xl" color="muted-foreground">
                Nenhum programa encontrado com os filtros aplicados
              </Text>
            </Box>
          ) : (
            <Box>
              <Text fontSize="sm" color="muted-foreground" mb="4">
                {programas.length} programa{programas.length !== 1 ? "s" : ""} encontrado{programas.length !== 1 ? "s" : ""}
              </Text>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="6">
                {programas.map((programa) => (
                  <ProgramCard key={programa.id} programa={programa} />
                ))}
              </SimpleGrid>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProgramasPage;