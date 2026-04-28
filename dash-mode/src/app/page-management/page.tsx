import React from 'react';
import AppLayout from '@/components/AppLayout';
import PageManagementContent from './components/PageManagementContent';

export default function PageManagementPage() {
  return (
    <AppLayout currentPath="/page-management">
      <PageManagementContent />
    </AppLayout>
  );
}