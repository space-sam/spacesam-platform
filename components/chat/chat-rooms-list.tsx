"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatRoom {
  projectId: string;
  projectTitle: string;
  otherUser: {
    name: string;
    image?: string;
    role: string;
  };
  lastMessage?: {
    content: string;
    timestamp: Date;
    isRead: boolean;
  };
  unreadCount: number;
  status: "active" | "archived";
}

interface ChatRoomsListProps {
  rooms: ChatRoom[];
}

export function ChatRoomsList({ rooms }: ChatRoomsListProps) {
  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}일 전`;
    if (hours > 0) return `${hours}시간 전`;
    if (minutes > 0) return `${minutes}분 전`;
    return "방금 전";
  };

  const activeRooms = rooms.filter((r) => r.status === "active");
  const archivedRooms = rooms.filter((r) => r.status === "archived");

  return (
    <Card className="border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MessageSquare className="h-5 w-5" />
          <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            메시지
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {rooms.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 mb-4">
              <MessageSquare className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-gray-500 dark:text-gray-400">
              아직 대화가 없습니다
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {/* Active Rooms */}
            {activeRooms.length > 0 && (
              <div className="space-y-2">
                {activeRooms.map((room) => (
                  <Link key={room.projectId} href={`/projects/${room.projectId}`}>
                    <div
                      className={cn(
                        "group relative p-4 rounded-xl transition-all duration-300 cursor-pointer",
                        "hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50",
                        "dark:hover:from-blue-950 dark:hover:to-purple-950",
                        room.unreadCount > 0 &&
                          "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950"
                      )}
                    >
                      {/* Unread indicator */}
                      {room.unreadCount > 0 && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-r-full" />
                      )}

                      <div className="flex items-start space-x-3">
                        {/* Avatar */}
                        <div className="relative">
                          <Avatar className="h-12 w-12 border-2 border-white dark:border-gray-800 shadow-md">
                            <AvatarImage src={room.otherUser.image} />
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                              {room.otherUser.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          {/* Online status (placeholder) */}
                          <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white dark:border-gray-900 bg-green-500" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-gray-900 dark:text-white truncate">
                                {room.otherUser.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {room.projectTitle}
                              </p>
                            </div>
                            <div className="flex flex-col items-end space-y-1 ml-2">
                              {room.lastMessage && (
                                <span className="text-xs text-gray-400 flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {getTimeAgo(room.lastMessage.timestamp)}
                                </span>
                              )}
                              {room.unreadCount > 0 && (
                                <Badge className="h-5 px-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                                  {room.unreadCount}
                                </Badge>
                              )}
                            </div>
                          </div>
                          {room.lastMessage && (
                            <p
                              className={cn(
                                "text-sm mt-1 truncate",
                                room.unreadCount > 0
                                  ? "font-medium text-gray-900 dark:text-white"
                                  : "text-gray-500 dark:text-gray-400"
                              )}
                            >
                              {room.lastMessage.content}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Archived Rooms */}
            {archivedRooms.length > 0 && (
              <div className="mt-6 pt-6 border-t dark:border-gray-700">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 px-2">
                  보관됨
                </p>
                <div className="space-y-2 opacity-60">
                  {archivedRooms.map((room) => (
                    <Link key={room.projectId} href={`/projects/${room.projectId}`}>
                      <div className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={room.otherUser.image} />
                            <AvatarFallback className="text-xs">
                              {room.otherUser.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                              {room.otherUser.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                              {room.projectTitle}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
