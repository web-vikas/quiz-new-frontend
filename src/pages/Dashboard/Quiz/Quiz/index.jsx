import { Button, Card, Space, Table, Typography } from "antd"
import { DashboardWarper } from "../../../../layouts/Dashboard"
import { useEffect, useState } from "react"
import { QuizModel } from "./_components/quizModel"
import { Plus, SquarePen, Trash } from "lucide-react";
import { ProCard, ProFormGroup, ProFormSwitch } from "@ant-design/pro-components";
import { API } from "../../../../services";
import { useErrorLog } from '@/hooks';




const Quiz = () => {

    //-------------- State & Variables --------------//

    const [isModelOpen, seIsModelOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [quizData, setQuizData] = useState([])
    const [currentQuiz, setCurrentQuiz] = useState(null)
    const handleError = useErrorLog('quiz/quizManagement');




    const handleOk = async (data) => {
        try {
            if (!isEdit) {
                const res = await API.CreateQuiz(data, 'Quiz Add Successfully', 'Quiz adding....')
                if (res) {
                    seIsModelOpen(false)
                    GetQuiz()
                }
            } else {
                console.log('coming soon', data)
            }
        } catch (error) {
            handleError(error)

        }
    }


    const GetQuiz = async () => {
        try {

            const res = await API.GetQuiz()
            if (res) {

                setQuizData(res)
            }
        } catch (error) {
            handleError(error)

        }
    }

    const handleDelete = async (item) => {
        try {
            const res = await API.DeleteQuiz(item.quiz_id, 'Quiz delete successfully', 'Deleting....')
            if (res) {
                GetQuiz()
            }
        } catch (error) {
            handleError(error)
        }
    }

    useEffect(() => {
        GetQuiz()
    }, [])



    return (
        <DashboardWarper>
            <ProCard
                title='Quiz Management'
                bordered extra={
                    <Button type="primary" icon={<Plus />} onClick={() => { seIsModelOpen(true), setIsEdit(false), setCurrentQuiz(null) }}>
                        Add New Quiz
                    </Button>
                }>
                <div className="grid grid-cols-3 gap-4">
                    {
                        quizData.map((item) => (
                            <ProCard
                                title={item.title}
                                key={item.quiz_id}
                                bordered
                                extra={
                                    <Space>

                                        <Button type="link" onClick={() => handleDelete(item)}>
                                            <Trash color="red" size={18} />
                                        </Button>
                                        <Button type="link" onClick={() => { seIsModelOpen(true), setIsEdit(true), setCurrentQuiz(item) }} >
                                            <SquarePen color="red" size={18} />
                                        </Button>
                                    </Space>
                                }
                            >
                                {/* <p>{item.title}</p> */}

                            </ProCard>
                        ))
                    }
                </div>
                <QuizModel
                    Mode={isEdit ? 'Quiz Update' : 'Add New Quiz'}
                    isModelOpen={isModelOpen}
                    currentQuiz={currentQuiz}
                    seIsModelOpen={seIsModelOpen}
                    handleOk={handleOk}
                />
            </ProCard>
        </DashboardWarper>
    );
};

export default Quiz