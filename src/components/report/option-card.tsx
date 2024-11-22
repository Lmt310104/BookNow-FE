import { Card } from "@/components/ui/card";

interface OptionCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  className?: string;
}

export default function OptionCard({
  title,
  value,
  icon,
  className = "",
}: OptionCardProps) {
  return (
    <Card className={`p-6 ` + className}>
      <div className="flex flex-row justify-between">
        <span className="text-sm font-medium">{title}</span>
        {icon}
      </div>
      <div className="text-2xl font-bold">{value}</div>
    </Card>
  );
}
