import { VscArrowLeft } from 'react-icons/vsc';
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
      <VscArrowLeft className="arrow" size="1.5em" onClick={onClick}/>
      <p className="PostTitle">{title}</p>
    </div>
  );
};


export default PageHeader;