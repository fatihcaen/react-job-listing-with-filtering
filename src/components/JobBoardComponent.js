import React from 'react';

const JobBoardComponent = ({
  job: {
    company,
    logo,
    isNew,
    featured,
    position,
    role,
    level,
    postedAt,
    contract,
    location,
    languages,
    tools
  },
  handleTagClick,
  key,
}) => {
  const tags = [role, level];

  if (tools) {
    tags.push(...tools);
  }

  if (languages) {
    tags.push(...languages);
  }
  return (
    <div className={`flex flex-col justify-between bg-white shadow-lg my-8 mx-8 p-8
         border-teal-500 rounded-md ${featured && 'border-l-8 border-teal-500'} 
         lg:flex-row lg:mx-32 lg:my-4`}>
      <div className="flex flex-col mb-4 lg:flex-row lg:mb-0 
            lg:items-center">
        <div className="-mt-16 mb-2 w-12 
                lg:mt-0 lg:w-20 lg:mr-4 lg:mb-0">
          <img src={logo} alt={'company-logo'} className="w-full h-auto" />
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex flex-row">
            <h6 className="font-bold text-teal-500 mr-2">{company}</h6>
            <div className="flex flex-row">
              {
                isNew &&
                <div className="text-xs tracking-widest font-bold bg-teal-500 
                                    text-white rounded-full py-1 px-2 mr-2">
                  NEW
                </div>
              }
              {
                featured &&
                <div className="text-xs tracking-widest font-bold bg-teal-900 
                                    text-white rounded-full py-1 px-2">
                  FEATURED
                </div>
              }
            </div>
          </div>
          <div className="text-xl font-bold text-teal-900 transition-color duration-300 
                    cursor-pointer hover:text-teal-500 my-2">
            {position}
          </div>
          <div className="flex flex-row  text-md text-gray-500 font-medium">
            {postedAt} <div className="mx-4">•</div> {contract} <div className="mx-4">•</div> {location}
          </div>
        </div>
      </div>
      <div className="flex flex-row flex-wrap items-center mt-2 pt-4 border-t-2 border-gray-500 
            border-solid lg:border-0 lg:pt-0 lg:mt-2">
        {
          tags ?
            tags.map((tag) =>
              <span
                onClick={() => handleTagClick(tag)}
                className="mr-2 mb-2 font-bold text-teal-500 bg-teal-100 px-2 py-1 
                            rounded-sm transition-colors 
                            duration-300  cursor-pointer cursor-pointer hover:bg-teal-500 hover:text-white">
                {tag}
              </span>
            ) : ''
        }
      </div>
    </div>
  )
};

export default JobBoardComponent;
