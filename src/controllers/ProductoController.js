import { ProductService } from '../services/producto.service.js';

export const ProductoController = {
  //  GET /api/products
  async getAll(req, res, next) {
    try {
      const products = await ProductService.getAllProducts();
      // Cumplimos con el formato JSON estandarizado de respuesta
      res.status(200).json({ status: 200, data: products });
    } catch (error) {
      next(error);
    }
  },

  //  GET /api/products/:id
  async getById(req, res, next) {
    try {
      const { id } = req.params; // Extraemos el ID del req
      const product = await ProductService.getProductById(id);
      res.status(200).json({ status: 200, data: product });
    } catch (error) {
      next(error);
    }
  },

  // POST /api/products/create
  async create(req, res, next) {
    try {
      // Pasamos todo el cuerpo de la petición (req.body) al servicio
      const newProduct = await ProductService.createProduct(req.body);
      res.status(201).json({ 
        status: 201, 
        message: 'Producto creado con éxito.', 
        data: newProduct 
      });
    } catch (error) {
      next(error);
    }
  },

  // DELETE /api/products/:id
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await ProductService.deleteProduct(id);
      res.status(200).json({ 
        status: 200, 
        message: `Producto con ID ${id} eliminado correctamente.` 
      });
    } catch (error) {
      next(error);
    }
  }
};