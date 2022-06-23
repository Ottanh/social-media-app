import Textarea from 'react-expanding-textarea';
import useSearch from '../../../hooks/useSearch';
import './SearchForm.css';

interface props {
  from: 'user' | 'post';
}

const SearchForm = ({ from }: props) => {
  const [value, setValue] = useSearch('', from);

  const handleChange = (event: { target: { value: string; }; }) => {
    setValue(event.target.value);
  };
  
  return (
      <div className="SearchAreaContainer">
        <Textarea
          className="SearchArea" 
          placeholder="Search..."
          onChange={handleChange}
          value={value}
        />
      </div>
  );
};


export default SearchForm;