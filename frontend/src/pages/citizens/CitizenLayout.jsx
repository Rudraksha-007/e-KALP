import CitizenNavbar from "./CitizenNavbar";
import CitizenFooter from "./CitizenFooter";

export default function CitizenLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-50">
      <CitizenNavbar />
      <main className="flex-1">{children}</main>
      <CitizenFooter />
    </div>
  );
}