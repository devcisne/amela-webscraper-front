import { HiClipboard, HiClipboardCheck } from "react-icons/hi";
import copy from "copy-to-clipboard";
import { useState } from "react";

const CopyButton = ({ company }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleClipboadClick = (company) => {
    console.log(company.company);
    copy(
      `${company.company} <a href=${company.links[0]}>levantó</a> ${company.amount}`,
      { format: "text/html" }
    );
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };
  return (
    <>
      <button>
        {isCopied ? (
          <HiClipboardCheck className="inline" />
        ) : (
          <HiClipboard onClick={() => handleClipboadClick(company)} />
        )}
      </button>
    </>
  );
};

export default CopyButton;
