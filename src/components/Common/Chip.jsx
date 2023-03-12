import React from "react";

const Chip = ({ label }) => {
  return (
    <p className="chip text-sm bg-gradient-to-r from-green-600 to-green-500 text-white py-1 px-2 rounded capitalize w-fit">
      {label}
    </p>
  );
};

export default Chip;
