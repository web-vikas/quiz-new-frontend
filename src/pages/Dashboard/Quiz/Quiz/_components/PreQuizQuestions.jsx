import { Button, Card, Form, Input, List, Modal } from "antd";
import { useEffect, useState } from "react";
import { API } from "../../../../../services";
import DeleteModel from "./deleteModel";
export const PreQuizQuestions = ({ id }) => {
  //=================States ===========================
  const [form] = Form.useForm();
  const [isPreQuizModalOpen, setIsPreQuizModalOpen] = useState(false);
  const [preQuizQuestions, setPreQuizQuestions] = useState([]);

  //=================Other Methods ===========================

  /**
   * This Function handel the api call for adding pre quiz question
   * @param {Object} value
   */
  const onFinish = async (value) => {
    try {
      await API.AddPreQuestion(id, value, 'Pre question add successfully', 'Pre question adding...')
    } catch (error) {
      console.log("[Pre Quiz Submit Error] : ", error);
    } finally {
      form.resetFields();
      setIsPreQuizModalOpen(false)
      getAllPreQuestion()
    }
  };

  const handleDeletePreQuestion = async (item) => {
    try {
      const res = await API.DeletePreQuestion(item.id)
      if (res) {
        getAllPreQuestion()
      }
    } catch (error) {
      console.log(error)
    }
  };

  const getAllPreQuestion = async () => {
    try {
      const res = await API.getPreQuestion(id)
      setPreQuizQuestions(res)
    } catch (error) {
      console.log(error)

    }
  }





  //=================Use Effect ===========================

  useEffect(() => {
    getAllPreQuestion()
  }, [])



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
              <List.Item.Meta title={item.question} />
              <DeleteModel
                cancelText="Cancel"
                onConfirm={() => handleDeletePreQuestion(item)}
                okText="Delete"
                content="Are you sure you want to delete this pre question permanently?"
                title="Delete"
                danger={true}
              />
            </List.Item>
          )}
        />
      </Card>

      <Modal
        title="Add New Question"
        open={isPreQuizModalOpen}
        footer={null}
        onCancel={() => {
          form.resetFields();
          setIsPreQuizModalOpen(false);
        }}
      >
        <Form
          form={form}
          onFinish={onFinish}
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
