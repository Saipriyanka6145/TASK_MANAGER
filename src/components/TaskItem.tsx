import React from 'react';
import { Card, Checkbox, Tag, Typography, Button, Space, Popconfirm, Tooltip } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
  FireOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { Task, TaskPriority } from '../types/task';

const { Text, Paragraph } = Typography;

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const getPriorityConfig = (priority: TaskPriority) => {
  switch (priority) {
    case 'high':
      return {
        color: 'red',
        icon: <FireOutlined />,
        label: 'High',
      };
    case 'medium':
      return {
        color: 'gold',
        icon: <ClockCircleOutlined />,
        label: 'Medium',
      };
    case 'low':
      return {
        color: 'green',
        icon: <CheckCircleOutlined />,
        label: 'Low',
      };
  }
};

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
}) => {
  const priorityCfg = getPriorityConfig(task.priority);

  // Due date calculations
  const today = dayjs().startOf('day');
  const isOverdue = task.dueDate && !task.completed && dayjs(task.dueDate).isBefore(today);
  const isDueToday = task.dueDate && dayjs(task.dueDate).isSame(today, 'day');

  return (
    <Card
      className={`task-card ${task.completed ? 'task-card-completed' : ''}`}
      hoverable
      style={{
        marginBottom: 12,
        borderRadius: 8,
        transition: 'all 0.25s ease',
        borderLeft: `4px solid ${
          task.completed ? '#d9d9d9' : task.priority === 'high' ? '#ff4d4f' : task.priority === 'medium' ? '#faad14' : '#52c41a'
        }`,
      }}
    >
      <div className="task-card-content">
        {/* Left side: Checkbox */}
        <div style={{ paddingTop: 2, marginRight: 12 }}>
          <Checkbox
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
            aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
          />
        </div>

        {/* Center: Details */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="task-header-row">
            <Text
              strong
              delete={task.completed}
              className={`task-title ${task.completed ? 'task-title-completed' : ''}`}
              style={{
                fontSize: 16,
                color: task.completed ? '#8c8c8c' : '#262626',
                marginRight: 8,
              }}
            >
              {task.title}
            </Text>

            <Space direction="horizontal" size={4} wrap className="task-tags-row">
              <Tag color={priorityCfg.color} icon={priorityCfg.icon}>
                {priorityCfg.label}
              </Tag>

              {task.dueDate && (
                <Tag
                  icon={isOverdue ? <WarningOutlined /> : <CalendarOutlined />}
                  color={
                    task.completed
                      ? 'default'
                      : isOverdue
                      ? 'error'
                      : isDueToday
                      ? 'warning'
                      : 'processing'
                  }
                >
                  {isDueToday
                    ? 'Due Today'
                    : isOverdue
                    ? `Overdue (${dayjs(task.dueDate).format('MMM D')})`
                    : `Due ${dayjs(task.dueDate).format('MMM D, YYYY')}`}
                </Tag>
              )}
            </Space>
          </div>

          {task.description && (
            <Paragraph
              type="secondary"
              ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}
              style={{
                marginTop: 6,
                marginBottom: 4,
                fontSize: 13,
                color: task.completed ? '#bfbfbf' : '#595959',
              }}
            >
              {task.description}
            </Paragraph>
          )}

          <div style={{ fontSize: 11, color: '#bfbfbf', marginTop: 4 }}>
            Created {dayjs(task.createdAt).format('MMM D, YYYY')}
          </div>
        </div>

        {/* Right side: Actions */}
        <div className="task-actions-wrapper">
          <Space direction="horizontal" size="small">
            <Tooltip title="Edit task">
              <Button
                type="text"
                shape="circle"
                icon={<EditOutlined />}
                onClick={() => onEdit(task)}
                aria-label="Edit task"
              />
            </Tooltip>

            <Popconfirm
              title="Delete task"
              description="Are you sure you want to delete this task?"
              okText="Delete"
              cancelText="Cancel"
              okButtonProps={{ danger: true }}
              onConfirm={() => onDelete(task.id)}
            >
              <Tooltip title="Delete task">
                <Button
                  type="text"
                  danger
                  shape="circle"
                  icon={<DeleteOutlined />}
                  aria-label="Delete task"
                />
              </Tooltip>
            </Popconfirm>
          </Space>
        </div>
      </div>
    </Card>
  );
};
