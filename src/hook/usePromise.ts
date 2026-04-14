import { useCallback, useState } from "react";

/**
 * @description
 * Hook genérico para controlar a execução de uma Promise,
 * fornecendo estados de loading, erro e resultado.
 *
 * Ele encapsula:
 * - Controle de carregamento (isLoading)
 * - Controle de erro (hasError)
 * - Armazenamento do resultado da Promise (result)
 *
 * Ideal para chamadas assíncronas como:
 * - Requisições HTTP
 * - Integrações com APIs
 * - Operações assíncronas em geral
 *
 * @template T Tipo esperado do resultado da Promise.
 *
 * @param {() => Promise<T>} action
 * Função assíncrona que será executada pelo hook.
 *
 * @returns {[boolean, boolean, T | null, () => Promise<void>]}
 * Retorna um array contendo:
 * - isLoading: indica se a Promise está em execução
 * - hasError: indica se ocorreu erro na execução
 * - result: resultado retornado pela Promise
 * - execute: função responsável por disparar a execução
 */
const usePromise = <T,>(action: (args?:any) => Promise<T>, defaultValue:T) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasError, setHasError] = useState<boolean>(false);
    const [result, setResult] = useState<T>(defaultValue);

    /**
     * @description
     * Executa a função assíncrona fornecida ao hook,
     * controlando automaticamente os estados internos.
     */
    const execute = useCallback(async (args?:any) => {
        try {
            
            setResult(defaultValue);
            setIsLoading(true);
            setHasError(false);

            const response = await action(args);
            setResult(response);

            return response;

        } catch (error) {
            setHasError(true);
            setResult(defaultValue);
            
            return defaultValue;
        } finally {
            setIsLoading(false);
        }
    }, [action]);

    return {
        isLoading,
        hasError,
        result,
        execute
    } as const
};

export default usePromise;