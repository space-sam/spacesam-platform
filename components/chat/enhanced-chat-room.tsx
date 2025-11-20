"use client";

import { useEffect, useState, useRef } from "react";
import { pusherClient } from "@/lib/pusher/client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Paperclip, Smile, MoreVertical, Phone, Video } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderImage?: string;
  content: string;
  createdAt: Date;
  attachments?: string[];
}

interface ChatRoomProps {
  projectId: string;
  projectTitle: string;
  currentUserId: string;
  otherUser: {
    name: string;
    image?: string;
    role: string;
  };
  initialMessages: Message[];
}

export function EnhancedChatRoom({
  projectId,
  projectTitle,
  currentUserId,
  otherUser,
  initialMessages,
}: ChatRoomProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Subscribe to the project channel
    const channel = pusherClient.subscribe(`project-${projectId}`);

    // Listen for new messages
    channel.bind("new-message", (data: Message) => {
      setMessages((prev) => {
        if (prev.some((msg) => msg.id === data.id)) {
          return prev;
        }
        return [...prev, data];
      });
    });

    // Listen for typing indicators
    channel.bind("user-typing", (data: { userId: string; isTyping: boolean }) => {
      if (data.userId !== currentUserId) {
        setIsTyping(data.isTyping);
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [projectId, currentUserId]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMessage.trim() || isSending) return;

    setIsSending(true);

    try {
      const response = await fetch("/api/chat/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          content: newMessage.trim(),
        }),
      });

      if (response.ok) {
        setNewMessage("");
        inputRef.current?.focus();
      } else {
        alert("메시지 전송에 실패했습니다.");
      }
    } catch {
      alert("메시지 전송 중 오류가 발생했습니다.");
    } finally {
      setIsSending(false);
    }
  };

  const formatMessageTime = (date: Date) => {
    const now = new Date();
    const messageDate = new Date(date);
    const isToday =
      now.getDate() === messageDate.getDate() &&
      now.getMonth() === messageDate.getMonth() &&
      now.getFullYear() === messageDate.getFullYear();

    if (isToday) {
      return messageDate.toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    return messageDate.toLocaleDateString("ko-KR", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card className="h-full flex flex-col border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <CardHeader className="border-b dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Avatar className="h-10 w-10 border-2 border-white dark:border-gray-800 shadow-md">
                <AvatarImage src={otherUser.image} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                  {otherUser.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {/* Online status */}
              <div
                className={cn(
                  "absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white dark:border-gray-900",
                  isOnline ? "bg-green-500" : "bg-gray-400"
                )}
              />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {otherUser.name}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {projectTitle}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Video className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center mb-4">
                <Send className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                대화를 시작해보세요!
              </p>
            </div>
          ) : (
            messages.map((message, index) => {
              const isOwnMessage = message.senderId === currentUserId;
              const showAvatar =
                index === 0 ||
                messages[index - 1].senderId !== message.senderId;

              return (
                <div
                  key={message.id}
                  className={cn(
                    "flex items-end space-x-2",
                    isOwnMessage && "flex-row-reverse space-x-reverse"
                  )}
                >
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    {showAvatar && !isOwnMessage ? (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={message.senderImage} />
                        <AvatarFallback className="text-xs bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600">
                          {message.senderName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="w-8 h-8" />
                    )}
                  </div>

                  {/* Message bubble */}
                  <div className="flex flex-col max-w-[70%]">
                    <div
                      className={cn(
                        "rounded-2xl px-4 py-2 shadow-md",
                        isOwnMessage
                          ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-br-md"
                          : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-md"
                      )}
                    >
                      <p className="text-sm whitespace-pre-wrap break-words">
                        {message.content}
                      </p>
                    </div>
                    <div
                      className={cn(
                        "text-xs text-gray-400 mt-1 px-2",
                        isOwnMessage ? "text-right" : "text-left"
                      )}
                    >
                      {formatMessageTime(message.createdAt)}
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-end space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={otherUser.image} />
                <AvatarFallback className="text-xs">
                  {otherUser.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="bg-gray-200 dark:bg-gray-700 rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="border-t dark:border-gray-700 p-4 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-full flex-shrink-0"
            >
              <Paperclip className="h-5 w-5" />
            </Button>

            <div className="flex-1 relative">
              <Input
                ref={inputRef}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="메시지를 입력하세요..."
                disabled={isSending}
                className="pr-10 rounded-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full"
              >
                <Smile className="h-5 w-5" />
              </Button>
            </div>

            <Button
              type="submit"
              size="icon"
              disabled={isSending || !newMessage.trim()}
              className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 flex-shrink-0 shadow-lg"
            >
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
