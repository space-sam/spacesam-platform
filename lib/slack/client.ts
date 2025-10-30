import { SlackNotification } from "@/types";

export class SlackClient {
  private botToken: string;
  private webhookUrl: string;

  constructor() {
    this.botToken = process.env.SLACK_BOT_TOKEN || "";
    this.webhookUrl = process.env.SLACK_WEBHOOK_URL || "";
  }

  /**
   * Send a message using webhook (simpler, no token needed)
   */
  async sendWebhookMessage(text: string, blocks?: any[]) {
    if (!this.webhookUrl) {
      console.error("Slack webhook URL not configured");
      return;
    }

    const response = await fetch(this.webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        blocks,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send Slack webhook message");
    }

    return response.json();
  }

  /**
   * Send a message to a specific channel using Bot Token
   */
  async sendMessage(notification: SlackNotification) {
    if (!this.botToken) {
      console.error("Slack bot token not configured");
      return;
    }

    const response = await fetch("https://slack.com/api/chat.postMessage", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.botToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        channel: notification.channel,
        text: notification.text,
        blocks: notification.blocks,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send Slack message");
    }

    const data = await response.json();
    if (!data.ok) {
      throw new Error(`Slack API error: ${data.error}`);
    }

    return data;
  }

  /**
   * Notify about new project
   */
  async notifyNewProject(projectTitle: string, clientName: string) {
    const text = `New project created: *${projectTitle}* by ${clientName}`;
    return this.sendWebhookMessage(text);
  }

  /**
   * Notify about project milestone completion
   */
  async notifyMilestoneCompleted(
    projectTitle: string,
    milestoneName: string
  ) {
    const text = `Milestone completed: *${milestoneName}* in project *${projectTitle}*`;
    return this.sendWebhookMessage(text);
  }

  /**
   * Notify about payment received
   */
  async notifyPaymentReceived(amount: number, projectTitle: string) {
    const text = `Payment received: ${amount.toLocaleString("ko-KR")} KRW for *${projectTitle}*`;
    return this.sendWebhookMessage(text);
  }
}

// Export singleton instance
export const slack = new SlackClient();
