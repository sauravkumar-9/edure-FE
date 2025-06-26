import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface AccordionSectionProps {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
}

export const AccordionSection = ({
  id,
  icon,
  title,
  subtitle,
  content,
}: AccordionSectionProps) => {
  return (
    <AccordionItem
      key={id}
      value={id}
      className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden bg-white py-2"
    >
      <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-gray-50 dark:hover:bg-gray-900/50">
        <div className="flex flex-col items-start gap-1 w-full">
          <div className="flex items-center gap-3 w-full">
            {icon}
            <div className="flex-1 text-left">
              <h3 className="font-bold text-base">{title}</h3>
              {subtitle && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 py-3 bg-gray-50/50 dark:bg-gray-900/30">
        {content}
      </AccordionContent>
    </AccordionItem>
  );
};
