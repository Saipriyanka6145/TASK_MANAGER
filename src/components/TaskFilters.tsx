import React from 'react';
import { Card, Segmented, Input, Select, Space, Button } from 'antd';
import {
  SearchOutlined,
  FilterOutlined,
  ReloadOutlined,
  SortAscendingOutlined,
} from '@ant-design/icons';
import { TaskFilter, PriorityFilter, SortOption } from '../types/task';

const { Search } = Input;

interface TaskFiltersProps {
  statusFilter: TaskFilter;
  onStatusFilterChange: (filter: TaskFilter) => void;
  priorityFilter: PriorityFilter;
  onPriorityFilterChange: (priority: PriorityFilter) => void;
  searchText: string;
  onSearchChange: (text: string) => void;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
  onResetFilters: () => void;
  counts: {
    all: number;
    active: number;
    completed: number;
  };
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  searchText,
  onSearchChange,
  sortOption,
  onSortChange,
  onResetFilters,
  counts,
}) => {
  const isFiltered = statusFilter !== 'all' || priorityFilter !== 'all' || searchText.trim() !== '';

  return (
    <Card className="task-filters-card" style={{ marginBottom: 20 }}>
      <div className="filter-controls-container">
        {/* Status segmented buttons */}
        <div className="filter-segmented-wrapper">
          <Segmented<TaskFilter>
            value={statusFilter}
            onChange={(val) => onStatusFilterChange(val as TaskFilter)}
            options={[
              {
                label: `All (${counts.all})`,
                value: 'all',
              },
              {
                label: `Active (${counts.active})`,
                value: 'active',
              },
              {
                label: `Completed (${counts.completed})`,
                value: 'completed',
              },
            ]}
            size="middle"
          />
        </div>

        {/* Search, Priority filter, Sort and Reset */}
        <div className="filter-inputs-wrapper">
          <Space direction="horizontal" wrap>
            <Search
              placeholder="Search tasks..."
              allowClear
              value={searchText}
              onChange={(e) => onSearchChange(e.target.value)}
              prefix={<SearchOutlined style={{ color: '#8c8c8c' }} />}
              style={{ width: 200 }}
            />

            <Select<PriorityFilter>
              value={priorityFilter}
              onChange={onPriorityFilterChange}
              style={{ width: 140 }}
              suffixIcon={<FilterOutlined />}
              options={[
                { value: 'all', label: 'All Priorities' },
                { value: 'high', label: 'High Priority' },
                { value: 'medium', label: 'Medium Priority' },
                { value: 'low', label: 'Low Priority' },
              ]}
            />

            <Select<SortOption>
              value={sortOption}
              onChange={onSortChange}
              style={{ width: 170 }}
              suffixIcon={<SortAscendingOutlined />}
              options={[
                { value: 'dueDateAsc', label: 'Due Date (Earliest)' },
                { value: 'dueDateDesc', label: 'Due Date (Latest)' },
                { value: 'priorityDesc', label: 'Priority (High to Low)' },
                { value: 'createdDesc', label: 'Newest Created' },
              ]}
            />

            {isFiltered && (
              <Button icon={<ReloadOutlined />} onClick={onResetFilters} type="text">
                Reset
              </Button>
            )}
          </Space>
        </div>
      </div>
    </Card>
  );
};
