export default function CitizenFooter() {
  return (
    <footer className="border-t border-neutral-800 bg-neutral-900">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-neutral-400 sm:flex-row">
        <p>© 2025 SocioLens — Government of Jharkhand Civic Initiative</p>
        <div className="flex items-center gap-5">
          <a href="#" className="hover:text-white">Help Center</a>
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Government Policies</a>
        </div>
      </div>
    </footer>
  );
}