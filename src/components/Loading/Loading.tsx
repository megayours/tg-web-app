'use client';

import { Section, Spinner } from "@telegram-apps/telegram-ui";

export default function Loading() {
  return (
    <Section style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
      <Spinner size="l" />
    </Section>
  );
}
