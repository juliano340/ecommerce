import express from "express";
import router from "./routes";

const app = express();
app.use(express.json());
app.use("/api", router);

export default app; // exporta só o app

// só dá o listen se não for teste
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
}
