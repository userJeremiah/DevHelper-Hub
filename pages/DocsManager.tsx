
import React, { useState } from 'react';
import { Upload, UploadFileInfo } from '@progress/kendo-react-upload';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { Button } from '@progress/kendo-react-buttons';
import { mockDocs } from '../constants/mockData';
import { Doc } from '../types';
import PageContainer from '../components/PageContainer';
import { FileText, Trash2 } from 'lucide-react';

const DocsManager: React.FC = () => {
  const [docs, setDocs] = useState<Doc[]>(mockDocs);

  const onAdd = (event: any) => {
    const newFiles: Doc[] = event.newState.map((file: UploadFileInfo) => ({
      id: Math.random(),
      name: file.name,
      // FIX: The file type is available on the rawFile property. Cast to any to bypass type error.
      type: (file as any).rawFile?.type || 'unknown',
      size: file.size || 0,
      uploadedAt: new Date(),
    }));
    setDocs([...docs, ...newFiles]);
  };

  const onRemove = (event: any) => {
    const filesToRemove = new Set(event.newState.map((f: UploadFileInfo) => f.name));
    setDocs(docs.filter(doc => !filesToRemove.has(doc.name)));
  };
  
  const removeDoc = (id: number) => {
    setDocs(docs.filter(doc => doc.id !== id));
  };

  return (
    <PageContainer title="Documents & Notes">
      <div className="mb-6 p-6 border rounded-lg bg-white shadow-sm">
        <h3 className="font-semibold text-lg mb-2">Upload New Files</h3>
        <p className="text-sm text-gray-600 mb-4">
          Upload Markdown or text files to build your knowledge base. These documents will be searchable by the Knowledge AI.
        </p>
        <Upload
          batch={false}
          multiple={true}
          defaultFiles={[]}
          onAdd={onAdd}
          onRemove={onRemove}
          restrictions={{
            allowedExtensions: ['.md', '.txt'],
          }}
        />
      </div>

      <Grid data={docs} style={{ height: 'calc(100vh - 350px)' }}>
        <GridColumn 
            field="name" 
            title="File Name"
            // FIX: Changed `cell` prop to `cells` and moved styling to an inner div.
            cells={{
                data: (props) => (
                    <div className="flex items-center gap-2">
                        <FileText size={16} className="text-gray-500"/>
                        <span>{props.dataItem.name}</span>
                    </div>
                )
            }}
        />
        <GridColumn field="type" title="Type" width="200px" />
        <GridColumn
          field="size"
          title="Size"
          width="150px"
          // FIX: Changed `cell` prop to `cells` and removed <td> wrapper.
          cells={{
            data: (props) => (
                <>{`${(props.dataItem.size / 1024).toFixed(2)} KB`}</>
            )
          }}
        />
        <GridColumn field="uploadedAt" title="Uploaded At" filter="date" format="{0:D}" width="250px" />
        <GridColumn 
            title="Actions"
            width="120px"
            // FIX: Changed `cell` prop to `cells` and removed <td> wrapper.
            cells={{
                data: (props) => (
                    <Button 
                        icon="trash"
                        fillMode="flat" 
                        themeColor="error" 
                        onClick={() => removeDoc(props.dataItem.id)}
                    >
                        <Trash2 size={16} />
                    </Button>
                )
            }}
        />
      </Grid>
    </PageContainer>
  );
};

export default DocsManager;
