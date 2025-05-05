// import { useState } from 'react';
// import { useApp } from '../context/AppContext';
// import { useTheme } from '../context/ThemeContext';

// const CurrencyConverter = ({ emi }) => {
//     const { currency, exchangeRates, ratesLoading } = useApp();
//     const { darkMode } = useTheme();
//     const [targetCurrency, setTargetCurrency] = useState('USD');

//     if (ratesLoading || Object.keys(exchangeRates).length === 0) {
//         return (
//             <div className={`mb-6 p-4 border rounded ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-50 text-gray-700'
//                 }`}>
//                 Loading currencies...
//             </div>
//         );
//     }

//     const handleCurrencyChange = (e) => {
//         setTargetCurrency(e.target.value);
//     };

//     const convertedEMI = emi * (exchangeRates[targetCurrency] || 1) / (exchangeRates[currency] || 1);

//     return (
//         <div className={`mb-6 p-4 border rounded ${darkMode ? 'bg-gray-800 border-gray-600 text-gray-100' : 'bg-gray-50 border-gray-200 text-gray-800'
//             }`}>
//             <div className="flex items-center space-x-4">
//                 <div>
//                     <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'
//                         }`}>
//                         Currency
//                     </label>
//                     <select
//                         value={targetCurrency}
//                         onChange={handleCurrencyChange}
//                         className={`p-2 border rounded w-full ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'
//                             }`}
//                     >
//                         {Object.keys(exchangeRates).map((curr) => (
//                             <option key={curr} value={curr}>{curr}</option>
//                         ))}
//                     </select>
//                 </div>
//                 <div>
//                     <p className={`font-medium ${darkMode ? 'text-gray-100' : 'text-gray-900'
//                         }`}>
//                         Converted EMI: {convertedEMI.toFixed(2)} {targetCurrency}
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CurrencyConverter;




import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';

const CurrencyConverter = ({ emi }) => {
    const { currency, setCurrency, exchangeRates, ratesLoading, convertCurrency } = useApp();
    const { darkMode } = useTheme();
    const [targetCurrency, setTargetCurrency] = useState('USD');

    if (ratesLoading || Object.keys(exchangeRates).length === 0) {
        return (
            <div className={`mb-6 p-4 border rounded ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-50 text-gray-700'}`}>
                Loading currencies...
            </div>
        );
    }

    const handleCurrencyChange = (e) => {
        const newCurrency = e.target.value;
        setTargetCurrency(newCurrency);
        setCurrency(newCurrency); // Update the base currency in context
    };

    const convertedEMI = convertCurrency(emi, 'USD', targetCurrency);

    return (
        <div className={`mb-6 p-4 border rounded ${darkMode ? 'bg-gray-800 border-gray-600 text-gray-100' : 'bg-gray-50 border-gray-200 text-gray-800'}`}>
            <div className="flex items-center space-x-4">
                <div>
                    <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Currency
                    </label>
                    <select
                        value={targetCurrency}
                        onChange={handleCurrencyChange}
                        className={`p-2 border rounded w-full ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
                    >
                        {Object.keys(exchangeRates).map((curr) => (
                            <option key={curr} value={curr}>{curr}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <p className={`font-medium ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                        Converted EMI: {convertedEMI.toLocaleString('en-IN', {
                            style: 'currency',
                            currency: targetCurrency,
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CurrencyConverter;