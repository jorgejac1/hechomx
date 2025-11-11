import { LucideIcon } from 'lucide-react';

interface TrustIndicatorProps {
  icon: LucideIcon;
  value: string;
  label: string;
}

export default function TrustIndicator({ icon: Icon, value, label }: TrustIndicatorProps) {
  return (
    <div>
      <div className="flex items-center justify-center gap-2 mb-1">
        <Icon className="w-5 h-5" />
        <p className="text-3xl font-bold">{value}</p>
      </div>
      <p className="text-primary-200 text-sm">{label}</p>
    </div>
  );
}
