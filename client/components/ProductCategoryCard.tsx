import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ProductCategoryCardProps {
  category: string;
  count: number;
  tags: string[];
  link: string;
  icon?: React.ReactNode;
  description?: string;
}

export default function ProductCategoryCard({ 
  category, 
  count, 
  tags, 
  link, 
  icon,
  description 
}: ProductCategoryCardProps) {
  return (
    <Link to={link} className="block">
      <Card className="h-full transition-all duration-200 hover:shadow-lg hover:scale-105 cursor-pointer border-l-4 border-l-brand">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {icon}
              <CardTitle className="text-lg font-bold">{category}</CardTitle>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-brand">{count}</div>
              <div className="text-xs text-muted-foreground">Products</div>
            </div>
          </div>
          {description && (
            <CardDescription className="text-sm">{description}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-1">
            {tags.map((tag, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className={cn(
                  "text-xs",
                  tag === 'DATA' && "bg-blue-100 text-blue-800",
                  tag === 'VOICE' && "bg-green-100 text-green-800", 
                  tag === 'SMS' && "bg-purple-100 text-purple-800"
                )}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
