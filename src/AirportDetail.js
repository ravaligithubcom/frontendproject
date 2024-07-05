import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import "./AirportDetail.css";

const mockDatabase = {
  1: {
    id: 1,
    name: "Indira Gandhi International Airport",
    terminals: [
      {
        id: 1,
        name: "Terminal 1",
        metadata: "Optional metadata should be two lines.",
      },
      {
        id: 2,
        name: "Terminal 2",
        metadata: "Optional metadata should be two lines.",
      },
    ],
  },
  2: { id: 2, name: "Dubai International Airport", terminals: [] },
  3: { id: 3, name: "Heathrow Airport", terminals: [] },
  4: { id: 4, name: "Istanbul Airport", terminals: [] },
  5: { id: 5, name: "Rajiv Gandhi International Airport", terminals: [] },
};

const AirportDetail = () => {
  const { id } = useParams();
  const [airport, setAirport] = useState(mockDatabase[id]);
  const [terminals, setTerminals] = useState(airport.terminals);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newTerminal, setNewTerminal] = useState({ name: "", metadata: "" });

  useEffect(() => {
    setAirport(mockDatabase[id]);
    setTerminals(mockDatabase[id].terminals);
  }, [id]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewTerminal({ ...newTerminal, image: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleAddTerminal = () => {
    const newId = terminals.length ? terminals[terminals.length - 1].id + 1 : 1;
    const newTerminals = [...terminals, { id: newId, ...newTerminal }];
    mockDatabase[id].terminals = newTerminals;
    setTerminals(newTerminals);
    setNewTerminal({ name: "", metadata: "" });
    closeModal();
  };

  const handleDeleteTerminal = (terminalId) => {
    const updatedTerminals = terminals.filter(
      (terminal) => terminal.id !== terminalId
    );
    mockDatabase[id].terminals = updatedTerminals;
    setTerminals(updatedTerminals);
  };

  return (
    <div className="airport-detail">
      <h1>{airport.name}</h1>
      <div className="terminals">
        {terminals.map((terminal) => (
          <div key={terminal.id} className="terminal">
            <img src="path_to_image" alt={terminal.name} />
            <h2>{terminal.name}</h2>
            <p>{terminal.metadata}</p>
            <button onClick={() => handleDeleteTerminal(terminal.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
      <button onClick={openModal}>+Add Terminal</button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add Terminal"
      >
        <h2>Add Terminal</h2>
        <form>
          <label>
            Terminal Title:
            <input
              type="text"
              value={newTerminal.name}
              onChange={(e) =>
                setNewTerminal({ ...newTerminal, name: e.target.value })
              }
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              value={newTerminal.metadata}
              onChange={(e) =>
                setNewTerminal({ ...newTerminal, metadata: e.target.value })
              }
            />
          </label>
          <label>
            Upload Image:
            <input type="file" onChange={handleImageUpload} />
          </label>
          <button type="button" onClick={handleAddTerminal}>
            Continue
          </button>
          <button type="button" onClick={closeModal}>
            Cancel
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AirportDetail;
