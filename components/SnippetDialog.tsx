
import React, { useState } from 'react';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { Button } from '@progress/kendo-react-buttons';
// FIX: Import specific event types for KendoReact inputs
import { Input, TextArea, InputChangeEvent, TextAreaChangeEvent } from '@progress/kendo-react-inputs';
import { MultiSelect, MultiSelectChangeEvent } from '@progress/kendo-react-dropdowns';
import { Snippet, Tag } from '../types';
import { allTags } from '../constants/mockData';
import AIAssistantPlaceholder from './AIAssistantPlaceholder';

interface SnippetDialogProps {
  snippet: Snippet;
  onClose: () => void;
  onSave: (snippet: Snippet) => void;
}

const SnippetDialog: React.FC<SnippetDialogProps> = ({ snippet, onClose, onSave }) => {
  const [editedSnippet, setEditedSnippet] = useState<Snippet>(snippet);
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  // FIX: Use correct event types from KendoReact and access value from `e.value`
  const handleChange = (e: InputChangeEvent | TextAreaChangeEvent) => {
    if (e.target.name) {
      setEditedSnippet({ ...editedSnippet, [e.target.name]: e.value });
    }
  };
  
  // FIX: Use correct event type for MultiSelect change
  const handleTagChange = (e: MultiSelectChangeEvent) => {
    setEditedSnippet({ ...editedSnippet, tags: e.value });
  };

  const handleSave = () => {
    onSave(editedSnippet);
  };
  
  return (
    <Dialog title="Snippet Details" onClose={onClose} width={800}>
      <div className="space-y-4 p-4">
        <div>
          <label htmlFor="title" className="font-semibold text-sm">Title</label>
          <Input id="title" name="title" value={editedSnippet.title} onChange={handleChange} className="w-full" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="language" className="font-semibold text-sm">Language</label>
            <Input id="language" name="language" value={editedSnippet.language} onChange={handleChange} className="w-full" />
          </div>
          <div>
            <label htmlFor="tags" className="font-semibold text-sm">Tags</label>
            <MultiSelect
              data={allTags}
              textField="name"
              dataItemKey="id"
              value={editedSnippet.tags}
              onChange={handleTagChange}
              className="w-full"
            />
          </div>
        </div>
        <div>
          <label htmlFor="description" className="font-semibold text-sm">Description</label>
          <TextArea id="description" name="description" value={editedSnippet.description} onChange={handleChange} rows={3} className="w-full" />
        </div>
        <div>
          <label htmlFor="code" className="font-semibold text-sm">Code</label>
          <TextArea id="code" name="code" value={editedSnippet.code} onChange={handleChange} rows={15} className="w-full font-mono text-sm" />
        </div>
        <div className="border-t pt-4">
            <Button themeColor="primary" fillMode="outline" onClick={() => setShowAIAssistant(!showAIAssistant)}>
                {showAIAssistant ? 'Hide' : 'Use'} KendoReact AI Assistant
            </Button>
            {showAIAssistant && <AIAssistantPlaceholder />}
        </div>
      </div>
      <DialogActionsBar>
        <Button onClick={onClose}>Cancel</Button>
        <Button themeColor="primary" onClick={handleSave}>Save</Button>
      </DialogActionsBar>
    </Dialog>
  );
};

export default SnippetDialog;