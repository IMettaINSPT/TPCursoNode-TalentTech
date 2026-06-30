export const errorMiddleware = (err, req, res, next) => {
  //si tengo code propio uso eso, sino 500 ( Internal Server Error)
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Ocurrió un error interno en el servidor.';

  // Dejamos log en consola para seguimiento
  console.error(`[Error ${statusCode}]: ${message}`);

  // Devolvemos json con el error al cliente
  res.status(statusCode).json({
    status: statusCode,
    error: message
  });
};