<h1 align="center">
<img width="64" src="./public/logo.svg" alt="Phab Pharmacy"/>
<br>
Admin Dashboard
</h1>

<h3 align="center">A simple inventory management webpage for administrators. </h3>

This project is an admin dashboard built using Next.js. It provides a comprehensive interface for managing Products, Orders, and Inventory. The application is styled using Tailwind CSS and leverages DaisyUI for various React components.

## Features

- **Products Page:** Manage and view all products in the store.
- **Orders Page:** Keep track of orders, including details like order status, customer information, and shipping details.
- **Inventory Page:** Monitor stock levels and place orders.

## Products Page

Shows all the products separated by categories. Clicking on a product opens a form to edit the name, description, and price.

## Orders Page

Shows all orders made by customers. Clicking on an order opens a form that reveals more details including delivery address and a dropdown menu to set the order status. If the payment was completed, a blue button labeled "Capture Payment", to fullfill the Stripe transaction.

## Inventory Page

A dropdown menu allows the user to select a location between "Paddington", "Green Park", or "Bermondsey". Then a table shows all the inventory items and their current quantities. A color coded tag with they keys "Normal", "Medium", and "Low", depending weather the stock level is above 20% or 15% from the maximum stock count.
