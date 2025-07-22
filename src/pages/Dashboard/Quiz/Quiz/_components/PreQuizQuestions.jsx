import { Avatar, Button, Card, Form, Input, List, Modal } from "antd";
import React, { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
export const PreQuizQuestions = () => {
  //=================States ===========================
  const [preQuizForm] = Form.useForm();
  const [isPreQuizModalOpen, setIsPreQuizModalOpen] = useState(false);
  const [preQuizQuestions, setPreQuizQuestions] = useState([]);
  //=================Use Effect ===========================

  //=================Other Methods ===========================

  /**
   * This Function handel the api call for adding pre quiz question
   * @param {Object} value
   */
  const handelPreQuizQuestionSubmit = async (value) => {
    try {
      const newQuestion = value.question;
      console.log("[Pre Quiz Submit Values] : ", newQuestion);
      const updatedArray = [...preQuizQuestions, newQuestion];

      setPreQuizQuestions(updatedArray);
      setIsPreQuizModalOpen(false);
      preQuizForm.resetFields();
    } catch (error) {
      console.log("[Pre Quiz Submit Error] : ", error);
    }
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestion = preQuizQuestions.filter((_, i) => i !== index);
    setPreQuizQuestions(updatedQuestion);
  };
  return (
    <div>
      <Card
        title="Pre Quiz Questions"
        type="inner"
        extra={
          <Button type="primary" onClick={() => setIsPreQuizModalOpen(true)}>
            Add New Questions
          </Button>
        }
      >
        <List
          dataSource={preQuizQuestions}
          renderItem={(item, index) => (
            <List.Item key={index}>
              <List.Item.Meta title={item} />
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteQuestion(index)}
              ></Button>
            </List.Item>
          )}
        />
      </Card>

      <Modal
        title="Add New Question"
        open={isPreQuizModalOpen}
        footer={null}
        onCancel={() => {
          preQuizForm.resetFields();
          setIsPreQuizModalOpen(false);
        }}
      >
        <Form
          form={preQuizForm}
          onFinish={handelPreQuizQuestionSubmit}
          layout="vertical"
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
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="mt-4">
              Add Question
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
