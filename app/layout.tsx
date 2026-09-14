import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trung Thu — Hai Ánh Đèn, Một Mùa Trăng",
  description:
    "Câu chuyện tương tác về đèn lồng Trung Thu: đèn truyền thống mang ánh sáng của ký ức, đèn hiện đại mang ánh sáng của đổi mới — hai ánh sáng giao thoa cùng thắp sáng một mùa trăng.",
  keywords: [
    "Trung Thu",
    "đèn lồng",
    "Mid-Autumn Festival",
    "đèn ông sao",
    "Tết Trung Thu",
    "interactive",
  ],
  openGraph: {
    title: "Trung Thu — Hai Ánh Đèn, Một Mùa Trăng",
    description:
      "Trải nghiệm tương tác về câu chuyện đèn lồng Trung Thu — giữa truyền thống và hiện đại.",
    type: "website",
    locale: "vi_VN",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className="h-full antialiased">
      <body
        style={{
          margin: 0,
          padding: 0,
          overflow: "hidden",
          height: "100%",
          width: "100%",
          minHeight: "100vh",
        }}
      >
        {children}
      </body>
    </html>
  );
}
