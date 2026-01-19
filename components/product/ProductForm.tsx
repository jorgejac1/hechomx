'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { ProductFormData, ProductStatus } from '@/types/product';
import { saveDraftProduct } from '@/lib/utils/products';
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
  initialData?: Partial<ProductFormData> & { id?: string };
  onSubmit: (data: ProductFormData) => Promise<void>;
  submitLabel?: string;
  isEditing?: boolean;
}

export default function ProductForm({
  initialData,
  onSubmit,
  submitLabel = 'Publicar Producto',
  isEditing = false,
}: ProductFormProps) {
  const router = useRouter();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<ProductStatus>(initialData?.status || 'draft');

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

  // Build form data object
  const buildFormData = (status: ProductStatus): ProductFormData => ({
    name,
    category,
    subcategory,
    price,
    description,
    images,
    stock,
    status,
    ...(materials.length > 0 && { materials }),
    ...(dimensions.length > 0 && { dimensions }),
    ...(weight.value > 0 && { weight }),
    ...(customizable && { customizable }),
    ...(productionTime > 1 && { productionTime }),
    ...(careInstructions && { careInstructions }),
    ...(story && { story }),
    ...(tags.length > 0 && { tags }),
  });

  // Validate minimum required fields
  const validateBasicFields = (): boolean => {
    if (!name.trim()) {
      showToast('Por favor ingresa el nombre del producto', 'error');
      return false;
    }
    if (!category) {
      showToast('Por favor selecciona una categoría', 'error');
      return false;
    }
    if (price <= 0) {
      showToast('Por favor ingresa un precio válido', 'error');
      return false;
    }
    if (images.length === 0) {
      showToast('Por favor agrega al menos una imagen', 'error');
      return false;
    }
    return true;
  };

  // Handle save as draft
  const handleSaveDraft = async () => {
    if (images.length === 0) {
      showToast('Agrega al menos una imagen para guardar el borrador', 'error');
      return;
    }

    if (!user?.makerProfile) {
      showToast('Debes tener un perfil de vendedor', 'error');
      return;
    }

    setIsSavingDraft(true);

    try {
      const formData = buildFormData('draft');
      saveDraftProduct(formData, user.email, user.makerProfile.shopName, initialData?.id);

      setCurrentStatus('draft');
      showToast('Borrador guardado correctamente', 'success');

      // Redirect to product management after a short delay
      setTimeout(() => {
        router.push('/productos/gestionar');
      }, 1000);
    } catch (error) {
      console.error('Error saving draft:', error);
      showToast('Error al guardar el borrador', 'error');
    } finally {
      setIsSavingDraft(false);
    }
  };

  // Handle publish
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateBasicFields()) return;

    if (!description.trim()) {
      showToast('Por favor agrega una descripción', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = buildFormData('published');
      await onSubmit(formData);
      setCurrentStatus('published');
    } catch (error) {
      console.error('Error submitting product:', error);
      showToast('Error al publicar el producto. Intenta de nuevo.', 'error');
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
        isSavingDraft={isSavingDraft}
        hasImages={images.length > 0}
        submitLabel={submitLabel}
        onSaveDraft={handleSaveDraft}
        showDraftButton={true}
        currentStatus={isEditing ? currentStatus : undefined}
      />
    </form>
  );
}
