import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session, status } = useSession();
  console.log(session, status);

  return (
    <>
      {session ? (
        <button onClick={() => signOut()}>로그아웃</button>
      ) : (
        <>
          <Link href={"/login"}>로그인</Link>
          <Link href={"/join"}>회원가입</Link>
        </>
      )}
    </>
  );
}
