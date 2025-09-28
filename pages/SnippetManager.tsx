
import React, { useState } from 'react';
import { Grid, GridColumn, GridCellProps } from '@progress/kendo-react-grid';
import { Button } from '@progress/kendo-react-buttons';
import { Tooltip } from '@progress/kendo-react-tooltip';
import { Badge } from '@progress/kendo-react-indicators';
import { mockSnippets } from '../constants/mockData';
import { Snippet } from '../types';
import SnippetDialog from '../components/SnippetDialog';
import PageContainer from '../components/PageContainer';

const SnippetManager: React.FC = () => {
  const [snippets, setSnippets] = useState<Snippet[]>(mockSnippets);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedSnippet, setSelectedSnippet] = useState<Snippet | null>(null);

  const openDialog = (snippet: Snippet) => {
    setSelectedSnippet(snippet);
    setDialogVisible(true);
  };

  const closeDialog = () => {
    setSelectedSnippet(null);
    setDialogVisible(false);
  };

  const handleSave = (updatedSnippet: Snippet) => {
    setSnippets(snippets.map(s => s.id === updatedSnippet.id ? updatedSnippet : s));
    closeDialog();
  };
  
  const CommandCell = (props: GridCellProps) => {
    const { dataItem } = props;
    // FIX: Removed <td> wrapper for use with `cells` prop
    return (
        <Button size="small" onClick={() => openDialog(dataItem as Snippet)}>View/Edit</Button>
    );
  };

  return (
    <PageContainer title="Code Snippet Manager">
      <Tooltip anchorElement="th" position="top">
        <div className="p-2 bg-gray-800 text-white rounded-md">
          <p>Click headers to sort snippets.</p>
        </div>
      </Tooltip>

      <Grid
        data={snippets}
        style={{ height: 'calc(100vh - 150px)' }}
        sortable={true}
        pageable={true}
        pageSize={10}
      >
        <GridColumn field="title" title="Title" width="300px" />
        <GridColumn 
            field="language" 
            title="Language" 
            width="120px" 
            // FIX: Changed `cell` prop to `cells` and removed <td> wrapper
            cells={{
                data: (props) => (
                    <Badge themeColor="info">{props.dataItem.language}</Badge>
                )
            }}
        />
        <GridColumn 
            field="tags" 
            title="Tags" 
            // FIX: Changed `cell` prop to `cells` and removed <td> wrapper
            cells={{
                data: (props) => (
                    <div className="flex flex-wrap gap-1">
                        {(props.dataItem.tags as Snippet['tags']).map(tag => (
                            <Badge key={tag.id} themeColor="secondary">{tag.name}</Badge>
                        ))}
                    </div>
                )
            }}
        />
        <GridColumn field="createdAt" title="Created At" filter="date" format="{0:d}" width="150px" />
        {/* FIX: Changed `cell` prop to `cells` */}
        <GridColumn cells={{data: CommandCell}} title="Actions" width="120px" />
      </Grid>

      {dialogVisible && selectedSnippet && (
        <SnippetDialog 
          snippet={selectedSnippet} 
          onClose={closeDialog} 
          onSave={handleSave} 
        />
      )}
    </PageContainer>
  );
};

export default SnippetManager;