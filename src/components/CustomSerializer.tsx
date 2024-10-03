import React from 'react';

const CustomSerializer = ({ blocks }: { blocks: any[] }) => {
  return (
    <>
      {blocks.map((block, index) => {
        return (
          <p key={index}>
            {block.children.map((child: any, idx: number) => {
              if (typeof child.text === 'string' && /".*?"/.test(child.text)) {
                const parts = child.text.split(/(".*?")/).map((part:any, i:number) => {
                  if (/".*?"/.test(part)) {
                    return (
                      <span key={i} className="italic text-sky-500">
                        {part}
                      </span>
                    );
                  }
                  return part;
                });
                return <React.Fragment key={idx}>{parts}</React.Fragment>;
              }
              return child.text;
            })}
          </p>
        );
      })}
    </>
  );
};

export default CustomSerializer;
