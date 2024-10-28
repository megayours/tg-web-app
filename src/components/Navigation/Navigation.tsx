'use client';

import { TabsList, IconButton } from '@telegram-apps/telegram-ui';
import { usePathname, useRouter } from 'next/navigation';
import './styles.css';
import { TabsItem } from '@telegram-apps/telegram-ui/dist/components/Navigation/TabsList/components/TabsItem/TabsItem';

const NAVIGATION_ITEMS = [
  {
    index: 0,
    id: 'home',
    label: 'Home',
    href: '/home',
    icon: '🏠'
  },
  {
    index: 1,
    id: 'profile',
    label: 'Profile',
    href: '/profile',
    icon: '👤'
  }
];

export function Navigation() {
  const router = useRouter();
  const pathname = usePathname();

  const activeTab = NAVIGATION_ITEMS.findIndex(item => item.href === pathname);

  const handleTabChange = (index: number) => {
    const item = NAVIGATION_ITEMS[index];
    router.push(item.href);
  };

  return (
    <div className="navigation_container">
      <TabsList>
        {NAVIGATION_ITEMS.map(item => (
          <TabsItem
            key={item.index} 
            onClick={() => handleTabChange(item.index)} 
            selected={item.index === activeTab}
          >
            <div className="navigation_tab">
              <IconButton mode='outline'>{item.icon}</IconButton>
              <span className="navigation_label">{item.label}</span>
            </div>
          </TabsItem>
        ))}
      </TabsList>
    </div>
  );
}
