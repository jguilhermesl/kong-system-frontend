import Image from 'next/image';
import LogoImage from '@/assets/kongPerfil.png';
import Link from 'next/link';

export const Logo = () => {
  return (
    <Link
      href={'/dashboard'}
      className="flex justify-start items-center lg:justify-start max-h-[40px]"
    >
      <Image
        src={LogoImage}
        alt="Logo-MeusProcessos"
        width={100}
        height={100}
      />
    </Link>
  );
};
