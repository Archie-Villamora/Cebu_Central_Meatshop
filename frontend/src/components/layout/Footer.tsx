import { Link } from "react-router-dom";
import logo from "@/assets/CCM_logo.png";

// Inline brand SVGs since Lucide no longer includes brand icons
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-auto border-t border-border">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand & Contacts */}
          <div className="flex flex-col space-y-4">
            <Link to="/" className="flex items-center space-x-3 shrink-0">
              <div className="h-14 w-14 bg-white/10 rounded-full flex items-center justify-center p-1.5 shrink-0">
                <img src={logo} alt="Cebu Central Meatshop Logo" className="h-full w-full object-contain" />
              </div>
              <span className="font-display font-bold text-lg tracking-tight leading-tight">
                Cebu Central <br /> Meatshop
              </span>
            </Link>
            <p className="text-secondary-foreground/70 text-sm mt-4">
              Premium quality meats, expertly butchered and delivered fresh to your door.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="p-2 bg-secondary-foreground/10 hover:bg-primary hover:text-primary-foreground rounded-full transition-colors"><FacebookIcon className="h-4 w-4" /></a>
              <a href="#" className="p-2 bg-secondary-foreground/10 hover:bg-primary hover:text-primary-foreground rounded-full transition-colors"><InstagramIcon className="h-4 w-4" /></a>
              <a href="#" className="p-2 bg-secondary-foreground/10 hover:bg-primary hover:text-primary-foreground rounded-full transition-colors"><TwitterIcon className="h-4 w-4" /></a>
            </div>
          </div>

          {/* Shop */}
          <div className="flex flex-col space-y-4">
            <h4 className="font-display font-bold text-lg">Shop</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/70">
              <li><Link to="/shop" className="hover:text-primary transition-colors">All Products</Link></li>
              <li><Link to="/shop/beef" className="hover:text-primary transition-colors">Premium Beef</Link></li>
              <li><Link to="/shop/pork" className="hover:text-primary transition-colors">Heritage Pork</Link></li>
              <li><Link to="/shop/poultry" className="hover:text-primary transition-colors">Free-Range Poultry</Link></li>
              <li><Link to="/bundles" className="hover:text-primary transition-colors">Curated Bundles</Link></li>
              <li><Link to="/subscription" className="hover:text-primary transition-colors">Monthly Meat Club</Link></li>
            </ul>
          </div>

          {/* Discover */}
          <div className="flex flex-col space-y-4">
            <h4 className="font-display font-bold text-lg">Discover</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/70">
              <li><Link to="/our-story" className="hover:text-primary transition-colors">Our Story & Butchers</Link></li>
              <li><Link to="/sourcing" className="hover:text-primary transition-colors">Farm-to-Table Sourcing</Link></li>
              <li><Link to="/wholesale" className="hover:text-primary transition-colors">Wholesale & Catering</Link></li>
              <li><Link to="/faq" className="hover:text-primary transition-colors">Help & FAQ</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="flex flex-col space-y-4">
            <h4 className="font-display font-bold text-lg">Support</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/70">
              <li><Link to="/shipping" className="hover:text-primary transition-colors">Shipping & Delivery</Link></li>
              <li><Link to="/guarantee" className="hover:text-primary transition-colors">Freshness Guarantee</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
        </div>
        
        <div className="border-t border-border/30 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-secondary-foreground/50">
          <p>&copy; {new Date().getFullYear()} Cebu Central Meatshop. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
