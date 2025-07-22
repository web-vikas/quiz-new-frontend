
import {
  ModalForm,
  ProFormText
} from '@ant-design/pro-components';
import { useEffect } from 'react';


export const QuizModel = ({ isModelOpen, seIsModelOpen, Mode, handleOk, currentQuiz }) => {

  return (
    <>
      <ModalForm
        title={Mode}
        open={isModelOpen}
        onFinish={handleOk}
        onOpenChange={seIsModelOpen}
        width={600}
        submitTimeout={3000}
        initialValues={currentQuiz}
      >
        <ProFormText
          name="title"
          label="Name"
          placeholder='Enter quiz name'
          required
          rules={[{ required: true, message: 'Please Enter Quiz Name' }]}
        />

      </ModalForm>
    </>
  );
};



