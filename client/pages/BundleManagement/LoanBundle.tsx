import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useState } from 'react';

const msisdnRegex = /^\+?\d{8,15}$/;

export default function LoanBundle() {
  const [msisdn, setMsisdn] = useState('');
  const [loanId, setLoanId] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!msisdnRegex.test(msisdn)) {
      setError('Please enter a valid MSISDN.');
      return;
    }
    if (!loanId.trim()) {
      setError('Loan ID is required.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/bundles/loan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ msisdn, loanId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed to process loan');
      setMessage(data?.message || 'Loan processed successfully.');
      setMsisdn('');
      setLoanId('');
    } catch (err: any) {
      setError(err.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        {message && (
          <Alert className="mb-4"><AlertDescription>{message}</AlertDescription></Alert>
        )}
        {error && (
          <Alert variant="destructive" className="mb-4"><AlertDescription>{error}</AlertDescription></Alert>
        )}
        <Card>
          <CardHeader>
            <CardTitle>Loan Bundle</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-4">
              <div>
                <Label htmlFor="msisdn">MSISDN</Label>
                <Input id="msisdn" value={msisdn} onChange={(e) => setMsisdn(e.target.value)} placeholder="MSISDN" />
              </div>
              <div>
                <Label htmlFor="loanId">Loan ID</Label>
                <Input id="loanId" value={loanId} onChange={(e) => setLoanId(e.target.value)} placeholder="Loan ID" />
              </div>
              <Button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
