import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import ProductCategoryCard from '@/components/ProductCategoryCard';
import BundleDistributionChart from '@/components/BundleDistributionChart';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { 
  Smartphone, 
  Wallet, 
  CreditCard, 
  Users, 
  Banknote, 
  Globe, 
  ShoppingCart, 
  Gift,
  Home
} from 'lucide-react';

interface ProductCategory {
  name: string;
  count: number;
  tags: string[];
  link: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}


interface ChartData {
  category: string;
  count: number;
  color: string;
}

// Mock data - in real app, this would come from API
const mockProductCategories: ProductCategory[] = [
  {
    name: 'CBU',
    count: 25,
    tags: ['DATA', 'VOICE'],
    link: '/bundle_page/CBU',
    icon: <Smartphone className="h-5 w-5 text-blue-600" />,
    description: 'Core Banking Unit products',
    color: '#3B82F6'
  },
  {
    name: 'EBU',
    count: 18,
    tags: ['DATA', 'SMS'],
    link: '/bundle_page/EBU',
    icon: <Wallet className="h-5 w-5 text-green-600" />,
    description: 'Electronic Banking Unit',
    color: '#10B981'
  },
  {
    name: 'M-PESA',
    count: 32,
    tags: ['VOICE', 'SMS'],
    link: '/bundle_page/M-PESA',
    icon: <CreditCard className="h-5 w-5 text-orange-600" />,
    description: 'Mobile Money Services',
    color: '#F59E0B'
  },
  {
    name: 'CVM',
    count: 14,
    tags: ['DATA'],
    link: '/bundle_page/CVM',
    icon: <Users className="h-5 w-5 text-purple-600" />,
    description: 'Customer Value Management',
    color: '#8B5CF6'
  },
  {
    name: 'Loan',
    count: 22,
    tags: ['VOICE'],
    link: '/bundle_page/Loan',
    icon: <Banknote className="h-5 w-5 text-red-600" />,
    description: 'Loan Products',
    color: '#EF4444'
  },
  {
    name: 'ROAMING',
    count: 8,
    tags: ['DATA', 'VOICE', 'SMS'],
    link: '/bundle_page/ROAMING',
    icon: <Globe className="h-5 w-5 text-cyan-600" />,
    description: 'International Roaming',
    color: '#06B6D4'
  },
  {
    name: 'S&D',
    count: 16,
    tags: ['DATA', 'SMS'],
    link: '/bundle_page/S&D',
    icon: <ShoppingCart className="h-5 w-5 text-pink-600" />,
    description: 'Sales & Distribution',
    color: '#EC4899'
  },
  {
    name: 'J4U',
    count: 11,
    tags: ['VOICE', 'SMS'],
    link: '/bundle_page/J4U',
    icon: <Gift className="h-5 w-5 text-indigo-600" />,
    description: 'Just For You offers',
    color: '#6366F1'
  }
];


export default function Dashboard() {
  const [productCounts, setProductCounts] = useState<ProductCategory[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API calls
    const fetchData = async () => {
      setLoading(true);

      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Set product categories with mock data
        setProductCounts(mockProductCategories);

        // Set chart data
        const chartData = mockProductCategories.map(category => ({
          category: category.name,
          count: category.count,
          color: category.color
        }));
        setChartData(chartData);

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalProducts = productCounts.reduce((sum, category) => sum + category.count, 0);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="flex items-center gap-1">
                <Home className="h-4 w-4" />
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Overview of products and system metrics
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-brand">{totalProducts}</div>
            <div className="text-sm text-muted-foreground">Total Products</div>
          </div>
        </div>

        {/* Product Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            // Loading skeletons
            Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="h-32 bg-muted animate-pulse rounded-lg"></div>
            ))
          ) : (
            productCounts.map((category, index) => (
              <ProductCategoryCard
                key={index}
                category={category.name}
                count={category.count}
                tags={category.tags}
                link={category.link}
                icon={category.icon}
                description={category.description}
              />
            ))
          )}
        </div>

        {/* Bundle Distribution Chart - Full Width */}
        <div className="w-full">
          {loading ? (
            <div className="h-96 bg-muted animate-pulse rounded-lg"></div>
          ) : (
            <BundleDistributionChart data={chartData} />
          )}
        </div>
      </div>
    </Layout>
  );
}
