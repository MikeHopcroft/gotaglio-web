/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import ReactMarkdown from 'react-markdown';
import {NavLink} from 'react-router-dom';

function Markdown({children}: {children: string}) {
  return (
    <div className='mb-5'>
    <ReactMarkdown
      components={{
        h1: ({node, ...props}) => (
          <h1 className="text-3xl font-bold mt-4 mb-2" {...props} />
        ),
        h2: ({node, ...props}) => (
          <h2 className="text-2xl font-bold mt-4 mb-2" {...props} />
        ),
        h3: ({node, ...props}) => ( 
          <h3 className="text-xl font-bold mt-4 mb-2" {...props} />
        ),
        a: ({node, ...props}) => {
          const {href, ...rest} = props;
          return (
            <NavLink className="text-blue-500 underline" to={href!} {...rest} />
          );
        },
        ul: ({node, ...props}) => <ul className="list-disc pl-5" {...props} />,
        li: ({node, ...props}) => <li {...props} />,
        p: ({node, ...props}) => <p className="my-2" {...props} />,
      }}
    >
      {children}
    </ReactMarkdown>
    </div>
  );
}

export default Markdown;
