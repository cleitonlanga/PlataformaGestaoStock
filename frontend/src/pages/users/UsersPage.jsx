import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (err) {
      console.log("Erro ao buscar utilizadores", err);
      toast.error("Erro ao buscar utilizadores");
    }
  };

  const handleEdit = (id) => {
    navigate(`/users/${id}/edit`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja eliminar este utilizador?"))
      return;

    try {
      const token = localStorage.getItem("token");
      await api.delete(`/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Utilizador removido com sucesso");
      fetchUsers();
    } catch (err) {
      console.log("Erro ao remover utilizador", err);
      toast.error("Erro ao remover utilizador");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div
      style={{
        padding: "2rem",
        backgroundColor: "#FFFBFA",
        minHeight: "100vh",
      }}
    >
      <div className="relative p-4">
        <BackButton />
      </div>
      <h2 style={{ color: "#333" }}>Gestão de Utilizadores</h2>
      <button
        onClick={() => navigate("/register")}
        style={{
          backgroundColor: "#8AF3FF",
          color: "#000",
          border: "none",
          padding: "10px 20px",
          marginBottom: "1rem",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Criar Novo Utilizador
      </button>
      <table
        style={{
          width: "100%",
          backgroundColor: "#F7F0F0",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th style={thStyle}>Nome</th>
            <th style={thStyle}>Username</th>
            <th style={thStyle}>Função</th>
            <th style={thStyle}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} style={{ borderBottom: "1px solid #ccc" }}>
              <td style={tdStyle}>{user.name}</td>
              <td style={tdStyle}>{user.username}</td>
              <td style={tdStyle}>{user.role}</td>
              <td style={tdStyle}>
                <button
                  onClick={() => handleEdit(user._id)}
                  style={btnEditStyle}
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  style={btnDeleteStyle}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const thStyle = {
  padding: "10px",
  backgroundColor: "#8AF3FF",
  textAlign: "left",
};

const tdStyle = {
  padding: "10px",
};

const btnEditStyle = {
  marginRight: "10px",
  padding: "6px 12px",
  backgroundColor: "#8AF3FF",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const btnDeleteStyle = {
  padding: "6px 12px",
  backgroundColor: "#f44336",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default UsersPage;
