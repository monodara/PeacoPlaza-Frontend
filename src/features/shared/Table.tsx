import React from 'react';

interface TableProps {
  dataList: Array<{ [key: string]: any }>;
  fields: string[];
  onDeleteClick: (itemId: string) => void; 
  onEditClick: (itemId: string) => void; 
  onRowClick: (itemId: string) => void; 
}

const Table: React.FC<TableProps> = ({ dataList, fields, onDeleteClick,onEditClick, onRowClick}) => {
  return (
    <div className="font-sans overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100 whitespace-nowrap">
          <tr>
            {fields.map((field, index) => (
              <th key={index} className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {field}
              </th>
            ))}
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 whitespace-nowrap">
          {dataList.map((data, index) => (
            <tr key={index} onClick={()=>{onRowClick(data.id)}}>
              {fields.map((field, idx) => (
                <td key={idx} className="px-4 py-4 text-sm text-gray-800">
                  {data[field]}
                </td>
              ))}
              <td className="px-4 py-4 text-sm text-gray-800">
                <button className="text-green-500 mr-4" onClick={()=>{onEditClick(data.id)}}>Edit</button>
                <button className="text-red-500" onClick={() => onDeleteClick(data.id)}>Delete</button> {/* 调用 onDeleteClick */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
