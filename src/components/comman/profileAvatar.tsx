import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileAvatarProps {
  src?: string | null;
  name: string;
  size?: "sm" | "md" | "lg";
}

export function ProfileAvatar({ src, name, size = "md" }: ProfileAvatarProps) {
  const fullName = name.trim();
  const avatarFallback = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const fallBackUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
    fullName
  )}`;

  const sizeClasses = {
    sm: "h-6 w-6 text-xs",
    md: "h-8 w-8 text-sm",
    lg: "h-12 w-12 text-base",
  };

  return (
    <Avatar className={sizeClasses[size]}>
      <AvatarImage src={src || fallBackUrl} />
      <AvatarFallback>{avatarFallback}</AvatarFallback>
    </Avatar>
  );
}
