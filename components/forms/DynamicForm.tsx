'use client';

import { useState } from 'react';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { FormField } from '../admin/FormBuilder';

interface DynamicFormProps {
  formId: string;
  fields: FormField[];
  title: string;
}

export function DynamicForm({ formId, fields, title }: DynamicFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (fieldId: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/forms/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formId, data: formData }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to submit form');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-20 px-6 bg-white rounded-[2.5rem] shadow-xl border border-border-grey">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-50 text-emerald-500 mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-3xl font-serif font-bold text-navy mb-4">Submission Received</h2>
        <p className="text-midnight/60 mb-8 max-w-md mx-auto">
          Thank you for submitting the {title}. We have received your information successfully.
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="text-gold-heritage font-bold uppercase tracking-widest text-xs hover:text-navy transition-colors"
        >
          Submit another response
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] shadow-2xl border border-border-grey p-8 sm:p-12">
      <div className="space-y-8">
        {fields.map((field) => (
          <div key={field.id} className="space-y-3">
            <label className="block text-sm font-bold text-navy uppercase tracking-widest">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>

            {field.type === 'textarea' ? (
              <textarea
                required={field.required}
                placeholder={field.placeholder}
                value={formData[field.id] || ''}
                onChange={(e) => handleChange(field.id, e.target.value)}
                className={inputStyles}
                rows={4}
              />
            ) : field.type === 'select' ? (
              <select
                required={field.required}
                value={formData[field.id] || ''}
                onChange={(e) => handleChange(field.id, e.target.value)}
                className={inputStyles}
              >
                <option value="">Select an option</option>
                {field.options?.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            ) : field.type === 'checkbox' ? (
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  required={field.required}
                  checked={formData[field.id] || false}
                  onChange={(e) => handleChange(field.id, e.target.checked)}
                  className="w-5 h-5 rounded border-border-grey text-navy focus:ring-navy transition-all"
                />
                <span className="text-sm text-midnight/70 group-hover:text-navy transition-colors">
                  {field.label}
                </span>
              </label>
            ) : (
              <input
                type={field.type}
                required={field.required}
                placeholder={field.placeholder}
                value={formData[field.id] || ''}
                onChange={(e) => handleChange(field.id, e.target.value)}
                className={inputStyles}
              />
            )}
          </div>
        ))}
      </div>

      {error && (
        <div className="mt-8 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm flex items-center gap-3">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-12 w-full flex items-center justify-center gap-2 py-5 rounded-full bg-navy text-white font-bold uppercase tracking-widest text-sm hover:bg-gold-heritage hover:text-midnight transition-all shadow-xl shadow-navy/20 disabled:opacity-50"
      >
        {loading && <Loader2 size={20} className="animate-spin" />}
        Submit Form
      </button>
      
      <p className="mt-6 text-center text-[10px] uppercase tracking-widest text-midnight/30 font-medium">
        Secure submission · Hapugala Vidyalaya
      </p>
    </form>
  );
}

const inputStyles = "w-full bg-cream border border-border-grey rounded-2xl px-5 py-4 text-midnight placeholder:text-midnight/30 focus:ring-2 focus:ring-navy/10 focus:border-navy outline-none transition-all text-sm";
