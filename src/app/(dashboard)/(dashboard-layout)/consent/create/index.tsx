"use client";
import dynamic from "next/dynamic";
import React from "react";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const ConsentPage = () => {
  const [value, setValue] = React.useState("");

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-4">Consent Page</h1>
      <ReactQuill theme="snow" value={value} onChange={setValue} />
    </div>
  );
};

export default ConsentPage;
