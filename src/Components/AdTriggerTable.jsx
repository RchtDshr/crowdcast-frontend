import React from 'react';

const AdTriggerTable = ({ TimelineEntries }) => {
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
          {TimelineEntries.map((entry, index) => (
            <tr key={index} className="border-t border-gray-200">
              <td className="px-4 py-2">{entry.locationName}</td>
              <td className="px-4 py-2">
                {new Date(entry.timeOfDisplay).toLocaleString()}
              </td>
              <td className="px-4 py-2">{entry.deductedAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdTriggerTable;
