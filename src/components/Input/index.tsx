import "./input.scss";
import { useCallback, useState } from "react";
import { fetchData } from "../../utils/fetch-data";
import { debounce } from "../../utils/deboucne";
import Loader from "../Loader";
import { log } from "../../utils/log";

export interface InputProps {
  /** Placeholder of the input */
  placeholder?: string;
  /** On click item handler */
  onSelectItem: (item: string) => void;
}

const Input = ({ placeholder, onSelectItem }: InputProps) => {
  // DO NOT remove this log
  console.log('input re-render')

  // Your code start here
  const [initital, setInitital] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [listResults, setListResults] = useState<string[]>([]);

  const handleSearch = useCallback(async (query: any) => {    
      setInitital(false);
      setFetching(true);
      try {
        await fetchData(query)
        .then(resp => {
            setError("");
            setFetching(false);
            console.log(resp);
            setListResults(resp);
            
        }) 
      } catch (err) {
        setError(err as string);
        setFetching(false);
      }
  }, []);

  const onInputSearch = useCallback((query: any) => {
    debounce(
      handleSearch.bind(handleSearch(query)),
      100
    );
  }, [])

  const renderHTML = () => {
    if(fetching) {
      return <Loader></Loader>
    } else if(error) {
        return <p className="text-error">{error}</p>
    } else {
      const htmlResult = listResults.length ? 
        <ul className="result-list">
          {
            listResults.map((item, index) => 
              <li
                key={item} 
                onClick={() => onSelectItem(item)}
              >
                {item}
              </li>
            )
          }
        </ul> : 
        <div className="no-result">No Results</div>;
      return htmlResult;
    }
  } 

  return (
    <>
      <input placeholder={placeholder} onInput={evt => onInputSearch((evt.target as HTMLTextAreaElement).value)}></input>
      <div className="search-result">
        {!initital ? renderHTML(): ""}
      </div>
    </>
  );
  // Your code end here
};

export default Input;

