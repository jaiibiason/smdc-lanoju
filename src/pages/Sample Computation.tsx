import Crumbs from "../components/Crumbs";
import React, { useState } from "react";
import "../css/SampleComputation.css"; // Import the new CSS file

const tableData = [
  {
    totalPrice: "₱4,000,000.00",
    spotPayment: "₱200,000.00",
    reservationFee: "₱30,000.00",
    downpayment: "₱600,000.00",
    monthlyAmortization: "₱12,500.00",
    remainingBalance: "₱3,200,000.00",
  },
  {
    totalPrice: "₱6,000,000.00",
    spotPayment: "₱300,000.00",
    reservationFee: "₱30,000.00",
    downpayment: "₱900,000.00",
    monthlyAmortization: "₱18,750.00",
    remainingBalance: "₱4,800,000.00",
  },
  {
    totalPrice: "₱7,000,000.00",
    spotPayment: "₱350,000.00",
    reservationFee: "₱30,000.00",
    downpayment: "₱1,050,000.00",
    monthlyAmortization: "₱21,875.00",
    remainingBalance: "₱5,600,000.00",
  },
  {
    totalPrice: "₱9,000,000.00",
    spotPayment: "₱450,000.00",
    reservationFee: "₱30,000.00",
    downpayment: "₱1,350,000.00",
    monthlyAmortization: "₱28,125.00",
    remainingBalance: "₱7,200,000.00",
  },
  {
    totalPrice: "₱11,000,000.00",
    spotPayment: "₱550,000.00",
    reservationFee: "₱30,000.00",
    downpayment: "₱1,650,000.00",
    monthlyAmortization: "₱34,375.00",
    remainingBalance: "₱8,800,000.00",
  },
  {
    totalPrice: "₱13,000,000.00",
    spotPayment: "₱650,000.00",
    reservationFee: "₱30,000.00",
    downpayment: "₱1,950,000.00",
    monthlyAmortization: "₱40,625.00",
    remainingBalance: "₱10,400,000.00",
  },
];

const remainingBalanceData: Record<string, Record<string, string>> = {
  "₱3,200,000.00": {
    "5 years": "₱60,755.15",
    "10 years": "₱34,333.34",
    "15 years": "₱25,724.09",
    "20 years": "₱21,563.01",
  },
  "₱4,800,000.00": {
    "5 years": "₱91,132.73",
    "10 years": "₱51,500.01",
    "15 years": "₱38,586.14",
    "20 years": "₱32,344.52",
  },
  "₱5,600,000.00": {
    "5 years": "₱106,321.82",
    "10 years": "₱60,083.34",
    "15 years": "₱45,515.16",
    "20 years": "₱38,198.77",
  },
  "₱7,200,000.00": {
    "5 years": "₱136,698.39",
    "10 years": "₱77,750.01",
    "15 years": "₱58,377.23",
    "20 years": "₱49,033.52",
  },
  "₱8,800,000.00": {
    "5 years": "₱167,074.97",
    "10 years": "₱95,416.68",
    "15 years": "₱71,239.30",
    "20 years": "₱59,868.27",
  },
  "₱10,400,000.00": {
    "5 years": "₱197,451.54",
    "10 years": "₱113,083.35",
    "15 years": "₱84,101.37",
    "20 years": "₱70,703.02",
  },
};

function SampleCompuatation() {
  const [selectedTotalPrice, setSelectedTotalPrice] = useState(tableData[0]);
  const [selectedRemainingBalance, setSelectedRemainingBalance] = useState(
    tableData[0].remainingBalance
  );

  const handleTotalPriceChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selected = tableData.find(
      (row) => row.totalPrice === event.target.value
    );
    if (selected) {
      setSelectedTotalPrice(selected);
      setSelectedRemainingBalance(selected.remainingBalance);
    }
  };

  const handleRemainingBalanceChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedRemainingBalance(event.target.value);
  };

  return (
    <>
    <Crumbs pageName={'Sample Computation'}/> 

    <section className="sample-computation-pg">
      <div className="hero-cont">
        <h1>Sample Computation</h1>
      </div>

      <div className="desktop-computation">
        
        <div className="sample-computation-table">
          <table>
            <thead>
              <tr>
                <th>Total Contract Price</th>
                <th>Spot Payment (5%)</th>
                <th>Reservation Fee</th>
                <th>
                  Downpayment (15%) <br />
                  <span>(payable in 48 months)</span>
                </th>
                <th>Monthly Amortization</th>
                <th>Remaining Balance (80%)</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td>{row.totalPrice}</td>
                  <td>{row.spotPayment}</td>
                  <td>{row.reservationFee}</td>
                  <td>{row.downpayment}</td>
                  <td>{row.monthlyAmortization}</td>
                  <td>{row.remainingBalance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Remaining Balance Section for Desktop */}
        <div className="desktop-remaining-balance">
          <div className="computation-notes">
            <p>
              After completing the 48-month downpayment period, the remaining
              balance will be due.
            </p>
            <p>
              This can be settled through bank financing, allowing for flexible
              payment terms of 5, 10, 15, or 20 years at competitive interest
              rates.
            </p>
          </div>

          <table>
            <thead>
              <tr>
                <th>Remaining Balance (80%)</th>
                <th>5 Years</th>
                <th>10 Years</th>
                <th>15 Years</th>
                <th>20 Years</th>
                <th>
                  <p className="computation-notes bsp">
                    <i>Based on PSB 1-year fixing 5.25% (estimate only)</i>
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(remainingBalanceData).map(
                ([balance, terms], index) => (
                  <tr key={index}>
                    <td>{balance}</td>
                    {Object.values(terms).map((amount, termIndex) => (
                      <td key={termIndex}>{amount}</td>
                    ))}
                    <td></td>
                  </tr>
                )
              )}
            </tbody>
          </table>

          <p className="computation-notes disclaimer">
            <b>Disclaimer:</b> These are sample computations only. Actual payment
            terms may vary based on client preferences, including adjustments to
            the spot payment, downpayment, and monthly amortization structure.
            Inquire now, and I'll be happy to tailor a payment plan that suits you
            best.
          </p>
          <button className="inquire-btn yellow">Inquire Now</button>
        </div>
      </div>

      {/* Mobile View */}
      <div className="mobile-computation">
        <label htmlFor="totalPrice">Total Contract Price:</label>
        <div className="dropdown-placeholder">
          {/* <div className="dropdown"> */}
          <select
            id="totalPrice"
            value={selectedTotalPrice.totalPrice}
            onChange={handleTotalPriceChange}
          >
            {tableData.map((row, index) => (
              <option key={index} value={row.totalPrice}>
                {row.totalPrice}
              </option>
            ))}
          </select>
          <span className="dropdown-arrow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="7"
              fill="currentColor"
              viewBox="0 0 12 7"
            >
              <path d="M11.8527 0.645818C12.0484 0.840732 12.0489 1.15731 11.854 1.35292L6.38902 6.83741C6.17408 7.05312 5.82477 7.05312 5.60982 6.83741L0.14484 1.35292C-0.0500734 1.15731 -0.0495088 0.840731 0.1461 0.645817C0.34171 0.450903 0.658292 0.451467 0.853206 0.647077L5.99942 5.81166L11.1456 0.647077C11.3406 0.451468 11.6571 0.450904 11.8527 0.645818Z" />
            </svg>
          </span>
          {/* </div> */}
        </div>

        <div className="computation-details">
          <p>
            <span>Total Contract Price:</span>
            <span>{selectedTotalPrice.totalPrice}</span>
          </p>
          <p>
            <span>Spot Payment (5%):</span>
            <span>{selectedTotalPrice.spotPayment}</span>
          </p>
          <p>
            <span>Reservation Fee:</span>
            <span>{selectedTotalPrice.reservationFee}</span>
          </p>
          <p>
            <span className="label-subtext">
              <span>Downpayment (15%):</span>
              <span className="subtext">(payable in 48 months)</span>
            </span>
            <span>{selectedTotalPrice.downpayment}</span>
          </p>
          <p>
            <span>Monthly Amortization:</span>
            <span>{selectedTotalPrice.monthlyAmortization}</span>
          </p>
          <p>
            <span>Remaining Balance (80%):</span>
            <span>{selectedTotalPrice.remainingBalance}</span>
          </p>
        </div>

        <div className="computation-notes">
          <p>
            After completing the 48-month downpayment period, the remaining
            balance will be due.
          </p>
          <p>
            This can be settled through bank financing, allowing for flexible
            payment terms of 5, 10, 15, or 20 years at competitive interest
            rates.
          </p>
        </div>

        {/* Remaining Balance Section */}
        <label htmlFor="remainingBalance">Remaining Balance:</label>
        <div className="dropdown-placeholder">
          {/* <div className="dropdown"> */}
          <select
            id="remainingBalance"
            value={selectedRemainingBalance}
            onChange={handleRemainingBalanceChange}
          >
            {Object.keys(remainingBalanceData).map((balance, index) => (
              <option key={index} value={balance}>
                {balance}
              </option>
            ))}
          </select>
          <span className="dropdown-arrow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="7"
              fill="currentColor"
              viewBox="0 0 12 7"
            >
              <path d="M11.8527 0.645818C12.0484 0.840732 12.0489 1.15731 11.854 1.35292L6.38902 6.83741C6.17408 7.05312 5.82477 7.05312 5.60982 6.83741L0.14484 1.35292C-0.0500734 1.15731 -0.0495088 0.840731 0.1461 0.645817C0.34171 0.450903 0.658292 0.451467 0.853206 0.647077L5.99942 5.81166L11.1456 0.647077C11.3406 0.451468 11.6571 0.450904 11.8527 0.645818Z" />
            </svg>
          </span>
          {/* </div> */}
        </div>

        <div className="computation-details">
          <p>
            <span>Remaining Balance (80%):</span>
            <span>{selectedRemainingBalance}</span>
          </p>
          {remainingBalanceData[selectedRemainingBalance] ? (
            Object.entries(remainingBalanceData[selectedRemainingBalance]).map(
              ([term, amount], index) => (
                <p key={index}>
                  <span>{term}:</span>
                  <span>{amount}</span>
                </p>
              )
            )
          ) : (
            <p>No data available for the selected remaining balance.</p>
          )}
        </div>

        <p className="computation-notes bsp">
          <i>Based on PSB 1-year fixing 5.25% (estimate only)</i>
        </p>

        <p className="computation-notes disclaimer">
          <b>Disclaimer:</b> These are sample computations only. Actual payment
          terms may vary based on client preferences, including adjustments to
          the spot payment, downpayment, and monthly amortization structure.
          Inquire now, and I'll be happy to tailor a payment plan that suits you
          best.
        </p>

        <button className="inquire-btn yellow">Inquire Now</button>
      </div>
    </section>
    </>
  );
}

export default SampleCompuatation;
