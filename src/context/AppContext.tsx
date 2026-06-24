import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  classesApi,
  companiesApi,
  professionalsApi,
  programsApi,
  membershipsApi,
} from "../api";
import type { Class, Company, Membership, Professional, Program } from "../api";
import { toast } from "react-hot-toast";

interface AppContextState {
  companyData: Company | null;
  classesData: Class[] | null;
  programsData: Program[] | null;
  professionalsData: Professional[] | null;
  allMembershipsData: Membership[] | null;
}

const AppContext = createContext<AppContextState | null>(null);

export function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [companyData, setCompanyData] = useState<Company | null>(null);
  const [classesData, setClassesData] = useState<Class[] | null>(null);
  const [programsData, setProgramsData] = useState<Program[] | null>(null);
  const [professionalsData, setProfessionalsData] = useState<
    Professional[] | null
  >(null);
  const [allMembershipsData, setAllMembershipsData] = useState<
    Membership[] | null
  >(null);

  async function fetchHandler<T>({
    dataObtain,
    dataSetter,
  }: {
    dataObtain: (projectId: string) => Promise<T>;
    dataSetter: React.Dispatch<React.SetStateAction<T | null>>;
  }) {
    try {
      const projectId = process.env.REACT_APP_PROJECT_ID;
      if (!projectId) {
        console.error(
          "REACT_APP_PROJECT_ID is not set in environment variables.",
        );
        return;
      }
      const data = await dataObtain(projectId);
      dataSetter(data);
      console.log("Fetched data:", data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }

  async function fetchCompanyData() {
    fetchHandler({
      dataObtain: companiesApi.getById,
      dataSetter: setCompanyData,
    });
  }

  async function fetchClassesData() {
    fetchHandler({
      dataObtain: classesApi.getAll,
      dataSetter: setClassesData,
    });
  }

  async function fetchProgramsData() {
    fetchHandler({
      dataObtain: programsApi.getAll,
      dataSetter: setProgramsData,
    });
  }

  async function fetchProfessionalsData() {
    fetchHandler({
      dataObtain: professionalsApi.getAll,
      dataSetter: setProfessionalsData,
    });
  }

  async function fetchAllMembershipsData() {
    fetchHandler({
      dataObtain: membershipsApi.getAll,
      dataSetter: setAllMembershipsData,
    });
  }

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    fetchCompanyData();
    fetchClassesData();
    fetchProgramsData();
    fetchProfessionalsData();
    fetchAllMembershipsData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        companyData,
        classesData,
        programsData,
        professionalsData,
        allMembershipsData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext(): AppContextState {
  const ctx = useContext(AppContext);
  if (!ctx)
    throw new Error("useAppContext must be used inside <AppContextProvider>");
  return ctx;
}
