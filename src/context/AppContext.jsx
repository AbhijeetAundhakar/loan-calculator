import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// 1. First create the context
const AppContext = createContext();

// 2. Create the provider component
export const AppProvider = ({ children }) => {
    const [loanAmount, setLoanAmount] = useState(100000);
    const [interestRate, setInterestRate] = useState(8.5);
    const [loanTerm, setLoanTerm] = useState(5);
    const [currency, setCurrency] = useState('USD');
    const [exchangeRates, setExchangeRates] = useState({});
    const [error, setError] = useState(null);
    const [ratesLoading, setRatesLoading] = useState(true);




    // Add this conversion function
    const convertCurrency = (amount, fromCurrency, toCurrency) => {
        if (fromCurrency === toCurrency) return amount;
        if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) return amount;
        return (amount / exchangeRates[fromCurrency]) * exchangeRates[toCurrency];
    };


    useEffect(() => {
        const fetchRates = async () => {
            try {
                setRatesLoading(true);
                const response = await axios.get(
                    `https://v6.exchangerate-api.com/v6/480ea971d11c86fed0f56787/latest/${currency}`
                );
                setExchangeRates(response.data.conversion_rates);
                setError(null);
            } catch (err) {
                setError('Failed to fetch exchange rates');
                console.error(err);
            } finally {
                setRatesLoading(false);
            }
        };

        fetchRates();
    }, [currency]);

    return (
        <AppContext.Provider value={{
            loanAmount, setLoanAmount,
            interestRate, setInterestRate,
            loanTerm, setLoanTerm,
            currency, setCurrency,
            exchangeRates, setExchangeRates,
            ratesLoading,
            error, setError,
            convertCurrency
        }}>
            {children}
        </AppContext.Provider>
    );
};

// 3. Create and export the custom hook
export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};