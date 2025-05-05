import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import axios from 'axios';

const ExchangeRates = () => {
    const { currency, exchangeRates, setExchangeRates, setError } = useApp();
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);



    useEffect(() => {
        const fetchRates = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `https://v6.exchangerate-api.com/v6/480ea971d11c86fed0f56787/latest/${currency}`
                );
                setExchangeRates(response.data.conversion_rates);
                setError(null);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching exchange rates:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchRates();
    }, [currency, setExchangeRates, setError]);

    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const displayedRates = Object.entries(exchangeRates).slice(startIndex, endIndex);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                Live Exchange Rates (Base: {currency})
            </h1>

            {loading ? (
                <p className="text-gray-700 dark:text-gray-300">Loading exchange rates...</p>
            ) : (
                <>
                    <div className="overflow-x-auto shadow-lg rounded-lg">
                        <table className="min-w-full bg-white dark:bg-gray-900 border dark:border-gray-700">
                            <thead>
                                <tr className="bg-gray-100 dark:bg-gray-800">
                                    <th className="py-2 px-4 border dark:border-gray-700 text-left text-gray-700 dark:text-gray-300">Currency</th>
                                    <th className="py-2 px-4 border dark:border-gray-700 text-left text-gray-700 dark:text-gray-300">Rate</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayedRates.map(([curr, rate]) => (
                                    <tr key={curr} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                        <td className="py-2 px-4 border dark:border-gray-700 text-gray-900 dark:text-gray-100">{curr}</td>
                                        <td className="py-2 px-4 border dark:border-gray-700 text-gray-900 dark:text-gray-100">{rate.toFixed(4)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-between items-center mt-4 text-gray-900 dark:text-gray-100">
                        <div>
                            <span className="mr-2">Rows per page:</span>
                            <select
                                value={rowsPerPage}
                                onChange={(e) => setRowsPerPage(Number(e.target.value))}
                                className="p-1 border rounded bg-white dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
                            >
                                {[5, 10, 20, 50].map((num) => (
                                    <option key={num} value={num}>{num}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="px-3 py-1 border rounded disabled:opacity-50 bg-white dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
                            >
                                Previous
                            </button>
                            <span className="mx-2">
                                {startIndex + 1}-{Math.min(endIndex, Object.keys(exchangeRates).length)} of {Object.keys(exchangeRates).length}
                            </span>
                            <button
                                onClick={() => setPage(p => p + 1)}
                                disabled={endIndex >= Object.keys(exchangeRates).length}
                                className="px-3 py-1 border rounded disabled:opacity-50 bg-white dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );

};

export default ExchangeRates;