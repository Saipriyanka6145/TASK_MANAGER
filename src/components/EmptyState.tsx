import React from 'react';
import { Empty, Button } from 'antd';
import {
  FileAddOutlined,
  CheckCircleOutlined,
  SearchOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import { TaskFilter } from '../types/task';

interface EmptyStateProps {
  statusFilter: TaskFilter;
  hasSearchOrPriorityFilter: boolean;
  onAddTask: () => void;
  onResetFilters: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  statusFilter,
  hasSearchOrPriorityFilter,
  onAddTask,
  onResetFilters,
}) => {
  if (hasSearchOrPriorityFilter) {
    return (
      <div className="empty-state-container">
        <Empty
          image={<SearchOutlined style={{ fontSize: 64, color: '#bfbfbf' }} />}
          imageStyle={{ height: 70 }}
          description={
            <div>
              <div style={{ fontWeight: 600, fontSize: 16, color: '#595959' }}>
                No matching tasks found
              </div>
              <div style={{ fontSize: 13, color: '#8c8c8c', marginTop: 4 }}>
                Try adjusting your search query, priority filter, or status tab.
              </div>
            </div>
          }
        >
          <Button type="primary" onClick={onResetFilters}>
            Clear Filters
          </Button>
        </Empty>
      </div>
    );
  }

  if (statusFilter === 'active') {
    return (
      <div className="empty-state-container">
        <Empty
          image={<SmileOutlined style={{ fontSize: 64, color: '#52c41a' }} />}
          imageStyle={{ height: 70 }}
          description={
            <div>
              <div style={{ fontWeight: 600, fontSize: 16, color: '#595959' }}>
                All caught up!
              </div>
              <div style={{ fontSize: 13, color: '#8c8c8c', marginTop: 4 }}>
                You have no active tasks pending. Great work!
              </div>
            </div>
          }
        >
          <Button type="primary" icon={<FileAddOutlined />} onClick={onAddTask}>
            Create New Task
          </Button>
        </Empty>
      </div>
    );
  }

  if (statusFilter === 'completed') {
    return (
      <div className="empty-state-container">
        <Empty
          image={<CheckCircleOutlined style={{ fontSize: 64, color: '#1677ff' }} />}
          imageStyle={{ height: 70 }}
          description={
            <div>
              <div style={{ fontWeight: 600, fontSize: 16, color: '#595959' }}>
                No completed tasks yet
              </div>
              <div style={{ fontSize: 13, color: '#8c8c8c', marginTop: 4 }}>
                Complete your pending tasks to track your achievements here.
              </div>
            </div>
          }
        />
      </div>
    );
  }

  return (
    <div className="empty-state-container">
      <Empty
        image={<FileAddOutlined style={{ fontSize: 64, color: '#1677ff' }} />}
        imageStyle={{ height: 70 }}
        description={
          <div>
            <div style={{ fontWeight: 600, fontSize: 16, color: '#595959' }}>
              No tasks found
            </div>
            <div style={{ fontSize: 13, color: '#8c8c8c', marginTop: 4 }}>
              Get started by organizing your goals and daily to-dos.
            </div>
          </div>
        }
      >
        <Button type="primary" size="large" icon={<FileAddOutlined />} onClick={onAddTask}>
          Add Your First Task
        </Button>
      </Empty>
    </div>
  );
};

