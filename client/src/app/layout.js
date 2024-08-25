
import { Inter } from "next/font/google";
import "./globals.scss";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import { Providers } from "./redux/provider";



const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Buyit ",
  description: "This Website Has Been Created By Roshan Ali",
};


export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
            <NavBar/>
              {children}
            <Footer/>
        </Providers>
        
        </body>
    </html>
  );
}
