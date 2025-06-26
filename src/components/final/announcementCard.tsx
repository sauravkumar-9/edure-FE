import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AnnouncementCardProps {
  id: number;
  title: string;
  content: string;
  date: string;
  onReadMore?: () => void;
}

export function AnnouncementCard({
  title,
  content,
  date,
  onReadMore,
}: AnnouncementCardProps) {
  return (
    <Card className="hover:shadow-md">
      <CardContent className="px-4">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-semibold">{title}</h4>
          <span className="text-xs text-gray-500">{date}</span>
        </div>
        <p className="text-sm text-gray-700">{content}</p>
        <Button
          variant="link"
          size="sm"
          className="px-0 text-orange-600 hover:no-underline mt-2"
          onClick={onReadMore}
        >
          Read more →
        </Button>
      </CardContent>
    </Card>
  );
}
