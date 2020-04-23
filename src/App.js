import React, { useState, useEffect } from 'react';
import data from "./assets/data.json";
import JobBoardComponent from './components/JobBoardComponent';

function App() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState([]);

  useEffect(() => { setJobs(data); }, []);

  const filterFunc = ({ role, level, tools, languages }) => {

    if (filters.length === 0) {
      return true;
    }

    const tags = [role, level];

    if (tools) {
      tags.push(...tools);
    }

    if (languages) {
      tags.push(...languages);
    }

    return filters.every(filter => tags.includes(filter));
  };

  const handleTagClick = (tag) => {

    // avoid readding the tag
    if (filters.includes(tag)) return;

    setFilters([...filters, tag]);
  }

  const handleRemoveClick = (passedFilter) => {
    setFilters(filters.filter(f => f !== passedFilter));
  }

  const clearFilters = () => {
    setFilters([]);
  }

  const filteredJobs = jobs.filter(filterFunc);
  return (
    <div className="App flex flex-col justify-around">
      <header className="bg-teal-600 mb-12">
        <img src="./images/bg-header-desktop.svg" className="w-full" alt="header" />
      </header>

      {
        filters.length > 0 &&
        <div className="flex flex-row flex-wrap bg-white shadow-lg -mt-20 mb-8 mx-6 p-8 rounded-md 
            lg:mx-32 lg:mb-4 lg:-mt-24">
          {
            filters.map(
              (filter) => <div className="flex flex-row mr-2 mb-2">
                <span className="font-bold text-teal-500 bg-teal-100 px-2 py-1 rounded-l-sm">
                  {filter}
                </span>
                <span
                  onClick={() => handleRemoveClick(filter)}
                  className="bg-teal-500 flex flex-col justify-center px-2 rounded-r-md 
                transition-colors duration-300 cursor-pointer hover:bg-teal-900">
                  <img src='./images/icon-remove.svg' alt="remove-icon" />
                </span>

              </div>
            )
          }
          <button
            className="text-teal-500 border-0 bg-transparent ml-auto font-bold hover:underline"
            onClick={clearFilters}
          >
            Clear
          </button>
        </div>
      }

      {
        jobs.length === 0 ? (
          <div className="w-full h-full flex justify-center items-center">
            <span className="w-24 h-24">
              <img src="./images/loader.svg" alt="loader" className="w-full h-auto" />
            </span>
          </div>
        ) : (
            filteredJobs.map((job) => (
              <JobBoardComponent
                job={job}
                key={job.id}
                handleTagClick={handleTagClick}
              />
            ))
          )
      }
    </div>
  );
}


export default App;
