import React from "react";

// Define the type for a single child
type Child = {
  text: string;
};

// Define the type for a single block
type Block = {
  children: Child[];
};

// Define type for text parts that can be either strings or React elements
type TextPart = string | JSX.Element;

const CustomSerializer = ({ blocks }: { blocks: Block[] }) => {
  return (
    <>
      {blocks.map((block, index) => {
        return (
          <p key={index}>
            {block.children.map((child, idx: number) => {
              if (typeof child.text === "string" && /".*?"/.test(child.text)) {
                const parts = child.text
                  .split(/(".*?")/)
                  .map((part: string, i: number): TextPart => {
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

// import React from "react";

// // Define the type for a single child
// type Child = {
//   text: string;
// };

// // Define the type for a single block
// type Block = {
//   children: Child[];
// };

// const CustomSerializer = ({ blocks }: { blocks: Block[] }) => {
//   return (
//     <>
//       {blocks.map((block, index) => {
//         return (
//           <p key={index}>
//             {block.children.map((child, idx: number) => {
//               if (typeof child.text === "string" && /".*?"/.test(child.text)) {
//                 const parts = child.text
//                   .split(/(".*?")/)
//                   .map((part: any, i: number) => {
//                     if (/".*?"/.test(part)) {
//                       return (
//                         <span key={i} className="italic text-sky-500">
//                           {part}
//                         </span>
//                       );
//                     }
//                     return part;
//                   });
//                 return <React.Fragment key={idx}>{parts}</React.Fragment>;
//               }
//               return child.text;
//             })}
//           </p>
//         );
//       })}
//     </>
//   );
// };

// export default CustomSerializer;
