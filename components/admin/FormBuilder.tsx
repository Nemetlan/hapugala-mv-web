'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Plus, 
  Trash2, 
  GripVertical, 
  Type, 
  AlignLeft, 
  CheckSquare, 
  Mail, 
  Hash, 
  ChevronDown,
  Loader2,
  Sparkles
} from 'lucide-react';

export type FieldType = 'text' | 'email' | 'number' | 'textarea' | 'checkbox' | 'select';

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[]; // For select type
}

interface FormBuilderProps {
  initialData?: {
    id?: string;
    title: string;
    description: string;
    slug: string;
    fields: FormField[];
    is_published: boolean;
  };
}

const FIELD_TYPES: { type: FieldType; label: string; icon: any }[] = [
  { type: 'text', label: 'Short Text', icon: Type },
  { type: 'email', label: 'Email', icon: Mail },
  { type: 'number', label: 'Number', icon: Hash },
  { type: 'textarea', label: 'Long Text', icon: AlignLeft },
  { type: 'checkbox', label: 'Checkbox', icon: CheckSquare },
  { type: 'select', label: 'Dropdown', icon: ChevronDown },
];

export function FormBuilder({ initialData }: FormBuilderProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [isPublished, setIsPublished] = useState(initialData?.is_published || false);
  const [fields, setFields] = useState<FormField[]>(initialData?.fields || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const addField = (type: FieldType) => {
    const newField: FormField = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      label: `New ${type} field`,
      required: false,
      placeholder: '',
      options: type === 'select' ? ['Option 1'] : undefined,
    };
    setFields([...fields, newField]);
  };

  const removeField = (id: string) => {
    setFields(fields.filter(f => f.id !== id));
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(fields.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!title || !slug) {
      setError('Title and Slug are required.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/admin/forms', {
        method: initialData?.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: initialData?.id,
          title,
          description,
          slug,
          fields,
          is_published: isPublished
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save form');
      }

      setSuccess('Form saved successfully!');
      if (!initialData?.id) {
        router.push('/admin/forms');
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
      <div className="space-y-8">
        <section className="bg-white rounded-3xl p-8 border border-border-grey shadow-xl">
          <h2 className="text-xl font-serif font-bold text-navy mb-6">Form Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-midnight/50 mb-2">Form Title</label>
              <input 
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (!initialData?.id) {
                    setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
                  }
                }}
                className="w-full bg-cream border border-border-grey rounded-2xl px-4 py-3 text-midnight focus:ring-2 focus:ring-navy/10 outline-none transition-all"
                placeholder="e.g., Prefect Application 2026"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-midnight/50 mb-2">Description</label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-cream border border-border-grey rounded-2xl px-4 py-3 text-midnight focus:ring-2 focus:ring-navy/10 outline-none transition-all h-24 resize-none"
                placeholder="Briefly describe the purpose of this form..."
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-midnight/50 mb-2">URL Slug</label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-midnight/40 font-mono">/forms/</span>
                <input 
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="flex-1 bg-cream border border-border-grey rounded-2xl px-4 py-3 text-midnight focus:ring-2 focus:ring-navy/10 outline-none transition-all font-mono text-sm"
                  placeholder="form-slug"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-3xl p-8 border border-border-grey shadow-xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-serif font-bold text-navy">Fields</h2>
            <div className="text-[10px] font-bold uppercase tracking-widest text-midnight/30">
              {fields.length} Fields added
            </div>
          </div>

          <div className="space-y-4 mb-8">
            {fields.map((field, index) => (
              <div key={field.id} className="bg-cream/50 border border-border-grey rounded-2xl p-6 group relative">
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-midnight/20">
                    <GripVertical size={20} />
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-midnight/40 mb-1">Label</label>
                      <input 
                        type="text"
                        value={field.label}
                        onChange={(e) => updateField(field.id, { label: e.target.value })}
                        className="w-full bg-white border border-border-grey rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-navy/10 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-midnight/40 mb-1">Type</label>
                      <div className="px-3 py-2 bg-white border border-border-grey rounded-xl text-sm font-semibold text-navy flex items-center gap-2">
                        {(() => {
                          const typeObj = FIELD_TYPES.find(t => t.type === field.type);
                          return typeObj ? (
                            <>
                              <typeObj.icon size={14} />
                              {typeObj.label}
                            </>
                          ) : null;
                        })()}
                      </div>
                    </div>
                    {field.type !== 'checkbox' && (
                      <div className="md:col-span-2">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-midnight/40 mb-1">Placeholder</label>
                        <input 
                          type="text"
                          value={field.placeholder}
                          onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                          className="w-full bg-white border border-border-grey rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-navy/10 outline-none transition-all"
                        />
                      </div>
                    )}
                    {field.type === 'select' && (
                      <div className="md:col-span-2">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-midnight/40 mb-1">Options (comma separated)</label>
                        <input 
                          type="text"
                          value={field.options?.join(', ')}
                          onChange={(e) => updateField(field.id, { options: e.target.value.split(',').map(s => s.trim()) })}
                          className="w-full bg-white border border-border-grey rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-navy/10 outline-none transition-all"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-center gap-4">
                     <button 
                      onClick={() => removeField(field.id)}
                      className="text-midnight/20 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 size={18} />
                    </button>
                    <div className="flex flex-col items-center gap-1">
                      <input 
                        type="checkbox"
                        checked={field.required}
                        onChange={(e) => updateField(field.id, { required: e.target.checked })}
                        className="w-4 h-4 rounded border-border-grey text-navy focus:ring-navy"
                      />
                      <span className="text-[8px] font-bold uppercase tracking-tighter text-midnight/40">Req</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {fields.length === 0 && (
            <div className="text-center py-12 border-2 border-dashed border-border-grey rounded-3xl mb-8">
              <p className="text-sm text-midnight/40">No fields added yet. Choose a field type below to start.</p>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {FIELD_TYPES.map((ft) => (
              <button
                key={ft.type}
                onClick={() => addField(ft.type)}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-cream border border-border-grey hover:border-navy hover:bg-white transition-all text-xs font-bold uppercase tracking-widest text-navy"
              >
                <ft.icon size={16} className="text-gold-heritage" />
                {ft.label}
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className="space-y-6">
        <section className="bg-white rounded-3xl p-6 border border-border-grey shadow-xl sticky top-8">
          <h2 className="text-lg font-serif font-bold text-navy mb-6">Status & Save</h2>
          
          <div className="flex items-center justify-between mb-8 p-4 bg-cream rounded-2xl border border-border-grey">
             <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-widest text-midnight/50">Published</span>
                <span className="text-[9px] text-midnight/30 leading-none">Visible to public</span>
             </div>
             <button 
              onClick={() => setIsPublished(!isPublished)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${isPublished ? 'bg-navy' : 'bg-midnight/20'}`}
             >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isPublished ? 'translate-x-6' : 'translate-x-1'}`} />
             </button>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-xs mb-6">
              {error}
            </div>
          )}

          {success && (
             <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-600 text-xs mb-6 flex items-center gap-2">
                <Sparkles size={14} />
                {success}
             </div>
          )}

          <div className="space-y-3">
            <button 
              onClick={handleSubmit}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-navy text-white font-bold uppercase tracking-widest text-xs hover:bg-gold-heritage hover:text-midnight transition-all shadow-lg shadow-navy/20 disabled:opacity-50"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              {initialData?.id ? 'Update Form' : 'Create Form'}
            </button>
            <button 
              onClick={() => router.push('/admin/forms')}
              disabled={loading}
              className="w-full py-4 rounded-full border border-border-grey text-midnight font-bold uppercase tracking-widest text-xs hover:bg-white transition-all"
            >
              Cancel
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
