"use client";

import { useState, useEffect } from "react";
import { getTagOptions, TagOptionT } from "../(hooks)/pocketbase";

function SelectTags({
  selectName,
  selectionChange,
}: {
  selectName: string;
  selectionChange: (tagId: string) => void;
}) {
  const [tags, setTags] = useState<TagOptionT[] | undefined>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getTagOptions().then((data) => {
      setTags(data);
    });
    setLoading(false);
  }, []);

  if (!tags?.length) return null;

  if (isLoading) return <p>Loading ...</p>;

  return (
    <div>
      <select
        name={selectName}
        onChange={(e) => {
          console.log(e.target.value);
          if (!e.target.value) return;
          selectionChange(e.target.value);
        }}
      >
        <option value="">Select a tag</option>
        {tags.map((tag) => (
          <option key={tag.id} value={tag.id}>
            {tag.Name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectTags;
