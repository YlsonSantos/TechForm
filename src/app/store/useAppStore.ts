import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FiltrosPrograma } from "@/app/types/domain";

interface AppState {
  filtros: FiltrosPrograma;
  favoritos: string[];
  setFiltro: (filtro: Partial<FiltrosPrograma>) => void;
  setBusca: (busca: string) => void;
  resetFiltros: () => void;
  toggleFavorito: (programaId: string) => void;
}

const filtrosIniciais: FiltrosPrograma = {
  busca: "",
  area: undefined,
  modalidade: undefined,
  nivel: undefined,
  periodoInicio: undefined,
  periodoFim: undefined,
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      filtros: filtrosIniciais,
      favoritos: [],
      
      setFiltro: (novoFiltro) =>
        set((state) => ({
          filtros: { ...state.filtros, ...novoFiltro },
        })),
      
      setBusca: (busca) =>
        set((state) => ({
          filtros: { ...state.filtros, busca },
        })),
      
      resetFiltros: () =>
        set({
          filtros: filtrosIniciais,
        }),
      
      toggleFavorito: (programaId) =>
        set((state) => ({
          favoritos: state.favoritos.includes(programaId)
            ? state.favoritos.filter((id) => id !== programaId)
            : [...state.favoritos, programaId],
        })),
    }),
    {
      name: "app-storage",
      partialize: (state) => ({ favoritos: state.favoritos }),
    }
  )
);