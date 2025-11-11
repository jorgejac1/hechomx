'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ProductFormData } from '@/types/product';
import {
  SellerBanner,
  BasicInfoSection,
  PricingStockSection,
  ImagesSection,
  AdvancedFieldsToggle,
  MaterialsSection,
  DimensionsWeightSection,
  ProductionOptionsSection,
  AdditionalInfoSection,
  TagsSection,
  FormActions,
} from './form';

interface ProductFormProps {
  initialData?: Partial<ProductFormData>;
  onSubmit: (data: ProductFormData) => Promise<void>;
  submitLabel?: string;
}

export default function ProductForm({
  initialData,
  onSubmit,
  submitLabel = 'Publicar Producto',
}: ProductFormProps) {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Basic fields
  const [name, setName] = useState(initialData?.name || '');
  const [category, setCategory] = useState(initialData?.category || '');
  const [subcategory, setSubcategory] = useState(initialData?.subcategory || '');
  const [price, setPrice] = useState(initialData?.price || 0);
  const [description, setDescription] = useState(initialData?.description || '');
  const [images, setImages] = useState<string[]>(initialData?.images || []);
  const [stock, setStock] = useState(initialData?.stock || 1);

  // Advanced fields
  const [materials, setMaterials] = useState<string[]>(initialData?.materials || []);
  const [dimensions, setDimensions] = useState(
    initialData?.dimensions || { length: 0, width: 0, height: 0, unit: 'cm' as const }
  );
  const [weight, setWeight] = useState(initialData?.weight || { value: 0, unit: 'kg' as const });
  const [customizable, setCustomizable] = useState(initialData?.customizable || false);
  const [productionTime, setProductionTime] = useState(initialData?.productionTime || 1);
  const [careInstructions, setCareInstructions] = useState(initialData?.careInstructions || '');
  const [story, setStory] = useState(initialData?.story || '');
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !category || !price || images.length === 0 || !description) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    setIsSubmitting(true);

    try {
      const formData: ProductFormData = {
        name,
        category,
        subcategory,
        price,
        description,
        images,
        stock,
        ...(materials.length > 0 && { materials }),
        ...(dimensions.length > 0 && { dimensions }),
        ...(weight.value > 0 && { weight }),
        ...(customizable && { customizable }),
        ...(productionTime > 1 && { productionTime }),
        ...(careInstructions && { careInstructions }),
        ...(story && { story }),
        ...(tags.length > 0 && { tags }),
      };

      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting product:', error);
      alert('Error al publicar el producto. Intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Seller Banner */}
      {user?.makerProfile && <SellerBanner shopName={user.makerProfile.shopName} />}

      {/* Basic Information */}
      <BasicInfoSection
        name={name}
        setName={setName}
        category={category}
        setCategory={setCategory}
        subcategory={subcategory}
        setSubcategory={setSubcategory}
        description={description}
        setDescription={setDescription}
      />

      {/* Pricing & Stock */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <PricingStockSection price={price} setPrice={setPrice} stock={stock} setStock={setStock} />
      </div>

      {/* Images */}
      <ImagesSection images={images} setImages={setImages} />

      {/* Advanced Fields Toggle */}
      <AdvancedFieldsToggle showAdvanced={showAdvanced} setShowAdvanced={setShowAdvanced} />

      {/* Advanced Fields */}
      {showAdvanced && (
        <div className="space-y-8">
          <MaterialsSection materials={materials} setMaterials={setMaterials} />
          <DimensionsWeightSection
            dimensions={dimensions}
            setDimensions={setDimensions}
            weight={weight}
            setWeight={setWeight}
          />
          <ProductionOptionsSection
            customizable={customizable}
            setCustomizable={setCustomizable}
            productionTime={productionTime}
            setProductionTime={setProductionTime}
          />
          <AdditionalInfoSection
            careInstructions={careInstructions}
            setCareInstructions={setCareInstructions}
            story={story}
            setStory={setStory}
          />
          <TagsSection tags={tags} setTags={setTags} />
        </div>
      )}

      {/* Form Actions */}
      <FormActions
        isSubmitting={isSubmitting}
        hasImages={images.length > 0}
        submitLabel={submitLabel}
      />
    </form>
  );
}
