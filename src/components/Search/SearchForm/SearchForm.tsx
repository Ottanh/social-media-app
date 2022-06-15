import Textarea from 'react-expanding-textarea';
import useSearch from '../../../hooks/useSearch';
import './SearchForm.css';


const SearchForm = () => {
  const [value, setValue] = useSearch('');

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