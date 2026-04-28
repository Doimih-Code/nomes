import React from 'react';
import AppLayout from '@/components/AppLayout';
import PageBuilderShell from './components/PageBuilderShell';

export default function PageBuilderPage() {
  return (
    <AppLayout currentPath="/page-builder">
      <PageBuilderShell />
    </AppLayout>
  );
}