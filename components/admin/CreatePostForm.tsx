'use client';

import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Loader2, ImagePlus, X, Sparkles } from 'lucide-react';

type PostStatus = 'published' | 'draft';

const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5 MB

export function CreatePostForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<PostStatus>('published');
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Cover must be an image file.');
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setError('Cover image must be under 5MB.');
      return;
    }
    setError(null);
    setCoverFile(file);
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
  };

  const clearCover = () => {
    setCoverFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const resetForm = () => {
    setTitle('');
    setExcerpt('');
    setContent('');
    setStatus('published');
    clearCover();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      let coverImageUrl: string | null = null;

      if (coverFile) {
        const uploadForm = new FormData();
        uploadForm.append('file', coverFile);

        const uploadRes = await fetch('/api/admin/upload', {
          method: 'POST',
          body: uploadForm,
        });

        if (!uploadRes.ok) {
          const payload = await uploadRes.json().catch(() => ({}));
          throw new Error(payload.error || 'Image upload failed');
        }

        const upload = (await uploadRes.json()) as { url: string };
        coverImageUrl = upload.url;
      }

      const createRes = await fetch('/api/admin/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          excerpt: excerpt.trim() || null,
          content,
          cover_image_url: coverImageUrl,
          status,
        }),
      });

      if (!createRes.ok) {
        const payload = await createRes.json().catch(() => ({}));
        throw new Error(payload.error || 'Failed to create post');
      }

      const created = (await createRes.json()) as { slug: string };

      setSuccess(
        status === 'published'
          ? 'Post published. View it on the news feed.'
          : 'Draft saved.',
      );
      resetForm();
      router.refresh();

      if (status === 'published') {
        // Pre-warm the new post URL.
        router.prefetch(`/news/${created.slug}`);
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-[1fr_240px]">
        <div className="space-y-6">
          <Field label="Title" required>
            <input
              type="text"
              required
              maxLength={140}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. Annual Sports Meet 2026"
              className={inputClasses}
            />
          </Field>

          <Field
            label="Short excerpt"
            hint="One or two sentences that appear in the news feed card."
          >
            <textarea
              value={excerpt}
              onChange={(event) => setExcerpt(event.target.value)}
              maxLength={240}
              rows={2}
              placeholder="A short summary readers see in the feed."
              className={`${inputClasses} resize-none`}
            />
            <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-midnight/40">
              {excerpt.length}/240
            </div>
          </Field>

          <Field label="Content" required>
            <textarea
              required
              value={content}
              onChange={(event) => setContent(event.target.value)}
              rows={10}
              placeholder="Write the full article here. Plain text and line breaks are supported."
              className={`${inputClasses} resize-y min-h-[200px]`}
            />
          </Field>
        </div>

        <div className="space-y-6">
          <Field label="Cover image" hint="Optional · PNG/JPG up to 5MB.">
            <div className="rounded-brand border border-dashed border-border-grey bg-cream/50 p-3">
              {previewUrl ? (
                <div className="relative">
                  <div className="relative aspect-video w-full overflow-hidden rounded-md">
                    <Image
                      src={previewUrl}
                      alt="Cover preview"
                      fill
                      sizes="240px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <button
                    type="button"
                    onClick={clearCover}
                    className="absolute -top-2 -right-2 rounded-full bg-midnight text-white p-1.5 shadow-md hover:bg-red-500 transition"
                    aria-label="Remove cover image"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-md text-midnight/50 hover:text-navy hover:bg-white transition"
                >
                  <ImagePlus size={24} />
                  <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                    Upload image
                  </span>
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </Field>

          <Field label="Status">
            <div className="grid grid-cols-2 gap-2 rounded-full bg-cream p-1 border border-border-grey">
              <StatusOption
                active={status === 'published'}
                onClick={() => setStatus('published')}
                label="Publish"
              />
              <StatusOption
                active={status === 'draft'}
                onClick={() => setStatus('draft')}
                label="Draft"
              />
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-midnight/50">
              {status === 'published'
                ? 'Visible on the public news feed immediately.'
                : 'Saved privately. Only admins can see drafts.'}
            </p>
          </Field>
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-brand border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {success && (
        <div
          role="status"
          className="rounded-brand border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 flex items-center gap-2"
        >
          <Sparkles size={16} />
          {success}
        </div>
      )}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end pt-2">
        <button
          type="button"
          onClick={resetForm}
          disabled={loading}
          className="rounded-full border border-border-grey bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-midnight/70 hover:text-midnight hover:border-midnight transition disabled:opacity-50"
        >
          Reset
        </button>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-navy text-white px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] hover:bg-gold-heritage hover:text-midnight transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading && <Loader2 size={16} className="animate-spin" />}
          {status === 'published' ? 'Publish post' : 'Save draft'}
        </button>
      </div>
    </form>
  );
}

const inputClasses =
  'w-full rounded-brand border border-border-grey bg-cream px-4 py-3 text-sm text-midnight placeholder:text-midnight/40 focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/20';

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-midnight/70">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </span>
      </div>
      {children}
      {hint && (
        <p className="mt-1 text-[11px] leading-relaxed text-midnight/50">
          {hint}
        </p>
      )}
    </label>
  );
}

function StatusOption({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] transition ${
        active
          ? 'bg-navy text-white shadow-sm'
          : 'text-midnight/60 hover:text-midnight'
      }`}
    >
      {label}
    </button>
  );
}
