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

// import "./input.scss";
// import { fetchData } from "../../utils/fetch-data";
// import { debounce } from "../../utils/deboucne";
// import Loader from "../Loader";
// import { useState } from "react";

// export interface InputProps {
//   /** Placeholder of the input */
//   placeholder?: string;
//   /** On click item handler */
//   onSelectItem: (item: string) => void;
//   /** debounce time (in ms) */
//   debounceTime?: number;
// }

// export interface SearchResult {
//   loading: boolean;
//   error?: string;
//   items?: string[];
// }

// const Input = ({
//   placeholder,
//   onSelectItem,
//   debounceTime = 300,
// }: InputProps) => {
//   // DO NOT remove this log
//   console.log("input re-render");

//   // Your code start here
//   const [result, setResult] = useState<SearchResult | undefined>(undefined);

//   const hangleChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
//     const searchQuery = e.target.value;
//     if (!searchQuery) {
//       setResult(undefined);
//       return;
//     }

//     let ignored = false;
//     setResult({ loading: true });
//     fetchData(searchQuery)
//       .then((result) => {
//         if (ignored) return;
//         setResult({
//           loading: false,
//           items: result,
//         });
//       })
//       .catch((err) => {
//         if (ignored) return;
//         setResult({
//           loading: false,
//           error: err,
//         });
//       });

//     return () => {
//       ignored = true;
//     };
//   }, debounceTime);

//   const renderResult = () => {
//     if (result.loading) {
//       return (
//         <div className={"search__loader"}>
//           <Loader />
//         </div>
//       );
//     }

//     if (result.error) {
//       return <div className={"search__message"}>{result.error}</div>;
//     }

//     if (!result.items?.length) {
//       return <div className={"search__message"}>No result!</div>;
//     }

//     return (
//       <ul className={"search__list"}>
//         {result.items.map((item) => (
//           <li className={"search__item"} key={item}>
//             <button onClick={() => onSelectItem(item)}>{item}</button>
//           </li>
//         ))}
//       </ul>
//     );
//   };

//   return (
//     <div className="search">
//       <input
//         className="search__input"
//         placeholder={placeholder}
//         onChange={hangleChange}
//       ></input>
//       {!!result && <div className="search__result">{renderResult()}</div>}
//     </div>
//   );
//   // Your code end here
// };

// export default Input;