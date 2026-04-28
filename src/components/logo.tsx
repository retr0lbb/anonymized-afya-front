import { srcList } from "../assets/images";

interface LogoProps extends React.ComponentProps<"img"> {
  srcImage: keyof typeof srcList;
}

export function Logo({ alt, className, src, srcImage, ...rest }: LogoProps) {
  return (
    // biome-ignore lint/a11y/useAltText: <explanation>
    <img
      alt={alt}
      className={`flex items-center justify-center ${className}`}
      src={srcList[srcImage]}
      {...rest}
    />
  );
}
