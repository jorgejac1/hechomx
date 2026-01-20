import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon: Icon,
  iconColor,
  iconBg,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="flex gap-4 p-6 bg-gray-50 rounded-xl">
      <div
        className={`w-12 h-12 ${iconBg} rounded-lg flex items-center justify-center shrink-0`}
      >
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}
