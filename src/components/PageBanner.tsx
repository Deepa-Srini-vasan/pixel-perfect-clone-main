import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface PageBannerProps {
  title: string;
  breadcrumbs?: { label: string; to?: string }[];
}

const PageBanner = ({ title, breadcrumbs }: PageBannerProps) => {
  return (
    <div className="bg-primary py-6">
      <div className="container-pipes flex items-center justify-between">
        <h1 className="text-primary-foreground text-xl font-heading font-bold">
          {title}
        </h1>
        {breadcrumbs && (
          <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <ChevronRight className="w-4 h-4" />}
                {crumb.to ? (
                  <Link to={crumb.to} className="hover:text-primary-foreground transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-primary-foreground">{crumb.label}</span>
                )}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageBanner;
