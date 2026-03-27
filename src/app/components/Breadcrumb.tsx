import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm">
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-1">
          {index > 0 && <ChevronRight size={14} className="text-[#bbbebe]" />}
          {item.href && index < items.length - 1 ? (
            <Link
              to={item.href}
              className="text-[#737a82] hover:text-[#161b21] transition-default"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-[#161b21] font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
};
