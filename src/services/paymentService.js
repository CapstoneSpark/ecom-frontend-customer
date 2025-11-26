export class PaymentService {
    // Simulate payment processing
    static async processPayment(amount, paymentMethod) {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 2000));
        // Mock validation
        if (paymentMethod.type === "credit-card") {
            if (!paymentMethod.cardNumber || paymentMethod.cardNumber.length < 16) {
                return { success: false, error: "Invalid card number" };
            }
            if (!paymentMethod.cvv || paymentMethod.cvv.length < 3) {
                return { success: false, error: "Invalid CVV" };
            }
        }
        // Simulate successful payment (90% success rate)
        const isSuccess = Math.random() > 0.1;
        if (isSuccess) {
            return {
                success: true,
                transactionId: `TXN${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
            };
        }
        else {
            return {
                success: false,
                error: "Payment declined. Please try another payment method.",
            };
        }
    }
    // Validate card number (Luhn algorithm)
    static validateCardNumber(cardNumber) {
        const digits = cardNumber.replace(/\D/g, "");
        if (digits.length < 13 || digits.length > 19)
            return false;
        let sum = 0;
        let isEven = false;
        for (let i = digits.length - 1; i >= 0; i--) {
            let digit = parseInt(digits[i]);
            if (isEven) {
                digit *= 2;
                if (digit > 9)
                    digit -= 9;
            }
            sum += digit;
            isEven = !isEven;
        }
        return sum % 10 === 0;
    }
    // Get card type from number
    static getCardType(cardNumber) {
        const digits = cardNumber.replace(/\D/g, "");
        if (/^4/.test(digits))
            return "Visa";
        if (/^5[1-5]/.test(digits))
            return "Mastercard";
        if (/^3[47]/.test(digits))
            return "American Express";
        if (/^6(?:011|5)/.test(digits))
            return "Discover";
        return "Unknown";
    }
    // Format card number for display
    static formatCardNumber(cardNumber) {
        const digits = cardNumber.replace(/\D/g, "");
        return digits.replace(/(\d{4})/g, "$1 ").trim();
    }
}
