import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ImagePlus, Trash2 } from "lucide-react";
import SideBarAdDashboard from "./SideBarAdDashboard";

// Admin Add Product Page (React + Tailwind)
// Features:
// - Responsive form layout
// - Client-side validation
// - Multiple image upload with previews
// - Price, MRP, discount calculation preview
// - Category input + quick suggestions
// - Tags input
// - Submit as FormData (images included)
// - Redirect back to products after successful add

export default function AdminAddProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    product_name: "",
    price: "",
    mrp: "",
    quantity: "",
    category: "",
    description: "",
    inStock: true,
    sku: "",
    tags: [],
  });
  const [tagInput, setTagInput] = useState("");
  const [images, setImages] = useState([]); // File objects
  const [previews, setPreviews] = useState([]); // data URLs
  const [loading, setLoading] = useState(false);

  // helper slug
  const slugify = (s) => s?.toString().toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  }

  // handle image files and previews
  function handleFiles(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    // limit to 8 images
    const newFiles = [...images, ...files].slice(0, 8);
    setImages(newFiles);

    // generate previews
    const readers = files.map((file) => {
      return new Promise((res) => {
        const r = new FileReader();
        r.onload = () => res(r.result);
        r.readAsDataURL(file);
      });
    });
    Promise.all(readers).then((urls) => setPreviews((p) => [...p, ...urls].slice(0, 8)));
  }

  function removeImage(index) {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  }

  function addTag() {
    const t = tagInput.trim();
    if (!t) return;
    if (form.tags.includes(t)) { setTagInput(''); return; }
    setForm((f) => ({ ...f, tags: [...f.tags, t] }));
    setTagInput('');
  }

  function removeTag(idx) {
    setForm((f) => ({ ...f, tags: f.tags.filter((_, i) => i !== idx) }));
  }

  // basic validation
  function validate() {
    if (!form.product_name.trim()) return 'Product name required';
    if (!form.price || Number(form.price) <= 0) return 'Valid price required';
    if (!form.quantity || Number(form.quantity) < 0) return 'Valid quantity required';
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const err = validate();
    if (err) return alert(err);

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('product_name', form.product_name);
      fd.append('price', form.price);
      if (form.mrp) fd.append('mrp', form.mrp);
      fd.append('quantity', form.quantity);
      fd.append('category', form.category || 'Uncategorized');
      fd.append('description', form.description || '');
      fd.append('inStock', form.inStock);
      fd.append('sku', form.sku || '');
      fd.append('slug', slugify(form.product_name));
      fd.append('tags', JSON.stringify(form.tags || []));

      images.forEach((file, idx) => fd.append('images', file));

      // assumed endpoint; change if your server expects different route
      const res = await axios.post('http://localhost:1000/users/product', fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert('Product added successfully');
      navigate('/users/adminproducts');
    } catch (err) {
      console.error(err);
      alert('Failed to add product — check console.');
    } finally {
      setLoading(false);
    }
  }

  const discount = form.mrp && form.price ? Math.round((1 - (Number(form.price) / Number(form.mrp || form.price))) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="md:flex">
        <aside className="hidden md:block md:w-64 bg-emerald-900 text-white min-h-screen">
          <div className="">
            <SideBarAdDashboard />
          </div>
        </aside>
                    
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <button onClick={() => navigate('/users/adminproducts')} className="p-2 rounded-md bg-white border"><ArrowLeft /></button>
              <h1 className="text-2xl font-semibold">Add Product</h1>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* left column - images */}
              <div className="md:col-span-1 bg-white p-4 rounded-lg border">
                <label className="flex items-center justify-center flex-col gap-3 p-6 border-2 border-dashed rounded-md cursor-pointer">
                  <ImagePlus size={36} />
                  <div className="text-sm text-gray-500">Upload product images (max 8)</div>
                  <input type="file" accept="image/*" multiple onChange={handleFiles} className="hidden" />
                </label>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  {previews.map((p, i) => (
                    <div key={i} className="relative w-full h-20 rounded-md overflow-hidden border">
                      <img src={p} alt="preview" className="w-full h-full object-cover" />
                      <button type="button" onClick={() => removeImage(i)} className="absolute top-1 right-1 bg-black bg-opacity-50 p-1 rounded text-white"><Trash2 size={12} /></button>
                    </div>
                  ))}
                </div>

                <p className="mt-3 text-xs text-gray-500">Tip: Use clear product images on white background for best results.</p>
              </div>

              {/* right column - form fields */}
              <div className="md:col-span-2 bg-white p-6 rounded-lg border">
                <div className="grid grid-cols-1 gap-3">
                  <label className="text-sm">Product name
                    <input name="product_name" value={form.product_name} onChange={handleChange} className="w-full border p-2 rounded-md mt-1" placeholder="e.g. iPhone 16 Pro" />
                  </label>

                  <div className="grid grid-cols-2 gap-3">
                    <label className="text-sm">Price
                      <input name="price" value={form.price} onChange={handleChange} className="w-full border p-2 rounded-md mt-1" type="number" step="0.01" />
                    </label>
                    <label className="text-sm">MRP
                      <input name="mrp" value={form.mrp} onChange={handleChange} className="w-full border p-2 rounded-md mt-1" type="number" step="0.01" />
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-sm text-gray-500">Discount: <span className="font-medium">{discount > 0 ? `${discount}%` : '—'}</span></div>
                    <div className="ml-auto flex items-center gap-2">
                      <label className="flex items-center gap-2"><input type="checkbox" name="inStock" checked={form.inStock} onChange={handleChange} /> In stock</label>
                      <label className="text-sm">Quantity <input name="quantity" value={form.quantity} onChange={handleChange} type="number" className="w-24 border p-1 rounded-md" /></label>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <label className="text-sm">Category
                      <input name="category" value={form.category} onChange={handleChange} className="w-full border p-2 rounded-md mt-1" placeholder="e.g. Mobiles" />
                    </label>
                    <label className="text-sm">SKU
                      <input name="sku" value={form.sku} onChange={handleChange} className="w-full border p-2 rounded-md mt-1" placeholder="optional" />
                    </label>
                  </div>

                  <label className="text-sm">Description
                    <textarea name="description" value={form.description} onChange={handleChange} className="w-full border p-2 rounded-md mt-1 h-28" placeholder="Short product description (bullet points are great)"></textarea>
                  </label>

                  {/* tags input */}
                  <div>
                    <div className="flex items-center gap-2">
                      <input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' ? (e.preventDefault(), addTag()) : null} placeholder="Add tag and press Enter" className="border p-2 rounded-md flex-1" />
                      <button type="button" onClick={addTag} className="px-3 py-2 bg-white border rounded-md">Add</button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {form.tags.map((t, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-2">
                          {t} <button type="button" onClick={() => removeTag(i)} className="text-xs">×</button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-3 justify-end">
                    <button type="button" onClick={() => navigate('/users/adminproducts')} className="px-4 py-2 rounded-md border">Cancel</button>
                    <button type="submit" disabled={loading} className="px-4 py-2 rounded-md bg-green-600 text-white">{loading ? 'Adding...' : 'Add Product'}</button>
                  </div>
                </div>
              </div>
            </form>

          </div>
        </main>
      </div>
    </div>
  );
}


