"use client";

import { useEffect, useState } from "react";

export default function SignalsDashboard() {
  const [signals, setSignals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [filters, setFilters] = useState({
    timeframe: "",
    type: "",
    symbol: "",
  });

  // CRUD modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedSignal, setSelectedSignal] = useState<any>(null);

  const [form, setForm] = useState({
    symbol: "",
    timeframe: "",
    signal_type: "",
    confidence: "",
    notes: "",
  });

  // Fetch signals
  const fetchSignals = async () => {
    setLoading(true);
    const res = await fetch("/api/signals/list");
    const json = await res.json();
    setSignals(json.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchSignals();
  }, []);

  // Filtered signals (client-side filtering)
  const filteredSignals = signals.filter((s: any) => {
    return (
      (filters.timeframe ? s.timeframe === filters.timeframe : true) &&
      (filters.type ? s.signal_type === filters.type : true) &&
      (filters.symbol
        ? s.symbol.toLowerCase().includes(filters.symbol.toLowerCase())
        : true)
    );
  });

  // Create signal
  const createSignal = async () => {
    await fetch("/api/signals/create", {
      method: "POST",
      body: JSON.stringify(form),
    });

    setShowCreateModal(false);
    setForm({
      symbol: "",
      timeframe: "",
      signal_type: "",
      confidence: "",
      notes: "",
    });

    fetchSignals();
  };

  // Open edit modal
  const openEdit = (signal: any) => {
    setSelectedSignal(signal);
    setForm({
      symbol: signal.symbol,
      timeframe: signal.timeframe,
      signal_type: signal.signal_type,
      confidence: signal.confidence,
      notes: signal.notes,
    });
    setShowEditModal(true);
  };

  // Update signal
  const updateSignal = async () => {
    await fetch("/api/signals/update", {
      method: "PATCH",
      body: JSON.stringify({
        id: selectedSignal.id,
        ...form,
      }),
    });

    setShowEditModal(false);
    setSelectedSignal(null);
    fetchSignals();
  };

  // Delete signal
  const deleteSignal = async () => {
    await fetch("/api/signals/delete", {
      method: "DELETE",
      body: JSON.stringify({ id: selectedSignal.id }),
    });

    setShowDeleteModal(false);
    setSelectedSignal(null);
    fetchSignals();
  };

  // Clear filters
  const clearFilters = () => {
    setFilters({
      timeframe: "",
      type: "",
      symbol: "",
    });
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* SIDEBAR */}
      <div className="w-64 bg-[#0d0d0d] border-r border-gray-800 p-6">
        <h2 className="text-xl font-bold text-yellow-400 mb-6">
          Filters
        </h2>

        {/* Timeframe */}
        <div className="mb-6">
          <h3 className="text-sm text-gray-400 mb-2">Timeframe</h3>
          {["1W", "1D", "4H", "1H"].map((tf) => (
            <button
              key={tf}
              onClick={() =>
                setFilters({ ...filters, timeframe: tf })
              }
              className={`w-full text-left px-3 py-2 rounded mb-2 ${
                filters.timeframe === tf
                  ? "bg-yellow-500 text-black"
                  : "bg-gray-900 hover:bg-gray-800"
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

        {/* Signal Type */}
        <div className="mb-6">
          <h3 className="text-sm text-gray-400 mb-2">Signal Type</h3>
          {["BUY", "SELL", "NEUTRAL"].map((type) => (
            <button
              key={type}
              onClick={() =>
                setFilters({ ...filters, type })
              }
              className={`w-full text-left px-3 py-2 rounded mb-2 ${
                filters.type === type
                  ? "bg-yellow-500 text-black"
                  : "bg-gray-900 hover:bg-gray-800"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Symbol Search */}
        <div className="mb-6">
          <h3 className="text-sm text-gray-400 mb-2">Symbol</h3>
          <input
            placeholder="Search symbol..."
            className="w-full p-2 bg-black border border-gray-700 rounded text-white"
            value={filters.symbol}
            onChange={(e) =>
              setFilters({ ...filters, symbol: e.target.value })
            }
          />
        </div>

        {/* Clear Filters */}
        <button
          onClick={clearFilters}
          className="w-full px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
        >
          Clear Filters
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-10">
        <h1 className="text-4xl font-bold mb-6 text-yellow-400">
          Sniper Signals Dashboard
        </h1>

        <button
          onClick={() => setShowCreateModal(true)}
          className="mb-6 px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-400"
        >
          + Create Signal
        </button>

        {loading ? (
          <p className="text-gray-400">Loading signals...</p>
        ) : filteredSignals.length === 0 ? (
          <p className="text-gray-400">No signals found.</p>
        ) : (
          <table className="w-full border border-gray-700">
            <thead className="bg-gray-900">
              <tr>
                <th className="p-3 border-b border-gray-700">Symbol</th>
                <th className="p-3 border-b border-gray-700">Timeframe</th>
                <th className="p-3 border-b border-gray-700">Type</th>
                <th className="p-3 border-b border-gray-700">Confidence</th>
                <th className="p-3 border-b border-gray-700">Notes</th>
                <th className="p-3 border-b border-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSignals.map((s: any) => (
                <tr key={s.id} className="text-center border-b border-gray-800">
                  <td className="p-3">{s.symbol}</td>
                  <td className="p-3">{s.timeframe}</td>
                  <td className="p-3">{s.signal_type}</td>
                  <td className="p-3">{s.confidence}</td>
                  <td className="p-3">{s.notes}</td>
                  <td className="p-3 flex justify-center gap-3">
                    <button
                      onClick={() => openEdit(s)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-400"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setSelectedSignal(s);
                        setShowDeleteModal(true);
                      }}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* CREATE MODAL */}
        {showCreateModal && (
          <Modal title="Create Signal" onClose={() => setShowCreateModal(false)}>
            {["symbol", "timeframe", "signal_type", "confidence", "notes"].map(
              (field) => (
                <input
                  key={field}
                  placeholder={field}
                  className="w-full mb-3 p-2 bg-black border border-gray-700 rounded text-white"
                  value={(form as any)[field]}
                  onChange={(e) =>
                    setForm({ ...form, [field]: e.target.value })
                  }
                />
              )
            )}

            <button
              onClick={createSignal}
              className="w-full mt-4 px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-400"
            >
              Save
            </button>
          </Modal>
        )}

        {/* EDIT MODAL */}
        {showEditModal && (
          <Modal title="Edit Signal" onClose={() => setShowEditModal(false)}>
            {["symbol", "timeframe", "signal_type", "confidence", "notes"].map(
              (field) => (
                <input
                  key={field}
                  placeholder={field}
                  className="w-full mb-3 p-2 bg-black border border-gray-700 rounded text-white"
                  value={(form as any)[field]}
                  onChange={(e) =>
                    setForm({ ...form, [field]: e.target.value })
                  }
                />
              )
            )}

            <button
              onClick={updateSignal}
              className="w-full mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-400"
            >
              Update
            </button>
          </Modal>
        )}

        {/* DELETE MODAL */}
        {showDeleteModal && (
          <Modal title="Delete Signal" onClose={() => setShowDeleteModal(false)}>
            <p className="text-gray-300 mb-4">
              Are you sure you want to delete{" "}
              <span className="text-yellow-400 font-bold">
                {selectedSignal?.symbol}
              </span>{" "}
              ({selectedSignal?.timeframe})?
            </p>

            <button
              onClick={deleteSignal}
              className="w-full px-4 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-500"
            >
              Delete
            </button>
          </Modal>
        )}
      </div>
    </div>
  );
}

// Reusable modal component
function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: any;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="bg-gray-900 p-6 rounded-lg w-96 border border-yellow-500">
        <h2 className="text-xl font-bold mb-4 text-yellow-400">{title}</h2>

        {children}

        <button
          onClick={onClose}
          className="w-full mt-4 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
