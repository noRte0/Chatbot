import Image from "next/image";
import SessionProvider from "../components/SessionProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: 1 }}>
        {children}
      </div>
      <div style={{ position: 'relative', width: '45%', height: '100vh' }}>
        <Image
          src="https://img.freepik.com/free-photo/3d-rendering-financial-neon-bull_23-2151691932.jpg?w=826&t=st=1729261219~exp=1729261819~hmac=e32033ed194c62f47f381c4f5189a002e8595e5d660f4baf128a73d98d849674"
          alt="Trading Wallpaper"
          layout="fill"
          objectFit="cover"  
          style={{ position: 'absolute', right: 0 }}
        />
      </div>
    </div>
    </SessionProvider>
  );
}
