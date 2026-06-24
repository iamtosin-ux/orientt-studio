import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Allow .md / .mdx alongside the usual page extensions
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
};

const withMDX = createMDX({
  // Add remark/rehype plugins here as the design needs them
  options: {},
});

export default withMDX(nextConfig);
