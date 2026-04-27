import { apiService } from "../services/apiService";

export const StoreApi = {
  getStore: async () => {
    try {
      const res = await apiService.get("/store/");
      console.log("store details", res);
      return res;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  UpdateStore: async (storeData: any) => {
    try {
      const res = await apiService.patch("/store/", storeData);
      console.log("store details", res);
      return res;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  UpdateStoreStatus: async () => {
    try {
      const res = await apiService.post("/store/toggle-status/");
      console.log("store details", res);
      return res;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  UpdateStoreLogo: async (formData: FormData) => {
    const res = await apiService.post("/store/upload-logo/", formData);
    return res;
  },
  getProductsCategory: async () => {
    try {
      const res = await apiService.get("/inventory/products/categories/");
      console.log("categories", res);
      return res;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  AddProduct: async (data: any) => {
    try {
      const res = await apiService.post("/inventory/products/", data);
      return res;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },
  DeleteProduct: async (productId: string) => {
    try {
      const res = await apiService.delete(`/inventory/products/${productId}/`);
      return res;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },
};
