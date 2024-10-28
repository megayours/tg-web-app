import { AuthenticatedLayout } from '@/components/AuthenticatedLayout/AuthenticatedLayout';
import { PropsWithChildren } from 'react';

export default function ProtectedLayout({ children }: PropsWithChildren) {
  return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
}
