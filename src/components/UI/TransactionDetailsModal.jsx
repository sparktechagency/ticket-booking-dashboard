import { Modal } from "@mui/material";
import { IoClose } from "react-icons/io5";

export default function TransactionDetailsModal({
  open,
  onClose,
  transaction,
  getStatusColor,
  formatCurrency,
}) {
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="transaction-details-modal"
        aria-describedby="modal-to-view-transaction-details"
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: "80%", md: "800px" },
            maxHeight: "80vh",
            overflowY: "auto",
            backgroundColor: "white",
            boxShadow: 24,
            borderRadius: 2,
          }}
        >
          {transaction && (
            <>
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between rounded-t-lg">
                <h2 className="text-xl font-bold text-gray-900">
                  Transaction Details
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition"
                >
                  <IoClose className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              <div className="p-6 space-y-3">
                {/* Transaction Info Section */}
                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">
                        Transaction ID
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {transaction.transactionId}
                      </p>
                    </div>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                        transaction.status
                      )}`}
                    >
                      {transaction.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Transaction Type</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {transaction.transactionType}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Date</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {new Date(transaction.date).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Amount Section */}
                <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
                  <p className="text-sm text-green-700 mb-1">
                    Transaction Amount
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(transaction.amount)}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Payment Method:{" "}
                    <span className="font-semibold">
                      {transaction.paymentMethod}
                    </span>
                  </p>
                </div>

                {/* Customer Info Section */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-rose-400 text-white rounded-full flex items-center justify-center text-sm">
                      {transaction.customerName.charAt(0)}
                    </span>
                    Customer Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <p className="text-sm text-gray-600">Full Name</p>
                      <p className="text-base font-semibold text-gray-900">
                        {transaction.customerName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email Address</p>
                      <p className="text-base font-semibold text-gray-900">
                        {transaction.customerEmail}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone Number</p>
                      <p className="text-base font-semibold text-gray-900">
                        {transaction.customerPhone}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Description Section */}
                <div className="border border-gray-200 rounded-lg p-3">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    Description
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {transaction.description}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={onClose}
                    className="px-6 py-2 text-white rounded-full transition shadow-md"
                    style={{
                      background:
                        "linear-gradient(90deg, #00D3F2 0%, #2B7FFF 100%)",
                      minWidth: "120px",
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}
