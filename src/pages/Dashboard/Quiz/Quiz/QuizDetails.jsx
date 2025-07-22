import { Button, Card, Select, Space, Tabs } from "antd";
import { DashboardWarper } from "../../../../layouts/Dashboard";
import { PreQuizQuestions } from "./_components/PreQuizQuestions";
import { QuizResults } from "./_components/QuizResults";
import { QuizCertificate } from "./_components/QuizCertificate";
import { QuizQuestions } from "./_components/QuizQuestions";
import { useSearchParams } from "react-router";




export const QuizDetails = () => {
  const [searchParams] = useSearchParams();
  const quizId = searchParams.get('id');


  if (!quizId) {
    return (<><div >
      <h1 className="flex items-center justify-center">Please go with flow</h1>
    </div></>)
  }


  return (
    <DashboardWarper>
      <div className="mb-4">
        <Card
          title="Quiz"
          extra={
            <Space>
              <Button danger>Delete</Button>
              <Button type="primary">Copy Live Quiz Link</Button>
            </Space>
          }
        >
          <Card type="inner">
            <div>
              <h1>Quiz Name</h1>
              <Select
                options={[
                  {
                    value: "active",
                    label: "Active",
                  },
                  {
                    value: "inactive",
                    label: "Inactive",
                  },
                ]}
              />
            </div>
          </Card>
        </Card>
      </div>
      <Card
        title="Questions"
      >
        <Tabs
          items={[
            {
              key: "0",
              label: "Questions",
              children: <QuizQuestions id={quizId} />,
            },
            {
              key: "1",
              label: "Pre Questions",
              children: <PreQuizQuestions id={quizId} />,
            },
            {
              key: "2",
              label: "Quiz Certificate",
              children: <QuizCertificate id={quizId} />,
            },
            {
              key: "3",
              label: "Quiz Result",
              children: <QuizResults id={quizId} />,
            },
          ]}
        />
      </Card>
    </DashboardWarper>
  );
};
