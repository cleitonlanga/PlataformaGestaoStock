import jwt from "jsonwebtoken";
import User from "../models/user.model.js";


export const protect = (roles = []) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      console.log(req.headers);
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token não fornecido" });
      }

      const token = authHeader.split(" ")[1];

      // Verificar e decodificar o token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "segredo");

      // Buscar o utilizador pelo ID decodificado
      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        return res.status(401).json({ message: "Utilizador não encontrado" });
      }

      // Atribuir user à req
      req.user = user;

      // Verificar se o role do utilizador está autorizado
      if (roles.length > 0 && !roles.includes(user.role)) {
        return res
          .status(403)
          .json({ message: "Acesso negado: permissão insuficiente" });
      }

      next();
    } catch (error) {
      console.error("Erro no middleware de autenticação:", error);
      res.status(401).json({ message: "Token inválido ou expirado" });
    }
  };
};
