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
  // ...add more data for other remaining balances...
};

function SampleCompuatation() {
  const [selectedTotalPrice, setSelectedTotalPrice] = useState(tableData[0]);
  const [selectedRemainingBalance, setSelectedRemainingBalance] = useState(
    tableData[0].remainingBalance
  );

  const handleTotalPriceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = tableData.find((row) => row.totalPrice === event.target.value);
    if (selected) {
      setSelectedTotalPrice(selected);
      setSelectedRemainingBalance(selected.remainingBalance);
    }
  };

  const handleRemainingBalanceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRemainingBalance(event.target.value);
  };

  return (
    <section className="sample-computation-pg">
      <div className="hero-cont">
        <h1>Sample Computation</h1>
      </div>

      <div className="sample-computation-table">
        <table>
          <thead>
            <tr>
              <th>Total Contract Price</th>
              <th>Spot Payment (5%)</th>
              <th>Reservation Fee</th>
              <th>Downpayment (15%) <br /><span>(payable in 48 months)</span></th>
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

      {/* Mobile View */}
      <div className="mobile-computation">
        <div className="dropdown-section">
          <label htmlFor="totalPrice">Total Contract Price:</label>
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
        </div>

        <div className="computation-details">
          <p>Total Contract Price: {selectedTotalPrice.totalPrice}</p>
          <p>Spot Payment (5%): {selectedTotalPrice.spotPayment}</p>
          <p>Reservation Fee: {selectedTotalPrice.reservationFee}</p>
          <p>
            Downpayment (15%): {selectedTotalPrice.downpayment}{" "}
            <span>(payable in 48 months)</span>
          </p>
          <p>Monthly Amortization: {selectedTotalPrice.monthlyAmortization}</p>
          <p>Remaining Balance (80%): {selectedTotalPrice.remainingBalance}</p>
        </div>

        <p>
          After completing the 48-month downpayment period, the remaining balance will be due.
        </p>
        <p>
          This can be settled through bank financing, allowing for flexible payment terms of 5, 10,
          15, or 20 years at competitive interest rates.
        </p>

        <div className="dropdown-section">
          <label htmlFor="remainingBalance">Remaining Balance:</label>
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
        </div>

        <div className="remaining-balance-details">
          <p>Remaining Balance (80%): {selectedRemainingBalance}</p>
          {remainingBalanceData[selectedRemainingBalance] ? (
            <ul>
              {Object.entries(remainingBalanceData[selectedRemainingBalance]).map(
                ([term, amount], index) => (
                  <li key={index}>
                    {term}: {amount}
                  </li>
                )
              )}
            </ul>
          ) : (
            <p>No data available for the selected remaining balance.</p>
          )}
        </div>

        <p>
          <i>Based on PSB 1-year fixing 5.25% (estimate only)</i>
        </p>
        <p>
          <b>Disclaimer:</b> These are sample computations only. Actual payment terms may vary based
          on client preferences, including adjustments to the spot payment, downpayment, and monthly
          amortization structure. Inquire now, and I'll be happy to tailor a payment plan that suits
          you best.
        </p>

        <button className="inquire-btn">Inquire Now</button>
      </div>
    </section>
  );
}

export default SampleCompuatation;
