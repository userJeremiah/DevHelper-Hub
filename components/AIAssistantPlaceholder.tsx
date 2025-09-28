
import React from 'react';
import { Card, CardHeader, CardBody } from '@progress/kendo-react-layout';
import { Bot } from 'lucide-react';

const AIAssistantPlaceholder: React.FC = () => {
    return (
        <Card className="mt-4 bg-blue-50 border-blue-200">
            <CardHeader className="flex items-center gap-2">
                <Bot className="text-blue-600" />
                <h3 className="font-bold text-blue-800">KendoReact AI Coding Assistant</h3>
            </CardHeader>
            <CardBody>
                <p className="text-sm text-gray-700">
                    This is where the KendoReact AI Coding Assistant would be integrated.
                </p>
                <p className="text-sm text-gray-600 mt-2">
                    For example, you could ask it to:
                </p>
                <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                    <li>"Generate a KendoReact Grid with sorting and filtering for this data structure."</li>
                    <li>"Refactor this code snippet for better performance."</li>
                    <li>"Add comments and documentation to this function."</li>
                </ul>
            </CardBody>
        </Card>
    );
};

export default AIAssistantPlaceholder;
