import React, { useState, useEffect, useMemo } from 'react';
import {
  Layout,
  Typography,
  Button,
  Space,
  message,
  ConfigProvider,
  Popconfirm,
} from 'antd';
import {
  PlusOutlined,
  CheckOutlined,
  DeleteOutlined,
  CheckSquareFilled,
  ReloadOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import {
  Task,
  TaskFilter,
  PriorityFilter,
  SortOption,
  TaskFormData,
} from './types/task';
import { loadTasksFromStorage, saveTasksToStorage } from './utils/storage';
import { TaskStats } from './components/TaskStats';
import { TaskFilters } from './components/TaskFilters';
import { TaskItem } from './components/TaskItem';
import { TaskFormModal } from './components/TaskFormModal';
import { EmptyState } from './components/EmptyState';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

export const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [statusFilter, setStatusFilter] = useState<TaskFilter>('all');
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('all');
  const [searchText, setSearchText] = useState<string>('');
  const [sortOption, setSortOption] = useState<SortOption>('dueDateAsc');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  // Load from local storage on mount
  useEffect(() => {
    const loaded = loadTasksFromStorage();
    setTasks(loaded);
  }, []);

  // Sync to local storage whenever tasks change
  const updateTasks = (newTasks: Task[]) => {
    setTasks(newTasks);
    saveTasksToStorage(newTasks);
  };

  // Task Actions
  const handleAddTask = (data: TaskFormData) => {
    const newTask: Task = {
      id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      title: data.title,
      description: data.description,
      priority: data.priority,
      dueDate: data.dueDate,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updated = [newTask, ...tasks];
    updateTasks(updated);
    message.success('Task created successfully');
    setIsModalOpen(false);
  };

  const handleEditTask = (data: TaskFormData) => {
    if (!taskToEdit) return;
    const updated = tasks.map((t) =>
      t.id === taskToEdit.id
        ? {
            ...t,
            title: data.title,
            description: data.description,
            priority: data.priority,
            dueDate: data.dueDate,
            updatedAt: new Date().toISOString(),
          }
        : t
    );
    updateTasks(updated);
    message.success('Task updated successfully');
    setTaskToEdit(null);
    setIsModalOpen(false);
  };

  const handleToggleComplete = (id: string) => {
    const updated = tasks.map((t) => {
      if (t.id === id) {
        const nextState = !t.completed;
        if (nextState) {
          message.success(`Completed "${t.title}"`);
        }
        return {
          ...t,
          completed: nextState,
          updatedAt: new Date().toISOString(),
        };
      }
      return t;
    });
    updateTasks(updated);
  };

  const handleDeleteTask = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    const updated = tasks.filter((t) => t.id !== id);
    updateTasks(updated);
    message.info(`Deleted "${task?.title || 'Task'}"`);
  };

  const handleClearCompleted = () => {
    const count = tasks.filter((t) => t.completed).length;
    const updated = tasks.filter((t) => !t.completed);
    updateTasks(updated);
    message.info(`Removed ${count} completed task${count > 1 ? 's' : ''}`);
  };

  const handleMarkAllCompleted = () => {
    const updated = tasks.map((t) => ({ ...t, completed: true, updatedAt: new Date().toISOString() }));
    updateTasks(updated);
    message.success('Marked all active tasks as completed');
  };

  const handleResetFilters = () => {
    setStatusFilter('all');
    setPriorityFilter('all');
    setSearchText('');
  };

  const handleLoadSampleTasks = () => {
    localStorage.removeItem('antd_task_manager_tasks_v1');
    const samples = loadTasksFromStorage();
    setTasks(samples);
    message.success('Loaded sample tasks');
  };

  // Filter & Sort logic
  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        // Status filter
        if (statusFilter === 'active' && task.completed) return false;
        if (statusFilter === 'completed' && !task.completed) return false;

        // Priority filter
        if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false;

        // Search text
        if (searchText.trim()) {
          const query = searchText.toLowerCase();
          const matchTitle = task.title.toLowerCase().includes(query);
          const matchDesc = (task.description || '').toLowerCase().includes(query);
          if (!matchTitle && !matchDesc) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortOption === 'dueDateAsc') {
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return dayjs(a.dueDate).valueOf() - dayjs(b.dueDate).valueOf();
        }
        if (sortOption === 'dueDateDesc') {
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return dayjs(b.dueDate).valueOf() - dayjs(a.dueDate).valueOf();
        }
        if (sortOption === 'priorityDesc') {
          const weight: Record<string, number> = { high: 3, medium: 2, low: 1 };
          return weight[b.priority] - weight[a.priority];
        }
        // createdDesc
        return dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf();
      });
  }, [tasks, statusFilter, priorityFilter, searchText, sortOption]);

  const counts = useMemo(() => {
    const all = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const active = all - completed;
    return { all, active, completed };
  }, [tasks]);

  const hasSearchOrPriorityFilter = priorityFilter !== 'all' || searchText.trim() !== '';

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1677ff',
          borderRadius: 8,
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        },
      }}
    >
      <Layout className="app-layout">
        {/* Header */}
        <Header className="app-header">
          <div className="app-header-content">
            <div className="brand-container">
              <CheckSquareFilled className="brand-icon" />
              <div>
                <Title level={4} className="brand-title">
                  TaskFlow
                </Title>
                <Text className="brand-subtitle">
                  React & Ant Design Task Manager
                </Text>
              </div>
            </div>

            <Button
              type="primary"
              size="large"
              icon={<PlusOutlined />}
              onClick={() => {
                setTaskToEdit(null);
                setIsModalOpen(true);
              }}
              className="new-task-btn"
            >
              New Task
            </Button>
          </div>
        </Header>

        {/* Content */}
        <Content className="app-content">
          <div className="content-container">
            {/* Top statistics summary */}
            <TaskStats tasks={tasks} />

            {/* Filter and control bar */}
            <TaskFilters
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              priorityFilter={priorityFilter}
              onPriorityFilterChange={setPriorityFilter}
              searchText={searchText}
              onSearchChange={setSearchText}
              sortOption={sortOption}
              onSortChange={setSortOption}
              onResetFilters={handleResetFilters}
              counts={counts}
            />

            {/* Batch actions & Status header */}
            {tasks.length > 0 && (
              <div className="batch-actions-bar">
                <Text type="secondary" style={{ fontSize: 13 }}>
                  Showing {filteredTasks.length} of {tasks.length} tasks
                </Text>

                <Space direction="horizontal" size="small" wrap>
                  {counts.active > 0 && (
                    <Button
                      size="small"
                      icon={<CheckOutlined />}
                      onClick={handleMarkAllCompleted}
                    >
                      Complete All
                    </Button>
                  )}

                  {counts.completed > 0 && (
                    <Popconfirm
                      title="Clear completed tasks"
                      description={`Remove ${counts.completed} completed task${
                        counts.completed > 1 ? 's' : ''
                      }?`}
                      onConfirm={handleClearCompleted}
                      okText="Yes, Clear"
                      cancelText="Cancel"
                    >
                      <Button size="small" danger icon={<DeleteOutlined />}>
                        Clear Completed ({counts.completed})
                      </Button>
                    </Popconfirm>
                  )}

                  {tasks.length === 0 && (
                    <Button
                      size="small"
                      icon={<ReloadOutlined />}
                      onClick={handleLoadSampleTasks}
                    >
                      Load Samples
                    </Button>
                  )}
                </Space>
              </div>
            )}

            {/* Task list or Empty state */}
            {filteredTasks.length === 0 ? (
              <EmptyState
                statusFilter={statusFilter}
                hasSearchOrPriorityFilter={hasSearchOrPriorityFilter}
                onAddTask={() => {
                  setTaskToEdit(null);
                  setIsModalOpen(true);
                }}
                onResetFilters={handleResetFilters}
              />
            ) : (
              <div className="task-list-wrapper">
                {filteredTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggleComplete={handleToggleComplete}
                    onEdit={(t) => {
                      setTaskToEdit(t);
                      setIsModalOpen(true);
                    }}
                    onDelete={handleDeleteTask}
                  />
                ))}
              </div>
            )}
          </div>
        </Content>

        {/* Footer */}
        <Footer className="app-footer">
          <Text type="secondary" style={{ fontSize: 12 }}>
            TaskFlow • Built with React 18, TypeScript, and Ant Design 5
          </Text>
        </Footer>

        {/* Add / Edit Task Modal */}
        <TaskFormModal
          open={isModalOpen}
          taskToEdit={taskToEdit}
          onCancel={() => {
            setIsModalOpen(false);
            setTaskToEdit(null);
          }}
          onSubmit={taskToEdit ? handleEditTask : handleAddTask}
        />
      </Layout>
    </ConfigProvider>
  );
};

export default App;
