import { useState } from "react";
import { X } from "lucide-react"; 
import { Input } from "@/components/ui/input";
import { Badge } from "./ui/badge";

type TagInputProps = {
  availableTags: string[];
  selectedTags: string[];
  onTagChange: (tags: string[]) => void;
}

export const TagInput: React.FC<TagInputProps> = ({
  availableTags,
  selectedTags,
  onTagChange,
}) => {
  const [inputValue, setInputValue] = useState("");

  const addTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      onTagChange([...selectedTags, tag]);
    }

    setInputValue("");
  };

  const removeTag = (tag: string) => {
    const updatedTags = selectedTags.filter((t) => t !== tag);
    onTagChange(updatedTags);
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="font-semibold">Tags</label>

      <div className="flex flex-wrap gap-2">
        {selectedTags.map((tag) => (
          <Badge
            key={tag}
            className="flex items-center text-black px-3 py-1 rounded-full"
          >
            {tag}
            <X
              className="ml-2 cursor-pointer text-black"
              size={14}
              onClick={() => removeTag(tag)}
            />
          </Badge>
        ))}
      </div>

      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a tag..."
        onKeyDown={(e) => {
          if (e.key === "Enter" && inputValue.trim() !== "") {
            addTag(inputValue.trim());
          }
        }}
      />

      {availableTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {availableTags
            .filter((tag) => !selectedTags.includes(tag))
            .map((tag) => (
              <Badge
                key={tag}
                className="bg-primary-background text-black px-3 py-1 rounded-full cursor-pointer"
                onClick={() => addTag(tag)}
              >
                {tag}
              </Badge>
            ))}
        </div>
      )}
    </div>
  );
};
