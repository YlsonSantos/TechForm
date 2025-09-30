import { programasMock } from "@/app/mocks/programas";
import { instituicoesMock } from "@/app/mocks/instituicoes";
import { Programa, FiltrosPrograma, Instituicao } from "@/app/types/domain";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const programasService = {
  async listarProgramas(filtros?: FiltrosPrograma): Promise<Programa[]> {
    await delay(300);
    
    let resultado = [...programasMock];

    if (filtros) {
      if (filtros.busca) {
        const buscaLower = filtros.busca.toLowerCase();
        resultado = resultado.filter(
          (p) =>
            p.titulo.toLowerCase().includes(buscaLower) ||
            p.resumo.toLowerCase().includes(buscaLower) ||
            p.tags.some((tag) => tag.toLowerCase().includes(buscaLower))
        );
      }

      if (filtros.area) {
        resultado = resultado.filter((p) => p.area === filtros.area);
      }

      if (filtros.modalidade) {
        resultado = resultado.filter((p) => p.modalidade === filtros.modalidade);
      }

      if (filtros.nivel) {
        resultado = resultado.filter((p) => p.nivel === filtros.nivel);
      }

      if (filtros.periodoInicio) {
        resultado = resultado.filter(
          (p) => p.periodoInscricao.inicio >= filtros.periodoInicio!
        );
      }

      if (filtros.periodoFim) {
        resultado = resultado.filter(
          (p) => p.periodoInscricao.fim <= filtros.periodoFim!
        );
      }
    }

    return resultado;
  },

  async buscarPrograma(id: string): Promise<Programa | null> {
    await delay(200);
    return programasMock.find((p) => p.id === id) || null;
  },

  async listarInstituicoes(): Promise<Instituicao[]> {
    await delay(300);
    return [...instituicoesMock];
  },

  async buscarInstituicao(id: string): Promise<Instituicao | null> {
    await delay(200);
    return instituicoesMock.find((i) => i.id === id) || null;
  },
};