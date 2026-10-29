
import { useEffect, useState } from "react";
import { ImageUp, ScanSearch, Sparkles, Download, RotateCcw } from "lucide-react";
import { restoreImage } from "../services/spiritLensApi";

export default function SpiritLens() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [restoredUrl, setRestoredUrl] = useState("");
  const [error, setError] = useState("");
  const [restoring, setRestoring] = useState(false);

  // Create and clean up the original image preview URL.
  useEffect(() => {
    if (!file) {
      setPreviewUrl("");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  // Clean up the restored image URL when it changes or the page unmounts.
  useEffect(() => {
    if (!restoredUrl) return;

    return () => URL.revokeObjectURL(restoredUrl);
  }, [restoredUrl]);

  function handleFileChange(event) {
    const selectedFile = event.target.files?.[0];

    // Allow the user to select the same file again later.
    event.target.value = "";

    if (!selectedFile) return;

    setError("");
    setRestoredUrl("");

    const allowedTypes = ["image/jpeg", "image/png"];

    if (!allowedTypes.includes(selectedFile.type)) {
      setFile(null);
      setError("Please select a JPG or PNG image.");
      return;
    }

    const MAX_FILE_SIZE = 10 * 1024 * 1024;

    if (selectedFile.size > MAX_FILE_SIZE) {
      setFile(null);
      setError("Your image must be 10 MB or smaller.");
      return;
    }

    setFile(selectedFile);
  }

  async function handleRestore() {
    if (!file || restoring) return;

    setRestoring(true);
    setError("");
    setRestoredUrl("");

    try {
      // Upload the selected image to the backend.
      // The backend should return the processed image as binary image data.
      const restoredBlob = await restoreImage(file);

      if (!(restoredBlob instanceof Blob) || restoredBlob.size === 0) {
        throw new Error("The server returned an empty image.");
      }

      if (!restoredBlob.type.startsWith("image/")) {
        throw new Error("The server did not return a valid image response.");
      }

      const newRestoredUrl = URL.createObjectURL(restoredBlob);
      setRestoredUrl(newRestoredUrl);
    } catch (err) {
      console.error("Spirit Lens restoration failed:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Image restoration failed. Please try again."
      );
    } finally {
      setRestoring(false);
    }
  }

  function handleReset() {
    setFile(null);
    setRestoredUrl("");
    setError("");
  }

  return (
    <section className="space-y-8">
      {/* Page heading */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <div className="rounded-xl bg-violet-500/10 p-2">
            <Sparkles className="h-5 w-5 text-violet-400" />
          </div>

          <span className="text-sm font-medium uppercase tracking-[0.2em] text-violet-300">
            Spirit Lens
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          Restore the unseen.
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 md:text-base">
          Upload a noisy or blurry image and send it to the AI restoration
          backend. Compare the original with the processed result.
        </p>
      </div>

      {/* Upload panel */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 md:p-7">
        <div className="mb-5 flex items-center gap-3">
          <ImageUp className="h-5 w-5 text-violet-300" />

          <div>
            <h2 className="font-semibold text-white">Upload an image</h2>
            <p className="mt-1 text-sm text-slate-400">
              JPG or PNG, up to 10 MB
            </p>
          </div>
        </div>

        <label
          htmlFor="spirit-lens-image"
          className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-violet-400/40 bg-violet-400/5 px-5 py-10 text-center transition hover:border-violet-300 hover:bg-violet-400/10"
        >
          <ImageUp className="mb-4 h-9 w-9 text-violet-300" />

          <span className="font-medium text-white">
            Choose an image from your device
          </span>

          <span className="mt-2 text-sm text-slate-400">
            {file ? file.name : "Click here to browse files"}
          </span>

          <input
            id="spirit-lens-image"
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleFileChange}
            className="sr-only"
          />
        </label>

        {error && (
          <div
            role="alert"
            className="mt-4 rounded-lg border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300"
          >
            {error}
          </div>
        )}

        {file && (
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleRestore}
              disabled={restoring}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-500 px-5 py-3 font-medium text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {restoring ? (
                <>
                  <span
                    className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                    aria-hidden="true"
                  />
                  Restoring image...
                </>
              ) : (
                <>
                  <ScanSearch className="h-4 w-4" />
                  Restore image with AI
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleReset}
              disabled={restoring}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm text-slate-300 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
          </div>
        )}
      </div>

      {/* Image previews */}
      {previewUrl && (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {/* Original image */}
          <div className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60">
            <div className="border-b border-white/10 px-5 py-4">
              <h2 className="font-semibold text-white">Original image</h2>
              <p className="mt-1 text-sm text-slate-400">
                The image you uploaded
              </p>
            </div>

            <div className="flex min-h-64 items-center justify-center bg-black/20 p-4">
              <img
                src={previewUrl}
                alt="Original uploaded image"
                className="max-h-[500px] max-w-full rounded-lg object-contain"
              />
            </div>
          </div>

          {/* Restored image */}
          <div className="min-w-0 overflow-hidden rounded-2xl border border-violet-400/20 bg-slate-900/60">
            <div className="border-b border-white/10 px-5 py-4">
              <h2 className="font-semibold text-white">AI-restored image</h2>
              <p className="mt-1 text-sm text-slate-400">
                {restoring
                  ? "Processing your image on the backend..."
                  : restoredUrl
                    ? "Restoration complete"
                    : "Your processed image will appear here"}
              </p>
            </div>

            <div className="flex min-h-64 items-center justify-center bg-black/20 p-4">
              {restoring ? (
                <div
                  className="flex flex-col items-center gap-4 text-center"
                  role="status"
                  aria-live="polite"
                >
                  <span
                    className="h-10 w-10 animate-spin rounded-full border-4 border-violet-300/20 border-t-violet-300"
                    aria-hidden="true"
                  />

                  <p className="text-sm text-slate-300">
                    Removing noise and blur...
                  </p>

                  <p className="text-xs text-slate-500">
                    Processing time depends on the model and image size.
                  </p>
                </div>
              ) : restoredUrl ? (
                <img
                  src={restoredUrl}
                  alt="AI-restored image"
                  className="max-h-[500px] max-w-full rounded-lg object-contain"
                />
              ) : (
                <div className="px-5 py-10 text-center">
                  <Sparkles className="mx-auto mb-3 h-8 w-8 text-violet-300/60" />

                  <p className="text-sm text-slate-400">
                    Select an image and click{" "}
                    <span className="font-medium text-violet-300">
                      Restore image with AI
                    </span>{" "}
                    to see the result here.
                  </p>
                </div>
              )}
            </div>

            {restoredUrl && (
              <div className="border-t border-white/10 p-4">
                <a
                  href={restoredUrl}
                  download={`restored-${file?.name || "image.png"}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-violet-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-400"
                >
                  <Download className="h-4 w-4" />
                  Download restored image
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Pipeline status */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-5">
        <div className="flex items-start gap-3">
          <ScanSearch className="mt-1 h-5 w-5 shrink-0 text-violet-300" />

          <div>
            <h2 className="font-semibold text-white">Restoration pipeline</h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              The frontend sends the selected image to the Spirit Lens API
              and displays the returned image. Actual denoising and deblurring
              require a configured pretrained model on the backend; this
              interface does not itself perform AI restoration.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
