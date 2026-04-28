import React from 'react';
import AppLayout from '@/components/AppLayout';
import MediaManagementContent from './components/MediaManagementContent';

export default function MediaManagementPage() {
  return (
    <AppLayout currentPath="/media-management">
      <MediaManagementContent />
    </AppLayout>
  );
}