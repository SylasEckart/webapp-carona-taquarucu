/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction } from "react";

const errorMessages: { [key: string]: string } = {
    'invalid_credentials': 'Senha ou Login Inválidos',
    'email_address_not_authorized': 'Email não autorizado',
    'UNAUTHORIZED': 'You are not authorized to perform this action.',
    'SERVER_ERROR': 'An internal server error occurred.',
    // Add more error messages as needed
};

export function errorHandler(message: string): string {
    console.log(message);
    return errorMessages[message] || `Erro: ${message}`;
}
export interface ApiResponse {
    data?: any; // Substituir por tipagem exata, ex.: `Friendship | null`
    errorMessage: string | null;
  }

export const handleApiCall = async (
    apiFunction: (...args: any[]) => Promise<ApiResponse | null>,
    setLoading: Dispatch<SetStateAction<boolean>>,
    ...args: any[]
  ): Promise<ApiResponse> => {
    setLoading(true);
    try {
      const response = await apiFunction(...args);
      if (response === null) return { data: null, errorMessage: "An unexpected error occurred." };
      
      const { data, errorMessage } = response;
      return { data, errorMessage };
    } catch (error) {
      console.error("api erro:", error);
      return { data: null, errorMessage: (error as Error)?.message || String(error) };
    } finally {
      setLoading(false);
    }
  };