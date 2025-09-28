
import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, AppBarSection, AppBarSpacer } from '@progress/kendo-react-layout';
import { Drawer, DrawerContent, DrawerSelectEvent } from '@progress/kendo-react-layout';
import { Button } from '@progress/kendo-react-buttons';
import { Badge, BadgeContainer } from '@progress/kendo-react-indicators';
import {
  Code,
  FileText,
  BrainCircuit,
  TrendingUp,
  Calendar,
  Menu,
  Bell,
} from 'lucide-react';

import SnippetManager from './pages/SnippetManager';
import DocsManager from './pages/DocsManager';
import KnowledgeSearch from './pages/KnowledgeSearch';
import ProgressTracker from './pages/ProgressTracker';
import SchedulerPage from './pages/SchedulerPage';

const items = [
  { text: 'Snippets', icon: Code, route: '/' },
  { text: 'Docs & Notes', icon: FileText, route: '/docs' },
  { text: 'Knowledge AI', icon: BrainCircuit, route: '/ai-search' },
  { text: 'Progress', icon: TrendingUp, route: '/progress' },
  { text: 'Scheduler', icon: Calendar, route: '/scheduler' },
];

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerExpanded, setDrawerExpanded] = useState(true);

  const selectedRoute = items.findIndex((item) => item.route === location.pathname);

  const handleSelect = (e: DrawerSelectEvent) => {
    navigate(e.itemTarget.props.route);
  };

  const toggleDrawer = () => {
    setDrawerExpanded(!drawerExpanded);
  };

  const CustomItem = (props: any) => {
    const { icon: Icon, ...otherProps } = props;
    return (
      <span className="k-item k-drawer-item" {...otherProps}>
        <Icon className="k-icon" size={20} />
        <span className="k-item-text">{props.text}</span>
      </span>
    );
  };

  return (
    <div className="flex flex-col h-screen">
      <AppBar>
        <AppBarSection>
          <Button icon="menu" fillMode="flat" onClick={toggleDrawer}>
            <Menu />
          </Button>
          <h1 className="text-xl font-bold ml-4">DevHelper Hub</h1>
        </AppBarSection>
        <AppBarSpacer />
        <AppBarSection>
            <BadgeContainer>
                <Button fillMode="flat" >
                    <Bell />
                </Button>
                {/* FIX: Replaced unsupported 'shape' prop with 'rounded' to fix type error. This achieves a similar visual effect for a notification dot. */}
                <Badge rounded="full" position="inside" />
            </BadgeContainer>
        </AppBarSection>
      </AppBar>
      <div className="flex-grow flex">
        <Drawer
          expanded={drawerExpanded}
          position="start"
          mode="push"
          mini={!drawerExpanded}
          // FIX: Cast items to 'any' to allow passing component icons to a custom item renderer, bypassing the default string type for 'icon'.
          items={items.map((item) => ({
            ...item,
            selected: items[selectedRoute].text === item.text,
          })) as any}
          item={CustomItem}
          onSelect={handleSelect}
        >
          <DrawerContent>
            <main className="p-4 sm:p-6 w-full h-full overflow-auto">
              <Routes>
                <Route path="/" element={<SnippetManager />} />
                <Route path="/docs" element={<DocsManager />} />
                <Route path="/ai-search" element={<KnowledgeSearch />} />
                <Route path="/progress" element={<ProgressTracker />} />
                <Route path="/scheduler" element={<SchedulerPage />} />
              </Routes>
            </main>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

export default App;
