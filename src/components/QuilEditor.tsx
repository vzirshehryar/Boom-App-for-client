"use client";
import { toolbarOptions } from "@/libs/config";
import dynamic from "next/dynamic";
import React, { useEffect, useMemo, useState } from "react";
import "react-quill/dist/quill.snow.css";

type QuilEditorProps = {
  value: string;
  onChange: any;
  counterId: string;
};

const QuilEditor = ({ value, onChange, counterId }: QuilEditorProps) => {
  const [enableEditor, setEnableEditor] = useState(false);
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    [],
  );
  const loadQuill = async () => {
    return (
      new Promise(async (resolve, reject) => {
        const Quill = await require("react-quill").Quill;
        resolve({ Quill });
      })
        // @ts-expect-error
        .then(({ Quill }) => {
          Quill.register(
            "modules/counter",
            function (quill: any, options: any) {
              var container = document.querySelector(options.container);
              quill.on("text-change", function () {
                var text = quill.getText().trim();
                if (options.unit === "word") {
                  // slpit words and remove empty words
                  let words = text.split(/\s+/).filter((word: string) => word);
                  if (words.length > 0) {
                    container.innerText = words.length + " word(s)";
                  } else {
                    container.innerText = "";
                  }
                } else {
                  container.innerText = text.length + " characters";
                }
              });
            },
          );
          return;
        })
        .then((value) => {
          setEnableEditor(true);
        })
    );
  };

  useEffect(() => {
    const load = async () => {
      await loadQuill();
    };
    load();
  }, []);

  return (
    <div>
      {enableEditor ? (
        <>
          <ReactQuill
            theme="snow"
            modules={{
              toolbar: toolbarOptions,
              counter: {
                container: `#${counterId}`,
                unit: "word",
              },
            }}
            value={value}
            onChange={onChange}
          />
          <p id={counterId} className="text-end"></p>
        </>
      ) : null}
    </div>
  );
};

export default QuilEditor;
