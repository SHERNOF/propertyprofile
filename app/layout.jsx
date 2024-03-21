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
        <div>{children}</div>
      </body>
    </html>
  );
};

export default MainLayout;
