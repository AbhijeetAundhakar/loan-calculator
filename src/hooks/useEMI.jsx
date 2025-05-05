import { useMemo } from 'react';

export const useEMI = (principal, annualRate, years) => {
    return useMemo(() => {
        const monthlyRate = annualRate / 12 / 100;
        const numberOfPayments = years * 12;

        if (monthlyRate === 0) {
            return principal / numberOfPayments;
        }

        const emi = principal * monthlyRate *
            Math.pow(1 + monthlyRate, numberOfPayments) /
            (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

        return emi;
    }, [principal, annualRate, years]);
};

export const useAmortization = (principal, annualRate, years, emi) => {
    return useMemo(() => {
        const monthlyRate = annualRate / 12 / 100;
        const schedule = [];
        let balance = principal;

        for (let month = 1; month <= years * 12; month++) {
            const interest = balance * monthlyRate;
            const principalPayment = emi - interest;
            balance -= principalPayment;

            schedule.push({
                month,
                principal: principalPayment,
                interest,
                balance: balance > 0 ? balance : 0
            });

            if (balance <= 0) break;
        }

        return schedule;
    }, [principal, annualRate, years, emi]);
};