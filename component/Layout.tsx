import Navbar from "./Navbar";
import Footer from "./Footer";
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      
      <main>{children}</main>
      
    </div>
  );
}