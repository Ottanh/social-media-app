import { BsArrowLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import './PageHeader.css';

interface Props {
  title: string;
}

const PageHeader = ({ title }: Props) => {
  const navigate = useNavigate();
  
  const onClick = () => {
    navigate(-1);
  };

  return (
    <div className="PageHeader">
      <BsArrowLeft className="BackArrow" size="1.5em" onClick={onClick}/>
      <p className="PostTitle">{title}</p>
    </div>
  );
};


export default PageHeader;