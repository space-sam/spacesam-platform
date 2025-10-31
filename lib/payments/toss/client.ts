import { TossPaymentRequest, TossPaymentResponse } from "@/types";

const TOSS_API_URL = "https://api.tosspayments.com/v1";

export class TossPaymentsClient {
  private clientKey: string;
  private secretKey: string;

  constructor() {
    this.clientKey = process.env.TOSS_CLIENT_KEY || "";
    this.secretKey = process.env.TOSS_SECRET_KEY || "";
  }

  /**
   * Request a payment
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async requestPayment(_request: TossPaymentRequest) {
    // This is called from the client side
    // Use Toss Payments SDK in the browser
    throw new Error("Use Toss Payments SDK on client side");
  }

  /**
   * Confirm a payment after user approval
   */
  async confirmPayment(
    paymentKey: string,
    orderId: string,
    amount: number
  ): Promise<TossPaymentResponse> {
    const response = await fetch(`${TOSS_API_URL}/payments/confirm`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(this.secretKey + ":").toString(
          "base64"
        )}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentKey,
        orderId,
        amount,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Payment confirmation failed: ${error.message}`);
    }

    return response.json();
  }

  /**
   * Get payment details
   */
  async getPayment(paymentKey: string): Promise<TossPaymentResponse> {
    const response = await fetch(`${TOSS_API_URL}/payments/${paymentKey}`, {
      headers: {
        Authorization: `Basic ${Buffer.from(this.secretKey + ":").toString(
          "base64"
        )}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch payment details");
    }

    return response.json();
  }

  /**
   * Cancel a payment
   */
  async cancelPayment(
    paymentKey: string,
    cancelReason: string
  ): Promise<TossPaymentResponse> {
    const response = await fetch(
      `${TOSS_API_URL}/payments/${paymentKey}/cancel`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(this.secretKey + ":").toString(
            "base64"
          )}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cancelReason,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Payment cancellation failed: ${error.message}`);
    }

    return response.json();
  }
}

// Export singleton instance
export const tossPayments = new TossPaymentsClient();
