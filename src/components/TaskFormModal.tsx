import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, DatePicker, Tag, Space } from 'antd';
import dayjs from 'dayjs';
import { Task, TaskFormData, TaskPriority } from '../types/task';
import {
  FireOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';

const { TextArea } = Input;

interface TaskFormModalProps {
  open: boolean;
  taskToEdit: Task | null;
  onCancel: () => void;
  onSubmit: (data: TaskFormData) => void;
}

export const TaskFormModal: React.FC<TaskFormModalProps> = ({
  open,
  taskToEdit,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm();
  const isEditing = Boolean(taskToEdit);

  useEffect(() => {
    if (open) {
      if (taskToEdit) {
        form.setFieldsValue({
          title: taskToEdit.title,
          description: taskToEdit.description || '',
          priority: taskToEdit.priority,
          dueDate: taskToEdit.dueDate ? dayjs(taskToEdit.dueDate) : undefined,
        });
      } else {
        form.resetFields();
        form.setFieldsValue({
          priority: 'medium',
        });
      }
    }
  }, [open, taskToEdit, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onSubmit({
        title: values.title.trim(),
        description: values.description ? values.description.trim() : '',
        priority: values.priority as TaskPriority,
        dueDate: values.dueDate ? values.dueDate.format('YYYY-MM-DD') : undefined,
      });
      form.resetFields();
    } catch {
      // Form validation failed, error messages will be displayed automatically
    }
  };

  return (
    <Modal
      title={isEditing ? 'Edit Task' : 'Create New Task'}
      open={open}
      onOk={handleOk}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      okText={isEditing ? 'Save Changes' : 'Create Task'}
      cancelText="Cancel"
      destroyOnClose
      maskClosable={false}
      width={540}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ priority: 'medium' }}
        requiredMark="optional"
      >
        <Form.Item
          name="title"
          label="Task Title"
          rules={[
            { required: true, message: 'Please enter a task title' },
            {
              validator: (_, value) => {
                if (value && value.trim().length === 0) {
                  return Promise.reject(new Error('Title cannot be empty or only spaces'));
                }
                if (value && value.length > 100) {
                  return Promise.reject(new Error('Title must not exceed 100 characters'));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input placeholder="e.g., Update client presentation slides" maxLength={100} showCount />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description (Optional)"
          rules={[
            {
              max: 500,
              message: 'Description must not exceed 500 characters',
            },
          ]}
        >
          <TextArea
            rows={3}
            placeholder="Add relevant notes, links, or sub-tasks..."
            maxLength={500}
            showCount
          />
        </Form.Item>

        <Space direction="horizontal" size="middle" style={{ width: '100%', display: 'flex' }}>
          <Form.Item
            name="priority"
            label="Priority"
            rules={[{ required: true, message: 'Please select a priority' }]}
            style={{ flex: 1, minWidth: 160 }}
          >
            <Select>
              <Select.Option value="high">
                <Tag color="red" icon={<FireOutlined />}>
                  High Priority
                </Tag>
              </Select.Option>
              <Select.Option value="medium">
                <Tag color="gold" icon={<ClockCircleOutlined />}>
                  Medium Priority
                </Tag>
              </Select.Option>
              <Select.Option value="low">
                <Tag color="green" icon={<CheckCircleOutlined />}>
                  Low Priority
                </Tag>
              </Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="dueDate"
            label="Due Date (Optional)"
            style={{ flex: 1, minWidth: 160 }}
          >
            <DatePicker
              style={{ width: '100%' }}
              format="YYYY-MM-DD"
              placeholder="Select due date"
            />
          </Form.Item>
        </Space>
      </Form>
    </Modal>
  );
};
