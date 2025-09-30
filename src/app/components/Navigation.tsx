import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { BookOpen, Heart, Building2, User, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils"; // Supondo que você manterá o utilitário cn

const Navigation = () => {
  const router = useRouter();

  const navItems = [
    { path: "/", label: "Início", icon: GraduationCap },
    { path: "/programas", label: "Programas", icon: BookOpen },
    { path: "/instituicoes", label: "Instituições", icon: Building2 },
    { path: "/favoritos", label: "Favoritos", icon: Heart },
    { path: "/perfil", label: "Perfil", icon: User },
  ];

  return (
    <nav className={cn("sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm")}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              TechForma
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = router.pathname === item.path;

              return (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className="gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>

          <div className="md:hidden flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = router.pathname === item.path;

              return (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="icon"
                  >
                    <Icon className="h-4 w-4" />
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;