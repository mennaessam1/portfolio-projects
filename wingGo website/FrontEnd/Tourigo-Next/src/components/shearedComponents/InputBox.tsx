import React from 'react';

interface InputBoxProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeHolder?: string;
}

const InputBox: React.FC<InputBoxProps> = ({ value, onChange, placeHolder }) => {
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission if needed
  };

  return (
    <>
      <form
        onSubmit={handleSearchSubmit}
        className="sidebar-search-form"
        action="#"
        method="get"
      >
        <input
          type="text"
          value={value}
          onChange={onChange}
          name="s"
          placeholder={`Search ${placeHolder ? placeHolder : ""}`}
        />
        <button type="submit">
          <i className="far fa-search"></i>
        </button>
      </form>
    </>
  );
};

export default InputBox;