import { ProductModel } from '../models/producto.model.js';

export const ProductService = {
  // 1. Llama al modelo para traer la lista limpia de productos
  async getAllProducts() {
    return await ProductModel.getAll();
  },

  // 2. Busca un producto y, si no existe, genera un error personalizado
  async getProductById(id) {
    const product = await ProductModel.getById(id);
    // agreego statusCode para que el error luego lo capture el middleware de manejo de errores
    //  y pueda devolver el codigo de estado HTTP adecuado al cliente
    if (!product) {
      const error = new Error('El producto solicitado no existe en el catálogo.');
      error.statusCode = 404; // Guardamos el código de estado HTTP adecuado
      throw error;
    }
    
    return product;
  },

  // 3. Valida que los datos obligatorios estén presentes antes de mandar a guardar
  async createProduct(productData) {
    const { name, price, stock } = productData;
    
    // Validación de negocio básica
    if (!name || price === undefined || stock === undefined) {
      const error = new Error('Faltan datos obligatorios. "name", "price" y "stock" son requeridos.');
      error.statusCode = 400;
      throw error;
    }

    // Aseguramos que los tipos numéricos se guarden como corresponde
    return await ProductModel.create({
      name,
      price: Number(price),
      stock: Number(stock)
    });
  },

  // 4. Verifica la existencia previa antes de llamar al modelo para borrar
  async deleteProduct(id) {
    const product = await ProductModel.getById(id);
    
    if (!product) {
      const error = new Error('No se puede eliminar un producto que no existe.');
      error.statusCode = 404;
      throw error;
    }
    
    return await ProductModel.delete(id);
  }
};