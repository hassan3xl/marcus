"use client";

import React, { useState, useEffect } from "react";
import BaseModal from "../modals/BaseModal";
import {
  useGetProduct,
  useEditProduct,
  useGetProductsCategories,
} from "@/lib/hooks/product.hook";
import { useToast } from "@/providers/ToastProvider";
import {
  Calendar,
  Package,
  Info,
  DollarSign,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface EditProductModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  productId: string;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  isModalOpen,
  closeModal,
  productId,
}) => {
  const { addToast } = useToast();
  const { data: categories } = useGetProductsCategories();
  const { data: product, isLoading } = useGetProduct(productId);
  const editProductMutation = useEditProduct();

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    stock: 0,
    category_id: "",
    unit_price: "",
    production_date: "",
    expiry_date: "",
    best_before_days: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id,
        name: product.name || "",
        description: product.description || "",
        stock: product.stock || 0,
        category_id: product.category?.id || "",
        unit_price: product.unit_price?.toString() || "",
        production_date: product.production_date || "",
        expiry_date: product.expiry_date || "",
        best_before_days: product.best_before_days?.toString() || "",
      });
    }
  }, [product]);

  // Calculate expiry date if production date and best before days are changed
  useEffect(() => {
    if (formData.production_date && formData.best_before_days) {
      const prodDate = new Date(formData.production_date);
      const days = parseInt(formData.best_before_days);
      if (!isNaN(days)) {
        prodDate.setDate(prodDate.getDate() + days);
        const expiryStr = prodDate.toISOString().split("T")[0];
        setFormData((prev) => ({ ...prev, expiry_date: expiryStr }));
      }
    }
  }, [formData.production_date, formData.best_before_days]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const val =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Clean data: convert empty strings to null for optional fields
      const cleanedData = { ...formData };
      const optionalFields = [
        "description",
        "production_date",
        "expiry_date",
        "best_before_days",
      ];
      optionalFields.forEach((field) => {
        if (cleanedData[field as keyof typeof cleanedData] === "") {
          (cleanedData as any)[field] = null;
        }
      });

      await editProductMutation.mutateAsync(cleanedData);
      addToast({
        title: "Success",
        description: "Product updated successfully!",
        type: "success",
      });
      closeModal();
    } catch (error) {
      addToast({
        title: "Error",
        description: "Failed to update product.",
        type: "error",
      });
    }
  };

  if (isLoading) return null;

  return (
    <BaseModal
      isOpen={isModalOpen}
      onClose={closeModal}
      title="Edit Product"
      description="Update product information and shelf life details."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Main Info */}
          <div className="space-y-4">
            <h4 className="flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-wider mb-2">
              <Package size={16} /> Basic Information
            </h4>

            <div className="space-y-1">
              <label className="text-xs font-semibold ml-1">Product Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-muted border border-border rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold ml-1">Category</label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                required
                className="w-full bg-muted border border-border rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              >
                <option value="">Select Category</option>
                {categories?.map((cat: any) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold ml-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full bg-muted border border-border rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold ml-1">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                  className="w-full bg-muted border border-border rounded-xl px-4 py-2.5 outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold ml-1">
                  Unit Cost (Naira)
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="unit_price"
                  value={formData.unit_price}
                  onChange={handleChange}
                  required
                  className="w-full bg-muted border border-border rounded-xl px-4 py-2.5 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Date & Shelf Life */}
          <div className="space-y-4 bg-primary/5 p-6 rounded-3xl border border-primary/10">
            <h4 className="flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-wider mb-2">
              <Clock size={16} /> Shelf Life Tracking
            </h4>

            <div className="space-y-1">
              <label className="text-xs font-semibold ml-1 flex items-center gap-1.5">
                <Calendar size={12} /> Production Date
              </label>
              <input
                type="date"
                name="production_date"
                value={formData.production_date}
                onChange={handleChange}
                className="w-full bg-background border border-border rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold ml-1 flex items-center gap-1.5">
                <ShieldCheck size={12} /> Best Before (Days)
              </label>
              <input
                type="number"
                name="best_before_days"
                value={formData.best_before_days}
                onChange={handleChange}
                className="w-full bg-background border border-border rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            <div className="pt-2">
              <div className="space-y-1">
                <label className="text-xs font-semibold ml-1 flex items-center gap-1.5">
                  <Info size={12} className="text-orange-500" /> Final Expiry
                  Date
                </label>
                <input
                  type="date"
                  name="expiry_date"
                  value={formData.expiry_date}
                  onChange={handleChange}
                  className="w-full bg-background border border-orange-200 text-orange-700 font-bold rounded-xl px-4 py-2.5 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-4 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={closeModal}
            className="rounded-xl px-8"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="rounded-xl px-12 shadow-lg shadow-primary/20"
            disabled={editProductMutation.isPending}
          >
            {editProductMutation.isPending ? "Updating..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </BaseModal>
  );
};

export default EditProductModal;
