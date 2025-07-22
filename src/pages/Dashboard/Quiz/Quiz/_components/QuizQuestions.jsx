import { useErrorLog } from '@/hooks';
import { CheckCircleTwoTone } from "@ant-design/icons";
import { Button, Card, Form, Input, List, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { API } from "../../../../../services";
import DeleteModel from "./deleteModel";


const { Option } = Select;

export const QuizQuestions = ({ id }) => {
  //========================States====================
  const [form] = Form.useForm();
  const [isAddQuestionModalOpen, setAddQuestionModalOpen] = useState(false);
  const [addQuizQuestions, setAddQuizQuestions] = useState([]);
  const [IsEditing, setIsEditing] = useState(null);
  const handleError = useErrorLog('QuizDetails/Question');


  //=========================Other Methods ======================


  const onSubmit = async (value) => {
    try {
      if (IsEditing) {
        await API.UpdateQuestion(IsEditing.id, value, 'Question update successfully', 'Question updating...')
      } else {
        await API.AddQuestion(id, value, 'Question add successfully', 'Question adding...')
      }
    } catch (error) {
      handleError(error);
    } finally {
      getQuestions()
      setAddQuestionModalOpen(false)
      setIsEditing(null)
      form.resetFields()
    }
  };


  const handleDeleteQuestion = async (item) => {
    try {
      const res = await API.DeleteQuestion(item.id, 'Question delete successfully', 'Question deleting...')
      if (res) {
        getQuestions()
      }
    } catch (error) {
      handleError(error);
    }
  };
  const getQuestions = async () => {
    try {
      const res = await API.GetAllQuestion(id)
      setAddQuizQuestions(res)
    } catch (error) {
      handleError(error);
    }
  }



  useEffect(() => {
    getQuestions()
  }, [])

  return (
    <div>
      <Card title="Question"
        extra={
          <Button type="primary" onClick={() => {
            setIsEditing(null);
            setAddQuestionModalOpen(true);
          }}>
            Add Question
          </Button>
        }
      >
        <List
          grid={{ gutter: 16, column: 2 }}
          dataSource={addQuizQuestions}
          renderItem={(item, index) => (
            <List.Item key={index}>
              <Card
                title={`Q${index + 1}: ${item.question}`}
                key={index}
                extra={
                  <div className="flex gap-2">
                    <Button onClick={() => {
                      form.setFieldsValue(item);
                      setIsEditing(item);
                      setAddQuestionModalOpen(true);
                    }}>Edit</Button>
                    <DeleteModel
                      cancelText="Cancel"
                      onConfirm={() => handleDeleteQuestion(item)}
                      okText="Delete"
                      content="Are you sure you want to delete this question permanently?"
                      title="Delete"
                      danger={true}
                    />                  </div>
                }
              >
                <div>A. {item.answer_a || "-"}</div>
                <div>B. {item.answer_b || "-"}</div>
                <div>C. {item.answer_c || "-"}</div>
                <div>D. {item.answer_d || "-"}</div>
                <div className="mt-2 font-semibold text-green-600">
                  <CheckCircleTwoTone twoToneColor="#52c41a" /> Correct:{" "}
                  {item.correct_answer}
                </div>
              </Card>
            </List.Item>
          )}
        />
      </Card>

      <Modal
        title={IsEditing !== null ? "Edit Question" : "Add Question"}
        open={isAddQuestionModalOpen}
        footer={null}
        onCancel={() => {
          form.resetFields();
          setAddQuestionModalOpen(false);
          setIsEditing(null);
        }}
        width={700}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onSubmit}
        >
          <Form.Item
            name="question"
            label="Question"
            rules={[
              {
                required: true,
                message: "Question is required",
              },
            ]}
          >
            <Input placeholder="Enter your question" />
          </Form.Item>

          <Form.Item name="answer_a" label="Answer A">
            <Input placeholder="Option A" />
          </Form.Item>

          <Form.Item name="answer_b" label="Answer B">
            <Input placeholder="Option B" />
          </Form.Item>

          <Form.Item name="answer_c" label="Answer C">
            <Input placeholder="Option C" />
          </Form.Item>

          <Form.Item name="answer_d" label="Answer D">
            <Input placeholder="Option D" />
          </Form.Item>

          <Form.Item
            name="correct_answer"
            label="Correct Answer"
            rules={[
              {
                required: true,
                message: "Please select the correct answer",
              },
            ]}
          >
            <Select placeholder="Select correct option">
              <Option value="A">A</Option>
              <Option value="B">B</Option>
              <Option value="C">C</Option>
              <Option value="D">D</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="mt-4 w-full">
              {IsEditing !== null ? "Update Question" : "Add Question"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

    </div>
  );
};