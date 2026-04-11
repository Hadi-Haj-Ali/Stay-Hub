import React from 'react';
import {
  Search,
  MapPin,
  Heart,
  Moon,
  User,
  ArrowLeft,
  Phone,
  MessageCircle,
  Star,
  LucideIcon,
} from 'lucide-react-native';

type IconName =
  | 'search'
  | 'map-pin'
  | 'heart'
  | 'moon'
  | 'user'
  | 'arrow-left'
  | 'phone'
  | 'message-circle'
  | 'star';

const icons: Record<IconName, LucideIcon> = {
  search: Search,
  'map-pin': MapPin,
  heart: Heart,
  moon: Moon,
  user: User,
  'arrow-left': ArrowLeft,
  phone: Phone,
  'message-circle': MessageCircle,
  star: Star,
};

interface AppIconProps {
  name: IconName;
  size?: number;
  color?: string;
  fill?: string;
}

export function AppIcon({
  name,
  size = 24,
  color = '#111827',
  fill,
}: AppIconProps) {
  const Icon = icons[name];
  return <Icon size={size} color={color} fill={fill} />;
}