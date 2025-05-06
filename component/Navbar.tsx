import Image from "next/image"
import Link from "next/link"
export default function Navbar(){
    return(
        <nav>
            <div className="logo">
                <Link href="/"><Image src="/next.svg"width={50} height={50} alt=""/>
            </Link>
            </div>
            <Link href="/">หน้าแรก</Link>
            <Link href="/about">เกี่ยวกับเรา</Link>
            <Link href="/products">เกี่ยวกับเรา</Link>
        </nav>
    )
}