import React from 'react';
import { Card, Row, Col, Statistic, Progress } from 'antd';
import {
  UnorderedListOutlined,
  PlayCircleOutlined,
  CheckCircleOutlined,
  AlertOutlined,
} from '@ant-design/icons';
import { Task } from '../types/task';
import dayjs from 'dayjs';

interface TaskStatsProps {
  tasks: Task[];
}

export const TaskStats: React.FC<TaskStatsProps> = ({ tasks }) => {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const active = total - completed;

  const today = dayjs().startOf('day');
  const overdue = tasks.filter((t) => {
    if (t.completed || !t.dueDate) return false;
    return dayjs(t.dueDate).isBefore(today);
  }).length;

  const completionPercent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <Card className="task-stats-card" style={{ marginBottom: 20 }}>
      <Row gutter={[16, 16]} align="middle">
        <Col xs={12} sm={6}>
          <Statistic
            title={<span style={{ color: '#595959' }}>Total Tasks</span>}
            value={total}
            prefix={<UnorderedListOutlined style={{ color: '#1677ff' }} />}
          />
        </Col>
        <Col xs={12} sm={6}>
          <Statistic
            title={<span style={{ color: '#595959' }}>Active Tasks</span>}
            value={active}
            prefix={<PlayCircleOutlined style={{ color: '#fa8c16' }} />}
          />
        </Col>
        <Col xs={12} sm={6}>
          <Statistic
            title={<span style={{ color: '#595959' }}>Completed</span>}
            value={completed}
            prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
          />
        </Col>
        <Col xs={12} sm={6}>
          <Statistic
            title={<span style={{ color: '#595959' }}>Overdue</span>}
            value={overdue}
            prefix={<AlertOutlined style={{ color: overdue > 0 ? '#ff4d4f' : '#8c8c8c' }} />}
            valueStyle={overdue > 0 ? { color: '#ff4d4f' } : undefined}
          />
        </Col>
      </Row>
      <div style={{ marginTop: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ fontSize: 13, color: '#8c8c8c' }}>Progress</span>
          <span style={{ fontSize: 13, fontWeight: 600 }}>{completionPercent}% completed</span>
        </div>
        <Progress
          percent={completionPercent}
          status={completionPercent === 100 ? 'success' : 'active'}
          strokeColor={{
            '0%': '#1677ff',
            '100%': '#52c41a',
          }}
          showInfo={false}
        />
      </div>
    </Card>
  );
};

