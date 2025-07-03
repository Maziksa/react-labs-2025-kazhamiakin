import { useState, useEffect } from 'react';

interface FetchResult<T> {
    data: T | null;
    error: string | null;
    loading: boolean;
}

export const useFetch = <T,>(url: string, options: RequestInit = {}): FetchResult<T> => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const stringifiedOptions = JSON.stringify(options);

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(url, { ...options, signal: controller.signal });
                if (!response.ok) {new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                setData(result);
                setError(null);
            } catch (e: any) {
                if (e.name !== 'AbortError') {
                    setError(e.message);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            controller.abort();
        };
    }, [url, stringifiedOptions]);

    return { data, error, loading };
};
