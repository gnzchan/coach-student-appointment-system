export default function Loading() {
  return (
    <div className="py-44 w-full flex flex-col items-center justify-center gap-6">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-r-black dark:border-r-white"></div>
      <span className="text-center text-3xl">Loading</span>
    </div>
  );
}
