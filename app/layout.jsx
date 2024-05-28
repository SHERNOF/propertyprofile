import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/components/AuthProvider";
import { GlobalProvider } from "@/context/GlobalContext";
import "./assets/styling/global.css";
import 'photoswipe/dist/photoswipe.css';

export const metadata = {
  title: "Property Pulse | Find the perfect place",
  description: "Find your dream rental property",
  keywords: "find rentals, find rentals, find properties",
};
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = ({ children }) => {
  return (
    <GlobalProvider>
    <AuthProvider>
      <html lang="en">
        <body>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ToastContainer />
        </body>
      </html>
    </AuthProvider>
    </GlobalProvider>
  );
};

export default MainLayout;
