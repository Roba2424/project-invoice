import { useState, useEffect } from "react";
import API from "../api/constants";
import axios from "axios";
import Logout from "./Logout";

export default function Invoices({ user }) {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [invoiceLines, setInvoiceLines] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchIvoice = async () => {
      const response = await axios.get(API.invoices);
      const userInvoices = response.data.value.filter((invoice) => {
        return invoice.UserId === user.UserId;
      });
      setInvoices(userInvoices);
    };

    const fetchProducts = async () => {
      const response = await axios.get(API.products);
      setProducts(response.data.value);
    };

    fetchProducts();
    fetchIvoice();
  }, [user]);

  const handleInvoiceSelect = async (invoiceId) => {
    setSelectedInvoice(invoiceId);
    const response = await axios.get(API.invoicesLines);
    const lines = response.data.value.filter(
      (line) => line.InvoiceId === invoiceId
    );
    setInvoiceLines(lines);
  };

  const getProductName = (productId) => {
    const product = products.find((p) => p.ProductId === productId);
    return product ? product.Name : "";
  };

  const getProductPrice = (productId) => {
    const product = products.find((p) => p.ProductId === productId);
    return product ? product.Price : 0;
  };

  const calculateTotalAmount = (invoiceId) => {
    const lines = invoiceLines.filter((line) => line.InvoiceId === invoiceId);
    return lines.reduce((total, line) => total + line.Quantity, 0);
  };

  return (
    <div>
      <Logout user={user} />

      <h2>Invoices</h2>
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Invoice Name</th>
            <th>Paid Date</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => {
            const dateObject = new Date(invoice.PaidDate);
            const formattedDate = dateObject.toLocaleDateString();
            
            return (
              <tr key={invoice.InvoiceId}>
                <td>
                  <input
                    type="radio"
                    name="invoice"
                    onChange={() => handleInvoiceSelect(invoice.InvoiceId)}
                  />
                </td>
                <td>{invoice.Name}</td>
                <td>{formattedDate}</td>
                <td>{calculateTotalAmount(invoice.InvoiceId)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {selectedInvoice && (
        <div>
          <br />
          <h3>Invoice Lines</h3>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price Per Unit</th>
                <th>Amount</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoiceLines.map((line) => {
                return (
                  <tr key={line.InvoiceLineId}>
                    <td>{getProductName(line.ProductId)}</td>
                    <td>{getProductPrice(line.ProductId)}</td>
                    <td>{line.Quantity}</td>
                    <td>{line.Quantity * getProductPrice(line.ProductId)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
