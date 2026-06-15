import { useState } from "react";

interface TaskFormProps {
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  titlePlaceholder?: string;
  descriptionPlaceholder?: string;
  setTags: (tags: string[]) => void;

  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onDueDateChange: (value: string) => void;

  showStatus?: boolean;
  completed?: boolean;
  onCompletedChange?: (value: boolean) => void;

  onSubmit: () => void;
  buttonText: string;
}

const TaskForm = ({
  title,
  description,
  dueDate,
  titlePlaceholder,
  descriptionPlaceholder,
  tags,
  setTags,
  onTitleChange,
  onDescriptionChange,
  onDueDateChange,
  showStatus,
  completed,
  onCompletedChange,
  onSubmit,
  buttonText,
}: TaskFormProps) => {
  const [showTags, setShowTags] = useState(false);

  const availableTags = [
    "Urgent",
    "Important",
    "Work",
    "Personal",
  ];

  const handleAddTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const fieldsetClass =
    "border border-gray-300 rounded-md px-4 py-5 min-[390px]:px-5 min-[414px]:px-6 md:px-10 md:py-8";

  const legendClass =
    "px-2 text-base min-[390px]:text-lg md:text-xl text-gray-500";

  const inputClass =
    "w-full h-9 min-[414px]:h-10 outline-none text-base md:text-lg bg-transparent placeholder:text-gray-300";

  return (
    <div className="w-full flex flex-col gap-8 min-[414px]:gap-10 md:gap-16">
      {/* TASK TITLE */}
      <fieldset className={fieldsetClass}>
        <legend className={legendClass}>
          Task Title
        </legend>

        <input
          type="text"
          value={title}
          placeholder={titlePlaceholder}
          onChange={(e) => onTitleChange(e.target.value)}
          className={inputClass}
        />
      </fieldset>

      {/* DESCRIPTION */}
      <fieldset className={fieldsetClass}>
        <legend className={legendClass}>
          Description
        </legend>

        <textarea
          rows={8}
          value={description}
          placeholder={descriptionPlaceholder}
          onChange={(e) => onDescriptionChange(e.target.value)}
          className="
            w-full
            min-h-[160px]
            min-[390px]:min-h-[175px]
            min-[414px]:min-h-[190px]
            md:min-h-[210px]
            resize-none
            outline-none
            text-base
            md:text-lg
            bg-transparent
            placeholder:text-gray-300
          "
        />
      </fieldset>

      {/* TAGS */}
      <fieldset className={fieldsetClass}>
        <legend className={legendClass}>
          Tags
        </legend>

        <div
          className="min-h-8 cursor-pointer"
          onClick={() => setShowTags(!showTags)}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2 md:gap-3">
              {tags.length === 0 && (
                <span className="text-base md:text-lg text-gray-400">
                  Select Tags
                </span>
              )}

              {tags.map((tag) => (
                <span
                  key={tag}
                  className="
                    bg-gray-400
                    text-white
                    px-2
                    py-1
                    md:px-3
                    rounded-sm
                    flex
                    items-center
                    gap-2
                    text-xs
                    md:text-sm
                  "
                >
                  {tag}

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveTag(tag);
                    }}
                    className="font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <span className="text-2xl md:text-3xl text-gray-500">
              {showTags ? "⌃" : "⌄"}
            </span>
          </div>
        </div>

        {showTags && (
          <div className="mt-5 flex flex-wrap gap-2 md:gap-3 border-t pt-4">
            {availableTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleAddTag(tag)}
                className="
                  rounded-sm
                  bg-gray-400
                  px-3
                  py-1
                  text-sm
                  md:text-base
                  text-white
                  transition
                  hover:bg-purple-500
                "
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </fieldset>

      {/* DUE DATE */}
      <fieldset className={fieldsetClass}>
        <legend className={legendClass}>
          Due Date
        </legend>

        <input
          type="date"
          value={dueDate}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => onDueDateChange(e.target.value)}
          className={`${inputClass} text-gray-500`}
        />
      </fieldset>

      {showStatus && (
        <fieldset className={fieldsetClass}>
          <legend className={legendClass}>
            Status
          </legend>

          <select
            value={String(completed)}
            onChange={(e) =>
              onCompletedChange?.(e.target.value === "true")
            }
            className={`${inputClass} text-gray-500`}
          >
            <option value="false">Pending</option>
            <option value="true">Completed</option>
          </select>
        </fieldset>
      )}

      {/* SUBMIT BUTTON */}
      <button
        type="button"
        onClick={onSubmit}
        className="
          w-full
          h-14
          min-[414px]:h-16
          bg-[#974FD0]
          text-white
          rounded-md
          text-lg
          min-[414px]:text-xl
          md:text-2xl
          cursor-pointer
          font-medium
          hover:opacity-90
          transition
          hover:bg-green-300
          hover:text-purple-500
          delay-100
          duration-300
          ease-in-out
          hover:-translate-y-1
          md:hover:scale-105
        "
      >
        {buttonText}
      </button>

      {/* BACK TO TOP */}
      <div className="text-center">
        <a
          href="#top"
          className="text-[#974FD0] underline text-base md:text-lg"
        >
          Back To Top
        </a>
      </div>
    </div>
  );
};

export default TaskForm;