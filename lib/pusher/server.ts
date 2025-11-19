import Pusher from "pusher";

export const pusherServer = new Pusher({
  appId: process.env.PUSHER_APP_ID || "",
  key: process.env.NEXT_PUBLIC_PUSHER_KEY || "",
  secret: process.env.PUSHER_SECRET || "",
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "ap3",
  useTLS: true,
});

// Helper function to send a message to a chat room
export async function sendChatMessage(
  projectId: string,
  message: {
    id: string;
    senderId: string;
    senderName: string;
    senderImage?: string;
    content: string;
    createdAt: Date;
  }
) {
  await pusherServer.trigger(`project-${projectId}`, "new-message", message);
}

// Helper function to notify typing status
export async function notifyTyping(projectId: string, userId: string, isTyping: boolean) {
  await pusherServer.trigger(`project-${projectId}`, "typing", {
    userId,
    isTyping,
  });
}
