"use client"

import { useState } from "react";
import ClickButton from "@/app/components/ClickButton";
import Input from "@/app/components/Input";
import TagsInput from "@/app/components/tag/TagsInput";

interface TodoFormProps {
  onSaveTodo: (value: string, tags: string[]) => void;
  autoCompleteTags: string[];
}

const TodoForm = ({
  onSaveTodo,
  autoCompleteTags = []
}: TodoFormProps) => {
  const [inputValue, setInputValue] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInputValue, setTagInputValue] = useState('');

  const addClickHandler = () => {
    onSaveTodo(inputValue, tags);
    setInputValue("");
    setTags([]);
    setTagInputValue(""); // タグ入力もクリア
  }

  const handleTagInputChange = (value: string) => {
    setTagInputValue(value);
  }

  const handleTagInputAdd = () => {
    if (tagInputValue && !tags.includes(tagInputValue)) {
      setTags([...tags, tagInputValue]);
      setTagInputValue('');
    }
  }

  const handleTagInputRemove = (tagToRemove: string) => {
    const updatedTags = tags.filter(tag => tag !== tagToRemove);
    setTags(updatedTags);
  }

  return (
    <div>
      <Input
        value={inputValue}
        onChange={setInputValue}
        placeholder="ToDoを入力..."
      />

      <div>
        {tags.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
            <button
              type="button"
              onClick={() => handleTagInputRemove(tag)}
              className="tag-remove"
            >
              ×
            </button>
          </span>
        ))}
      </div>

      <TagsInput
        tags={tags}
        onInputChange={handleTagInputChange}
        onInputAdd={handleTagInputAdd}
        onInputRemove={handleTagInputRemove}
        autoCompleteTags={autoCompleteTags}
        placeholder="タグを追加..."
      />

      <ClickButton
        label="追加"
        onClick={addClickHandler}
        disabled={!inputValue}
      />
    </div>
  );
}

export default TodoForm;