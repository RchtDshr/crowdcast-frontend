import React from 'react';

const AdTriggerTable = () => {
  // Define data as an array of objects
  const data = [
    { location: 'Malls: Digital Screens', dateTime: 'Oct 12, 6:23 pm', credits: '12,000' },
    { location: 'Universities and Colleges: Digital Boards', dateTime: 'Oct 11, 10:13 am', credits: '8,000' },
    { location: 'Malls: Digital Screens', dateTime: 'Oct 12, 6:23 pm', credits: '12,000' },
    { location: 'Universities and Colleges: Digital Boards', dateTime: 'Oct 11, 10:13 am', credits: '8,000' },
    { location: 'Universities and Colleges: Digital Boards', dateTime: 'Oct 11, 10:13 am', credits: '8,000' },
  ];

  //will add a api call to get the data

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Recent locations at which the ad was triggered</h2>
      <table className="w-full border border-gray-300 rounded-lg shadow">
        <thead>
          <tr className="bg-primary text-white">
            <th className="px-4 py-2 text-left">Location</th>
            <th className="px-4 py-2 text-left">Date & Time</th>
            <th className="px-4 py-2 text-left">Credits Deducted</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-t border-gray-200">
              <td className="px-4 py-2">{item.location}</td>
              <td className="px-4 py-2">{item.dateTime}</td>
              <td className="px-4 py-2">{item.credits}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdTriggerTable;
