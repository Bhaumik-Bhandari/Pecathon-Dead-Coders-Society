import { useEffect, useState } from "react";
import {
  ImageUp,
  ScanSearch,
  Sparkles,
} from "lucide-react";

export default function SpiritLens() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!file) {
      setPreviewUrl("");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  function handleFileChange(event) {
    const selectedFile = event.target.files?.[0];

    setError("");
    setFile(null);

    if (!selectedFile) return;

    const supportedTypes = ["image/jpeg", "image/png"];

    if (!supportedTypes.includes(selectedFile.type)) {
      setError("Please select a JPEG or PNG image.");
      event.target.value = "";
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("The image must be smaller than 10 MB.");
      event.target.value = "";
      return;
    }

    setFile(selectedFile);
  }

  return (
    <section className="space-y-7">
      <header>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#E9B15D]">
          Module 03 · The Spirit Lens
        </p>

        <h1 className="mt-3 text-3xl font-bold text-[#F2E9DB]">
          Reveal the details hidden in the stars.
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
          Preview an astronomical image before connecting it
          to the image-restoration and source-detection pipeline.
        </p>
      </header>

      <section className="rounded-2xl border border-white/10 bg-[#152234]/80 p-5 sm:p-7">
        <div className="flex items-center gap-3">
          <ImageUp size={22} className="text-[#E9B15D]" />

          <div>
            <h2 className="font-semibold text-[#F2E9DB]">
              Upload an astronomy image
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              JPEG or PNG · Maximum 10 MB
            </p>
          </div>
        </div>

        <label className="mt-6 flex min-h-[180px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-white/20 bg-[#0D1725]/60 p-6 text-center transition hover:border-[#E9B15D]/60">
          <ImageUp size={34} className="text-[#E9B15D]" />

          <span className="mt-4 font-medium text-[#F2E9DB]">
            Choose an image from your computer
          </span>

          <span className="mt-2 text-sm text-slate-400">
            Your original image will remain unchanged.
          </span>

          <input
            type="file"
            accept="image/jpeg,image/png"
            className="sr-only"
            onChange={handleFileChange}
          />
        </label>

        {error && (
          <p role="alert" className="mt-4 text-sm text-red-400">
            {error}
          </p>
        )}

        {previewUrl && (
          <div className="mt-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-medium text-[#F2E9DB]">
                Original image preview
              </h3>

              <span className="text-xs text-slate-400">
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </span>
            </div>

            <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-black">
              <img
                src={previewUrl}
                alt="Selected astronomical image"
                className="mx-auto max-h-[480px] w-full object-contain"
              />
            </div>

            <p className="mt-3 break-all text-xs text-slate-400">
              {file.name}
            </p>
          </div>
        )}
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        <section className="rounded-2xl border border-white/10 bg-[#152234]/80 p-5">
          <Sparkles size={22} className="text-[#E9B15D]" />

          <h2 className="mt-4 font-semibold text-[#F2E9DB]">
            AI image restoration
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            The pre-trained restoration model and backend
            processing pipeline have not been connected yet.
          </p>
        </section>

        <section className="rounded-2xl border border-white/10 bg-[#152234]/80 p-5">
          <ScanSearch size={22} className="text-[#E9B15D]" />

          <h2 className="mt-4 font-semibold text-[#F2E9DB]">
            Object detection
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            Detected-object markers and image measurements
            will appear after a scan is processed by the backend.
          </p>
        </section>
      </div>
    </section>
  );
}