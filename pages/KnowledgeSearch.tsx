
import React, { useState } from 'react';
import { Input } from '@progress/kendo-react-inputs';
import { Button } from '@progress/kendo-react-buttons';
import { Card, CardBody, CardHeader, CardTitle } from '@progress/kendo-react-layout';
import { Loader } from '@progress/kendo-react-indicators';
import { nucliaService } from '../services/nucliaService';
import PageContainer from '../components/PageContainer';
import { Search, BrainCircuit, FileText } from 'lucide-react';

const KnowledgeSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await nucliaService.ask(query);
      setResult(response);
    } catch (err) {
      setError('Failed to fetch results. Please check your Nuclia configuration and network.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer title="Knowledge AI Search">
      <div className="mb-6 p-6 border rounded-lg bg-white shadow-sm">
        <div className="flex items-center gap-2 mb-4">
            <BrainCircuit className="text-indigo-600"/>
            <h3 className="font-semibold text-lg text-gray-800">Ask a question to your knowledge base</h3>
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="e.g., How do I handle state in the KendoReact Grid?"
            value={query}
            onChange={(e) => setQuery(e.target.value as string)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-grow"
          />
          <Button themeColor="primary" onClick={handleSearch} disabled={loading} icon="search">
            <Search size={16}/> {loading ? 'Asking...' : 'Ask'}
          </Button>
        </div>
      </div>

      {loading && <div className="text-center p-8"><Loader size="large" type="converging-spinner" /></div>}
      
      {error && (
        <Card className="bg-red-50 border-red-200">
            <CardBody>
                <p className="text-red-700">{error}</p>
            </CardBody>
        </Card>
      )}

      {result && (
        <div className="animate-fade-in space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>AI Generated Answer</CardTitle>
                </CardHeader>
                <CardBody>
                    <p className="text-gray-700 whitespace-pre-wrap">{result.answer}</p>
                </CardBody>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Sources</CardTitle>
                </CardHeader>
                <CardBody>
                    <ul className="space-y-2">
                    {result.sources.map((source: any, index: number) => (
                        <li key={index} className="flex items-start gap-2 p-2 border-b last:border-b-0">
                           <FileText size={16} className="text-gray-500 mt-1"/>
                           <span className="text-indigo-600 font-medium">{source.title || 'Unknown Source'}</span>
                        </li>
                    ))}
                    </ul>
                </CardBody>
            </Card>
        </div>
      )}
    </PageContainer>
  );
};

export default KnowledgeSearch;
