import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { toast } from "react-toastify";
import BackButton from "../../components/BackButton";

export default function EditUserPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/users/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const user = res.data;
        if (user) {
          setUserData({
            name: user.name,
            username: user.username,
            password: user.password,
            role: user.role,
          });
        }
      } catch (err) {
        console.log("Erro ao buscar utilizador:", err);
        toast.error("Erro ao buscar utilizador.");
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/users/${id}`, userData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast.success("Utilizador atualizado com sucesso!");
      navigate("/users");
    } catch (err) {
      console.log("Erro ao atualizar utilizador", err);
      toast.error("Erro ao atualizar utilizador.");
    }
  };

  return (
    <div style={styles.container}>
      <div className="relative p-4">
        <BackButton />
      </div>
      <h2 style={styles.title}>Editar Utilizador</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.field}>
          <label style={styles.label}>Nome</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Nome de Utilizador</label>
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Password</label>
          <input
            type="text"
            name="username"
            value={userData.password}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Função</label>
          <select
            name="role"
            value={userData.role}
            onChange={handleChange}
            style={styles.input}
            required
          >
            <option value="">Selecione</option>
            <option value="superUser">Super User</option>
            <option value="admin">Admin</option>
            <option value="funcionario">Funcionário</option>
          </select>
        </div>

        <button type="submit" style={styles.button}>
          Salvar Alterações
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    padding: "2rem",
    backgroundColor: "#FFFBFA",
    maxWidth: "500px",
    margin: "2rem auto",
    borderRadius: "10px",
    boxShadow: "0 0 12px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "1.5rem",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.2rem",
  },
  field: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "0.4rem",
    color: "#555",
    fontWeight: "bold",
  },
  input: {
    padding: "0.6rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    backgroundColor: "#F7F0F0",
    fontSize: "1rem",
  },
  button: {
    padding: "0.8rem",
    backgroundColor: "#8AF3FF",
    color: "#000",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};
