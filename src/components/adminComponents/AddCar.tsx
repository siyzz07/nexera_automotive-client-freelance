import { useState, useEffect } from 'react';
import { Upload, CarFront, Gauge, Fuel, Settings2, DollarSign, ImagePlus, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { getBrands, getModelsByBrand } from '../../services/apiServices/categoryApiService';
import { addCarListing } from '../../services/apiServices/carApiService';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export interface CategoryType {
  _id: string;
  name: string;
  parentCategory: string | null;
  isActive: boolean;
}

const AddCar = () => {
  const [brands, setBrands] = useState<CategoryType[]>([]);
  const [models, setModels] = useState<CategoryType[]>([]);
  const [trustBadges, setTrustBadges] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Validation Schema
  const validationSchema = Yup.object().shape({
    brand: Yup.string().required('Brand is required'),
    model: Yup.string().required('Model is required'),
    price: Yup.number().positive('Price must be positive').required('Price is required'),
    kmDriven: Yup.number().min(0, 'KM cannot be negative').required('KM Driven is required'),
    fuelType: Yup.string().required('Fuel type is required'),
    transmission: Yup.string().required('Transmission is required'),
    bodyType: Yup.string().required('Body type is required'),
    ownerHistory: Yup.string().required('Owner history is required'),
    color: Yup.string().required('Color is required').min(2, 'Color name too short'),
    location: Yup.string().required('Location is required').min(3, 'Location name too short'),
    description: Yup.string().min(10, 'Description should be at least 10 characters'),
    images: Yup.array()
      .of(Yup.mixed().required())
      .min(1, 'At least 1 image is required')
      .max(5, 'Maximum 5 images allowed')
      .required('Images are required'),
    video: Yup.mixed().nullable(),
    videoDuration: Yup.number().max(16, 'Video must be less than 16 seconds').nullable(),
  });

  const formik = useFormik({
    initialValues: {
      brand: '',
      model: '',
      price: '',
      kmDriven: '',
      fuelType: 'Petrol',
      transmission: 'Automatic',
      bodyType: 'Sedan',
      ownerHistory: '1st Owner',
      color: '',
      location: '',
      description: '',
      images: [] as File[],
      video: null as File | null,
      videoDuration: 0,
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const formData = new FormData();
        
        // Append all text fields
        Object.keys(values).forEach(key => {
          if (key !== 'images' && key !== 'video') {
             formData.append(key, (values as any)[key]);
          }
        });

        // Append images
        values.images.forEach((file) => {
          formData.append('images', file);
        });

        // Append video if exists
        if (values.video) {
          formData.append('video', values.video);
          formData.append('videoDuration', values.videoDuration.toString());
        }

        // Append trust badges
        formData.append('trustBadges', JSON.stringify(trustBadges));

        const response = await addCarListing(formData);

        if (response.data.success) {
          setIsSuccess(true);
          toast.success('Vehicle listed successfully on Cloudinary!');
          
          setTimeout(() => {
            setIsSuccess(false);
            formik.resetForm();
            setTrustBadges([]);
          }, 3000);
        }
      } catch (error: any) {
        console.error('Upload Error:', error);
        toast.error(error.response?.data?.message || 'Failed to upload to Cloudinary');
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  // Fetch Brands on component load
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await getBrands();
        if (response.data.success) {
          setBrands(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching brands:', error);
        toast.error('Failed to load brands');
      }
    };
    fetchBrands();
  }, []);

  // Fetch Models when brand changes
  useEffect(() => {
    const fetchModels = async () => {
      if (!formik.values.brand) {
        setModels([]);
        return;
      }
      try {
        const response = await getModelsByBrand(formik.values.brand);
        if (response.data.success) {
          setModels(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching models:', error);
        toast.error('Failed to load models for selected brand');
      }
    };
    fetchModels();
  }, [formik.values.brand]);

  // Handle brand change specially to reset model
  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    formik.setFieldValue('brand', value);
    formik.setFieldValue('model', '');
  };

  const availableBadges = [
    "Verified Dealer",
    "Insurance Valid",
    "Documents Verified",
    "Nexera Verified",
    "Service History",
    "No Accidents"
  ];

  const toggleBadge = (badge: string) => {
    setTrustBadges(prev => 
      prev.includes(badge) 
        ? prev.filter(b => b !== badge)
        : [...prev, badge]
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold font-heading text-white mb-2">Add New Vehicle</h1>
        <p className="text-sm md:text-base text-white/60">Enter vehicle details to list it in the inventory</p>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-8">
        {/* Main Details Section */}
        <div className="glass p-4 sm:p-6 md:p-8 rounded-3xl border border-glass-border">
          <div className="flex items-center gap-3 mb-4 md:mb-6 border-b border-white/10 pb-4">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-brand/20 flex items-center justify-center border border-brand/30">
              <CarFront className="w-4 h-4 md:w-5 md:h-5 text-brand" />
            </div>
            <h2 className="text-lg md:text-xl font-semibold text-white">Basic Information</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Brand</label>
              <select 
                name="brand"
                value={formik.values.brand}
                onChange={handleBrandChange}
                onBlur={formik.handleBlur}
                className={`w-full bg-black/40 border rounded-xl px-4 py-3 text-white focus:outline-none transition-colors appearance-none ${
                  formik.touched.brand && formik.errors.brand ? 'border-red-500/50' : 'border-white/10 focus:border-brand/50'
                }`}
              >
                <option value="" disabled>Select a Brand</option>
                {brands.map(brand => (
                  <option key={brand._id} value={brand._id}>{brand.name}</option>
                ))}
              </select>
              {formik.touched.brand && formik.errors.brand && (
                <div className="text-red-500 text-xs flex items-center gap-1 mt-1 transition-all">
                  <AlertCircle className="w-3 h-3" /> {formik.errors.brand}
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Model</label>
              <select 
                name="model"
                value={formik.values.model}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={!formik.values.brand || models.length === 0}
                className={`w-full bg-black/40 border rounded-xl px-4 py-3 text-white focus:outline-none transition-colors appearance-none disabled:opacity-50 disabled:cursor-not-allowed ${
                  formik.touched.model && formik.errors.model ? 'border-red-500/50' : 'border-white/10 focus:border-brand/50'
                }`}
              >
                <option value="" disabled>
                  {!formik.values.brand ? 'Select a Brand first' : models.length === 0 ? 'No models available' : 'Select a Model'}
                </option>
                {models.map(model => (
                  <option key={model._id} value={model._id}>{model.name}</option>
                ))}
              </select>
              {formik.touched.model && formik.errors.model && (
                <div className="text-red-500 text-xs flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" /> {formik.errors.model}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Price ($)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <DollarSign className="w-4 h-4 text-white/40" />
                </div>
                <input 
                  type="number"
                  name="price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full bg-black/40 border rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none transition-colors ${
                    formik.touched.price && formik.errors.price ? 'border-red-500/50' : 'border-white/10 focus:border-brand/50'
                  }`}
                  placeholder="85000"
                />
              </div>
              {formik.touched.price && formik.errors.price && (
                <div className="text-red-500 text-xs flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" /> {formik.errors.price}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Location</label>
              <input 
                type="text"
                name="location"
                value={formik.values.location}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full bg-black/40 border rounded-xl px-4 py-3 text-white focus:outline-none transition-colors ${
                  formik.touched.location && formik.errors.location ? 'border-red-500/50' : 'border-white/10 focus:border-brand/50'
                }`}
                placeholder="e.g. Los Angeles, CA"
              />
              {formik.touched.location && formik.errors.location && (
                <div className="text-red-500 text-xs flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" /> {formik.errors.location}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="glass p-4 sm:p-6 md:p-8 rounded-3xl border border-glass-border">
          <div className="flex items-center gap-3 mb-4 md:mb-6 border-b border-white/10 pb-4">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-orange-500/20 flex items-center justify-center border border-orange-500/30">
              <Settings2 className="w-4 h-4 md:w-5 md:h-5 text-orange-400" />
            </div>
            <h2 className="text-lg md:text-xl font-semibold text-white">Vehicle Description</h2>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70">Description (Optional)</label>
            <textarea 
              name="description"
              rows={4}
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full bg-black/40 border rounded-xl px-4 py-3 text-white focus:outline-none transition-colors resize-none ${
                formik.touched.description && formik.errors.description ? 'border-red-500/50' : 'border-white/10 focus:border-brand/50'
              }`}
              placeholder="Enter detailed information about the vehicle..."
            />
            {formik.touched.description && formik.errors.description && (
              <div className="text-red-500 text-xs flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" /> {formik.errors.description}
              </div>
            )}
            <p className="text-xs text-white/40">Provide details about condition, modifications, or specific features.</p>
          </div>
        </div>

        {/* Specifications Section */}
        <div className="glass p-4 sm:p-6 md:p-8 rounded-3xl border border-glass-border">
          <div className="flex items-center gap-3 mb-4 md:mb-6 border-b border-white/10 pb-4">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
              <Settings2 className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />
            </div>
            <h2 className="text-lg md:text-xl font-semibold text-white">Technical Specifications</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70 flex items-center gap-2">
                <Gauge className="w-4 h-4 text-white/40" /> KM Driven
              </label>
              <input 
                type="number"
                name="kmDriven"
                value={formik.values.kmDriven}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full bg-black/40 border rounded-xl px-4 py-3 text-white focus:outline-none transition-colors ${
                  formik.touched.kmDriven && formik.errors.kmDriven ? 'border-red-500/50' : 'border-white/10 focus:border-cyan-500/50'
                }`}
                placeholder="25000"
              />
              {formik.touched.kmDriven && formik.errors.kmDriven && (
                <div className="text-red-500 text-xs flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" /> {formik.errors.kmDriven}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70 flex items-center gap-2">
                <Fuel className="w-4 h-4 text-white/40" /> Fuel Type
              </label>
              <select 
                name="fuelType"
                value={formik.values.fuelType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full bg-black/40 border rounded-xl px-4 py-3 text-white focus:outline-none transition-colors appearance-none ${
                    formik.touched.fuelType && formik.errors.fuelType ? 'border-red-500/50' : 'border-white/10 focus:border-cyan-500/50'
                }`}
              >
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
              {formik.touched.fuelType && formik.errors.fuelType && (
                <div className="text-red-500 text-xs flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" /> {formik.errors.fuelType}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Transmission</label>
              <select 
                name="transmission"
                value={formik.values.transmission}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full bg-black/40 border rounded-xl px-4 py-3 text-white focus:outline-none transition-colors appearance-none ${
                    formik.touched.transmission && formik.errors.transmission ? 'border-red-500/50' : 'border-white/10 focus:border-cyan-500/50'
                }`}
              >
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
              {formik.touched.transmission && formik.errors.transmission && (
                <div className="text-red-500 text-xs flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" /> {formik.errors.transmission}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Body Type</label>
              <select 
                name="bodyType"
                value={formik.values.bodyType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full bg-black/40 border rounded-xl px-4 py-3 text-white focus:outline-none transition-colors appearance-none ${
                    formik.touched.bodyType && formik.errors.bodyType ? 'border-red-500/50' : 'border-white/10 focus:border-cyan-500/50'
                }`}
              >
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Coupe">Coupe</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Convertible">Convertible</option>
                <option value="Wagon">Wagon</option>
                <option value="Truck">Truck</option>
              </select>
              {formik.touched.bodyType && formik.errors.bodyType && (
                <div className="text-red-500 text-xs flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" /> {formik.errors.bodyType}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Owner History</label>
              <select 
                name="ownerHistory"
                value={formik.values.ownerHistory}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full bg-black/40 border rounded-xl px-4 py-3 text-white focus:outline-none transition-colors appearance-none ${
                    formik.touched.ownerHistory && formik.errors.ownerHistory ? 'border-red-500/50' : 'border-white/10 focus:border-cyan-500/50'
                }`}
              >
                <option value="1st Owner">1st Owner</option>
                <option value="2nd Owner">2nd Owner</option>
                <option value="3rd Owner">3rd Owner</option>
                <option value="4+ Owners">4+ Owners</option>
              </select>
              {formik.touched.ownerHistory && formik.errors.ownerHistory && (
                <div className="text-red-500 text-xs flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" /> {formik.errors.ownerHistory}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Color</label>
              <input 
                type="text"
                name="color"
                value={formik.values.color}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full bg-black/40 border rounded-xl px-4 py-3 text-white focus:outline-none transition-colors ${
                  formik.touched.color && formik.errors.color ? 'border-red-500/50' : 'border-white/10 focus:border-cyan-500/50'
                }`}
                placeholder="e.g. Midnight Black"
              />
              {formik.touched.color && formik.errors.color && (
                <div className="text-red-500 text-xs flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" /> {formik.errors.color}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Media */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Images Upload */}
          <div className="glass p-4 sm:p-6 md:p-8 rounded-3xl border border-glass-border">
            <div className="flex items-center gap-3 mb-4 md:mb-6 border-b border-white/10 pb-4">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                <ImagePlus className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
              </div>
              <h2 className="text-lg md:text-xl font-semibold text-white">Vehicle Images (Exactly 5)</h2>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
              {/* Image Previews */}
              {formik.values.images.map((file, idx) => (
                <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-white/10 group">
                  <img src={URL.createObjectURL(file)} alt={`Vehicle ${idx + 1}`} className="w-full h-full object-cover" />
                  <button 
                    type="button"
                    onClick={() => {
                      const newImgs = [...formik.values.images];
                      newImgs.splice(idx, 1);
                      formik.setFieldValue('images', newImgs);
                    }}
                    className="absolute top-1 right-1 p-1.5 bg-red-500 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <AlertCircle className="w-3 h-3" />
                  </button>
                </div>
              ))}
              
              {/* Upload Placeholder */}
              {formik.values.images.length < 5 && (
                <label className="aspect-square rounded-xl border-2 border-dashed border-white/20 bg-black/20 flex flex-col items-center justify-center cursor-pointer hover:border-brand/40 hover:bg-brand/5 transition-all">
                  <Upload className="w-5 h-5 text-white/40 mb-1" />
                  <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Add Image</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    multiple 
                    className="hidden" 
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      if (formik.values.images.length + files.length > 5) {
                        toast.error('Only 5 images allowed');
                        return;
                      }
                      formik.setFieldValue('images', [...formik.values.images, ...files]);
                      formik.setFieldTouched('images', true);
                    }}
                  />
                </label>
              )}
            </div>
            {formik.touched.images && formik.errors.images && (
              <div className="text-red-400 text-xs flex items-center gap-1 mt-2">
                <AlertCircle className="w-3 h-3" /> {formik.errors.images as string}
              </div>
            )}
            <p className="text-[10px] text-white/30 italic">High-quality side, front, and interior shots recommended.</p>
          </div>

          {/* Video Upload */}
          <div className="glass p-4 sm:p-6 md:p-8 rounded-3xl border border-glass-border">
            <div className="flex items-center gap-3 mb-4 md:mb-6 border-b border-white/10 pb-4">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                <Settings2 className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
              </div>
              <h2 className="text-lg md:text-xl font-semibold text-white">Vehicle Video (Max 16s)</h2>
            </div>
            
            {!formik.values.video ? (
              <label className="border-2 border-dashed border-white/20 rounded-2xl bg-black/20 p-6 md:p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-brand/40 hover:bg-brand/5 transition-all group">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:bg-brand/20 transition-colors">
                  <Upload className="w-5 h-5 text-white/50 group-hover:text-brand transition-colors" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-1">Upload Cinematics</h3>
                <p className="text-[10px] text-white/50 max-w-[200px]">Video must be under 16 seconds.</p>
                <input 
                  type="file" 
                  accept="video/*" 
                  className="hidden" 
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    const video = document.createElement('video');
                    video.preload = 'metadata';
                    video.onloadedmetadata = function() {
                      window.URL.revokeObjectURL(video.src);
                      if (video.duration > 16) {
                        toast.error('Video exceeds 16 seconds');
                      } else {
                        formik.setFieldValue('video', file);
                        formik.setFieldValue('videoDuration', Math.floor(video.duration));
                      }
                    }
                    video.src = URL.createObjectURL(file);
                  }}
                />
              </label>
            ) : (
              <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video bg-black/40 flex items-center justify-center">
                 <div className="text-white/60 flex flex-col items-center">
                    <CheckCircle2 className="w-8 h-8 text-green-500 mb-2" />
                    <span className="text-sm font-medium">Video uploaded ({formik.values.videoDuration}s)</span>
                 </div>
                 <button 
                  type="button" 
                  onClick={() => {
                    formik.setFieldValue('video', null);
                    formik.setFieldValue('videoDuration', 0);
                  }}
                  className="absolute top-2 right-2 p-2 bg-red-500/20 hover:bg-red-500 rounded-xl text-white transition-colors"
                >
                  <AlertCircle className="w-4 h-4" />
                </button>
              </div>
            )}
            {formik.touched.videoDuration && formik.errors.videoDuration && (
                <div className="text-red-400 text-xs flex items-center gap-1 mt-2">
                   <AlertCircle className="w-3 h-3" /> {formik.errors.videoDuration}
                </div>
            )}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="glass p-4 sm:p-6 md:p-8 rounded-3xl border border-glass-border">
          <div className="flex items-center gap-3 mb-4 md:mb-6 border-b border-white/10 pb-4">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-green-500/20 flex items-center justify-center border border-green-500/30">
              <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
            </div>
            <h2 className="text-lg md:text-xl font-semibold text-white">Trust & Verification</h2>
          </div>
          
          <p className="text-sm text-white/60 mb-4">Select the badges this vehicle qualifies for:</p>
          
          <div className="flex flex-wrap gap-3">
            {availableBadges.map((badge) => {
              const isSelected = trustBadges.includes(badge);
              return (
                <button
                  key={badge}
                  type="button"
                  onClick={() => toggleBadge(badge)}
                  className={`px-4 py-2.5 rounded-full text-sm font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 border ${
                    isSelected 
                      ? 'bg-brand/20 border-brand text-brand shadow-[0_0_15px_rgba(0,255,102,0.2)]' 
                      : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  {isSelected && <CheckCircle2 className="w-4 h-4" />}
                  {badge}
                </button>
              )
            })}
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4">
          <button 
            type="button"
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-white/10 bg-white/5 text-white font-bold hover:bg-white/10 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit"
            disabled={isSubmitting || isSuccess || !formik.dirty}
            className={`w-full sm:w-auto px-8 py-3 rounded-xl border font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
              isSuccess 
                ? 'bg-green-500/20 border-green-500 text-green-400' 
                : (isSubmitting || !formik.isValid) && formik.submitCount > 0
                  ? 'bg-white/5 border-white/10 text-white/20 cursor-not-allowed'
                  : 'bg-brand/20 border-brand text-brand hover:bg-brand hover:text-black shadow-[0_0_20px_rgba(0,255,102,0.1)] hover:shadow-[0_0_30px_rgba(0,255,102,0.3)]'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full border-2 border-brand border-t-transparent animate-spin"/> Processing...
              </span>
            ) : isSuccess ? (
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" /> Vehicle Added
              </span>
            ) : (
              'Save Listing'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCar;
