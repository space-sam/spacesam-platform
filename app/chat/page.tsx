"use client";

import { useState } from "react";
import { TopNav } from "@/components/layout/top-nav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Send,
  Paperclip,
  Search,
  MoreVertical,
  Phone,
  Video,
  Smile,
  Check,
  CheckCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Demo user
const DEMO_USER = {
  id: "demo-user-123",
  name: "테스트 사용자",
  email: "demo@spacesam.com",
  role: "CLIENT" as const,
  image: null,
};

// Demo chat rooms
const DEMO_CHAT_ROOMS = [
  {
    id: "1",
    projectId: "proj-1",
    projectTitle: "웹사이트 리디자인",
    otherUser: {
      id: "user-1",
      name: "김프리랜서",
      image: null,
      role: "FREELANCER",
      isOnline: true,
    },
    lastMessage: {
      content: "네, 내일까지 작업 완료하겠습니다!",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      isRead: true,
      senderId: "user-1",
    },
    unreadCount: 2,
  },
  {
    id: "2",
    projectId: "proj-2",
    projectTitle: "모바일 앱 개발",
    otherUser: {
      id: "user-2",
      name: "이개발자",
      image: null,
      role: "FREELANCER",
      isOnline: false,
    },
    lastMessage: {
      content: "UI 디자인 시안 확인 부탁드립니다.",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      isRead: false,
      senderId: "user-2",
    },
    unreadCount: 0,
  },
  {
    id: "3",
    projectId: "proj-3",
    projectTitle: "데이터베이스 최적화",
    otherUser: {
      id: "user-3",
      name: "박디비",
      image: null,
      role: "FREELANCER",
      isOnline: true,
    },
    lastMessage: {
      content: "성능 테스트 결과 공유드립니다.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      isRead: true,
      senderId: "demo-user-123",
    },
    unreadCount: 0,
  },
];

// Demo messages
const DEMO_MESSAGES = [
  {
    id: "msg-1",
    senderId: "user-1",
    content: "안녕하세요! 프로젝트 요구사항 확인했습니다.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    isRead: true,
  },
  {
    id: "msg-2",
    senderId: "demo-user-123",
    content: "네, 감사합니다. 언제 시작 가능하신가요?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23),
    isRead: true,
  },
  {
    id: "msg-3",
    senderId: "user-1",
    content: "이번 주 금요일부터 시작할 수 있습니다. 먼저 와이어프레임 작업부터 진행하겠습니다.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 22),
    isRead: true,
  },
  {
    id: "msg-4",
    senderId: "demo-user-123",
    content: "좋습니다! 예산은 말씀드린 대로 300만원으로 진행하면 될까요?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
    isRead: true,
  },
  {
    id: "msg-5",
    senderId: "user-1",
    content: "네, 내일까지 작업 완료하겠습니다!",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    isRead: true,
  },
];

export default function ChatPage() {
  const [selectedRoom, setSelectedRoom] = useState(DEMO_CHAT_ROOMS[0]);
  const [messages, setMessages] = useState(DEMO_MESSAGES);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}일 전`;
    if (hours > 0) return `${hours}시간 전`;
    if (minutes > 0) return `${minutes}분 전`;
    return "방금 전";
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: `msg-${Date.now()}`,
      senderId: DEMO_USER.id,
      content: newMessage,
      timestamp: new Date(),
      isRead: false,
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  const filteredRooms = DEMO_CHAT_ROOMS.filter(
    (room) =>
      room.otherUser.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.projectTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <TopNav user={DEMO_USER} />

      <div className="h-[calc(100vh-4rem)] flex">
        {/* Sidebar - Chat Rooms List */}
        <div className="w-80 border-r bg-white dark:bg-gray-900 dark:border-gray-800 flex flex-col">
          {/* Sidebar Header */}
          <div className="p-4 border-b dark:border-gray-800">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
              채팅
            </h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="대화 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* Chat Rooms */}
          <ScrollArea className="flex-1">
            <div className="p-2">
              {filteredRooms.map((room) => (
                <button
                  key={room.id}
                  onClick={() => setSelectedRoom(room)}
                  className={cn(
                    "w-full p-3 rounded-lg mb-2 text-left transition-colors",
                    selectedRoom.id === room.id
                      ? "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  )}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={room.otherUser.image || undefined} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                          {room.otherUser.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      {room.otherUser.isOnline && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full ring-2 ring-white dark:ring-gray-900" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-semibold text-gray-900 dark:text-white truncate">
                          {room.otherUser.name}
                        </p>
                        <span className="text-xs text-gray-500">
                          {getTimeAgo(room.lastMessage.timestamp)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 truncate">
                        {room.projectTitle}
                      </p>
                      <div className="flex items-center justify-between">
                        <p
                          className={cn(
                            "text-sm truncate",
                            room.unreadCount > 0
                              ? "font-medium text-gray-900 dark:text-white"
                              : "text-gray-500 dark:text-gray-400"
                          )}
                        >
                          {room.lastMessage.senderId === DEMO_USER.id && (
                            <CheckCheck className="inline h-3 w-3 mr-1 text-blue-500" />
                          )}
                          {room.lastMessage.content}
                        </p>
                        {room.unreadCount > 0 && (
                          <Badge className="ml-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 h-5 min-w-5 px-1.5">
                            {room.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-white dark:bg-gray-900">
          {/* Chat Header */}
          <div className="h-16 border-b dark:border-gray-800 flex items-center justify-between px-6">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedRoom.otherUser.image || undefined} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                    {selectedRoom.otherUser.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {selectedRoom.otherUser.isOnline && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full ring-2 ring-white dark:ring-gray-900" />
                )}
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {selectedRoom.otherUser.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {selectedRoom.otherUser.isOnline ? "온라인" : "오프라인"} • {selectedRoom.projectTitle}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-400">
                <Phone className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-400">
                <Video className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-400">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-4">
              {messages.map((message, index) => {
                const isOwn = message.senderId === DEMO_USER.id;
                const showAvatar =
                  index === 0 ||
                  messages[index - 1].senderId !== message.senderId;

                return (
                  <div
                    key={message.id}
                    className={cn("flex", isOwn ? "justify-end" : "justify-start")}
                  >
                    <div
                      className={cn(
                        "flex max-w-[70%]",
                        isOwn ? "flex-row-reverse" : "flex-row"
                      )}
                    >
                      {showAvatar && !isOwn && (
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src={selectedRoom.otherUser.image || undefined} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-sm">
                            {selectedRoom.otherUser.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className={cn(showAvatar ? "" : !isOwn && "ml-10")}>
                        <div
                          className={cn(
                            "rounded-2xl px-4 py-2",
                            isOwn
                              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                              : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                          )}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                        <div
                          className={cn(
                            "flex items-center space-x-1 mt-1 px-2",
                            isOwn ? "justify-end" : "justify-start"
                          )}
                        >
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {formatTime(message.timestamp)}
                          </span>
                          {isOwn && (
                            <CheckCheck className="h-3 w-3 text-blue-500" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="border-t dark:border-gray-800 p-4">
            <div className="flex items-end space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 dark:text-gray-400 mb-1"
              >
                <Paperclip className="h-5 w-5" />
              </Button>
              <div className="flex-1 relative">
                <Input
                  placeholder="메시지를 입력하세요..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  className="pr-10 resize-none"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-400"
                >
                  <Smile className="h-5 w-5" />
                </Button>
              </div>
              <Button
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
