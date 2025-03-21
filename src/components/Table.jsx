// src/components/ui/table.jsx
import React from "react";

export const Table = ({ children }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">{children}</table>
    </div>
  );
};

export const TableHead = ({ children }) => {
  return <thead className="bg-gray-100">{children}</thead>;
};

export const TableBody = ({ children }) => {
  return <tbody>{children}</tbody>;
};

export const TableRow = ({ children }) => {
  return <tr className="border-b">{children}</tr>;
};

export const TableCell = ({ children, className }) => {
  return <td className={`p-2 ${className}`}>{children}</td>;
};
