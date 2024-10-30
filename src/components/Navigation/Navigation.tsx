'use client';

import { TabsList } from '@telegram-apps/telegram-ui';
import { useNavigationStore } from '@/store/navigationStore';
import './styles.css';
import { TabsItem } from '@telegram-apps/telegram-ui/dist/components/Navigation/TabsList/components/TabsItem/TabsItem';

const NAVIGATION_ITEMS = [
  {
    index: 0,
    id: 'home',
    label: 'Battle',
    view: 'home' as const,
    icon: '⚔️'
  },
  {
    index: 1,
    id: 'profile',
    label: 'Profile',
    view: 'profile' as const,
    icon: '👤'
  }
];

export function Navigation() {
  const { currentView, setView } = useNavigationStore();

  const handleTabChange = (index: number) => {
    const item = NAVIGATION_ITEMS[index];
    setView(item.view);
  };

  return (
    <div className="navigation_container">
      <TabsList>
        {NAVIGATION_ITEMS.map(item => (
          <TabsItem
            key={item.index} 
            onClick={() => handleTabChange(item.index)} 
            selected={item.view === currentView}
          >
            <div className="navigation_tab">
              <span className="navigation_icon">{item.icon}</span>
            </div>
          </TabsItem>
        ))}
      </TabsList>
    </div>
  );
}
