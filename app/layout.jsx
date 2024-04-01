import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "./assets/styling/global.css";
export const metadata = {
  title: "Property Pulse | Find the perfect place",
  description: "Find your dream rental property",
  keywords: "find rentals, find rentals, find properties",
};

const MainLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default MainLayout;
