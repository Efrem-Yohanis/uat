import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useState } from 'react';

const msisdnRegex = /^\+?\d{8,15}$/;

export default function GiftBundle() {
  const [sender, setSender] = useState('');
  const [receiver, setReceiver] = useState('');
  const [bundleId, setBundleId] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!msisdnRegex.test(sender) || !msisdnRegex.test(receiver)) {
      setError('Please enter valid MSISDNs for both sender and receiver.');
      return;
    }
    if (!bundleId.trim()) {
      setError('Bundle ID is required.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/bundles/gift', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender, receiver, bundleId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed to process gift');
      setMessage(data?.message || 'Gift sent successfully.');
      setSender('');
      setReceiver('');
      setBundleId('');
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
            <CardTitle>Gift Bundle</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-4">
              <div>
                <Label htmlFor="sender">Sender (A Party)</Label>
                <Input id="sender" value={sender} onChange={(e) => setSender(e.target.value)} placeholder="MSISDN" />
              </div>
              <div>
                <Label htmlFor="receiver">Receiver (B Party)</Label>
                <Input id="receiver" value={receiver} onChange={(e) => setReceiver(e.target.value)} placeholder="MSISDN" />
              </div>
              <div>
                <Label htmlFor="bundleId">Bundle ID</Label>
                <Input id="bundleId" value={bundleId} onChange={(e) => setBundleId(e.target.value)} placeholder="Bundle ID" />
              </div>
              <Button type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send'}</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
