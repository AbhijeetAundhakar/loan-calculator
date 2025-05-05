import { useState, useContext } from 'react';
import { useApp } from '../context/AppContext';
import { useEMI, useAmortization } from '../hooks/useEMI';
import AmortizationTable from './AmortizationTable';
import CurrencyConverter from './CurrencyConverter';

const LoanForm = () => {
    const {
        loanAmount, setLoanAmount,
        interestRate, setInterestRate,
        loanTerm, setLoanTerm,
        currency
    } = useApp();

    const [showTable, setShowTable] = useState(false);
    const emi = useEMI(loanAmount, interestRate, loanTerm);
    const amortizationSchedule = useAmortization(loanAmount, interestRate, loanTerm, emi);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowTable(true);
    };


    const resetButtonStyles = {
        base: {
            backgroundColor: 'transparent', // red-600
            color: '#dc2626',
            padding: '0.5rem 1rem',
            borderRadius: '0.375rem',
            fontWeight: '500',
            border: '1px solid #dc2626',
            fontSize:'12px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem'
        },
        hover: {
            // backgroundColor: '#b91c1c',
        },
        icon: {
            marginRight: '0.25rem',
            width: '16px',
            height: '16px',
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Loan Calculator Dashboard</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 font-medium">Loan Amount</label>
                        <input
                            type="number"
                            value={loanAmount}
                            onChange={(e) => setLoanAmount(Number(e.target.value))}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Interest Rate (%)</label>
                        <input
                            type="number"
                            step="0.01"
                            value={interestRate}
                            onChange={(e) => setInterestRate(Number(e.target.value))}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 font-medium">Term (Years)</label>
                        <input
                            type="number"
                            value={loanTerm}
                            onChange={(e) => setLoanTerm(Number(e.target.value))}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                            required
                        />
                    </div>
                    <div className="flex items-end">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
                        >
                            CALCULATE
                        </button>
                    </div>
                </div>
            </form>

            {showTable && (
                <div className="mt-8">
                    <div className="flex justify-between items-center mb-4 p-3 bg-gray-50/80 dark:bg-gray-900/80 rounded-lg shadow-sm backdrop-blur-sm">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Monthly EMI: {currency} {emi.toFixed(2)}
                        </h2>
                        <button
                            onClick={() => setShowTable(false)}
                            style={resetButtonStyles.base}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = resetButtonStyles.hover.backgroundColor}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = resetButtonStyles.base.backgroundColor}
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                style={resetButtonStyles.icon}
                            >
                                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                            RESET TABLE
                        </button>
                    </div>

                    <CurrencyConverter emi={emi} />

                    <h3 className="text-lg font-semibold mt-6 mb-3">Amortization Schedule ({currency})</h3>
                    <AmortizationTable schedule={amortizationSchedule} currency={currency} />
                </div>
            )}
        </div>
    );
};

export default LoanForm;