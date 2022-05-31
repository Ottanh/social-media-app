import LogRegButtons from '../../components/User/LogRegButtons/LogRegButtons';
import './index.css';
import manuli from '../../images/manuli.jpg';


const StartPage = () => {
  return (
    <div className="StartPage">
      <div className="ImageContainer">
        <img src={manuli} alt="manuli"/>
      </div>
      <div className="TitleContainer">
        <h1 className="Title">SomeThing</h1>
        <LogRegButtons />
        <div className="TitlePadding"/>
      </div>
      <div className="Padding" />
    </div>
  );
};

export default StartPage;