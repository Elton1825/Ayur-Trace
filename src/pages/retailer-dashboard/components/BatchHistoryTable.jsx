import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const BatchHistoryTable = ({ batches = [], onBatchClick = () => {} }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'lastScan', direction: 'desc' });
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'verified', label: 'Verified' },
    { value: 'pending', label: 'Pending' },
    { value: 'failed', label: 'Failed' },
    { value: 'expired', label: 'Expired' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'herbs', label: 'Herbs' },
    { value: 'powders', label: 'Powders' },
    { value: 'oils', label: 'Oils' },
    { value: 'tablets', label: 'Tablets' }
  ];

  const dateOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' }
  ];

  const filteredAndSortedBatches = useMemo(() => {
    let filtered = batches?.filter(batch => {
      const matchesSearch = batch?.productName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                           batch?.batchId?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      const matchesStatus = statusFilter === 'all' || batch?.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || batch?.category === categoryFilter;
      
      let matchesDate = true;
      if (dateFilter !== 'all') {
        const batchDate = new Date(batch.lastScan);
        const now = new Date();
        
        switch (dateFilter) {
          case 'today':
            matchesDate = batchDate?.toDateString() === now?.toDateString();
            break;
          case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            matchesDate = batchDate >= weekAgo;
            break;
          case 'month':
            matchesDate = batchDate?.getMonth() === now?.getMonth() && 
                         batchDate?.getFullYear() === now?.getFullYear();
            break;
          case 'quarter':
            const quarter = Math.floor(now?.getMonth() / 3);
            const batchQuarter = Math.floor(batchDate?.getMonth() / 3);
            matchesDate = batchQuarter === quarter && 
                         batchDate?.getFullYear() === now?.getFullYear();
            break;
        }
      }
      
      return matchesSearch && matchesStatus && matchesCategory && matchesDate;
    });

    if (sortConfig?.key) {
      filtered?.sort((a, b) => {
        let aValue = a?.[sortConfig?.key];
        let bValue = b?.[sortConfig?.key];
        
        if (sortConfig?.key === 'lastScan') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }
        
        if (aValue < bValue) return sortConfig?.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig?.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [batches, searchTerm, sortConfig, statusFilter, categoryFilter, dateFilter]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getStatusBadge = (status) => {
    const configs = {
      verified: { bg: 'bg-success/10', text: 'text-success', icon: 'CheckCircle' },
      pending: { bg: 'bg-warning/10', text: 'text-warning', icon: 'Clock' },
      failed: { bg: 'bg-error/10', text: 'text-error', icon: 'XCircle' },
      expired: { bg: 'bg-muted', text: 'text-muted-foreground', icon: 'AlertTriangle' }
    };
    
    const config = configs?.[status] || configs?.pending;
    
    return (
      <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${config?.bg} ${config?.text}`}>
        <Icon name={config?.icon} size={12} />
        <span className="capitalize">{status}</span>
      </div>
    );
  };

  const getComplianceBadges = (badges) => {
    return (
      <div className="flex items-center space-x-1">
        {badges?.map((badge, index) => (
          <div
            key={index}
            className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center"
            title={badge?.name}
          >
            <Icon name={badge?.icon} size={12} className="text-accent" />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Batch History</h2>
            <p className="text-sm text-muted-foreground">
              {filteredAndSortedBatches?.length} of {batches?.length} batches
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
            <Input
              type="search"
              placeholder="Search batches..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="w-full sm:w-64"
            />
            
            <div className="flex space-x-2">
              <Select
                options={statusOptions}
                value={statusFilter}
                onChange={setStatusFilter}
                placeholder="Status"
                className="w-32"
              />
              
              <Select
                options={categoryOptions}
                value={categoryFilter}
                onChange={setCategoryFilter}
                placeholder="Category"
                className="w-32"
              />
              
              <Select
                options={dateOptions}
                value={dateFilter}
                onChange={setDateFilter}
                placeholder="Date"
                className="w-32"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              {[
                { key: 'productName', label: 'Product Name' },
                { key: 'batchId', label: 'Batch ID' },
                { key: 'status', label: 'Status' },
                { key: 'category', label: 'Category' },
                { key: 'compliance', label: 'Compliance' },
                { key: 'lastScan', label: 'Last Scan' },
                { key: 'actions', label: 'Actions' }
              ]?.map((column) => (
                <th
                  key={column?.key}
                  className={`px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider ${
                    column?.key !== 'actions' && column?.key !== 'compliance' ? 'cursor-pointer hover:text-foreground' : ''
                  }`}
                  onClick={() => column?.key !== 'actions' && column?.key !== 'compliance' && handleSort(column?.key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column?.label}</span>
                    {sortConfig?.key === column?.key && (
                      <Icon 
                        name={sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                        size={14} 
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredAndSortedBatches?.map((batch) => (
              <tr
                key={batch?.id}
                className="hover:bg-muted/30 cursor-pointer transition-smooth"
                onClick={() => onBatchClick(batch)}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name="Package" size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{batch?.productName}</p>
                      <p className="text-xs text-muted-foreground">{batch?.manufacturer}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-data text-sm text-foreground">{batch?.batchId}</span>
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(batch?.status)}
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-foreground capitalize">{batch?.category}</span>
                </td>
                <td className="px-6 py-4">
                  {getComplianceBadges(batch?.complianceBadges)}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-foreground">
                    {new Date(batch.lastScan)?.toLocaleDateString()}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(batch.lastScan)?.toLocaleTimeString()}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="ExternalLink"
                    iconSize={14}
                    onClick={(e) => {
                      e?.stopPropagation();
                      onBatchClick(batch);
                    }}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-border">
        {filteredAndSortedBatches?.map((batch) => (
          <div
            key={batch?.id}
            className="p-4 cursor-pointer hover:bg-muted/30 transition-smooth"
            onClick={() => onBatchClick(batch)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Package" size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{batch?.productName}</p>
                  <p className="text-xs text-muted-foreground">{batch?.manufacturer}</p>
                </div>
              </div>
              {getStatusBadge(batch?.status)}
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Batch ID:</span>
                <span className="font-data text-sm text-foreground">{batch?.batchId}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Category:</span>
                <span className="text-sm text-foreground capitalize">{batch?.category}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Last Scan:</span>
                <span className="text-sm text-foreground">
                  {new Date(batch.lastScan)?.toLocaleDateString()}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Compliance:</span>
                {getComplianceBadges(batch?.complianceBadges)}
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredAndSortedBatches?.length === 0 && (
        <div className="p-12 text-center">
          <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No batches found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search criteria or filters
          </p>
        </div>
      )}
    </div>
  );
};

export default BatchHistoryTable;