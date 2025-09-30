export type Area = "frontend" | "backend" | "dados" | "cloud" | "ux" | "mobile" | "seguranca";

export type Modalidade = "presencial" | "online" | "hibrido";

export type Nivel = "iniciante" | "intermediario" | "avancado";

export interface PeriodoInscricao {
  inicio: string; // ISO date
  fim: string; // ISO date
}

export interface Instituicao {
  id: string;
  nome: string;
  site: string;
  logoUrl: string;
  descricao: string;
}

export interface Programa {
  id: string;
  titulo: string;
  instituicaoId: string;
  area: Area;
  modalidade: Modalidade;
  nivel: Nivel;
  publicoAlvo: string;
  periodoInscricao: PeriodoInscricao;
  editalUrl: string;
  cidade: string;
  estado: string;
  tags: string[];
  resumo: string;
  descricaoCompleta?: string;
}

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  interesses: string[];
  favoritos: string[];
}

export interface FiltrosPrograma {
  busca: string;
  area?: Area;
  modalidade?: Modalidade;
  nivel?: Nivel;
  periodoInicio?: string;
  periodoFim?: string;
}