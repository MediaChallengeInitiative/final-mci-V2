"use client";

import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import React, { ReactElement, useEffect, useRef, useState } from "react";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onClick?: () => void;
  openIcon?: JSX.Element;
  closeIcon?: JSX.Element;
}

interface AccordionProps {
  openMultiple?: boolean;
  children: ReactElement[];
  openIcon?: JSX.Element;
  closeIcon?: JSX.Element;
  defaultOpen?: number[];
}

// Separate icons into their own components for better code splitting
const MinusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-minus text-white mr-2"
    aria-hidden="true"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-plus text-white mr-2"
    aria-hidden="true"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  isOpen = false,
  onClick,
  openIcon,
  closeIcon
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | string>(isOpen ? "auto" : "0");
  const [hasRendered, setHasRendered] = useState(false);

  useEffect(() => {
    setHasRendered(true);
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!hasRendered) return;

    const updateHeight = () => {
      const contentHeight =
        contentRef.current?.getBoundingClientRect().height ?? 0;
      setHeight(isOpen ? `${contentHeight}px` : "0px");
    };

    updateHeight();

    const debouncedResize = debounce(updateHeight, 100);
    window.addEventListener("resize", debouncedResize);

    return () => {
      window.removeEventListener("resize", debouncedResize);
    };
  }, [isOpen, hasRendered]);

  return (
    <div className="relative z-1 rounded-md">
      <div className="lg:col-span-1 p-4 border border-zinc-300 rounded-md bg-green-600 shadow-custom-1">
        <button
          className="flex w-full items-center justify-between cursor-pointer"
          onClick={onClick}
          aria-expanded={isOpen}
          type="button"
        >
          <span className="text-base md:text-lg lg:text-xl xl:text-2xl text-white hover:text-gray-300 font-semibold">
            {title}
          </span>
          <div className="flex items-center">
            {hasRendered &&
              (isOpen ? openIcon || <MinusIcon /> : closeIcon || <PlusIcon />)}
          </div>
        </button>

        <div
          ref={wrapperRef}
          className="overflow-hidden transition-all duration-300"
          style={{ height }}
        >
          <div className="p-4 lg:col-span-1" ref={contentRef}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const Accordion: React.FC<AccordionProps> = ({
  openMultiple = false,
  children,
  openIcon,
  closeIcon,
  defaultOpen = []
}) => {
  const [activeAccordions, setActiveAccordions] =
    useState<number[]>(defaultOpen);
  const [hasRendered, setHasRendered] = useState(false);

  useEffect(() => {
    setHasRendered(true);
  }, []);

  const handleAccordionClick = React.useCallback(
    (index: number) => {
      if (openMultiple) {
        setActiveAccordions((prev) =>
          prev.includes(index)
            ? prev.filter((item) => item !== index)
            : [...prev, index]
        );
      } else {
        setActiveAccordions((prev) => (prev[0] === index ? [] : [index]));
      }
    },
    [openMultiple]
  );

  if (!hasRendered) {
    return <div className="gap-base grid lg:grid-cols-2 grid-cols-1 my-4" />;
  }

  return (
    <div className="gap-base grid lg:grid-cols-2 grid-cols-1 my-4">
      {React.Children.map(children, (child, index) =>
        React.isValidElement(child)
          ? React.cloneElement(child as ReactElement, {
              isOpen: activeAccordions.includes(index),
              onClick: () => handleAccordionClick(index),
              openIcon,
              closeIcon
            })
          : null
      )}
    </div>
  );
};

// Utility function for debouncing resize events with proper typing
function debounce<Func extends (...args: unknown[]) => void>(
  func: Func,
  wait: number
): (...args: Parameters<Func>) => void {
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args: Parameters<Func>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export { AccordionItem, Accordion };

// "use client";

// import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
// import React, { ReactElement, useEffect, useRef, useState } from "react";

// interface AccordionItemProps {
//   title: string;
//   children: React.ReactNode;
//   isOpen?: boolean;
//   onClick?: () => void;
//   openIcon?: JSX.Element;
//   closeIcon?: JSX.Element;
// }

// interface AccordionProps {
//   openMultiple?: boolean;
//   children: ReactElement[];
//   openIcon?: JSX.Element;
//   closeIcon?: JSX.Element;
//   defaultOpen?: number[];
// }

// // Separate icons into their own components for better code splitting
// const MinusIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     className="feather feather-minus text-white mr-2"
//     aria-hidden="true"
//   >
//     <line x1="5" y1="12" x2="19" y2="12" />
//   </svg>
// );

// const PlusIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     className="feather feather-plus text-white mr-2"
//     aria-hidden="true"
//   >
//     <line x1="12" y1="5" x2="12" y2="19" />
//     <line x1="5" y1="12" x2="19" y2="12" />
//   </svg>
// );

// const AccordionItem: React.FC<AccordionItemProps> = ({
//   title,
//   children,
//   isOpen = false,
//   onClick,
//   openIcon,
//   closeIcon
// }) => {
//   const contentRef = useRef<HTMLDivElement>(null);
//   const wrapperRef = useRef<HTMLDivElement>(null);
//   const [height, setHeight] = useState<number | string>(isOpen ? "auto" : "0");
//   const [hasRendered, setHasRendered] = useState(false);

//   useEffect(() => {
//     setHasRendered(true);
//   }, []);

//   useIsomorphicLayoutEffect(() => {
//     if (!hasRendered) return;

//     const updateHeight = () => {
//       const contentHeight =
//         contentRef.current?.getBoundingClientRect().height ?? 0;
//       setHeight(isOpen ? `${contentHeight}px` : "0px");
//     };

//     updateHeight();

//     const debouncedResize = debounce(updateHeight, 100);
//     window.addEventListener("resize", debouncedResize);

//     return () => {
//       window.removeEventListener("resize", debouncedResize);
//     };
//   }, [isOpen, hasRendered]);

//   return (
//     <div className="relative z-1 rounded-md">
//       <div className="lg:col-span-1 p-4 border border-zinc-300 rounded-md bg-green-600 shadow-custom-1">
//         <button
//           className="flex w-full items-center justify-between cursor-pointer"
//           onClick={onClick}
//           aria-expanded={isOpen}
//           type="button"
//         >
//           <span className="text-base md:text-lg lg:text-xl xl:text-2xl text-white hover:text-gray-300 font-semibold">
//             {title}
//           </span>
//           <div className="flex items-center">
//             {hasRendered &&
//               (isOpen ? openIcon || <MinusIcon /> : closeIcon || <PlusIcon />)}
//           </div>
//         </button>

//         <div
//           ref={wrapperRef}
//           className="overflow-hidden transition-all duration-300"
//           style={{ height }}
//         >
//           <div className="p-4 lg:col-span-1" ref={contentRef}>
//             {children}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Accordion: React.FC<AccordionProps> = ({
//   openMultiple = false,
//   children,
//   openIcon,
//   closeIcon,
//   defaultOpen = []
// }) => {
//   const [activeAccordions, setActiveAccordions] =
//     useState<number[]>(defaultOpen);
//   const [hasRendered, setHasRendered] = useState(false);

//   useEffect(() => {
//     setHasRendered(true);
//   }, []);

//   const handleAccordionClick = React.useCallback(
//     (index: number) => {
//       if (openMultiple) {
//         setActiveAccordions((prev) =>
//           prev.includes(index)
//             ? prev.filter((item) => item !== index)
//             : [...prev, index]
//         );
//       } else {
//         setActiveAccordions((prev) => (prev[0] === index ? [] : [index]));
//       }
//     },
//     [openMultiple]
//   );

//   if (!hasRendered) {
//     return <div className="gap-base grid lg:grid-cols-2 grid-cols-1 my-4" />;
//   }

//   return (
//     <div className="gap-base grid lg:grid-cols-2 grid-cols-1 my-4">
//       {React.Children.map(children, (child, index) =>
//         React.isValidElement(child)
//           ? React.cloneElement(child as ReactElement, {
//               isOpen: activeAccordions.includes(index),
//               onClick: () => handleAccordionClick(index),
//               openIcon,
//               closeIcon
//             })
//           : null
//       )}
//     </div>
//   );
// };

// // Utility function for debouncing resize events
// function debounce<T extends (...args: any[]) => any>(
//   func: T,
//   wait: number
// ): (...args: Parameters<T>) => void {
//   let timeout: NodeJS.Timeout;

//   return function executedFunction(...args: Parameters<T>) {
//     const later = () => {
//       clearTimeout(timeout);
//       func(...args);
//     };

//     clearTimeout(timeout);
//     timeout = setTimeout(later, wait);
//   };
// }

// export { AccordionItem, Accordion };
