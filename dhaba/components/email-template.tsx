import * as React from "react";

interface EmailTemplateProps {
  ProductName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  ProductName,
}) => (
  <div className="flex justify-center items-center flex-col bg-red-500 text-gray-200">
    <h1>Thank you for your order at FeastFlix</h1>
    <p>
      Your order for{" "}
      <span className="font-bold text-red-500">{ProductName}</span> has been
      placed
    </p>
  </div>
);
