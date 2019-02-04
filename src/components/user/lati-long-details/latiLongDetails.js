import React from "react";

const LatiLognDetails = () => {
  return (
    <div className="lat-logn-details">
      <h2>Lat-Long Details</h2>
      <div className="d-flex align-items-center">
        <label>Latitude</label>
        <input type="text" className="form-control" />
        <span className="column">Date </span>
        <span>20 Oct 2018</span>
      </div>

      <div className="d-flex align-items-center">
        <label>Longitude</label>
        <input type="text" className="form-control" />
        <span className="column">Timeframe </span>
        <span>10:00-10:30 AM</span>
      </div>

      <div className="d-flex align-items-center">
        <label>Video Position</label>
        <input type="text" className="form-control" />
        <span className="column">Video Length </span>
        <span>00:30:00</span>
      </div>
    </div>
  );
};

export default LatiLognDetails;
