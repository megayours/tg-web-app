'use client';

import { PropsWithChildren } from 'react';
import { Navigation } from '../Navigation/Navigation';
import UserButtons from '@/libs/chromia-connect/user-buttons';
import './styles.css';

export function AuthenticatedLayout({ children }: PropsWithChildren) {
  return (
    <div className="authenticatedLayout_container">
      <div className="authenticatedLayout_topBar">
        <UserButtons />
      </div>
      <main className="authenticatedLayout_content">
        {children}
      </main>
      <Navigation />
    </div>
  );
}
