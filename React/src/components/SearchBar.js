import React, { useState } from 'react'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/searchbar.css";
import axios from 'api/axios.js';
import { useNavigate } from 'react-router-dom';


function SearchBar() {

    const navigator = useNavigate();

    const [results, setResults] = useState({});
    const [input, setInput] = useState("");

    const search = async (input) => {
        // query params
        const query = {
            name: input
        }

        if (input === "") return setResults([]);
        console.log(query);
        // axios call
        const response = await axios.get('/community/search', { params: query });
        setResults(response.data);
        console.log(response.data);
    }

    const navigateToPage = (e, key) => {
        e.preventDefault();
        navigator(`/community/${key}`);
    }



    return (
        <div className="nav-search">
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Search For Communities"
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value);
                        search(e.target.value);
                    }}
                >

                </input>
                {results.length > 0 && (
                    <ul className="search-results">
                        {results.map(result => (
                            <li key={result._id} onClick={(e) => navigateToPage(e, result._id)}>{result.name}</li>
                        ))}
                    </ul>
                )}
                <FontAwesomeIcon icon={faMagnifyingGlass} className="icon-search" />
            </div>

        </div>
    );
}


export default SearchBar;