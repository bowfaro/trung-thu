import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muôn Ánh Đèn, Cùng Thắp Một Mùa Trăng",
  description:
    "Đèn truyền thống có ánh sáng của ký ức, đèn hiện đại có ánh sáng của đổi mới — cả hai ánh sáng giao thoa cùng thắp sáng mùa Trung thu.",
  keywords: [
    "Trung Thu",
    "đèn lồng",
    "Mid-Autumn Festival",
    "đèn ông sao",
    "Tết Trung Thu",
    "lồng đèn truyền thống",
    "lồng đèn hiện đại",
  ],
  openGraph: {
    title: "Muôn Ánh Đèn, Cùng Thắp Một Mùa Trăng",
    description:
      "Trải nghiệm tương tác về câu chuyện đèn lồng Trung Thu — giữa truyền thống và hiện đại.",
    type: "website",
    locale: "vi_VN",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className="antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
