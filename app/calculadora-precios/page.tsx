'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AuthPageWrapper from '@/components/auth/AuthPageWrapper';
import { useToast } from '@/contexts/ToastContext';
import { getFairTradeRates, calculatePricing, savePricingCalculation } from '@/lib/api/sellerApi';
import type {
  FairTradeRates,
  PricingCalculation,
  MaterialCost,
  LaborTime,
  OverheadCost,
} from '@/lib/api/sellerApi';
import type { User } from '@/contexts/AuthContext';
import { ROUTES } from '@/lib';
import { ArrowLeft, Calculator, Save } from 'lucide-react';

// Import components
import ProductInfo from '@/components/pricing/ProductInfo';
import FairTradeRatesSelector from '@/components/pricing/FairTradeRatesSelector';
import MaterialsList from '@/components/pricing/MaterialsList';
import LaborTasksList from '@/components/pricing/LaborTasksList';
import OverheadCostsList from '@/components/pricing/OverheadCostsList';
import PricingSummary from '@/components/pricing/PricingSummary';

export default function PricingCalculatorPage() {
  return (
    <AuthPageWrapper requireSeller loadingText="Cargando calculadora...">
      {(user) => <PricingCalculatorContent user={user} />}
    </AuthPageWrapper>
  );
}

function PricingCalculatorContent({ user }: { user: User }) {
  const { showToast } = useToast();

  // Product Info
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');

  // Materials
  const [materials, setMaterials] = useState<MaterialCost[]>([
    { id: '1', name: '', quantity: 0, unit: 'unidad', costPerUnit: 0, total: 0 },
  ]);

  // Labor
  const [laborTasks, setLaborTasks] = useState<LaborTime[]>([
    { id: '1', taskName: '', hours: 0, hourlyRate: 45, total: 0 },
  ]);

  // Overhead
  const [overheadCosts, setOverheadCosts] = useState<OverheadCost[]>([
    { id: '1', category: '', amount: 0, frequency: 'monthly' },
  ]);

  // Profit Margin
  const [profitMargin, setProfitMargin] = useState(30);

  // Fair Trade Rates
  const [fairTradeRates, setFairTradeRates] = useState<FairTradeRates | null>(null);
  const [selectedRegion, setSelectedRegion] = useState('oaxaca');

  // Calculations
  const [totalMaterialCost, setTotalMaterialCost] = useState(0);
  const [totalLaborCost, setTotalLaborCost] = useState(0);
  const [totalOverheadCost, setTotalOverheadCost] = useState(0);
  const [pricing, setPricing] = useState({ totalCost: 0, wholesalePrice: 0, retailPrice: 0 });

  // UI State
  const [isSaving, setIsSaving] = useState(false);

  // Load fair trade rates
  useEffect(() => {
    async function loadRates() {
      const rates = await getFairTradeRates(selectedRegion);
      setFairTradeRates(rates);
      if (rates) {
        setLaborTasks((prev) =>
          prev.map((task) => ({ ...task, hourlyRate: rates.recommendedHourlyRate }))
        );
      }
    }
    loadRates();
  }, [selectedRegion]);

  // Calculate totals
  useEffect(() => {
    const matTotal = materials.reduce((sum, m) => sum + m.total, 0);
    const labTotal = laborTasks.reduce((sum, l) => sum + l.total, 0);
    const ovTotal = overheadCosts.reduce((sum, o) => sum + o.amount, 0);

    setTotalMaterialCost(matTotal);
    setTotalLaborCost(labTotal);
    setTotalOverheadCost(ovTotal);

    const calculated = calculatePricing(matTotal, labTotal, ovTotal, profitMargin);
    setPricing(calculated);
  }, [materials, laborTasks, overheadCosts, profitMargin]);

  // Material handlers
  const addMaterial = () => {
    setMaterials([
      ...materials,
      {
        id: Date.now().toString(),
        name: '',
        quantity: 0,
        unit: 'unidad',
        costPerUnit: 0,
        total: 0,
      },
    ]);
  };

  const removeMaterial = (id: string) => {
    setMaterials(materials.filter((m) => m.id !== id));
  };

  const updateMaterial = (id: string, field: keyof MaterialCost, value: string | number) => {
    setMaterials(
      materials.map((m) => {
        if (m.id !== id) return m;
        const updated = { ...m, [field]: value };
        updated.total = updated.quantity * updated.costPerUnit;
        return updated;
      })
    );
  };

  // Labor handlers
  const addLaborTask = () => {
    setLaborTasks([
      ...laborTasks,
      {
        id: Date.now().toString(),
        taskName: '',
        hours: 0,
        hourlyRate: fairTradeRates?.recommendedHourlyRate || 45,
        total: 0,
      },
    ]);
  };

  const removeLaborTask = (id: string) => {
    setLaborTasks(laborTasks.filter((l) => l.id !== id));
  };

  const updateLaborTask = (id: string, field: keyof LaborTime, value: string | number) => {
    setLaborTasks(
      laborTasks.map((l) => {
        if (l.id !== id) return l;
        const updated = { ...l, [field]: value };
        updated.total = updated.hours * updated.hourlyRate;
        return updated;
      })
    );
  };

  // Overhead handlers
  const addOverheadCost = () => {
    setOverheadCosts([
      ...overheadCosts,
      { id: Date.now().toString(), category: '', amount: 0, frequency: 'monthly' },
    ]);
  };

  const removeOverheadCost = (id: string) => {
    setOverheadCosts(overheadCosts.filter((o) => o.id !== id));
  };

  const updateOverheadCost = (id: string, field: keyof OverheadCost, value: string | number) => {
    setOverheadCosts(overheadCosts.map((o) => (o.id === id ? { ...o, [field]: value } : o)));
  };

  // Save handler
  const handleSave = async () => {
    if (!productName.trim()) {
      showToast('Por favor ingresa el nombre del producto', 'error');
      return;
    }

    const calculation: PricingCalculation = {
      id: Date.now().toString(),
      productName,
      productDescription,
      materials,
      labor: laborTasks,
      overhead: overheadCosts,
      totalMaterialCost,
      totalLaborCost,
      totalOverheadCost,
      totalDirectCost: pricing.totalCost,
      profitMargin,
      suggestedWholesalePrice: pricing.wholesalePrice,
      suggestedRetailPrice: pricing.retailPrice,
      fairWageRate: fairTradeRates?.recommendedHourlyRate || 0,
      livingWageComparison: fairTradeRates?.livingWage || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isPublic: false,
    };

    setIsSaving(true);
    const success = await savePricingCalculation(user.email, calculation);
    setIsSaving(false);

    if (success) {
      showToast('Cálculo guardado exitosamente', 'success');
    } else {
      showToast('Error al guardar el cálculo', 'error');
    }
  };

  const isUsingFairWage =
    !!fairTradeRates &&
    laborTasks.every((task) => task.hourlyRate >= fairTradeRates.recommendedHourlyRate);

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link
            href={ROUTES.DASHBOARD}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver al Dashboard
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Calculator className="w-8 h-8 text-primary-600" />
                Calculadora de Precios Justos
              </h1>
              <p className="text-gray-600 mt-1">
                Calcula precios justos considerando materiales, tiempo y salario digno
              </p>
            </div>
            <button
              onClick={handleSave}
              disabled={isSaving || !productName}
              className="flex items-center gap-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium text-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Guardando...' : 'Guardar Cálculo'}
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Inputs */}
          <div className="lg:col-span-2 space-y-6">
            <ProductInfo
              productName={productName}
              productDescription={productDescription}
              onNameChange={setProductName}
              onDescriptionChange={setProductDescription}
            />

            <FairTradeRatesSelector
              selectedRegion={selectedRegion}
              fairTradeRates={fairTradeRates}
              onRegionChange={setSelectedRegion}
            />

            <MaterialsList
              materials={materials}
              onAdd={addMaterial}
              onRemove={removeMaterial}
              onUpdate={updateMaterial}
            />

            <LaborTasksList
              laborTasks={laborTasks}
              onAdd={addLaborTask}
              onRemove={removeLaborTask}
              onUpdate={updateLaborTask}
            />

            <OverheadCostsList
              overheadCosts={overheadCosts}
              onAdd={addOverheadCost}
              onRemove={removeOverheadCost}
              onUpdate={updateOverheadCost}
            />
          </div>

          {/* Right Column - Summary */}
          <div className="lg:col-span-1">
            <PricingSummary
              totalMaterialCost={totalMaterialCost}
              totalLaborCost={totalLaborCost}
              totalOverheadCost={totalOverheadCost}
              profitMargin={profitMargin}
              onProfitMarginChange={setProfitMargin}
              wholesalePrice={pricing.wholesalePrice}
              retailPrice={pricing.retailPrice}
              isUsingFairWage={isUsingFairWage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
