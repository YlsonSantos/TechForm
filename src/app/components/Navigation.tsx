"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Button,
  Box,
  Flex,
  HStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { BookOpen, Heart, Building2, User, GraduationCap } from "lucide-react";

const Navigation = () => {
  const pathname = usePathname();
  
  const navItems = [
    { path: "/", label: "Início", icon: GraduationCap },
    { path: "/programas", label: "Programas", icon: BookOpen },
    { path: "/instituicoes", label: "Instituições", icon: Building2 },
    { path: "/favoritos", label: "Favoritos", icon: Heart },
    { path: "/perfil", label: "Perfil", icon: User },
  ];

  const activeBgColor = useColorModeValue("gray.100", "gray.700");
  const defaultBgColor = useColorModeValue("transparent", "transparent");

  return (
    <Box
      as="nav"
      position="sticky"
      top="0"
      zIndex="50"
      borderBottom="1px"
      borderColor="gray.200"
      bg="whiteAlpha.800"
      backdropFilter="saturate(180%) blur(5px)"
      _dark={{
        bg: "blackAlpha.800",
        borderColor: "gray.700",
      }}
    >
      <Flex
        h="16"
        alignItems="center"
        justifyContent="space-between"
        maxW="container.xl"
        mx="auto"
        px="4"
      >
        <Link href="/">
          <Flex alignItems="center" gap="2">
            <GraduationCap size={32} />
            <Text
              fontSize="xl"
              fontWeight="bold"
              bgGradient="linear(to-r, #3B82F6, #8B5CF6)"
              bgClip="text"
            >
              TechForma
            </Text>
          </Flex>
        </Link>

        {/* Desktop Navigation */}
        <HStack spacing="1" display={{ base: "none", md: "flex" }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            
            return (
              <Link key={item.path} href={item.path}>
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<Icon size={16} />}
                  bg={isActive ? activeBgColor : defaultBgColor}
                  _hover={{ bg: activeBgColor }}
                  color={isActive ? "blue.500" : "gray.600"}
                  _dark={{ color: isActive ? "blue.300" : "gray.300" }}
                >
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </HStack>

        {/* Mobile Navigation */}
        <HStack spacing="1" display={{ base: "flex", md: "none" }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            
            return (
              <Link key={item.path} href={item.path}>
                <Button
                  variant="ghost"
                  size="sm"
                  bg={isActive ? activeBgColor : defaultBgColor}
                  _hover={{ bg: activeBgColor }}
                  color={isActive ? "blue.500" : "gray.600"}
                  _dark={{ color: isActive ? "blue.300" : "gray.300" }}
                >
                  <Icon size={16} />
                </Button>
              </Link>
            );
          })}
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navigation;