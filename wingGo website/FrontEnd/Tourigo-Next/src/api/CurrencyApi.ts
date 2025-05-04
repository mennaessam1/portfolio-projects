import axios from "axios";

export const convertCurrency = async (amount: number, toCurrency: "EUR" | "USD" | "EGP"): Promise<{ amount: number, currency: string }> => {
    // Explicitly typed exchange rates with EUR as the base currency
    const exchangeRates: { EUR: number; USD: number; EGP: number } = {
        EUR: 1,        // EUR as base
        USD: 1.18,     // 1 EUR = 1.18 USD
        EGP: 35        // 1 EUR = 35 EGP
    };

    if (exchangeRates[toCurrency] !== undefined) {
        const convertedAmount = amount * exchangeRates[toCurrency];
        return { amount: convertedAmount, currency: toCurrency };
    } else {
        throw new Error(`Unsupported currency: ${toCurrency}`);
    }
};
