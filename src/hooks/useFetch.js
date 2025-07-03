import { useState, useEffect } from 'react';

export const useFetch = (url, options = {}) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);const stringifiedOptions = JSON.stringify(options);

    useEffect(() => {const controller = new AbortController();

        const fetchData = async () => {
            setLoading(true);try {
                const logEntry = {
                    timestamp: new Date().toISOString(),
                    url,
                    options,
                    status: null,
                };
                localStorage.setItem(`api_log_${Date.now()}`, JSON.stringify(logEntry));
            } catch (e) {
                console.error("Failed to log request:", e);
            }

            try {
                const response = await fetch(url, {
                    ...options,
                    signal: controller.signal
                });

                try {
                    const latestLogKey = Object.keys(localStorage).filter(key => key.startsWith('api_log_')).pop();
                    if (latestLogKey) {
                        const logEntry = JSON.parse(localStorage.getItem(latestLogKey));
                        logEntry.status = response.status;
                        localStorage.setItem(latestLogKey, JSON.stringify(logEntry));
                    }
                } catch(e) {
                    console.error("Failed to log response status:", e);
                }

                if (!response.ok) {
                    setError(`HTTP error! status: ${response.status}`);
                    setData(null);
                } else {
                    const result = await response.json();
                    setData(result);
                    setError(null);
                }
            } catch (e) {
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
