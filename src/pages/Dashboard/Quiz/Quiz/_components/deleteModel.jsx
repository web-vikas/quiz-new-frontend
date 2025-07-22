import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';

const { confirm } = Modal;

const DeleteModel = ({
  title = 'Are you sure?',
  content = 'This action cannot be undone.',
  okText = 'Yes',
  cancelText = 'No',
  onConfirm = () => { },
  danger = false
}) => {
  const showConfirm = () => {
    confirm({
      title,
      icon: <ExclamationCircleOutlined />,
      content,
      okText,
      cancelText,
      okButtonProps: { danger },
      onOk: onConfirm,
    });
  };

  return (
    <>
      <Button danger onClick={showConfirm}>
        {title}
      </Button>
    </>
  );
};

export default DeleteModel;
