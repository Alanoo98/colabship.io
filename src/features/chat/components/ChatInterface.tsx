import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Send, 
  MessageSquare, 
  User, 
  Clock,
  CheckCircle,
  AlertCircle,
  MoreVertical,
  Phone,
  Video,
  FileText,
  Paperclip
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'file' | 'system';
  status: 'sent' | 'delivered' | 'read';
}

interface ChatInterfaceProps {
  applicationId: string;
  founderName: string;
  founderAvatar?: string;
  collaboratorName: string;
  collaboratorAvatar?: string;
  projectName: string;
  onClose: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  applicationId,
  founderName,
  founderAvatar,
  collaboratorName,
  collaboratorAvatar,
  projectName,
  onClose
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: 'founder',
      senderName: founderName,
      senderAvatar: founderAvatar,
      content: `Hi! Thanks for your application to ${projectName}. I'd love to learn more about your experience.`,
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      type: 'text',
      status: 'read'
    },
    {
      id: '2',
      senderId: 'collaborator',
      senderName: collaboratorName,
      senderAvatar: collaboratorAvatar,
      content: "Hi! I'm excited about the opportunity. I have 5+ years of experience in React and Node.js, and I've built several successful SaaS products. What specific aspects of the project would you like to discuss?",
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      type: 'text',
      status: 'read'
    },
    {
      id: '3',
      senderId: 'founder',
      senderName: founderName,
      senderAvatar: founderAvatar,
      content: "That sounds great! I'm particularly interested in your experience with real-time features and payment integrations. Could you share some examples of projects you've worked on?",
      timestamp: new Date(Date.now() - 900000), // 15 minutes ago
      type: 'text',
      status: 'delivered'
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const currentUserId = 'collaborator'; // This would come from auth context

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: currentUserId,
      senderName: currentUserId === 'founder' ? founderName : collaboratorName,
      senderAvatar: currentUserId === 'founder' ? founderAvatar : collaboratorAvatar,
      content: newMessage.trim(),
      timestamp: new Date(),
      type: 'text',
      status: 'sent'
    };

    setMessages([...messages, message]);
    setNewMessage('');
    setIsTyping(false);

    // Simulate typing indicator from other user
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        // Simulate response (in real app, this would come from WebSocket)
        const response: Message = {
          id: (Date.now() + 1).toString(),
          senderId: currentUserId === 'founder' ? 'collaborator' : 'founder',
          senderName: currentUserId === 'founder' ? collaboratorName : founderName,
          senderAvatar: currentUserId === 'founder' ? collaboratorAvatar : founderAvatar,
          content: "Thanks for the information! Let me review this and get back to you soon.",
          timestamp: new Date(),
          type: 'text',
          status: 'sent'
        };
        setMessages(prev => [...prev, response]);
      }, 2000);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  const getStatusIcon = (status: Message['status']) => {
    switch (status) {
      case 'sent':
        return <CheckCircle className="w-3 h-3 text-muted-foreground" />;
      case 'delivered':
        return <CheckCircle className="w-3 h-3 text-blue-500" />;
      case 'read':
        return <CheckCircle className="w-3 h-3 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto h-[600px] flex flex-col">
      <CardHeader className="flex-shrink-0 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={founderAvatar} />
              <AvatarFallback>{founderName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{founderName}</CardTitle>
              <p className="text-sm text-muted-foreground">{projectName}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              Application #{applicationId.slice(-6)}
            </Badge>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Phone className="w-4 h-4 mr-2" />
                  Schedule Call
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Video className="w-4 h-4 mr-2" />
                  Video Meeting
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileText className="w-4 h-4 mr-2" />
                  View Application
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message, index) => {
            const isOwnMessage = message.senderId === currentUserId;
            const showDate = index === 0 || 
              formatDate(message.timestamp) !== formatDate(messages[index - 1].timestamp);
            
            return (
              <div key={message.id}>
                {showDate && (
                  <div className="text-center mb-4">
                    <Badge variant="secondary" className="text-xs">
                      {formatDate(message.timestamp)}
                    </Badge>
                  </div>
                )}
                
                <div className={`flex gap-3 ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}>
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarImage src={message.senderAvatar} />
                    <AvatarFallback className="text-xs">
                      {message.senderName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className={`max-w-[70%] ${isOwnMessage ? 'text-right' : 'text-left'}`}>
                    <div className={`inline-block p-3 rounded-lg ${
                      isOwnMessage 
                        ? 'bg-accent text-accent-foreground' 
                        : 'bg-muted'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                    </div>
                    
                    <div className={`flex items-center gap-1 mt-1 text-xs text-muted-foreground ${
                      isOwnMessage ? 'justify-end' : 'justify-start'
                    }`}>
                      <Clock className="w-3 h-3" />
                      <span>{formatTime(message.timestamp)}</span>
                      {isOwnMessage && getStatusIcon(message.status)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          
          {isTyping && (
            <div className="flex gap-3">
              <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarImage src={currentUserId === 'founder' ? collaboratorAvatar : founderAvatar} />
                <AvatarFallback className="text-xs">
                  {(currentUserId === 'founder' ? collaboratorName : founderName).split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="bg-muted p-3 rounded-lg">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <CardContent className="flex-shrink-0 border-t p-4">
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            <Paperclip className="w-4 h-4" />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="pr-12"
            />
          </div>
          
          <Button 
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            size="sm"
            className="glow-green"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
          <span>Press Enter to send, Shift+Enter for new line</span>
          <span>{newMessage.length}/1000</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface; 