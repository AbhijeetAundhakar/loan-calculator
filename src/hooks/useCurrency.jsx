import { useState, useEffect } from 'react';
import axios from 'axios';

export const useCurrency = (baseCurrency = 'USD') => {
    const [rates, setRates] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRates = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `https://v6.exchangerate-api.com/v6/480ea971d11c86fed0f56787/latest/${baseCurrency}`
                );
                setRates(response.data.conversion_rates);
                setError(null);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching exchange rates:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchRates();
    }, [baseCurrency]);


    const convert = (amount, fromCurrency, toCurrency) => {
        if (fromCurrency === toCurrency) return amount;
        if (!rates[fromCurrency] || !rates[toCurrency]) return amount;
        return (amount / rates[fromCurrency]) * rates[toCurrency];
    };

    return { rates, loading, error, convert };
};