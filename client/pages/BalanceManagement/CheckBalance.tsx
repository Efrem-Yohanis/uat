import { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Search, Smartphone, AlertCircle, CheckCircle, Wallet, Package, Banknote, History, Home, User, Calendar } from 'lucide-react';

interface AccountData {
  phoneNumber: string;
  accountInfo: {
    customerName: string;
    accountType: string;
    status: string;
    registrationDate: string;
    lastActivity: string;
    mainBalance: number;
    bonusBalance: number;
  };
  bundles: {
    id: string;
    name: string;
    type: string;
    remaining: string;
    expiryDate: string;
    status: string;
  }[];
  loans: {
    id: string;
    amount: number;
    balance: number;
    dueDate: string;
    status: string;
    type: string;
  }[];
  rechargeHistory: {
    id: string;
    date: string;
    amount: number;
    type: string;
    channel: string;
    status: string;
  }[];
}

// Account Info Card Component
const AccountInfoCard = ({ accountInfo }: { accountInfo: AccountData['accountInfo'] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Account Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Customer Name:</span>
              <span className="font-medium">{accountInfo.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Account Type:</span>
              <Badge variant="outline">{accountInfo.accountType}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
              <Badge className={accountInfo.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                {accountInfo.status}
              </Badge>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Main Balance:</span>
              <span className="font-bold text-brand">KES {accountInfo.mainBalance.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Bonus Balance:</span>
              <span className="font-medium">KES {accountInfo.bonusBalance.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Activity:</span>
              <span className="font-medium">{accountInfo.lastActivity}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Bundles Table Component
const BundlesTable = ({ bundles }: { bundles: AccountData['bundles'] }) => {
  if (bundles.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Active Bundles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No active bundles found</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Active Bundles ({bundles.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bundle Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Remaining</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bundles.map((bundle) => (
                <TableRow key={bundle.id}>
                  <TableCell className="font-medium">{bundle.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{bundle.type}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{bundle.remaining}</TableCell>
                  <TableCell>{bundle.expiryDate}</TableCell>
                  <TableCell>
                    <Badge className={bundle.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                      {bundle.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

// Loans Table Component
const LoansTable = ({ loans }: { loans: AccountData['loans'] }) => {
  if (loans.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Banknote className="h-5 w-5" />
            Active Loans
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Banknote className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No active loans found</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Banknote className="h-5 w-5" />
          Active Loans ({loans.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Loan Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loans.map((loan) => (
                <TableRow key={loan.id}>
                  <TableCell className="font-medium">{loan.type}</TableCell>
                  <TableCell>KES {loan.amount.toFixed(2)}</TableCell>
                  <TableCell className="font-medium text-red-600">KES {loan.balance.toFixed(2)}</TableCell>
                  <TableCell>{loan.dueDate}</TableCell>
                  <TableCell>
                    <Badge className={
                      loan.status === 'Active' ? 'bg-yellow-100 text-yellow-800' :
                      loan.status === 'Overdue' ? 'bg-red-100 text-red-800' :
                      'bg-green-100 text-green-800'
                    }>
                      {loan.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

// Recharge History Table Component
const RechargeHistoryTable = ({ rechargeHistory }: { rechargeHistory: AccountData['rechargeHistory'] }) => {
  if (rechargeHistory.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Recharge History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No recharge history found</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          Recent Recharge History ({rechargeHistory.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Channel</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rechargeHistory.map((recharge) => (
                <TableRow key={recharge.id}>
                  <TableCell>{recharge.date}</TableCell>
                  <TableCell className="font-medium">KES {recharge.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{recharge.type}</Badge>
                  </TableCell>
                  <TableCell>{recharge.channel}</TableCell>
                  <TableCell>
                    <Badge className={recharge.status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {recharge.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default function CheckBalance() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [accountData, setAccountData] = useState<AccountData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');
    setAccountData(null);

    try {
      if (!phoneNumber.trim()) {
        setError('Phone number is required');
        setLoading(false);
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (Math.random() > 0.1) { // 90% success rate
        // Mock account data
        const mockAccountData: AccountData = {
          phoneNumber: phoneNumber,
          accountInfo: {
            customerName: 'John Doe Mwangi',
            accountType: 'Prepaid',
            status: 'Active',
            registrationDate: '2022-03-15',
            lastActivity: '2024-01-15 14:30',
            mainBalance: 245.50,
            bonusBalance: 50.00
          },
          bundles: [
            {
              id: 'B001',
              name: 'Data Starter 1GB',
              type: 'Data',
              remaining: '750 MB',
              expiryDate: '2024-02-15',
              status: 'Active'
            },
            {
              id: 'B002',
              name: 'Voice Bundle',
              type: 'Voice',
              remaining: '120 minutes',
              expiryDate: '2024-01-25',
              status: 'Active'
            }
          ],
          loans: [
            {
              id: 'L001',
              amount: 100.00,
              balance: 105.00,
              dueDate: '2024-01-20',
              status: 'Active',
              type: 'Emergency Loan'
            }
          ],
          rechargeHistory: [
            {
              id: 'R001',
              date: '2024-01-15',
              amount: 100.00,
              type: 'Voucher',
              channel: 'PIN',
              status: 'Success'
            },
            {
              id: 'R002',
              date: '2024-01-12',
              amount: 50.00,
              type: 'Pinless',
              channel: 'MPESSA',
              status: 'Success'
            },
            {
              id: 'R003',
              date: '2024-01-10',
              amount: 200.00,
              type: 'Bank Transfer',
              channel: 'Bank',
              status: 'Success'
            }
          ]
        };

        setAccountData(mockAccountData);
        setSuccessMessage(`Account information retrieved successfully for ${phoneNumber}`);
      } else {
        setError('Phone number not found or account inactive. Please check and try again.');
      }
    } catch (err) {
      setError('Failed to retrieve account information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
              <BreadcrumbPage>Check Balance</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Check Balance</h1>
          <p className="text-muted-foreground">
            Search and view comprehensive account information
          </p>
        </div>

        {/* Search Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Account Search
            </CardTitle>
            <CardDescription>
              Enter MSISDN to retrieve complete account information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {successMessage && (
                <Alert className="border-green-200 bg-green-50 text-green-800">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>{successMessage}</AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    MSISDN
                  </Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="e.g., +254712345678"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="flex">
                  <Button
                    type="submit"
                    className="w-full md:w-auto bg-brand hover:bg-brand-600"
                    disabled={loading || !phoneNumber}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Searching...
                      </div>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-2" />
                        Check Balance
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Conditional Display Sections */}
        {accountData && (
          <div className="space-y-6">
            {/* Account Info Card */}
            <AccountInfoCard accountInfo={accountData.accountInfo} />

            {/* Grid Layout for Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Bundles Table */}
              <BundlesTable bundles={accountData.bundles} />

              {/* Loans Table */}
              <LoansTable loans={accountData.loans} />
            </div>

            {/* Recharge History Table - Full Width */}
            <RechargeHistoryTable rechargeHistory={accountData.rechargeHistory} />

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Wallet className="h-4 w-4 text-brand" />
                    <div>
                      <p className="text-sm text-muted-foreground">Total Balance</p>
                      <p className="font-bold">KES {(accountData.accountInfo.mainBalance + accountData.accountInfo.bonusBalance).toFixed(2)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Active Bundles</p>
                      <p className="font-bold">{accountData.bundles.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Banknote className="h-4 w-4 text-red-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Active Loans</p>
                      <p className="font-bold">{accountData.loans.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <History className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Recent Recharges</p>
                      <p className="font-bold">{accountData.rechargeHistory.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
