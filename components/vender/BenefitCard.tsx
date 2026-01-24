import { LucideIcon } from 'lucide-react';

interface BenefitCardProps {
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  title: string;
  description: string;
}

export default function BenefitCard({
  icon: Icon,
  iconColor,
  iconBg,
  title,
  description,
}: BenefitCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-6 hover:shadow-xl dark:hover:shadow-gray-900/70 transition">
      <div
        className={`w-12 h-12 ${iconBg} dark:opacity-80 rounded-lg flex items-center justify-center mb-4`}
      >
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}
